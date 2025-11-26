import { FileText, Pencil, Box, Truck, Wrench, Repeat } from "lucide-react";

const HowItWorks = () => {
  const steps = [
    {
      number: "01",
      icon: FileText,
      title: "Briefing",
      description: "Entendemos suas necessidades e objetivos"
    },
    {
      number: "02",
      icon: Pencil,
      title: "Design 3D",
      description: "Criamos visualização realista do projeto"
    },
    {
      number: "03",
      icon: Box,
      title: "Produção",
      description: "Fabricação com alta precisão e qualidade"
    },
    {
      number: "04",
      icon: Truck,
      title: "Entrega",
      description: "Logística em formato compacto"
    },
    {
      number: "05",
      icon: Wrench,
      title: "Montagem",
      description: "Setup rápido e sem ferramentas"
    },
    {
      number: "06",
      icon: Repeat,
      title: "Reuso",
      description: "Reconfigure para o próximo evento"
    }
  ];

  return (
    <section className="py-20 bg-card">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Como <span className="gradient-text">Funciona</span>
          </h2>
          <p className="text-xl text-muted-foreground">
            Do conceito à execução em 6 passos simples
          </p>
        </div>

        <div className="relative max-w-6xl mx-auto">
          {/* Timeline Line */}
          <div className="hidden md:block absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-primary via-secondary to-primary transform -translate-y-1/2"></div>

          {/* Steps */}
          <div className="grid grid-cols-1 md:grid-cols-6 gap-8 relative">
            {steps.map((step, index) => (
              <div key={index} className="relative">
                <div className="flex flex-col items-center text-center space-y-4">
                  {/* Circle with icon */}
                  <div className="relative">
                    <div className="w-20 h-20 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center z-10 relative shadow-[0_0_30px_rgba(236,72,153,0.3)]">
                      <step.icon className="h-8 w-8 text-white" />
                    </div>
                    <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-background border-2 border-primary flex items-center justify-center text-xs font-bold">
                      {step.number}
                    </div>
                  </div>

                  {/* Content */}
                  <div>
                    <h3 className="font-bold text-lg mb-2">{step.title}</h3>
                    <p className="text-sm text-muted-foreground">{step.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
