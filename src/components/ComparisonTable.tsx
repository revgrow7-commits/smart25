import { Card } from "@/components/ui/card";
import { Check, X } from "lucide-react";

const ComparisonTable = () => {
  const comparisons = [
    {
      criteria: "Montagem sem ferramentas",
      smartSignage: true,
      madeira: false,
      octanorm: false
    },
    {
      criteria: "Reuso ilimitado",
      smartSignage: true,
      madeira: false,
      octanorm: true
    },
    {
      criteria: "Transporte compacto",
      smartSignage: true,
      madeira: false,
      octanorm: false
    },
    {
      criteria: "Personalização total",
      smartSignage: true,
      madeira: true,
      octanorm: false
    },
    {
      criteria: "Setup < 1 hora",
      smartSignage: true,
      madeira: false,
      octanorm: false
    },
    {
      criteria: "Sem resíduos/descarte",
      smartSignage: true,
      madeira: false,
      octanorm: true
    },
    {
      criteria: "Acabamento fotográfico",
      smartSignage: true,
      madeira: false,
      octanorm: false
    },
    {
      criteria: "Custo/evento decrescente",
      smartSignage: true,
      madeira: false,
      octanorm: true
    }
  ];

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Smart Signage vs <span className="gradient-text">Soluções Tradicionais</span>
          </h2>
          <p className="text-xl text-muted-foreground">
            Veja porque empresas como LG, Oral-B e Colgate estão migrando para modular
          </p>
        </div>

        <Card className="max-w-5xl mx-auto overflow-hidden border-border">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left p-6 font-bold">Critério</th>
                  <th className="p-6 text-center">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-primary to-secondary">
                      <span className="font-bold text-white">Smart Signage</span>
                    </div>
                  </th>
                  <th className="p-6 text-center font-semibold text-muted-foreground">Madeira/MDF</th>
                  <th className="p-6 text-center font-semibold text-muted-foreground">Octanorm</th>
                </tr>
              </thead>
              <tbody>
                {comparisons.map((item, index) => (
                  <tr 
                    key={index}
                    className={`border-b border-border ${index % 2 === 0 ? 'bg-card/50' : ''}`}
                  >
                    <td className="p-6 font-medium">{item.criteria}</td>
                    <td className="p-6 text-center">
                      {item.smartSignage ? (
                        <div className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-primary/20">
                          <Check className="h-5 w-5 text-primary" />
                        </div>
                      ) : (
                        <div className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-muted">
                          <X className="h-5 w-5 text-muted-foreground" />
                        </div>
                      )}
                    </td>
                    <td className="p-6 text-center">
                      {item.madeira ? (
                        <div className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-muted">
                          <Check className="h-5 w-5 text-muted-foreground" />
                        </div>
                      ) : (
                        <div className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-muted">
                          <X className="h-5 w-5 text-muted-foreground" />
                        </div>
                      )}
                    </td>
                    <td className="p-6 text-center">
                      {item.octanorm ? (
                        <div className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-muted">
                          <Check className="h-5 w-5 text-muted-foreground" />
                        </div>
                      ) : (
                        <div className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-muted">
                          <X className="h-5 w-5 text-muted-foreground" />
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </div>
    </section>
  );
};

export default ComparisonTable;
