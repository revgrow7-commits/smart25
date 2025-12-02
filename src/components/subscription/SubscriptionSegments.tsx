import { Calendar, Building, ShoppingBag, Briefcase, GraduationCap } from "lucide-react";

const segments = [
  {
    icon: Calendar,
    title: "Agências de Eventos",
    description: "Solução completa para múltiplos clientes e eventos simultâneos."
  },
  {
    icon: Building,
    title: "Organizadores de Feiras",
    description: "Estruturas padronizadas ou personalizadas para expositores."
  },
  {
    icon: ShoppingBag,
    title: "Varejo & Trade Marketing",
    description: "PDV, ativações e campanhas promocionais com agilidade."
  },
  {
    icon: Briefcase,
    title: "Corporações",
    description: "Presença institucional consistente em eventos nacionais."
  },
  {
    icon: GraduationCap,
    title: "Educação & Produtoras",
    description: "Cenários, backdrops e estruturas para produções audiovisuais."
  }
];

const SubscriptionSegments = () => {
  return (
    <section className="py-20 md:py-32 bg-gradient-to-b from-[#0a0a2e] to-[#0d0d3a] relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute top-1/4 right-0 w-80 h-80 bg-red-600/10 rounded-full blur-[120px]" />
      <div className="absolute bottom-1/4 left-0 w-80 h-80 bg-cyan-600/10 rounded-full blur-[120px]" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
            Para quem é o <span className="bg-gradient-to-r from-red-400 to-cyan-400 bg-clip-text text-transparent">Smart Club</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Soluções personalizadas para cada segmento do mercado.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
          {segments.map((segment, index) => (
            <div 
              key={index}
              className="group relative p-6 rounded-2xl bg-gradient-to-br from-red-900/20 to-cyan-900/20 border border-red-500/20 hover:border-red-400/40 transition-all duration-500 hover:shadow-[0_0_30px_rgba(220,38,38,0.2)] text-center"
            >
              {/* Glowing background on hover */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-red-500/0 to-cyan-500/0 group-hover:from-red-500/10 group-hover:to-cyan-500/10 transition-all duration-500" />
              
              {/* Icon */}
              <div className="relative w-16 h-16 mx-auto rounded-2xl bg-gradient-to-br from-red-600/40 to-cyan-600/40 border border-red-500/30 flex items-center justify-center mb-4 group-hover:shadow-[0_0_25px_rgba(220,38,38,0.4)] transition-all duration-300">
                <segment.icon className="w-8 h-8 text-red-300 group-hover:text-red-200 transition-colors" />
              </div>
              
              {/* Content */}
              <h3 className="relative text-lg font-semibold text-white mb-2 group-hover:text-red-100 transition-colors">
                {segment.title}
              </h3>
              <p className="relative text-gray-400 text-sm group-hover:text-gray-300 transition-colors">
                {segment.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SubscriptionSegments;
