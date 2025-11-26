import { Zap, TrendingUp, DollarSign, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import heroImage from "@/assets/hero-smart-signage.jpg";
import logo from "@/assets/logo-smartsignage.png";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-background pt-20">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-[120px] animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: '700ms' }}></div>
      </div>

      <div className="container relative z-10 mx-auto px-4 py-12 md:py-16">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
          {/* Left Column - Content */}
          <div className="space-y-6 md:space-y-8 max-w-2xl">
            {/* Badge */}
            <div className="inline-block">
              <div className="px-6 py-2.5 rounded-full border-2 border-primary/40 bg-primary/10 text-primary font-medium text-sm">
                by Indústria Visual
              </div>
            </div>

            {/* Title */}
            <div className="space-y-2">
              <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold leading-[1.1] tracking-tight">
                Arquitetura Efêmera
              </h1>
              <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold leading-[1.1] tracking-tight text-primary">
                Modular Inteligente
              </h1>
            </div>
            
            {/* Description */}
            <p className="text-lg md:text-xl text-muted-foreground/90 leading-relaxed max-w-xl">
              Revolucione seus eventos com estruturas modulares que se montam em minutos, 
              se adaptam infinitamente e economizam até 45% em múltiplos eventos.
            </p>

            {/* Stats Row */}
            <div className="flex gap-8 md:gap-12 py-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <Zap className="h-5 w-5 text-yellow-400" />
                  <span className="text-5xl md:text-6xl font-bold text-foreground">90%</span>
                </div>
                <p className="text-sm text-muted-foreground/80">Mais rápida montagem</p>
              </div>
              
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-green-400" />
                  <span className="text-5xl md:text-6xl font-bold text-foreground">5x+</span>
                </div>
                <p className="text-sm text-muted-foreground/80">Reuso garantido</p>
              </div>
              
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <DollarSign className="h-5 w-5 text-primary" />
                  <span className="text-5xl md:text-6xl font-bold text-foreground">45%</span>
                </div>
                <p className="text-sm text-muted-foreground/80">Economia total</p>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <button className="group px-8 py-4 bg-gradient-to-r from-primary via-[hsl(340,100%,60%)] to-primary text-white font-semibold text-base rounded-xl hover:shadow-[0_0_40px_hsl(345,100%,55%,0.5)] transition-all duration-300 flex items-center justify-center gap-2">
                Solicitar Demonstração
                <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </button>
              <button className="px-8 py-4 bg-transparent border-2 border-primary/40 text-foreground font-semibold text-base rounded-xl hover:bg-primary/5 hover:border-primary/60 transition-all duration-300">
                Ver Catálogo
              </button>
            </div>
          </div>

          {/* Right Column - Visual Card */}
          <div className="relative hidden lg:block">
            <div className="relative rounded-3xl overflow-hidden border-2 border-primary/20 bg-gradient-to-br from-card/80 to-background/80 backdrop-blur-xl p-8 shadow-2xl">
              {/* Decorative elements */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-primary/20 rounded-full blur-[100px]"></div>
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-500/20 rounded-full blur-[100px]"></div>
              
              {/* Content */}
              <div className="relative z-10 space-y-6">
                {/* Logo */}
                <div className="flex items-center justify-center mb-6">
                  <img 
                    src={logo} 
                    alt="Smart Signage" 
                    className="w-full max-w-lg"
                  />
                </div>
                
                <div className="flex items-center justify-center">
                  <img 
                    src={heroImage} 
                    alt="Smart Signage Visual" 
                    className="w-full max-w-md rounded-2xl shadow-[0_0_50px_rgba(255,0,80,0.3)]" 
                  />
                </div>
                
                {/* Animated lines effect overlay */}
                <div className="absolute inset-0 opacity-40 pointer-events-none">
                  <div className="absolute top-1/2 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-primary to-transparent animate-pulse"></div>
                  <div className="absolute top-1/3 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-cyan-400 to-transparent animate-pulse" style={{ animationDelay: '500ms' }}></div>
                  <div className="absolute top-2/3 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-purple-400 to-transparent animate-pulse" style={{ animationDelay: '1000ms' }}></div>
                  
                  {/* Decorative dots */}
                  <div className="absolute top-1/4 right-1/4 w-2 h-2 bg-primary rounded-full animate-pulse"></div>
                  <div className="absolute bottom-1/3 left-1/4 w-2 h-2 bg-cyan-400 rounded-full animate-pulse" style={{ animationDelay: '300ms' }}></div>
                  <div className="absolute top-2/3 right-1/3 w-2 h-2 bg-purple-400 rounded-full animate-pulse" style={{ animationDelay: '600ms' }}></div>
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
