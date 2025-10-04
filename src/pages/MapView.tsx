import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import InteractiveMap from "@/components/InteractiveMap";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Wind, Thermometer, TreePine, Users, Layers } from "lucide-react";

const MapView = () => {
  const navigate = useNavigate();
  const [activeLayers, setActiveLayers] = useState<Set<string>>(new Set(['poluicao']));
  
  const toggleLayer = (layerName: string) => {
    setActiveLayers(prev => {
      const newSet = new Set(prev);
      if (newSet.has(layerName)) {
        newSet.delete(layerName);
      } else {
        newSet.add(layerName);
      }
      return newSet;
    });
  };

  const layerControls = [
    { id: 'poluicao', label: 'Qualidade do Ar (NO₂)', icon: Wind, color: 'text-blue-600' },
    { id: 'calor', label: 'Ilhas de Calor', icon: Thermometer, color: 'text-orange-600' },
    { id: 'verde', label: 'Déficit Verde', icon: TreePine, color: 'text-green-600' },
    { id: 'pop', label: 'Densidade Populacional', icon: Users, color: 'text-purple-600' },
  ];
  
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
              <CardContent className="space-y-4">
                {/* Mapa Interativo */}
                <InteractiveMap activeLayers={activeLayers} />
                
                {/* Controles de Camadas */}
                <div className="p-4 rounded-lg bg-muted/50">
                  <h4 className="font-semibold mb-3 flex items-center gap-2">
                    <Layers className="h-4 w-4" />
                    Controlar Camadas
                  </h4>
                  <div className="space-y-3">
                    {layerControls.map((layer) => (
                      <div key={layer.id} className="flex items-center space-x-3 p-2 rounded hover:bg-background/50 transition-colors">
                        <Checkbox
                          id={`layer-${layer.id}`}
                          checked={activeLayers.has(layer.id)}
                          onCheckedChange={() => toggleLayer(layer.id)}
                        />
                        <label
                          htmlFor={`layer-${layer.id}`}
                          className="flex items-center gap-2 text-sm font-medium cursor-pointer flex-1"
                        >
                          <layer.icon className={`h-4 w-4 ${layer.color}`} />
                          {layer.label}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Legenda */}
                <div className="p-4 rounded-lg bg-muted/50 space-y-2">
                  <h4 className="font-semibold text-sm mb-2">Legenda</h4>
                  <div className="text-xs text-muted-foreground space-y-1">
                    <p><strong className="text-blue-500">Azul → Lima → Vermelho:</strong> Qualidade do Ar (NO₂)</p>
                    <p><strong className="text-cyan-500">Ciano → Amarelo → Vermelho:</strong> Ilhas de Calor</p>
                    <p><strong className="text-amber-700">Marrom:</strong> Déficit de Vegetação</p>
                    <p><strong className="text-purple-500">Azul Claro → Roxo:</strong> Densidade Populacional</p>
                  </div>
                </div>
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

              <Button 
                variant="hero" 
                className="w-full" 
                size="lg"
                onClick={() => navigate('/simulator')}
              >
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
