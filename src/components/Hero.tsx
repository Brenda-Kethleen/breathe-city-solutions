import { Button } from "@/components/ui/button";
import { ArrowRight, Satellite, TreePine, Wind } from "lucide-react";
import { Link } from "react-router-dom";
import heroImage from "@/assets/hero-city.jpg";

const Hero = () => {
  return (
    <section className="relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-[var(--gradient-hero)] -z-10" />
      
      <div className="container py-20 lg:py-32">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="space-y-8">
            <div className="inline-flex items-center gap-2 rounded-full bg-accent px-4 py-2 text-sm font-medium text-accent-foreground">
              <Satellite className="h-4 w-4" />
              Tecnologia NASA + Inovação Urbana
            </div>
            
            <h1 className="text-4xl lg:text-6xl font-bold leading-tight">
              Cidades mais{" "}
              <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                verdes e respiráveis
              </span>
            </h1>
            
            <p className="text-lg text-muted-foreground max-w-xl">
              Uma ferramenta de planejamento urbano que utiliza dados de satélite para identificar 
              os melhores locais para instalação de fotobiorreatores, combatendo poluição e ilhas de calor.
            </p>
            
            <div className="flex flex-wrap gap-4">
              <Link to="/map">
                <Button variant="hero" size="lg" className="group">
                  Explorar Mapa
                  <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Link to="/simulator">
                <Button variant="outline" size="lg">
                  Testar Simulador
                </Button>
              </Link>
            </div>
            
            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 pt-8 border-t border-border">
              <div>
                <div className="text-3xl font-bold text-primary">60%</div>
                <div className="text-sm text-muted-foreground">Redução CO₂</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-secondary">5°C</div>
                <div className="text-sm text-muted-foreground">Menos calor</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-primary">100%</div>
                <div className="text-sm text-muted-foreground">Open source</div>
              </div>
            </div>
          </div>
          
          {/* Image */}
          <div className="relative">
            <div className="relative rounded-2xl overflow-hidden shadow-[var(--shadow-elevated)]">
              <img 
                src={heroImage} 
                alt="Cidade sustentável com infraestrutura verde"
                className="w-full h-auto"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/20 to-transparent" />
            </div>
            
            {/* Floating cards */}
            <div className="absolute -bottom-6 -left-6 bg-card rounded-xl p-4 shadow-[var(--shadow-glow)] border border-border">
              <div className="flex items-center gap-3">
                <div className="rounded-lg bg-primary/10 p-2">
                  <TreePine className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <div className="text-sm font-medium">Árvores Líquidas</div>
                  <div className="text-xs text-muted-foreground">50x mais eficiente</div>
                </div>
              </div>
            </div>
            
            <div className="absolute -top-6 -right-6 bg-card rounded-xl p-4 shadow-[var(--shadow-glow)] border border-border">
              <div className="flex items-center gap-3">
                <div className="rounded-lg bg-secondary/10 p-2">
                  <Wind className="h-5 w-5 text-secondary" />
                </div>
                <div>
                  <div className="text-sm font-medium">Qualidade do Ar</div>
                  <div className="text-xs text-muted-foreground">Monitoramento real-time</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
