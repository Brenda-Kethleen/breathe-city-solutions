import { Leaf, Github, Linkedin, Mail } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="border-t border-border bg-muted/30">
      <div className="container py-12">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 font-bold text-xl">
              <div className="rounded-lg bg-gradient-to-br from-primary to-secondary p-2">
                <Leaf className="h-5 w-5 text-white" />
              </div>
              <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                RespiraCidade
              </span>
            </div>
            <p className="text-sm text-muted-foreground">
              Planejamento urbano sustentável baseado em dados de satélite.
            </p>
          </div>
          
          {/* Links */}
          <div>
            <h3 className="font-semibold mb-4">Plataforma</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link to="/map" className="hover:text-foreground transition-colors">Mapa</Link></li>
              <li><Link to="/simulator" className="hover:text-foreground transition-colors">Simulador</Link></li>
              <li><Link to="/about" className="hover:text-foreground transition-colors">Sobre</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold mb-4">Recursos</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><a href="#" className="hover:text-foreground transition-colors">Documentação</a></li>
              <li><a href="#" className="hover:text-foreground transition-colors">API</a></li>
              <li><a href="#" className="hover:text-foreground transition-colors">Tutoriais</a></li>
            </ul>
          </div>
          
          {/* Social */}
          <div>
            <h3 className="font-semibold mb-4">Conecte-se</h3>
            <div className="flex gap-3">
              <a href="#" className="rounded-lg bg-muted p-2 hover:bg-primary hover:text-white transition-all">
                <Github className="h-5 w-5" />
              </a>
              <a href="#" className="rounded-lg bg-muted p-2 hover:bg-primary hover:text-white transition-all">
                <Linkedin className="h-5 w-5" />
              </a>
              <a href="#" className="rounded-lg bg-muted p-2 hover:bg-primary hover:text-white transition-all">
                <Mail className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>
        
        <div className="border-t border-border mt-8 pt-8 text-center text-sm text-muted-foreground">
          <p>&copy; 2025 RespiraCidade. Feito com 💚 para um futuro sustentável.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
