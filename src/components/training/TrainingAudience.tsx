import { Wrench, Users, Palette, Factory, Briefcase } from "lucide-react";

const TrainingAudience = () => {
  const audiences = [
    { icon: Wrench, text: "Montadores de stands e equipes de montagem" },
    { icon: Users, text: "Agências de eventos e live marketing" },
    { icon: Palette, text: "Empresas de comunicação visual" },
    { icon: Factory, text: "Fabricantes e fornecedores de estruturas para feiras" },
    { icon: Briefcase, text: "Gestores de marketing e eventos de empresas B2B" },
  ];

  return (
    <section id="audience" className="py-16 md:py-24 relative bg-[#050515]/50">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-6">
            Para quem criamos a{" "}
            <span className="text-red-500">
              Escola de Treinamento Smart Signage?
            </span>
          </h2>

          <p className="text-gray-300 text-lg mb-12">
            Esta escola foi pensada para profissionais que querem se diferenciar no mercado e oferecer soluções modernas em stands modulares.
          </p>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {audiences.map((audience, index) => (
              <div
                key={index}
                className="flex items-center gap-4 p-5 rounded-xl bg-gradient-to-br from-[#0a0a2e]/80 to-[#15153e]/60 border border-red-500/20 hover:border-red-500/40 hover:shadow-[0_0_20px_rgba(220,38,38,0.2)] transition-all duration-300"
              >
                <div className="p-3 rounded-xl bg-red-500/20 border border-red-500/30">
                  <audience.icon className="h-6 w-6 text-red-400" />
                </div>
                <span className="text-gray-300 text-left">{audience.text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrainingAudience;
