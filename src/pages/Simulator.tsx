import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import { Calculator, TrendingDown, Thermometer, Users, Leaf } from "lucide-react";
import liquidTreeIcon from "@/assets/liquid-tree-icon.jpg";

const Simulator = () => {
  const [numTrees, setNumTrees] = useState([5]);
  const [areaSize, setAreaSize] = useState("1000");
  
  // Mock calculations
  const co2Reduction = Math.round(numTrees[0] * 12.5); // kg/day
  const tempReduction = (numTrees[0] * 0.8).toFixed(1); // °C
  const peopleHelped = Math.round(numTrees[0] * 2000); // people

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 bg-muted/30">
        <div className="container py-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold mb-2">
              Simulador de{" "}
              <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                Impacto Ambiental
              </span>
            </h1>
            <p className="text-lg text-muted-foreground">
              Calcule o impacto potencial de árvores líquidas na sua região
            </p>
          </div>

          <div className="grid lg:grid-cols-[1fr_400px] gap-6">
            {/* Simulation Config */}
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Calculator className="h-5 w-5" />
                    Configuração da Simulação
                  </CardTitle>
                  <CardDescription>
                    Ajuste os parâmetros para simular o impacto das árvores líquidas
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="area" className="text-base">Área Selecionada (m²)</Label>
                      <Input 
                        id="area" 
                        type="number" 
                        value={areaSize}
                        onChange={(e) => setAreaSize(e.target.value)}
                        placeholder="1000"
                        className="mt-2"
                      />
                      <p className="text-sm text-muted-foreground mt-1">
                        Tamanho da área onde as árvores serão instaladas
                      </p>
                    </div>

                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <Label className="text-base">Número de Árvores Líquidas</Label>
                        <Badge variant="secondary" className="text-base px-3">
                          {numTrees[0]}
                        </Badge>
                      </div>
                      <Slider
                        value={numTrees}
                        onValueChange={setNumTrees}
                        min={1}
                        max={20}
                        step={1}
                        className="mt-2"
                      />
                      <p className="text-sm text-muted-foreground mt-2">
                        Cada árvore líquida equivale a ~50 árvores tradicionais
                      </p>
                    </div>
                  </div>

                  {/* Visual representation */}
                  <div className="p-6 rounded-lg bg-gradient-to-br from-primary/10 to-secondary/10 border-2 border-dashed border-border">
                    <div className="flex flex-wrap gap-2 justify-center">
                      {Array.from({ length: numTrees[0] }).map((_, i) => (
                        <div key={i} className="w-12 h-12 rounded-lg bg-primary/20 flex items-center justify-center">
                          <Leaf className="h-6 w-6 text-primary" />
                        </div>
                      ))}
                    </div>
                    <p className="text-center text-sm text-muted-foreground mt-4">
                      Visualização das {numTrees[0]} árvoras líquidas
                    </p>
                  </div>

                  <Button variant="hero" className="w-full" size="lg">
                    Calcular Impacto Detalhado
                  </Button>
                </CardContent>
              </Card>

              {/* Info Card */}
              <Card className="border-primary/50">
                <CardHeader>
                  <CardTitle className="text-lg">O que são Árvores Líquidas?</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <img 
                    src={liquidTreeIcon} 
                    alt="Fotobiorreator - Árvore Líquida"
                    className="w-full h-48 object-cover rounded-lg"
                  />
                  <p className="text-sm text-muted-foreground">
                    Fotobiorreatores que utilizam microalgas para capturar CO₂ e produzir oxigênio. 
                    São 50x mais eficientes que árvores tradicionais e ocupam menos espaço, 
                    ideais para áreas urbanas densas.
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Results */}
            <div className="space-y-6">
              <Card className="border-2 border-primary/50">
                <CardHeader>
                  <CardTitle>Impacto Estimado</CardTitle>
                  <CardDescription>Resultados baseados em estudos científicos</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* CO2 Reduction */}
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <div className="rounded-lg bg-primary/10 p-3">
                        <TrendingDown className="h-6 w-6 text-primary" />
                      </div>
                      <div className="flex-1">
                        <div className="text-sm text-muted-foreground">Redução de CO₂</div>
                        <div className="text-2xl font-bold text-primary">{co2Reduction} kg/dia</div>
                      </div>
                    </div>
                    <div className="h-2 rounded-full bg-muted overflow-hidden">
                      <div 
                        className="h-full bg-gradient-to-r from-primary to-primary-glow transition-all"
                        style={{ width: `${Math.min((co2Reduction / 250) * 100, 100)}%` }}
                      />
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Equivalente a {Math.round(co2Reduction / 25)} carros a menos nas ruas por dia
                    </p>
                  </div>

                  {/* Temperature */}
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <div className="rounded-lg bg-orange-600/10 p-3">
                        <Thermometer className="h-6 w-6 text-orange-600" />
                      </div>
                      <div className="flex-1">
                        <div className="text-sm text-muted-foreground">Redução de Temperatura</div>
                        <div className="text-2xl font-bold text-orange-600">-{tempReduction}°C</div>
                      </div>
                    </div>
                    <div className="h-2 rounded-full bg-muted overflow-hidden">
                      <div 
                        className="h-full bg-gradient-to-r from-orange-600 to-orange-400 transition-all"
                        style={{ width: `${Math.min((parseFloat(tempReduction) / 10) * 100, 100)}%` }}
                      />
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Combate às ilhas de calor na área local
                    </p>
                  </div>

                  {/* People Helped */}
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <div className="rounded-lg bg-secondary/10 p-3">
                        <Users className="h-6 w-6 text-secondary" />
                      </div>
                      <div className="flex-1">
                        <div className="text-sm text-muted-foreground">População Beneficiada</div>
                        <div className="text-2xl font-bold text-secondary">{peopleHelped.toLocaleString()}</div>
                      </div>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Pessoas na área de influência direta (raio de ~500m)
                    </p>
                  </div>

                  {/* Summary */}
                  <div className="pt-4 border-t border-border">
                    <h4 className="font-semibold mb-3">Benefícios Adicionais</h4>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li className="flex items-start gap-2">
                        <span className="text-primary">•</span>
                        <span>Melhoria da qualidade do ar (redução de NO₂ e PM2.5)</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-primary">•</span>
                        <span>Produção de biomassa utilizável como biocombustível</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-primary">•</span>
                        <span>Menor manutenção que árvores tradicionais</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-primary">•</span>
                        <span>Funciona 24/7, inclusive à noite</span>
                      </li>
                    </ul>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Próximos Passos</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button variant="outline" className="w-full justify-start">
                    1. Exportar Relatório em PDF
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    2. Compartilhar com Equipe
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    3. Solicitar Orçamento
                  </Button>
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

export default Simulator;
