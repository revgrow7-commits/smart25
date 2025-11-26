import { Zap, TrendingUp, DollarSign, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import heroImage from "@/assets/hero-smart-signage.jpg";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-background pt-20">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-[120px] animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: '700ms' }}></div>
      </div>

      <div className="container relative z-10 mx-auto px-4 py-12 md:py-16">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Left Column - Content */}
          <div className="space-y-6 md:space-y-8">
            <Badge className="bg-primary/20 text-primary border-primary/30 hover:bg-primary/30 px-4 py-1.5">
              by Indústria Visual
            </Badge>

            <div className="space-y-4">
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight">
                Arquitetura Efêmera<br />
                <span className="gradient-text">Modular Inteligente</span>
              </h1>
              
              <p className="text-base md:text-lg lg:text-xl text-muted-foreground max-w-xl leading-relaxed">
                Revolucione seus eventos com estruturas modulares que se montam em minutos, 
                se adaptam infinitamente e economizam até 45% em múltiplos eventos.
              </p>
            </div>

            {/* Stats Row */}
            <div className="grid grid-cols-3 gap-4 md:gap-6 py-6">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <Zap className="h-5 w-5 text-yellow-500" />
                  <span className="text-3xl md:text-4xl font-bold text-foreground">90%</span>
                </div>
                <p className="text-xs md:text-sm text-muted-foreground">Mais rápida montagem</p>
              </div>
              
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <TrendingUp className="h-5 w-5 text-green-500" />
                  <span className="text-3xl md:text-4xl font-bold text-foreground">5x+</span>
                </div>
                <p className="text-xs md:text-sm text-muted-foreground">Reuso garantido</p>
              </div>
              
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <DollarSign className="h-5 w-5 text-red-500" />
                  <span className="text-3xl md:text-4xl font-bold text-foreground">45%</span>
                </div>
                <p className="text-xs md:text-sm text-muted-foreground">Economia total</p>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 md:gap-4 pt-4">
              <Button size="lg" className="btn-primary text-base md:text-lg px-6 md:px-8 py-5 md:py-6">
                Solicitar Demonstração
                <ArrowRight className="ml-2 h-4 md:h-5 w-4 md:w-5" />
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="text-base md:text-lg px-6 md:px-8 py-5 md:py-6 border-primary/30 hover:border-primary hover:bg-primary/5"
              >
                Ver Catálogo
              </Button>
            </div>
          </div>

          {/* Right Column - Visual Card */}
          <div className="relative hidden lg:block">
            <div className="relative rounded-3xl overflow-hidden border border-primary/20 bg-gradient-to-br from-card/50 to-background/50 backdrop-blur-sm p-8">
              {/* Decorative elements */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-primary/20 rounded-full blur-[100px]"></div>
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-500/20 rounded-full blur-[100px]"></div>
              
              {/* Content */}
              <div className="relative z-10 space-y-6">
                <div className="flex items-center justify-center mb-8">
                  <img src={heroImage} alt="Smart Signage" className="w-full max-w-md rounded-2xl shadow-2xl" />
                </div>
                
                {/* Animated lines effect overlay */}
                <div className="absolute inset-0 opacity-30">
                  <div className="absolute top-1/2 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary to-transparent animate-pulse"></div>
                  <div className="absolute top-1/3 left-0 w-full h-px bg-gradient-to-r from-transparent via-cyan-500 to-transparent animate-pulse" style={{ animationDelay: '500ms' }}></div>
                  <div className="absolute top-2/3 left-0 w-full h-px bg-gradient-to-r from-transparent via-purple-500 to-transparent animate-pulse" style={{ animationDelay: '1000ms' }}></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
