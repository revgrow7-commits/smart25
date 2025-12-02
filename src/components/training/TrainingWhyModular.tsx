import { Zap, Users, Recycle, Truck, Leaf } from "lucide-react";

const TrainingWhyModular = () => {
  const benefits = [
    { icon: Zap, text: "Montagens até 5x mais rápidas em comparação com madeira" },
    { icon: Users, text: "Menos mão de obra e menos retrabalho" },
    { icon: Recycle, text: "Estruturas reutilizáveis em várias feiras" },
    { icon: Truck, text: "Logística leve (menos volume, menos peso)" },
    { icon: Leaf, text: "Sistema mais sustentável e alinhado às novas exigências do mercado" },
  ];

  return (
    <section id="why-modular" className="py-16 md:py-24 relative">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white text-center mb-6">
            Por que os stands modulares estão dominando o mercado de{" "}
            <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              feiras e eventos?
            </span>
          </h2>

          <p className="text-gray-300 text-center text-lg mb-8 leading-relaxed">
            Empresas que participam de várias feiras por ano estão migrando dos stands de madeira para os stands modulares. O motivo é simples: menos custo, menos dor de cabeça logística e muito mais reaproveitamento. Isso abre uma oportunidade enorme para montadores, agências e equipes de eventos que dominam esses sistemas.
          </p>

          <h3 className="text-xl font-semibold text-purple-400 text-center mb-8">
            Com stands modulares, você ganha:
          </h3>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {benefits.map((benefit, index) => (
              <div
                key={index}
                className="flex items-start gap-4 p-4 rounded-xl bg-purple-900/20 border border-purple-500/20 hover:border-purple-500/40 transition-colors"
              >
                <div className="p-3 rounded-lg bg-gradient-to-br from-purple-600/30 to-pink-600/30 border border-purple-500/30 shrink-0">
                  <benefit.icon className="h-6 w-6 text-purple-400" />
                </div>
                <p className="text-gray-300">{benefit.text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrainingWhyModular;
