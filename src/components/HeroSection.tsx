import { Zap, Puzzle, Gem, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const HeroSection = () => {
  const benefits = [
    {
      icon: Zap,
      title: "Montagem em Minutos",
      description: "Sistema click-in revolucionário que elimina ferramentas"
    },
    {
      icon: Puzzle,
      title: "Modularidade Total",
      description: "Combine e reconfigure infinitamente conforme sua necessidade"
    },
    {
      icon: Gem,
      title: "Design Premium",
      description: "Acabamento fotográfico profissional em alumínio de alta qualidade"
    }
  ];

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-b from-background via-background to-card">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-[120px] animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary/20 rounded-full blur-[120px] animate-pulse delay-700"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-primary/10 via-purple-500/10 to-secondary/10 rounded-full blur-[150px]"></div>
      </div>

      <div className="container relative z-10 mx-auto px-4 py-20">
        <div className="text-center mb-16 space-y-6">
          <div className="inline-block mb-4">
            <span className="text-sm font-semibold tracking-wider text-primary uppercase">by Indústria Visual</span>
          </div>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6">
            Arquitetura Efêmera<br />
            <span className="gradient-text">Modular Inteligente</span>
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Revolucione seus eventos com estruturas modulares que se montam em minutos, 
            se adaptam infinitamente e economizam até 45% em múltiplos eventos.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
            <Button size="lg" className="btn-primary text-lg px-8 py-6">
              Solicitar Demonstração
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button size="lg" variant="outline" className="text-lg px-8 py-6 border-primary/30 hover:border-primary hover:bg-primary/10">
              Ver Catálogo
            </Button>
          </div>
        </div>

        {/* Benefits Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-20">
          {benefits.map((benefit, index) => (
            <div 
              key={index}
              className="group relative p-8 rounded-2xl bg-card border border-border hover:border-primary/50 transition-all duration-500 hover-lift"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative">
                <div className="inline-flex p-3 rounded-xl bg-gradient-to-br from-primary to-secondary mb-4">
                  <benefit.icon className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-2">{benefit.title}</h3>
                <p className="text-muted-foreground">{benefit.description}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-8 mt-20 max-w-4xl mx-auto">
          <div className="text-center">
            <div className="text-4xl md:text-5xl font-bold gradient-text mb-2">90%</div>
            <div className="text-sm text-muted-foreground">Mais rápida montagem</div>
          </div>
          <div className="text-center">
            <div className="text-4xl md:text-5xl font-bold gradient-text mb-2">5x+</div>
            <div className="text-sm text-muted-foreground">Reuso garantido</div>
          </div>
          <div className="text-center">
            <div className="text-4xl md:text-5xl font-bold gradient-text mb-2">45%</div>
            <div className="text-sm text-muted-foreground">Economia total</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
