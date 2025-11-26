import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const FAQ = () => {
  const faqs = [
    {
      question: "Quanto tempo leva a montagem de um stand modular?",
      answer: "A montagem é extremamente rápida graças ao sistema click-in. Um stand padrão de 9m² pode ser montado em menos de 1 hora por 2 pessoas, sem necessidade de ferramentas especiais."
    },
    {
      question: "Quantas vezes posso reutilizar as estruturas?",
      answer: "As estruturas Smart Signage são projetadas para durabilidade extrema. Podem ser reutilizadas em 10+ eventos sem perda de qualidade visual ou estrutural, mantendo o acabamento fotográfico profissional."
    },
    {
      question: "Como funciona o transporte e armazenamento?",
      answer: "Os módulos são compactados em cases de transporte especiais, reduzindo o volume em até 70%. Isso facilita o transporte, reduz custos de frete e permite armazenamento em espaços pequenos."
    },
    {
      question: "Posso adaptar o design entre eventos?",
      answer: "Sim! A modularidade permite reconfigurar completamente o layout. Você pode criar diferentes formações, adicionar ou remover módulos, e trocar os gráficos para cada evento específico."
    },
    {
      question: "Smart Signage aguenta eventos externos?",
      answer: "As estruturas são desenvolvidas em alumínio de alta resistência e tecido tensionado com tratamento UV. São adequadas para ambientes internos e externos cobertos, mas recomendamos proteção contra chuva direta."
    },
    {
      question: "Qual a qualidade de impressão comparada a lona ou adesivo?",
      answer: "Utilizamos impressão sublimática em tecido especial que oferece cores mais vibrantes, melhor resolução e acabamento premium. O resultado é superior a lona ou adesivo, com aspecto fotográfico profissional."
    },
    {
      question: "Preciso de equipe especializada para montar?",
      answer: "Não! O sistema é intuitivo e pode ser montado por qualquer pessoa após um treinamento rápido. Fornecemos manuais visuais e suporte por vídeo. Também oferecemos serviço de montagem opcional."
    },
    {
      question: "Smart Signage é mais caro que stands de madeira?",
      answer: "O investimento inicial pode ser 30% maior, mas o ROI positivo acontece já no 2º evento. Ao longo de 3 anos e 12 eventos, a economia chega a 70% comparado a stands tradicionais descartáveis."
    },
    {
      question: "Vocês fazem projetos sob medida?",
      answer: "Sim! Nossa equipe de designers desenvolve soluções personalizadas combinando diferentes módulos. Também criamos módulos especiais para necessidades específicas, mantendo a compatibilidade do sistema."
    },
    {
      question: "Como funciona a garantia?",
      answer: "Oferecemos 12 meses de garantia para defeitos de fabricação na estrutura de alumínio e 6 meses para os gráficos tensionados. Também fornecemos suporte técnico vitalício e reposição de peças."
    }
  ];

  return (
    <section id="faq" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Perguntas <span className="gradient-text">Frequentes</span>
          </h2>
          <p className="text-xl text-muted-foreground">
            Tire suas dúvidas sobre nossas soluções
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem 
                key={index} 
                value={`item-${index}`}
                className="border border-border rounded-lg px-6 bg-card hover:border-primary/50 transition-colors"
              >
                <AccordionTrigger className="text-left font-semibold hover:text-primary">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
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

export default FAQ;
