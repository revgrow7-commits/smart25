import { Quote } from "lucide-react";

const TrainingTestimonials = () => {
  const testimonials = [
    {
      quote: "Depois que aprendi a trabalhar com stands modulares, consegui atender mais eventos com a mesma equipe. A montagem ficou muito mais rápida e lucrativa.",
      author: "Montador",
      location: "São Paulo",
    },
    {
      quote: "Oferecer stands modulares para nossos clientes mudou o jogo. Hoje conseguimos reaproveitar estruturas e reduzir até 60% do custo em feiras recorrentes.",
      author: "Agência de eventos",
      location: "Curitiba",
    },
    {
      quote: "A certificação Smart Signage abriu portas que eu nem imaginava. Agora sou referência em montagem modular na minha região.",
      author: "Profissional de eventos",
      location: "Porto Alegre",
    },
  ];

  return (
    <section className="py-16 md:py-24 relative bg-[#050515]/50">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white text-center mb-12">
          O que outros profissionais estão{" "}
          <span className="text-red-500">
            dizendo
          </span>
        </h2>

        <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="relative p-6 rounded-2xl bg-gradient-to-br from-[#0a0a2e]/80 to-[#15153e]/60 border border-red-500/20"
            >
              <Quote className="h-10 w-10 text-red-500/30 mb-4" />

              <p className="text-gray-300 mb-6 leading-relaxed">
                "{testimonial.quote}"
              </p>

              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-red-600 to-red-800 flex items-center justify-center text-white font-semibold">
                  {testimonial.author[0]}
                </div>
                <div>
                  <p className="text-white font-medium">{testimonial.author}</p>
                  <p className="text-gray-500 text-sm">{testimonial.location}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrainingTestimonials;
