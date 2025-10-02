import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Wind, Thermometer, TreePine, Users, Layers, Info } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

const MapView = () => {
  const [activeLayer, setActiveLayer] = useState<string>("air-quality");
  
  // Mock data for demonstration
  const stats = [
    { label: "Qualidade do Ar", value: "Moderada", icon: Wind, color: "text-yellow-600" },
    { label: "Temperatura Média", value: "32°C", icon: Thermometer, color: "text-orange-600" },
    { label: "Cobertura Verde", value: "18%", icon: TreePine, color: "text-green-600" },
    { label: "População Afetada", value: "2.4M", icon: Users, color: "text-blue-600" },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 bg-muted/30">
        <div className="container py-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold mb-2">
              Mapa de{" "}
              <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                Diagnóstico Urbano
              </span>
            </h1>
            <p className="text-lg text-muted-foreground">
              Visualize dados de satélite NASA para identificar áreas críticas
            </p>
          </div>

          <Alert className="mb-6 border-secondary">
            <Info className="h-4 w-4 text-secondary" />
            <AlertTitle>Configuração do Mapbox</AlertTitle>
            <AlertDescription>
              Para visualizar o mapa interativo, adicione sua chave pública do Mapbox. 
              Crie uma conta gratuita em <a href="https://mapbox.com" target="_blank" rel="noopener noreferrer" className="underline text-secondary font-medium">mapbox.com</a> e 
              obtenha seu token de acesso.
            </AlertDescription>
          </Alert>

          <div className="grid lg:grid-cols-[1fr_350px] gap-6">
            {/* Map Area */}
            <Card className="lg:col-span-1">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    <Layers className="h-5 w-5" />
                    Camadas de Dados
                  </CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <Tabs value={activeLayer} onValueChange={setActiveLayer}>
                  <TabsList className="w-full justify-start mb-4">
                    <TabsTrigger value="air-quality">Ar</TabsTrigger>
                    <TabsTrigger value="heat">Calor</TabsTrigger>
                    <TabsTrigger value="vegetation">Verde</TabsTrigger>
                    <TabsTrigger value="population">População</TabsTrigger>
                  </TabsList>
                  
                  {/* Placeholder for Mapbox */}
                  <div className="relative w-full h-[500px] rounded-lg bg-gradient-to-br from-secondary/20 to-primary/20 flex items-center justify-center border-2 border-dashed border-border mb-4">
                    <div className="text-center space-y-4 p-8">
                      <div className="rounded-full bg-secondary/10 w-16 h-16 flex items-center justify-center mx-auto">
                        <Layers className="h-8 w-8 text-secondary" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg mb-2">Mapa Interativo</h3>
                        <p className="text-sm text-muted-foreground max-w-md">
                          Configure o Mapbox para visualizar dados de satélite NASA em tempo real.
                          Camadas: Qualidade do Ar (NO₂), Temperatura LST, NDVI e Densidade Populacional.
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  {/* Layer Info */}
                  <TabsContent value="air-quality">
                    <div className="p-4 rounded-lg bg-muted/50 space-y-2">
                      <h4 className="font-semibold flex items-center gap-2">
                        <Wind className="h-4 w-4 text-secondary" />
                        Qualidade do Ar (NO₂)
                      </h4>
                      <p className="text-sm text-muted-foreground">
                        Dados do satélite Sentinel-5P/TROPOMI mostrando concentração de Dióxido de Nitrogênio.
                        Áreas vermelhas indicam alta poluição.
                      </p>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="heat">
                    <div className="p-4 rounded-lg bg-muted/50 space-y-2">
                      <h4 className="font-semibold flex items-center gap-2">
                        <Thermometer className="h-4 w-4 text-orange-600" />
                        Ilhas de Calor (LST)
                      </h4>
                      <p className="text-sm text-muted-foreground">
                        Temperatura da superfície terrestre via Landsat/MODIS (NASA). 
                        Áreas mais quentes em vermelho/laranja.
                      </p>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="vegetation">
                    <div className="p-4 rounded-lg bg-muted/50 space-y-2">
                      <h4 className="font-semibold flex items-center gap-2">
                        <TreePine className="h-4 w-4 text-green-600" />
                        Déficit Verde (NDVI)
                      </h4>
                      <p className="text-sm text-muted-foreground">
                        Índice de Vegetação normalizado. Verde escuro = vegetação saudável, 
                        cinza/vermelho = concreto/déficit.
                      </p>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="population">
                    <div className="p-4 rounded-lg bg-muted/50 space-y-2">
                      <h4 className="font-semibold flex items-center gap-2">
                        <Users className="h-4 w-4 text-blue-600" />
                        Densidade Populacional
                      </h4>
                      <p className="text-sm text-muted-foreground">
                        Dados SEDAC (NASA) e GHSL. Áreas mais densas em azul escuro.
                        Prioriza regiões com mais habitantes afetados.
                      </p>
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>

            {/* Stats Sidebar */}
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Estatísticas da Região</CardTitle>
                  <CardDescription>São Paulo, Brasil</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {stats.map((stat, index) => (
                    <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors">
                      <div className="flex items-center gap-3">
                        <div className={`rounded-lg bg-background p-2`}>
                          <stat.icon className={`h-5 w-5 ${stat.color}`} />
                        </div>
                        <div>
                          <div className="text-sm text-muted-foreground">{stat.label}</div>
                          <div className="font-semibold">{stat.value}</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Áreas Críticas</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="p-3 rounded-lg border-l-4 border-l-destructive bg-destructive/5">
                    <div className="font-semibold text-sm mb-1">Centro - Zona Crítica</div>
                    <div className="text-xs text-muted-foreground">Alta poluição + Ilha de calor</div>
                    <Badge variant="destructive" className="mt-2">Prioridade Alta</Badge>
                  </div>
                  <div className="p-3 rounded-lg border-l-4 border-l-yellow-600 bg-yellow-600/5">
                    <div className="font-semibold text-sm mb-1">Zona Industrial</div>
                    <div className="text-xs text-muted-foreground">NO₂ elevado, baixo NDVI</div>
                    <Badge className="mt-2 bg-yellow-600">Prioridade Média</Badge>
                  </div>
                  <div className="p-3 rounded-lg border-l-4 border-l-orange-600 bg-orange-600/5">
                    <div className="font-semibold text-sm mb-1">Bairro Periférico</div>
                    <div className="text-xs text-muted-foreground">Temperatura +5°C acima</div>
                    <Badge className="mt-2 bg-orange-600">Prioridade Média</Badge>
                  </div>
                </CardContent>
              </Card>

              <Button variant="hero" className="w-full" size="lg">
                Ir para Simulador
              </Button>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default MapView;
