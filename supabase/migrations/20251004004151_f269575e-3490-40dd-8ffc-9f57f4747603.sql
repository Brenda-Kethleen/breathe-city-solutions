-- Create enum for user roles
CREATE TYPE public.app_role AS ENUM ('admin', 'gestor', 'cidadao');

-- Create profiles table
CREATE TABLE public.profiles (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name text,
  created_at timestamptz DEFAULT now() NOT NULL,
  updated_at timestamptz DEFAULT now() NOT NULL
);

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Create user_roles table
CREATE TABLE public.user_roles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  role app_role NOT NULL,
  created_at timestamptz DEFAULT now() NOT NULL,
  UNIQUE (user_id, role)
);

ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- Create function to check if user has a role
CREATE OR REPLACE FUNCTION public.has_role(_user_id uuid, _role app_role)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = _user_id
      AND role = _role
  )
$$;

-- Create suggestions table (for citizens)
CREATE TABLE public.suggestions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  latitude double precision NOT NULL,
  longitude double precision NOT NULL,
  description text NOT NULL,
  status text DEFAULT 'pending' NOT NULL CHECK (status IN ('pending', 'approved', 'rejected', 'implemented')),
  created_at timestamptz DEFAULT now() NOT NULL,
  updated_at timestamptz DEFAULT now() NOT NULL
);

ALTER TABLE public.suggestions ENABLE ROW LEVEL SECURITY;

-- Create planned_installations table (for gestores)
CREATE TABLE public.planned_installations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  planner_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  latitude double precision NOT NULL,
  longitude double precision NOT NULL,
  num_trees integer DEFAULT 1 NOT NULL,
  area_size integer,
  notes text,
  status text DEFAULT 'planned' NOT NULL CHECK (status IN ('planned', 'approved', 'in_progress', 'completed')),
  created_at timestamptz DEFAULT now() NOT NULL,
  updated_at timestamptz DEFAULT now() NOT NULL
);

ALTER TABLE public.planned_installations ENABLE ROW LEVEL SECURITY;

-- Profiles RLS Policies
CREATE POLICY "Users can view their own profile"
  ON public.profiles FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile"
  ON public.profiles FOR UPDATE
  USING (auth.uid() = id);

CREATE POLICY "Users can insert their own profile"
  ON public.profiles FOR INSERT
  WITH CHECK (auth.uid() = id);

-- User Roles RLS Policies
CREATE POLICY "Users can view their own roles"
  ON public.user_roles FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Admins can view all roles"
  ON public.user_roles FOR SELECT
  USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can insert roles"
  ON public.user_roles FOR INSERT
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- Suggestions RLS Policies
CREATE POLICY "Everyone can view all suggestions"
  ON public.suggestions FOR SELECT
  USING (true);

CREATE POLICY "Citizens can create their own suggestions"
  ON public.suggestions FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own suggestions"
  ON public.suggestions FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Gestores can update suggestions status"
  ON public.suggestions FOR UPDATE
  USING (public.has_role(auth.uid(), 'gestor') OR public.has_role(auth.uid(), 'admin'));

-- Planned Installations RLS Policies
CREATE POLICY "Everyone can view planned installations"
  ON public.planned_installations FOR SELECT
  USING (true);

CREATE POLICY "Gestores can create installations"
  ON public.planned_installations FOR INSERT
  WITH CHECK (
    auth.uid() = planner_id AND 
    (public.has_role(auth.uid(), 'gestor') OR public.has_role(auth.uid(), 'admin'))
  );

CREATE POLICY "Gestores can update their own installations"
  ON public.planned_installations FOR UPDATE
  USING (
    auth.uid() = planner_id AND 
    (public.has_role(auth.uid(), 'gestor') OR public.has_role(auth.uid(), 'admin'))
  );

-- Function to handle new user creation
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (id, full_name)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'full_name', '')
  );
  
  -- Assign default role as 'cidadao'
  INSERT INTO public.user_roles (user_id, role)
  VALUES (NEW.id, 'cidadao');
  
  RETURN NEW;
END;
$$;

-- Trigger to create profile and assign role on user signup
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER
LANGUAGE plpgsql
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

-- Triggers for updated_at
CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

CREATE TRIGGER update_suggestions_updated_at
  BEFORE UPDATE ON public.suggestions
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

CREATE TRIGGER update_planned_installations_updated_at
  BEFORE UPDATE ON public.planned_installations
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();