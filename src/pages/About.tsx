import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Satellite, Target, Lightbulb, Globe } from "lucide-react";
import dataVizImage from "@/assets/data-viz.jpg";

const About = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 bg-muted/30">
        <div className="container py-12">
          {/* Hero Section */}
          <div className="max-w-4xl mx-auto text-center mb-16">
            <h1 className="text-4xl lg:text-5xl font-bold mb-4">
              Sobre o{" "}
              <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                RespiraCidade
              </span>
            </h1>
            <p className="text-xl text-muted-foreground">
              Uma ferramenta de planejamento urbano que combina dados de satélite NASA 
              com tecnologia de fotobiorreatores para criar cidades mais sustentáveis.
            </p>
          </div>

          {/* Mission */}
          <div className="mb-16">
            <img 
              src={dataVizImage} 
              alt="Dashboard de dados ambientais"
              className="w-full h-64 object-cover rounded-2xl shadow-[var(--shadow-elevated)] mb-8"
            />
            
            <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
              <Card>
                <CardHeader>
                  <div className="rounded-lg bg-primary/10 w-12 h-12 flex items-center justify-center mb-2">
                    <Target className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle>Nossa Missão</CardTitle>
                </CardHeader>
                <CardContent className="text-muted-foreground">
                  Democratizar o acesso a dados de satélite e fornecer ferramentas para que 
                  urbanistas e gestores públicos tomem decisões baseadas em evidências científicas, 
                  combatendo poluição e ilhas de calor urbanas.
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <div className="rounded-lg bg-secondary/10 w-12 h-12 flex items-center justify-center mb-2">
                    <Globe className="h-6 w-6 text-secondary" />
                  </div>
                  <CardTitle>Visão</CardTitle>
                </CardHeader>
                <CardContent className="text-muted-foreground">
                  Expandir para cidades globalmente, criando um banco de dados colaborativo 
                  de soluções urbanas sustentáveis e promovendo o uso de tecnologias verdes 
                  como fotobiorreatores.
                </CardContent>
              </Card>
            </div>
          </div>

          {/* How it Works */}
          <div className="max-w-4xl mx-auto mb-16">
            <h2 className="text-3xl font-bold text-center mb-8">Como Funciona</h2>
            
            <div className="space-y-6">
              <Card className="border-l-4 border-l-primary">
                <CardHeader>
                  <CardTitle className="flex items-center gap-3">
                    <div className="rounded-lg bg-primary/10 p-2">
                      <Satellite className="h-5 w-5 text-primary" />
                    </div>
                    1. Coleta de Dados via Satélite
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-muted-foreground">
                  Utilizamos dados dos satélites <strong>Sentinel-5P</strong> (qualidade do ar - NO₂), 
                  <strong> Landsat</strong> e <strong>MODIS</strong> (temperatura da superfície - LST), 
                  e <strong>índice NDVI</strong> para mapear vegetação. Esses dados são processados 
                  e visualizados em camadas interativas.
                </CardContent>
              </Card>

              <Card className="border-l-4 border-l-secondary">
                <CardHeader>
                  <CardTitle className="flex items-center gap-3">
                    <div className="rounded-lg bg-secondary/10 p-2">
                      <Lightbulb className="h-5 w-5 text-secondary" />
                    </div>
                    2. Análise e Identificação de Áreas Críticas
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-muted-foreground">
                  Cruzamos os dados de poluição, temperatura e déficit verde com informações de 
                  densidade populacional para identificar as áreas que mais precisam de intervenção. 
                  O sistema destaca "hotspots" automaticamente.
                </CardContent>
              </Card>

              <Card className="border-l-4 border-l-primary">
                <CardHeader>
                  <CardTitle className="flex items-center gap-3">
                    <div className="rounded-lg bg-primary/10 p-2">
                      <Target className="h-5 w-5 text-primary" />
                    </div>
                    3. Simulação de Impacto
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-muted-foreground">
                  Urbanistas podem simular a instalação de <strong>árvores líquidas</strong> 
                  (fotobiorreatores) em locais específicos e visualizar o impacto estimado: 
                  redução de CO₂, diminuição de temperatura local e população beneficiada.
                </CardContent>
              </Card>

              <Card className="border-l-4 border-l-secondary">
                <CardHeader>
                  <CardTitle className="flex items-center gap-3">
                    <div className="rounded-lg bg-secondary/10 p-2">
                      <Globe className="h-5 w-5 text-secondary" />
                    </div>
                    4. Engajamento e Governança
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-muted-foreground">
                  Cidadãos podem sugerir locais e reportar problemas. Gestores públicos têm 
                  acesso a relatórios automáticos, facilitando a tomada de decisão e a busca 
                  por financiamento para projetos sustentáveis.
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Technology Stack */}
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-8">Tecnologias Utilizadas</h2>
            
            <div className="grid md:grid-cols-3 gap-6">
              <Card className="text-center">
                <CardHeader>
                  <CardTitle className="text-lg">Dados NASA</CardTitle>
                </CardHeader>
                <CardContent className="text-sm text-muted-foreground">
                  Sentinel-5P, Landsat, MODIS, SEDAC, GHSL
                </CardContent>
              </Card>

              <Card className="text-center">
                <CardHeader>
                  <CardTitle className="text-lg">Mapas Interativos</CardTitle>
                </CardHeader>
                <CardContent className="text-sm text-muted-foreground">
                  Mapbox GL JS para visualização geoespacial
                </CardContent>
              </Card>

              <Card className="text-center">
                <CardHeader>
                  <CardTitle className="text-lg">Plataforma Web</CardTitle>
                </CardHeader>
                <CardContent className="text-sm text-muted-foreground">
                  React, TypeScript, Tailwind CSS
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default About;
