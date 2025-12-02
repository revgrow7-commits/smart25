import { Zap, Users, Recycle, Play, Download, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import academyHero from "@/assets/smart-signage-academy-hero.jpg";
import trainingStand from "@/assets/training-hero-stand.png";

const TrainingHero = () => {
  const benefits = [
    { icon: Zap, text: "Montagens 5x mais rápidas" },
    { icon: Users, text: "Menos equipe, mais lucro" },
    { icon: Recycle, text: "Estruturas reutilizáveis" },
    { icon: Play, text: "Conteúdo 100% prático" },
  ];

  const scrollToForm = () => {
    const element = document.querySelector("#lead-form");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="pt-24 pb-16 md:pt-32 md:pb-24 relative overflow-hidden">
      {/* Background with hero image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${academyHero})` }}
      />
      <div className="absolute inset-0 bg-[#0a0a2e]/70" />
      
      {/* Decorative light lines effect */}
      <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-[#0a0a2e] to-transparent" />
      <div className="absolute top-20 left-1/4 w-96 h-96 bg-red-600/10 rounded-full blur-[128px]" />
      <div className="absolute bottom-20 right-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-[128px]" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            {/* Smart Signage Academy Logo Text */}
            <div className="mb-6">
              <h2 className="text-2xl md:text-3xl font-bold tracking-tight">
                <span className="text-white">smart</span>
                <span className="text-red-500">signage</span>
                <span className="text-white ml-2 font-light">academy</span>
              </h2>
              <p className="text-sm text-gray-400 mt-1">by Indústria Visual</p>
            </div>

            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight mb-6">
              Escola de Treinamento para{" "}
              <span className="text-red-500">
                Montadores de Stands Modulares
              </span>
            </h1>

            <p className="text-lg md:text-xl text-gray-300 mb-8">
              Torne-se um montador especialista em stands modulares, aumente sua margem de lucro e aprenda a montar estandes profissionais em minutos.
            </p>

            <div className="grid grid-cols-2 gap-4 mb-8">
              {benefits.map((benefit, index) => (
                <div
                  key={index}
                  className="flex items-center gap-3 text-gray-300"
                >
                  <div className="p-2 rounded-lg bg-red-500/20 border border-red-500/30">
                    <benefit.icon className="h-5 w-5 text-red-400" />
                  </div>
                  <span className="text-sm">{benefit.text}</span>
                </div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                onClick={scrollToForm}
                className="bg-red-600 hover:bg-red-700 text-white px-8 py-6 text-lg rounded-xl shadow-[0_0_30px_rgba(220,38,38,0.4)]"
              >
                Quero entrar na Escola de Treinamento
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button
                variant="outline"
                className="border-red-500/50 text-red-300 hover:bg-red-500/10 px-6 py-6 text-lg rounded-xl"
              >
                <Download className="mr-2 h-5 w-5" />
                Baixar guia gratuito
              </Button>
            </div>
          </div>

          {/* Stand Image */}
          <div className="relative">
            <div className="rounded-2xl overflow-hidden border border-red-500/30 shadow-[0_0_40px_rgba(220,38,38,0.2)]">
              <img 
                src={trainingStand} 
                alt="Stand modular Smart Signage em feira de eventos" 
                className="w-full h-auto object-cover"
              />
            </div>
            {/* Decorative elements */}
            <div className="absolute -top-4 -right-4 w-20 h-20 border-2 border-red-500/30 rounded-lg" />
            <div className="absolute -bottom-4 -left-4 w-16 h-16 border-2 border-cyan-500/30 rounded-lg" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrainingHero;
