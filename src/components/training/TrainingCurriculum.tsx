import { BookOpen, Wrench, ClipboardList, TrendingUp, Boxes } from "lucide-react";

const TrainingCurriculum = () => {
  const modules = [
    {
      icon: BookOpen,
      title: "Módulo 1 — Introdução aos Stands Modulares",
      topics: [
        "O que são stands modulares",
        "Tipos de sistemas (tubulares, tensionados, SEG, lightboxes)",
        "Quando usar cada tipo em feiras e eventos",
      ],
    },
    {
      icon: Wrench,
      title: "Módulo 2 — Montagem e Desmontagem na Prática",
      topics: [
        "Encaixes, tubos, zíper e tecido tensionado",
        "Como montar um stand modular completo em poucos minutos",
        "Boas práticas para evitar erros na montagem",
      ],
    },
    {
      icon: ClipboardList,
      title: "Módulo 3 — Checklist Profissional de Feira",
      topics: [
        "Organização das peças por código",
        "Checklist de montagem e desmontagem",
        "Transporte, embalagem e armazenamento",
      ],
    },
    {
      icon: TrendingUp,
      title: "Módulo 4 — Como vender stands modulares",
      topics: [
        "Como explicar o valor do modular vs madeira",
        "Como estruturar propostas comerciais",
        "Como trabalhar com reaproveitamento para aumentar a margem",
      ],
    },
    {
      icon: Boxes,
      title: "Módulo 5 — Kits Reutilizáveis e Escaláveis",
      topics: [
        "Como criar kits que atendem várias feiras",
        "Como usar os mesmos módulos em layouts diferentes",
        "Como se posicionar como especialista em stands modulares",
      ],
    },
  ];

  return (
    <section id="curriculum" className="py-16 md:py-24 relative bg-[#0d0520]/50">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white text-center mb-12">
          O que você vai aprender na{" "}
          <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            Escola de Treinamento Smart Signage
          </span>
        </h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {modules.map((module, index) => (
            <div
              key={index}
              className="group p-6 rounded-2xl bg-gradient-to-br from-purple-900/30 to-pink-900/20 border border-purple-500/20 hover:border-purple-500/40 transition-all duration-300 hover:shadow-[0_0_30px_rgba(139,92,246,0.2)]"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="p-3 rounded-xl bg-gradient-to-br from-purple-600 to-pink-600 shadow-[0_0_20px_rgba(139,92,246,0.3)]">
                  <module.icon className="h-6 w-6 text-white" />
                </div>
                <span className="text-xs font-medium text-purple-400 bg-purple-500/20 px-3 py-1 rounded-full">
                  Módulo {index + 1}
                </span>
              </div>

              <h3 className="text-lg font-semibold text-white mb-4 group-hover:text-purple-300 transition-colors">
                {module.title.replace(`Módulo ${index + 1} — `, "")}
              </h3>

              <ul className="space-y-2">
                {module.topics.map((topic, topicIndex) => (
                  <li key={topicIndex} className="flex items-start gap-2 text-gray-400 text-sm">
                    <span className="text-purple-400 mt-1">•</span>
                    {topic}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrainingCurriculum;
