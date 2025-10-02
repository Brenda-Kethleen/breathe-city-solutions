import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Leaf, Map, Calculator, Info } from "lucide-react";

const Navbar = () => {
  return (
    <nav className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center gap-2 font-bold text-xl">
          <div className="rounded-lg bg-gradient-to-br from-primary to-secondary p-2">
            <Leaf className="h-5 w-5 text-white" />
          </div>
          <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            RespiraCidade
          </span>
        </Link>
        
        <div className="flex items-center gap-6">
          <Link to="/" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
            Início
          </Link>
          <Link to="/map" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1">
            <Map className="h-4 w-4" />
            Mapa
          </Link>
          <Link to="/simulator" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1">
            <Calculator className="h-4 w-4" />
            Simulador
          </Link>
          <Link to="/about" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1">
            <Info className="h-4 w-4" />
            Sobre
          </Link>
          <Button variant="hero" size="sm">
            Começar
          </Button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
