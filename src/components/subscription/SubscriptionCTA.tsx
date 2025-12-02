import { Button } from "@/components/ui/button";
import { Sparkles } from "lucide-react";

const SubscriptionCTA = () => {
  return (
    <section className="py-20 md:py-32 bg-gradient-to-b from-[#1a0a3e] to-[#0a0a2e] relative overflow-hidden">
      {/* Blurred glowing backdrop */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-red-600/20 rounded-full blur-[150px]" />
        <div className="absolute top-1/3 left-1/3 w-72 h-72 bg-cyan-500/15 rounded-full blur-[100px]" />
        <div className="absolute bottom-1/3 right-1/3 w-64 h-64 bg-red-500/15 rounded-full blur-[80px]" />
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
            Pronto para nunca mais montar stand{" "}
            <span className="bg-gradient-to-r from-red-400 via-cyan-400 to-red-400 bg-clip-text text-transparent">
              do zero?
            </span>
          </h2>
          
          <p className="text-lg md:text-xl text-gray-300 mb-10 max-w-xl mx-auto">
            Junte-se a centenas de empresas que já simplificaram sua presença em eventos.
          </p>
          
          <Button 
            size="lg"
            className="bg-gradient-to-r from-red-600 to-red-500 hover:from-red-500 hover:to-red-400 text-white border-0 px-12 py-8 text-xl rounded-2xl shadow-[0_0_50px_rgba(220,38,38,0.5)] hover:shadow-[0_0_70px_rgba(220,38,38,0.7)] transition-all duration-300 transform hover:scale-105"
          >
            <Sparkles className="w-6 h-6 mr-3" />
            Criar Minha Assinatura
          </Button>
          
          <p className="text-gray-500 mt-6 text-sm">
            Sem compromisso. Cancele quando quiser.
          </p>
        </div>
      </div>
    </section>
  );
};

export default SubscriptionCTA;
