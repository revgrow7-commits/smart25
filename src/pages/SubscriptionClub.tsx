import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Crown, Check, Star, Zap, Gift, Users } from "lucide-react";

const SubscriptionClub = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 bg-gradient-to-br from-primary/10 via-background to-accent/10">
        <div className="container mx-auto text-center">
          <Badge className="mb-4 bg-primary/20 text-primary border-primary/30">
            <Crown className="w-4 h-4 mr-2" />
            Clube Exclusivo
          </Badge>
          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary via-primary/80 to-accent bg-clip-text text-transparent">
            Clube de Assinatura
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
            Faça parte do nosso clube exclusivo e tenha acesso a benefícios únicos, 
            descontos especiais e muito mais.
          </p>
          <Button size="lg" className="btn-primary">
            <Star className="w-5 h-5 mr-2" />
            Quero Ser Membro
          </Button>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">
            Benefícios Exclusivos
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: Zap,
                title: "Descontos Progressivos",
                description: "Quanto mais você utiliza, maior o desconto. Benefícios que crescem com sua parceria."
              },
              {
                icon: Gift,
                title: "Programe sua Demanda",
                description: "Planeje suas necessidades com antecedência e garanta disponibilidade e melhores condições."
              },
              {
                icon: Star,
                title: "Impressão por m²",
                description: "Modelo de precificação transparente por metro quadrado, sem surpresas no orçamento."
              },
              {
                icon: Users,
                title: "Reuso de Estruturas",
                description: "Reutilize estruturas existentes com novas artes, economia inteligente e sustentável."
              }
            ].map((benefit, index) => (
              <Card key={index} className="border-border/50 hover:border-primary/50 transition-all duration-300 hover:shadow-lg">
                <CardHeader>
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                    <benefit.icon className="w-6 h-6 text-primary" />
                  </div>
                  <CardTitle className="text-xl">{benefit.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">
                    {benefit.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Plans Placeholder */}
      <section className="py-20 px-4 bg-muted/30">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-4">
            Escolha Seu Plano
          </h2>
          <p className="text-muted-foreground text-center mb-12 max-w-2xl mx-auto">
            Selecione o plano que melhor se adapta às suas necessidades.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {/* Plans will be added here based on user instructions */}
            <Card className="border-border/50">
              <CardHeader className="text-center">
                <CardTitle>Plano Básico</CardTitle>
                <div className="text-3xl font-bold mt-2">R$ --<span className="text-base font-normal text-muted-foreground">/mês</span></div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  <li className="flex items-center gap-2">
                    <Check className="w-5 h-5 text-primary" />
                    <span className="text-muted-foreground">Benefício 1</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-5 h-5 text-primary" />
                    <span className="text-muted-foreground">Benefício 2</span>
                  </li>
                </ul>
                <Button className="w-full mt-6" variant="outline">
                  Escolher Plano
                </Button>
              </CardContent>
            </Card>

            <Card className="border-primary shadow-lg shadow-primary/10 relative">
              <Badge className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary">
                Mais Popular
              </Badge>
              <CardHeader className="text-center">
                <CardTitle>Plano Premium</CardTitle>
                <div className="text-3xl font-bold mt-2">R$ --<span className="text-base font-normal text-muted-foreground">/mês</span></div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  <li className="flex items-center gap-2">
                    <Check className="w-5 h-5 text-primary" />
                    <span className="text-muted-foreground">Benefício 1</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-5 h-5 text-primary" />
                    <span className="text-muted-foreground">Benefício 2</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-5 h-5 text-primary" />
                    <span className="text-muted-foreground">Benefício 3</span>
                  </li>
                </ul>
                <Button className="w-full mt-6 btn-primary">
                  Escolher Plano
                </Button>
              </CardContent>
            </Card>

            <Card className="border-border/50">
              <CardHeader className="text-center">
                <CardTitle>Plano Enterprise</CardTitle>
                <div className="text-3xl font-bold mt-2">R$ --<span className="text-base font-normal text-muted-foreground">/mês</span></div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  <li className="flex items-center gap-2">
                    <Check className="w-5 h-5 text-primary" />
                    <span className="text-muted-foreground">Benefício 1</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-5 h-5 text-primary" />
                    <span className="text-muted-foreground">Benefício 2</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-5 h-5 text-primary" />
                    <span className="text-muted-foreground">Benefício 3</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-5 h-5 text-primary" />
                    <span className="text-muted-foreground">Benefício 4</span>
                  </li>
                </ul>
                <Button className="w-full mt-6" variant="outline">
                  Escolher Plano
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">
            Pronto para Começar?
          </h2>
          <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
            Junte-se a milhares de membros satisfeitos e comece a aproveitar todos os benefícios exclusivos.
          </p>
          <Button size="lg" className="btn-primary">
            <Crown className="w-5 h-5 mr-2" />
            Assinar Agora
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 border-t border-border">
        <div className="container mx-auto text-center text-muted-foreground">
          <p>© {new Date().getFullYear()} Smart Signage. Todos os direitos reservados.</p>
        </div>
      </footer>
    </div>
  );
};

export default SubscriptionClub;
