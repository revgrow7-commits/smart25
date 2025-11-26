import { Card } from "@/components/ui/card";
import { Star } from "lucide-react";

const Testimonials = () => {
  const testimonials = [
    {
      name: "Marcos Silva",
      role: "Gerente de Marketing | LG Electronics",
      text: "Reduzimos 60% do tempo de montagem e os custos caíram drasticamente após o terceiro evento. A qualidade visual é incomparável.",
      rating: 5
    },
    {
      name: "Ana Paula Costa",
      role: "Coordenadora de Eventos | Colgate-Palmolive",
      text: "A flexibilidade de reconfigurar o stand para cada feira diferente transformou nossa operação. Sustentável e econômico.",
      rating: 5
    },
    {
      name: "Ricardo Mendes",
      role: "Diretor Comercial | Oral-B",
      text: "Investimento inicial maior, mas ROI positivo já no segundo evento. A durabilidade e reusabilidade são excepcionais.",
      rating: 5
    }
  ];

  return (
    <section className="py-20 bg-card">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Cases de <span className="gradient-text">Sucesso</span>
          </h2>
          <p className="text-xl text-muted-foreground">
            O que nossos clientes dizem sobre Smart Signage
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <Card 
              key={index}
              className="p-8 bg-background border-border hover:border-primary/50 transition-all duration-500 hover-lift"
            >
              <div className="flex gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 fill-primary text-primary" />
                ))}
              </div>
              <p className="text-muted-foreground mb-6 italic">
                "{testimonial.text}"
              </p>
              <div className="border-t border-border pt-4">
                <p className="font-bold">{testimonial.name}</p>
                <p className="text-sm text-muted-foreground">{testimonial.role}</p>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
