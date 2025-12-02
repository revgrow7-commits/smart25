import { Button } from "@/components/ui/button";
import { Sparkles, ArrowRight } from "lucide-react";

const SubscriptionHero = () => {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-gradient-to-br from-[#0a0a2e] via-[#1a0a3e] to-[#0d0d3a]">
      {/* Animated neon light lines background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-red-600/20 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-cyan-500/15 rounded-full blur-[100px] animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 right-1/3 w-64 h-64 bg-red-400/15 rounded-full blur-[80px] animate-pulse" style={{ animationDelay: '2s' }} />
        {/* Neon lines effect */}
        <div className="absolute bottom-0 left-0 right-0 h-64 bg-gradient-to-t from-cyan-500/5 to-transparent" />
        <div className="absolute bottom-20 left-1/4 w-px h-32 bg-gradient-to-t from-cyan-400/60 to-transparent rotate-45" />
        <div className="absolute bottom-32 left-1/3 w-px h-48 bg-gradient-to-t from-red-500/50 to-transparent rotate-[30deg]" />
        <div className="absolute bottom-16 right-1/3 w-px h-40 bg-gradient-to-t from-cyan-400/40 to-transparent rotate-[-20deg]" />
      </div>

      {/* Grid pattern overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(6,182,212,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(6,182,212,0.03)_1px,transparent_1px)] bg-[size:50px_50px]" />

      <div className="container mx-auto px-4 relative z-10 text-center">
        <div className="max-w-4xl mx-auto">
          {/* Logo */}
          <div className="mb-8">
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight">
              <span className="text-white">sm</span>
              <span className="text-white relative">
                a
                <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-5 h-3 border-2 border-red-500 border-t-0 rounded-b-full"></span>
              </span>
              <span className="text-white">rt</span>
              <span className="text-red-500">signage</span>
            </h2>
            <p className="text-gray-400 text-sm mt-2">by Indústria Visual</p>
          </div>

          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-red-500/10 border border-red-500/30 backdrop-blur-sm mb-8">
            <Sparkles className="w-4 h-4 text-red-400" />
            <span className="text-red-300 text-sm font-medium">Clube de Assinatura</span>
          </div>

          {/* Main Headline */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
            <span className="text-white">Seu stand sempre pronto</span>
            <br />
            <span className="bg-gradient-to-r from-red-400 via-red-500 to-cyan-400 bg-clip-text text-transparent">
              — automaticamente.
            </span>
          </h1>

          {/* Subheadline */}
          <p className="text-lg md:text-xl text-gray-300 mb-10 max-w-2xl mx-auto leading-relaxed">
            Assine e receba seu kit modular, impressões sob demanda e suporte técnico 
            em qualquer evento do Brasil. Descontos progressivos e flexibilidade total.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              className="bg-gradient-to-r from-red-600 to-red-500 hover:from-red-500 hover:to-red-400 text-white border-0 px-8 py-6 text-lg rounded-xl shadow-[0_0_30px_rgba(220,38,38,0.5)] hover:shadow-[0_0_40px_rgba(220,38,38,0.7)] transition-all duration-300"
            >
              <Sparkles className="w-5 h-5 mr-2" />
              Criar Minha Assinatura
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="border-cyan-500/50 text-cyan-300 hover:bg-cyan-500/10 hover:text-cyan-200 px-8 py-6 text-lg rounded-xl backdrop-blur-sm transition-all duration-300"
            >
              Ver Planos
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </div>

          {/* 3D Stand illustration placeholder */}
          <div className="mt-16 relative">
            <div className="w-full max-w-2xl mx-auto h-64 md:h-80 rounded-2xl bg-gradient-to-br from-[#0a0a2e]/80 to-[#1a0a3e]/80 border border-red-500/20 backdrop-blur-sm flex items-center justify-center">
              <div className="text-center">
                <div className="w-24 h-24 mx-auto mb-4 rounded-xl bg-gradient-to-br from-red-500/30 to-cyan-500/30 border border-red-400/30 flex items-center justify-center animate-pulse">
                  <div className="w-16 h-16 rounded-lg bg-gradient-to-br from-red-400 to-cyan-400 opacity-50" />
                </div>
                <p className="text-cyan-300/60 text-sm">Stand Modular Inteligente</p>
              </div>
              {/* Glowing contour effect */}
              <div className="absolute inset-0 rounded-2xl border-2 border-cyan-400/20 shadow-[inset_0_0_30px_rgba(6,182,212,0.1)]" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SubscriptionHero;
