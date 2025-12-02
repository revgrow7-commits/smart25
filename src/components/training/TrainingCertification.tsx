import { Award, UserPlus, PlayCircle, RefreshCw } from "lucide-react";

const TrainingCertification = () => {
  const benefits = [
    {
      icon: Award,
      title: "Reconhecimento",
      description: "Certificação oficial em stands modulares Smart Signage.",
    },
    {
      icon: UserPlus,
      title: "Oportunidade",
      description: "Possibilidade de receber indicações de clientes que buscam montadores certificados.",
    },
    {
      icon: PlayCircle,
      title: "Conteúdo prático",
      description: "Aulas com foco em montagem real, não apenas teoria.",
    },
    {
      icon: RefreshCw,
      title: "Atualização",
      description: "Acesso a novos formatos, sistemas e tendências em stands modulares.",
    },
  ];

  return (
    <section id="certification" className="py-16 md:py-24 relative">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white text-center mb-12">
          O que você ganha ao se certificar com a{" "}
          <span className="text-red-500">
            Smart Signage
          </span>
        </h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {benefits.map((benefit, index) => (
            <div
              key={index}
              className="group relative p-6 rounded-2xl bg-gradient-to-br from-[#0a0a2e]/80 to-[#15153e]/60 border border-red-500/30 hover:border-red-400/50 transition-all duration-300 hover:shadow-[0_0_40px_rgba(220,38,38,0.25)]"
            >
              {/* Glow effect */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-red-600/0 to-red-800/0 group-hover:from-red-600/10 group-hover:to-red-800/10 transition-all duration-300" />

              <div className="relative z-10">
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-red-600 to-red-800 flex items-center justify-center mb-4 shadow-[0_0_20px_rgba(220,38,38,0.4)]">
                  <benefit.icon className="h-7 w-7 text-white" />
                </div>

                <h3 className="text-xl font-semibold text-white mb-2">
                  {benefit.title}
                </h3>

                <p className="text-gray-400">
                  {benefit.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrainingCertification;
