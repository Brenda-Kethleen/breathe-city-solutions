import { Map, BarChart3, Users, Zap } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const features = [
  {
    icon: Map,
    title: "Mapa de Diagnóstico",
    description: "Visualize dados de qualidade do ar, ilhas de calor e déficit verde em tempo real.",
    color: "text-primary",
    bgColor: "bg-primary/10"
  },
  {
    icon: BarChart3,
    title: "Simulação de Impacto",
    description: "Calcule o impacto potencial da instalação de árvores líquidas antes de implementar.",
    color: "text-secondary",
    bgColor: "bg-secondary/10"
  },
  {
    icon: Users,
    title: "Engajamento Cidadão",
    description: "Plataforma colaborativa onde cidadãos podem sugerir locais e reportar problemas.",
    color: "text-primary",
    bgColor: "bg-primary/10"
  },
  {
    icon: Zap,
    title: "Dados da NASA",
    description: "Integração com satélites Sentinel-5P, Landsat e MODIS para análises precisas.",
    color: "text-secondary",
    bgColor: "bg-secondary/10"
  }
];

const Features = () => {
  return (
    <section className="py-20 bg-muted/30">
      <div className="container">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl lg:text-5xl font-bold mb-4">
            Planejamento Urbano{" "}
            <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Inteligente
            </span>
          </h2>
          <p className="text-lg text-muted-foreground">
            Utilize dados de satélite e simulações avançadas para tomar decisões 
            baseadas em evidência científica.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <Card key={index} className="border-2 hover:border-primary/50 transition-all hover:shadow-[var(--shadow-glow)] group">
              <CardHeader>
                <div className={`rounded-lg ${feature.bgColor} w-12 h-12 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                  <feature.icon className={`h-6 w-6 ${feature.color}`} />
                </div>
                <CardTitle className="text-xl">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  {feature.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
