import { Box, Calendar, Printer, Truck } from "lucide-react";

const steps = [
  {
    icon: Box,
    title: "Escolha o Kit Modular",
    description: "Selecione o tamanho e configuração ideal para suas necessidades."
  },
  {
    icon: Calendar,
    title: "Defina a Frequência",
    description: "Determine quantos eventos por mês ou ano você participará."
  },
  {
    icon: Printer,
    title: "Escolha a Franquia de m²",
    description: "Defina a área de impressão mensal que melhor atende sua demanda."
  },
  {
    icon: Truck,
    title: "Receba Automaticamente",
    description: "Estrutura, skins e suporte técnico entregues onde você precisar."
  }
];

const SubscriptionTimeline = () => {
  return (
    <section className="py-20 md:py-32 bg-gradient-to-b from-[#0a0015] to-[#0d001a] relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-fuchsia-600/10 rounded-full blur-[150px]" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-600/10 rounded-full blur-[150px]" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
            Como <span className="bg-gradient-to-r from-purple-400 to-fuchsia-400 bg-clip-text text-transparent">Funciona</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Em 4 passos simples, você terá seu stand pronto para qualquer evento.
          </p>
        </div>

        {/* Timeline - Desktop */}
        <div className="hidden lg:block relative">
          {/* Connecting line */}
          <div className="absolute top-1/2 left-0 right-0 h-1 bg-gradient-to-r from-purple-600/50 via-fuchsia-500/50 to-purple-600/50 -translate-y-1/2" />
          <div className="absolute top-1/2 left-0 right-0 h-1 bg-gradient-to-r from-purple-400 via-fuchsia-400 to-purple-400 -translate-y-1/2 blur-sm" />
          
          <div className="grid grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <div key={index} className="relative flex flex-col items-center">
                {/* Neon marker */}
                <div className="relative z-10 w-20 h-20 rounded-full bg-gradient-to-br from-purple-600 to-fuchsia-600 flex items-center justify-center shadow-[0_0_30px_rgba(147,51,234,0.5)] mb-6">
                  <div className="absolute inset-1 rounded-full bg-[#0d001a] flex items-center justify-center">
                    <step.icon className="w-8 h-8 text-purple-300" />
                  </div>
                  {/* Step number */}
                  <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-fuchsia-500 flex items-center justify-center text-white font-bold text-sm shadow-[0_0_15px_rgba(217,70,239,0.5)]">
                    {index + 1}
                  </div>
                </div>
                
                {/* Content */}
                <h3 className="text-xl font-semibold text-white mb-2 text-center">
                  {step.title}
                </h3>
                <p className="text-gray-400 text-center text-sm">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Timeline - Mobile */}
        <div className="lg:hidden relative">
          {/* Connecting line */}
          <div className="absolute left-10 top-0 bottom-0 w-1 bg-gradient-to-b from-purple-600/50 via-fuchsia-500/50 to-purple-600/50" />
          <div className="absolute left-10 top-0 bottom-0 w-1 bg-gradient-to-b from-purple-400 via-fuchsia-400 to-purple-400 blur-sm" />
          
          <div className="space-y-8">
            {steps.map((step, index) => (
              <div key={index} className="relative flex items-start gap-6 pl-4">
                {/* Neon marker */}
                <div className="relative z-10 flex-shrink-0 w-14 h-14 rounded-full bg-gradient-to-br from-purple-600 to-fuchsia-600 flex items-center justify-center shadow-[0_0_20px_rgba(147,51,234,0.5)]">
                  <div className="absolute inset-1 rounded-full bg-[#0d001a] flex items-center justify-center">
                    <step.icon className="w-6 h-6 text-purple-300" />
                  </div>
                  {/* Step number */}
                  <div className="absolute -top-1 -right-1 w-6 h-6 rounded-full bg-fuchsia-500 flex items-center justify-center text-white font-bold text-xs shadow-[0_0_10px_rgba(217,70,239,0.5)]">
                    {index + 1}
                  </div>
                </div>
                
                {/* Content */}
                <div className="pt-2">
                  <h3 className="text-lg font-semibold text-white mb-1">
                    {step.title}
                  </h3>
                  <p className="text-gray-400 text-sm">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default SubscriptionTimeline;
