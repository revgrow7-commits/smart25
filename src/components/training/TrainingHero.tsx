import { Zap, Users, Recycle, Play, Download, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

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
      {/* Background Effects */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(139,92,246,0.15),transparent_50%)]" />
      <div className="absolute top-20 left-1/4 w-96 h-96 bg-purple-600/20 rounded-full blur-[128px]" />
      <div className="absolute bottom-20 right-1/4 w-96 h-96 bg-pink-600/20 rounded-full blur-[128px]" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight mb-6">
              Escola de Treinamento Smart Signage para{" "}
              <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
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
                  <div className="p-2 rounded-lg bg-purple-500/20 border border-purple-500/30">
                    <benefit.icon className="h-5 w-5 text-purple-400" />
                  </div>
                  <span className="text-sm">{benefit.text}</span>
                </div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                onClick={scrollToForm}
                className="bg-gradient-to-r from-purple-600 to-pink-600 hover:opacity-90 text-white px-8 py-6 text-lg rounded-xl shadow-[0_0_30px_rgba(139,92,246,0.3)]"
              >
                Quero entrar na Escola de Treinamento
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button
                variant="outline"
                className="border-purple-500/50 text-purple-300 hover:bg-purple-500/10 px-6 py-6 text-lg rounded-xl"
              >
                <Download className="mr-2 h-5 w-5" />
                Baixar guia gratuito
              </Button>
            </div>
          </div>

          {/* Image/Illustration Placeholder */}
          <div className="relative">
            <div className="aspect-square rounded-2xl bg-gradient-to-br from-purple-900/50 to-pink-900/50 border border-purple-500/30 p-8 relative overflow-hidden">
              <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAwIDEwIEwgNDAgMTAgTSAxMCAwIEwgMTAgNDAgTSAwIDIwIEwgNDAgMjAgTSAyMCAwIEwgMjAgNDAgTSAwIDMwIEwgNDAgMzAgTSAzMCAwIEwgMzAgNDAiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSgxMzksMTQ3LDE3NCwwLjEpIiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-50" />
              
              <div className="relative z-10 h-full flex flex-col items-center justify-center text-center">
                <div className="w-32 h-32 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center mb-6 shadow-[0_0_60px_rgba(139,92,246,0.4)]">
                  <Users className="h-16 w-16 text-white" />
                </div>
                <p className="text-xl font-semibold text-white mb-2">Montagem Profissional</p>
                <p className="text-gray-400">Stands modulares com tecido tensionado</p>
              </div>

              {/* Decorative elements */}
              <div className="absolute top-4 right-4 w-20 h-20 border-2 border-purple-500/30 rounded-lg" />
              <div className="absolute bottom-4 left-4 w-16 h-16 border-2 border-pink-500/30 rounded-lg" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrainingHero;
