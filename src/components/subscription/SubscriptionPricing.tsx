import { Button } from "@/components/ui/button";
import { Check, Star, Zap, Building2, Globe } from "lucide-react";

const plans = [
  {
    name: "Smart Start",
    icon: Zap,
    area: "9–12 m²",
    price: "Sob consulta",
    description: "Ideal para pequenos eventos e estandes compactos",
    features: [
      "Kit modular básico",
      "1 skin inclusa/mês",
      "Suporte por email",
      "Entrega em 48h úteis",
      "Desconto Bronze (5%)"
    ],
    popular: false,
    cta: "Começar Agora"
  },
  {
    name: "Smart Business",
    icon: Star,
    area: "18–20 m²",
    price: "Sob consulta",
    description: "Para empresas que participam regularmente de feiras",
    features: [
      "Kit modular completo",
      "2 skins inclusas/mês",
      "Suporte prioritário",
      "Entrega em 24h úteis",
      "Desconto Silver (10%)",
      "Treinamento Smart Academy"
    ],
    popular: true,
    cta: "Escolher Plano"
  },
  {
    name: "Smart Experience",
    icon: Building2,
    area: "36 m²",
    price: "Sob consulta",
    description: "Experiência premium para grandes eventos",
    features: [
      "Kit modular premium",
      "4 skins inclusas/mês",
      "Suporte 24/7",
      "Entrega expressa",
      "Desconto Gold (15%)",
      "Treinamento completo",
      "Consultoria de design"
    ],
    popular: false,
    cta: "Falar com Consultor"
  },
  {
    name: "Smart Corporate",
    icon: Globe,
    area: "Multi-eventos",
    price: "Personalizado",
    description: "Solução corporativa para múltiplas cidades",
    features: [
      "Kits ilimitados",
      "Skins ilimitadas",
      "Gerente de conta dedicado",
      "Logística nacional",
      "Desconto Platinum (20%)",
      "Treinamento in-company",
      "Dashboard de gestão",
      "SLA garantido"
    ],
    popular: false,
    cta: "Solicitar Proposta"
  }
];

const SubscriptionPricing = () => {
  return (
    <section className="py-20 md:py-32 bg-gradient-to-b from-[#0d0d3a] to-[#0a0a2e] relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-red-600/5 rounded-full blur-[200px]" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
            Escolha seu <span className="bg-gradient-to-r from-red-400 to-cyan-400 bg-clip-text text-transparent">Plano</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Planos flexíveis que crescem com o seu negócio.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
          {plans.map((plan, index) => (
            <div 
              key={index}
              className={`relative flex flex-col p-6 rounded-2xl backdrop-blur-sm transition-all duration-500 hover:scale-[1.02] ${
                plan.popular 
                  ? 'bg-gradient-to-br from-red-900/40 to-cyan-900/40 border-2 border-red-400/50 shadow-[0_0_40px_rgba(220,38,38,0.3)]' 
                  : 'bg-white/5 border border-red-500/20 hover:border-red-400/40'
              }`}
            >
              {/* Popular badge */}
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-gradient-to-r from-red-500 to-cyan-500 text-white text-sm font-medium shadow-[0_0_20px_rgba(220,38,38,0.5)]">
                  Mais Popular
                </div>
              )}

              {/* Header */}
              <div className="flex items-center gap-3 mb-4">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                  plan.popular 
                    ? 'bg-gradient-to-br from-red-500 to-cyan-500 shadow-[0_0_20px_rgba(220,38,38,0.4)]' 
                    : 'bg-red-600/30 border border-red-500/30'
                }`}>
                  <plan.icon className={`w-6 h-6 ${plan.popular ? 'text-white' : 'text-red-300'}`} />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white">{plan.name}</h3>
                  <p className="text-cyan-300 text-sm">{plan.area}</p>
                </div>
              </div>

              {/* Price */}
              <div className="mb-4">
                <p className="text-2xl font-bold text-white">{plan.price}</p>
                <p className="text-gray-400 text-sm">{plan.description}</p>
              </div>

              {/* Features */}
              <ul className="space-y-3 mb-6 flex-grow">
                {plan.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-start gap-2">
                    <Check className={`w-5 h-5 flex-shrink-0 mt-0.5 ${plan.popular ? 'text-cyan-400' : 'text-red-400'}`} />
                    <span className="text-gray-300 text-sm">{feature}</span>
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <Button 
                className={`w-full py-6 rounded-xl font-semibold transition-all duration-300 ${
                  plan.popular 
                    ? 'bg-gradient-to-r from-red-500 to-cyan-500 hover:from-red-400 hover:to-cyan-400 text-white shadow-[0_0_20px_rgba(220,38,38,0.4)] hover:shadow-[0_0_30px_rgba(220,38,38,0.6)]' 
                    : 'bg-red-600/20 hover:bg-red-600/30 text-red-200 border border-red-500/30 hover:border-red-400/50'
                }`}
              >
                {plan.cta}
              </Button>
            </div>
          ))}
        </div>

        {/* Frequency options note */}
        <p className="text-center text-gray-500 mt-8 text-sm">
          * Todos os planos oferecem opções de frequência mensal, trimestral, semestral ou anual.
        </p>
      </div>
    </section>
  );
};

export default SubscriptionPricing;
