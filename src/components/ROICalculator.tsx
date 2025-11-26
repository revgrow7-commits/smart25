import { useState, useEffect } from "react";
import { Slider } from "@/components/ui/slider";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Clock, DollarSign, TrendingUp } from "lucide-react";

const ROICalculator = () => {
  const [traditionalCost, setTraditionalCost] = useState(15000);
  const [eventsPerYear, setEventsPerYear] = useState(4);
  
  // Cálculos
  const modularInitialCost = traditionalCost * 0.7; // 30% menor investimento inicial
  const maintenanceCostPerEvent = 500;
  const years = 3;
  
  const traditionalTotal = traditionalCost * eventsPerYear * years;
  const modularTotal = modularInitialCost + (maintenanceCostPerEvent * eventsPerYear * years);
  const savings = traditionalTotal - modularTotal;
  const costPerEvent = modularTotal / (eventsPerYear * years);
  const savingsPercentage = ((savings / traditionalTotal) * 100).toFixed(0);
  
  // Payback em meses
  const monthlyEvents = eventsPerYear / 12;
  const savingsPerEvent = traditionalCost - (modularInitialCost / (eventsPerYear * years)) - maintenanceCostPerEvent;
  const paybackMonths = monthlyEvents > 0 ? Math.ceil(modularInitialCost / (savingsPerEvent * monthlyEvents)) : 0;

  return (
    <section id="calculadora" className="py-12 md:py-20 bg-gradient-to-b from-card to-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10 md:mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-3 md:mb-4">
            Calculadora de <span className="gradient-text">ROI</span>
          </h2>
          <p className="text-base md:text-xl text-muted-foreground px-4">
            Descubra quanto você pode economizar com soluções modulares
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-6 md:gap-8 max-w-6xl mx-auto">
          {/* Inputs Section */}
          <Card className="p-6 md:p-8 space-y-6 md:space-y-8 bg-card border-border">
            <div className="space-y-4">
              <label className="text-lg font-semibold">
                Custo atual por evento (stand tradicional)
              </label>
              <div className="flex items-center gap-4">
                <span className="text-muted-foreground">R$</span>
                <Input
                  type="number"
                  value={traditionalCost}
                  onChange={(e) => setTraditionalCost(Number(e.target.value))}
                  className="flex-1 bg-background border-border text-lg"
                />
              </div>
              <Slider
                value={[traditionalCost]}
                onValueChange={(value) => setTraditionalCost(value[0])}
                min={5000}
                max={50000}
                step={1000}
                className="mt-4"
              />
              <div className="text-sm text-muted-foreground">
                R$ {traditionalCost.toLocaleString('pt-BR')}
              </div>
            </div>

            <div className="space-y-4">
              <label className="text-lg font-semibold">Eventos por ano</label>
              <Slider
                value={[eventsPerYear]}
                onValueChange={(value) => setEventsPerYear(value[0])}
                min={1}
                max={20}
                step={1}
                className="mt-4"
              />
              <div className="flex justify-center">
                <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-primary to-secondary text-3xl font-bold">
                  {eventsPerYear}
                </div>
              </div>
              <div className="text-sm text-muted-foreground text-center">
                {eventsPerYear} eventos por ano
              </div>
            </div>

            <div className="pt-6 space-y-2 text-sm text-muted-foreground border-t border-border">
              <p>• Smart Signage: investimento inicial ~30% maior</p>
              <p>• Durabilidade: 10+ eventos sem perda de qualidade</p>
              <p>• Economia cresce a cada evento realizado</p>
            </div>
          </Card>

          {/* Results Section */}
          <div className="space-y-6">
            <Card className="p-6 md:p-8 bg-gradient-to-br from-primary/20 to-secondary/20 border-primary/30 hover-lift">
              <div className="text-center">
                <h3 className="text-lg md:text-xl font-semibold mb-2">Sua Economia em 3 Anos</h3>
                <div className="text-4xl sm:text-5xl md:text-6xl font-bold gradient-text mb-2">
                  R$ {savings.toLocaleString('pt-BR')}
                </div>
                <p className="text-xs md:text-sm text-muted-foreground">comparado ao modelo tradicional</p>
              </div>
            </Card>

            <div className="grid grid-cols-2 gap-4 md:gap-6">
              <Card className="p-4 md:p-6 bg-card border-border hover-lift">
                <div className="flex items-center gap-2 md:gap-3 mb-2">
                  <div className="p-1.5 md:p-2 rounded-lg bg-primary/10">
                    <Clock className="h-4 w-4 md:h-5 md:w-5 text-primary" />
                  </div>
                  <span className="text-xs md:text-sm font-semibold">Payback</span>
                </div>
                <div className="text-2xl md:text-3xl font-bold gradient-text">{paybackMonths} meses</div>
                <p className="text-xs text-muted-foreground mt-1">
                  Após o 1º evento, tudo é economia líquida
                </p>
              </Card>

              <Card className="p-4 md:p-6 bg-card border-border hover-lift">
                <div className="flex items-center gap-2 md:gap-3 mb-2">
                  <div className="p-1.5 md:p-2 rounded-lg bg-secondary/10">
                    <DollarSign className="h-4 w-4 md:h-5 md:w-5 text-secondary" />
                  </div>
                  <span className="text-xs md:text-sm font-semibold">Custo por evento</span>
                </div>
                <div className="text-2xl md:text-3xl font-bold gradient-text">
                  R$ {costPerEvent.toLocaleString('pt-BR', { maximumFractionDigits: 0 })}
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  (após amortização)
                </p>
              </Card>
            </div>

            <Card className="p-6 bg-card border-border">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 rounded-lg bg-green-500/10">
                  <TrendingUp className="h-5 w-5 text-green-500" />
                </div>
                <span className="font-semibold">Economia Total</span>
              </div>
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-bold text-green-500">-{savingsPercentage}%</span>
                <span className="text-sm text-muted-foreground">vs tradicional</span>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ROICalculator;
