import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    name: "Marina Silva",
    role: "Diretora de Marketing",
    company: "EventosPro",
    content: "O clube de assinatura revolucionou nossa operação. Não precisamos mais nos preocupar com logística de stands - tudo chega pronto e no prazo.",
    rating: 5
  },
  {
    name: "Ricardo Mendes",
    role: "CEO",
    company: "Trade Solutions",
    content: "Os descontos progressivos fizeram total diferença no nosso orçamento anual. Participamos de 15 feiras por ano e a economia foi significativa.",
    rating: 5
  },
  {
    name: "Carla Oliveira",
    role: "Gerente de Eventos",
    company: "Expo Center Brasil",
    content: "A flexibilidade de trocar apenas as skins é genial. Mesma estrutura, identidades visuais diferentes para cada cliente. Sustentável e econômico.",
    rating: 5
  }
];

const SubscriptionTestimonials = () => {
  return (
    <section className="py-20 md:py-32 bg-gradient-to-b from-[#0d001a] to-[#1a0030] relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple-600/10 rounded-full blur-[150px]" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
            O que dizem nossos <span className="bg-gradient-to-r from-purple-400 to-fuchsia-400 bg-clip-text text-transparent">assinantes</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Empresas que transformaram sua presença em eventos com o Smart Club.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div 
              key={index}
              className="relative p-8 rounded-2xl bg-white/5 backdrop-blur-sm border border-purple-500/20 hover:border-purple-400/30 transition-all duration-500"
            >
              {/* Quote icon */}
              <div className="absolute -top-4 -left-2 w-12 h-12 rounded-full bg-gradient-to-br from-purple-600/30 to-fuchsia-600/30 flex items-center justify-center">
                <Quote className="w-5 h-5 text-purple-400" />
              </div>
              
              {/* Rating */}
              <div className="flex gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-fuchsia-400 text-fuchsia-400" />
                ))}
              </div>
              
              {/* Content */}
              <p className="text-gray-300 mb-6 leading-relaxed">
                "{testimonial.content}"
              </p>
              
              {/* Author */}
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-fuchsia-500 flex items-center justify-center text-white font-bold">
                  {testimonial.name.charAt(0)}
                </div>
                <div>
                  <p className="text-white font-semibold">{testimonial.name}</p>
                  <p className="text-purple-300 text-sm">{testimonial.role}, {testimonial.company}</p>
                </div>
              </div>

              {/* Subtle neon accent */}
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1/2 h-px bg-gradient-to-r from-transparent via-purple-500/50 to-transparent" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SubscriptionTestimonials;
