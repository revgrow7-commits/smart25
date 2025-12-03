import { Box, Calendar, Printer, Layers, TrendingUp, GraduationCap, Package, Truck } from "lucide-react";

const benefits = [
  {
    icon: Package,
    title: "Aluguel de Estruturas",
    description: "Alugue estruturas modulares premium com até 40% de desconto exclusivo para assinantes."
  },
  {
    icon: Box,
    title: "Kit Modular Inteligente",
    description: "Estruturas modulares que se adaptam a qualquer tamanho de evento e espaço disponível."
  },
  {
    icon: Truck,
    title: "Logística Completa",
    description: "Entrega, montagem e desmontagem inclusos para assinantes em todo o Brasil."
  },
  {
    icon: Calendar,
    title: "Frequência Flexível por Evento",
    description: "Defina a frequência de envio conforme seu calendário de eventos e necessidades."
  },
  {
    icon: Printer,
    title: "Impressão Sob Demanda (m²)",
    description: "Pague apenas pela área impressa que você realmente utiliza, sem desperdício."
  },
  {
    icon: Layers,
    title: "Reposição apenas da Skin",
    description: "Tecido tensionado substituível - reutilize a estrutura e renove apenas a arte."
  },
  {
    icon: TrendingUp,
    title: "Descontos Progressivos",
    description: "Quanto mais você usa, mais economiza. Tiers Bronze, Silver, Gold e Platinum."
  },
  {
    icon: GraduationCap,
    title: "Treinamento Incluso",
    description: "Acesso completo à Smart Academy com treinamentos de montagem e boas práticas."
  }
];

const SubscriptionBenefits = () => {
  return (
    <section className="py-20 md:py-32 bg-gradient-to-b from-[#0d0d3a] to-[#0a0a2e] relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-red-600/10 rounded-full blur-[150px]" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
            Benefícios <span className="bg-gradient-to-r from-red-400 to-cyan-400 bg-clip-text text-transparent">Exclusivos</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Tudo que você precisa para participar de eventos com excelência, sem complicação.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {benefits.map((benefit, index) => (
            <div 
              key={index}
              className="group relative p-6 rounded-2xl bg-white/5 backdrop-blur-sm border border-red-500/20 hover:border-red-400/40 transition-all duration-500 hover:shadow-[0_0_40px_rgba(220,38,38,0.15)]"
            >
              {/* Glassmorphism effect */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-red-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              {/* Icon */}
              <div className="relative w-14 h-14 rounded-xl bg-gradient-to-br from-red-600/30 to-cyan-600/30 border border-red-500/30 flex items-center justify-center mb-4 group-hover:shadow-[0_0_20px_rgba(220,38,38,0.3)] transition-all duration-300">
                <benefit.icon className="w-7 h-7 text-red-300 group-hover:text-red-200 transition-colors" />
              </div>
              
              {/* Content */}
              <h3 className="relative text-xl font-semibold text-white mb-2 group-hover:text-red-100 transition-colors">
                {benefit.title}
              </h3>
              <p className="relative text-gray-400 group-hover:text-gray-300 transition-colors">
                {benefit.description}
              </p>

              {/* Neon glow on hover */}
              <div className="absolute -inset-px rounded-2xl bg-gradient-to-r from-red-500/0 via-red-500/0 to-cyan-500/0 group-hover:from-red-500/20 group-hover:via-red-500/10 group-hover:to-cyan-500/20 transition-all duration-500 -z-10 blur-sm" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SubscriptionBenefits;
