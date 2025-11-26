import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Send, Mail, Phone } from "lucide-react";

const ContactForm = () => {
  return (
    <section id="contato" className="py-20 bg-gradient-to-b from-card to-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Pronto para <span className="gradient-text">Revolucionar</span> Seus Eventos?
          </h2>
          <p className="text-xl text-muted-foreground">
            Solicite um diagnóstico gratuito e descubra como podemos ajudar
          </p>
        </div>

        <Card className="max-w-2xl mx-auto p-8 bg-card border-border">
          <form className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold mb-2">
                  Nome Completo *
                </label>
                <Input 
                  placeholder="Seu nome" 
                  className="bg-background border-border"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-2">
                  Empresa *
                </label>
                <Input 
                  placeholder="Nome da empresa" 
                  className="bg-background border-border"
                  required
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold mb-2">
                  Email *
                </label>
                <Input 
                  type="email"
                  placeholder="seu@email.com" 
                  className="bg-background border-border"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-2">
                  Telefone *
                </label>
                <Input 
                  type="tel"
                  placeholder="(11) 99999-9999" 
                  className="bg-background border-border"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2">
                Descrição do Projeto *
              </label>
              <Textarea 
                placeholder="Conte-nos sobre seu projeto, objetivos e necessidades..."
                className="min-h-32 bg-background border-border resize-none"
                required
              />
              <p className="text-xs text-muted-foreground mt-2">
                0/1000 caracteres
              </p>
            </div>

            <Button type="submit" className="w-full btn-primary text-lg py-6">
              <Send className="mr-2 h-5 w-5" />
              Solicitar Diagnóstico Gratuito
            </Button>
          </form>
        </Card>

        {/* Contact Info */}
        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mt-12 text-muted-foreground">
          <a href="mailto:contato@industriavisual.com.br" className="flex items-center gap-2 hover:text-primary transition-colors">
            <Mail className="h-5 w-5" />
            contato@industriavisual.com.br
          </a>
          <a href="tel:+5511999999999" className="flex items-center gap-2 hover:text-primary transition-colors">
            <Phone className="h-5 w-5" />
            (11) 99999-9999
          </a>
        </div>
      </div>
    </section>
  );
};

export default ContactForm;
