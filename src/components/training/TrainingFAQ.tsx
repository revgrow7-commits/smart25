import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const TrainingFAQ = () => {
  const faqs = [
    {
      question: "Quanto tempo dura o treinamento?",
      answer: "O conteúdo é online e flexível. A maioria dos alunos conclui o treinamento em 2 a 5 dias, dependendo do ritmo.",
    },
    {
      question: "Vou receber certificado?",
      answer: "Sim. Ao concluir o treinamento, você recebe um certificado digital oficial da Smart Signage.",
    },
    {
      question: "Preciso já trabalhar com stands modulares para participar?",
      answer: "Não. O treinamento é ideal tanto para quem está começando quanto para quem já monta stands de madeira e quer migrar para modulares.",
    },
    {
      question: "Quanto custa a Escola de Treinamento?",
      answer: "A proposta atual é oferecer o conteúdo de base gratuitamente, para formar um ecossistema forte de montadores e parceiros em stands modulares.",
    },
  ];

  return (
    <section className="py-16 md:py-24 relative">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white text-center mb-12">
          Perguntas frequentes sobre a{" "}
          <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            Escola de Treinamento
          </span>
        </h2>

        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="border border-purple-500/20 rounded-xl bg-purple-900/20 px-6 data-[state=open]:border-purple-500/40"
              >
                <AccordionTrigger className="text-white hover:text-purple-300 text-left py-5">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-gray-400 pb-5">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
};

export default TrainingFAQ;
