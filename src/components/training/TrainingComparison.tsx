import { Check, X } from "lucide-react";

const TrainingComparison = () => {
  const comparisons = [
    {
      aspect: "Tempo de montagem",
      modular: "15 minutos a poucas horas",
      madeira: "1 a 3 dias de montagem",
    },
    {
      aspect: "Equipe necessária",
      modular: "1–3 pessoas",
      madeira: "5–15 pessoas",
    },
    {
      aspect: "Reaproveitamento",
      modular: "Alto, estruturas reutilizáveis",
      madeira: "Baixo, muitas vezes descartado",
    },
    {
      aspect: "Logística",
      modular: "Leve e compacta",
      madeira: "Pesada e volumosa",
    },
    {
      aspect: "Sustentabilidade",
      modular: "Menos resíduos, mais reaproveitamento",
      madeira: "Desperdício de material e resíduos",
    },
  ];

  return (
    <section id="comparison" className="py-16 md:py-24 relative">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white text-center mb-6">
            Stands modulares vs stands de madeira:{" "}
            <span className="text-red-500">
              qual compensa mais?
            </span>
          </h2>

          <p className="text-gray-300 text-center text-lg mb-12">
            Se você ou seus clientes participam de várias feiras por ano, entender a diferença entre stands modulares e stands de madeira é fundamental para decidir o que faz mais sentido em custo, logística e imagem.
          </p>

          {/* Comparison Table */}
          <div className="rounded-2xl overflow-hidden border border-red-500/30 bg-[#0a0a2e]/50">
            {/* Header */}
            <div className="grid grid-cols-3 bg-gradient-to-r from-[#0a0a2e] to-[#15153e]">
              <div className="p-4 text-gray-400 text-sm font-medium">Aspecto</div>
              <div className="p-4 text-center">
                <span className="inline-flex items-center gap-2 text-green-400 font-semibold">
                  <Check className="h-5 w-5" />
                  Modulares
                </span>
              </div>
              <div className="p-4 text-center">
                <span className="inline-flex items-center gap-2 text-red-400 font-semibold">
                  <X className="h-5 w-5" />
                  Madeira
                </span>
              </div>
            </div>

            {/* Rows */}
            {comparisons.map((row, index) => (
              <div
                key={index}
                className={`grid grid-cols-3 ${
                  index % 2 === 0 ? "bg-[#0a0a2e]/30" : "bg-transparent"
                } border-t border-red-500/20`}
              >
                <div className="p-4 text-gray-300 font-medium text-sm">
                  {row.aspect}
                </div>
                <div className="p-4 text-center text-green-300 text-sm">
                  {row.modular}
                </div>
                <div className="p-4 text-center text-red-300 text-sm">
                  {row.madeira}
                </div>
              </div>
            ))}
          </div>

          <p className="text-gray-400 text-center mt-8 text-lg">
            Para empresas que participam de várias feiras ao longo do ano, os{" "}
            <span className="text-red-400 font-medium">stands modulares</span> quase sempre oferecem o melhor custo-benefício, principalmente quando há reaproveitamento da estrutura.
          </p>
        </div>
      </div>
    </section>
  );
};

export default TrainingComparison;
