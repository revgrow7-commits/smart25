import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Send, Mail, Phone, MapPin, Clock, MessageCircle } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { z } from "zod";

const contactSchema = z.object({
  name: z.string().trim().min(1, "Nome é obrigatório").max(100, "Nome muito longo"),
  company: z.string().trim().min(1, "Empresa é obrigatória").max(100, "Nome da empresa muito longo"),
  email: z.string().trim().email("Email inválido").max(255, "Email muito longo"),
  phone: z.string().trim().min(10, "Telefone inválido").max(20, "Telefone muito longo"),
  message: z.string().trim().min(1, "Mensagem é obrigatória").max(1000, "Mensagem muito longa")
});

const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: "",
    company: "",
    email: "",
    phone: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const result = contactSchema.safeParse(formData);
    if (!result.success) {
      toast.error(result.error.errors[0].message);
      return;
    }

    setIsSubmitting(true);
    
    // Prepare WhatsApp message
    const whatsappMessage = `*Novo Contato - Smart Signage*%0A%0A*Nome:* ${encodeURIComponent(formData.name)}%0A*Empresa:* ${encodeURIComponent(formData.company)}%0A*Email:* ${encodeURIComponent(formData.email)}%0A*Telefone:* ${encodeURIComponent(formData.phone)}%0A%0A*Mensagem:*%0A${encodeURIComponent(formData.message)}`;
    
    window.open(`https://wa.me/5551936512200?text=${whatsappMessage}`, '_blank');
    
    toast.success("Redirecionando para WhatsApp...");
    setIsSubmitting(false);
    setFormData({ name: "", company: "", email: "", phone: "", message: "" });
  };

  return (
    <section id="contato" className="py-16 md:py-24 bg-gradient-to-b from-muted/30 to-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            Entre em <span className="text-primary">Contato</span>
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            Fale com nossa equipe especializada e transforme suas ideias em realidade
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Contact Form */}
          <Card className="p-6 md:p-8 bg-card border-border">
            <h3 className="text-xl font-semibold mb-6">Envie sua mensagem</h3>
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Nome *</label>
                  <Input 
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Seu nome completo"
                    className="bg-background border-border"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Empresa *</label>
                  <Input 
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    placeholder="Nome da empresa"
                    className="bg-background border-border"
                    required
                  />
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Email *</label>
                  <Input 
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="seu@email.com"
                    className="bg-background border-border"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Telefone *</label>
                  <Input 
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="(51) 99999-9999"
                    className="bg-background border-border"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Mensagem *</label>
                <Textarea 
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Descreva seu projeto ou necessidade..."
                  className="min-h-32 bg-background border-border resize-none"
                  required
                />
                <p className="text-xs text-muted-foreground mt-2">
                  {formData.message.length}/1000 caracteres
                </p>
              </div>

              <Button 
                type="submit" 
                className="w-full bg-primary hover:bg-primary/90 text-primary-foreground py-6"
                disabled={isSubmitting}
              >
                <Send className="mr-2 h-5 w-5" />
                {isSubmitting ? "Enviando..." : "Enviar via WhatsApp"}
              </Button>
            </form>

            {/* Contact Info Cards */}
            <div className="grid sm:grid-cols-2 gap-4 mt-8 pt-8 border-t border-border">
              <a 
                href="mailto:contato@smartsignage.com.br" 
                className="flex items-center gap-3 p-4 rounded-lg bg-muted/50 hover:bg-muted transition-colors group"
              >
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                  <Mail className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Email</p>
                  <p className="text-sm font-medium">contato@smartsignage.com.br</p>
                </div>
              </a>
              <a 
                href="https://wa.me/5551936512200" 
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 p-4 rounded-lg bg-muted/50 hover:bg-muted transition-colors group"
              >
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                  <MessageCircle className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">WhatsApp</p>
                  <p className="text-sm font-medium">(51) 9365-1220</p>
                </div>
              </a>
            </div>
          </Card>

          {/* Map & Locations */}
          <div className="space-y-6">
            {/* Map Embed */}
            <Card className="overflow-hidden border-border">
              <div className="h-[300px] md:h-[350px]">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3454.5046283927455!2d-51.1810889!3d-30.0346471!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x951979a1d28fd5ff%3A0x5f7fc4e6f5e69c4c!2sPorto%20Alegre%2C%20RS!5e0!3m2!1spt-BR!2sbr!4v1703000000000!5m2!1spt-BR!2sbr"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Localização Smart Signage"
                />
              </div>
            </Card>

            {/* Location Cards */}
            <div className="grid gap-4">
              <Card className="p-5 border-border hover:border-primary/30 transition-colors">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <MapPin className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Porto Alegre/RS</h4>
                    <p className="text-sm text-muted-foreground">Matriz - Atendimento presencial e showroom</p>
                    <div className="flex items-center gap-2 mt-2 text-xs text-muted-foreground">
                      <Clock className="h-3 w-3" />
                      Seg-Sex: 9h às 18h
                    </div>
                  </div>
                </div>
              </Card>

              <Card className="p-5 border-border hover:border-primary/30 transition-colors">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <MapPin className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">São Paulo/SP</h4>
                    <p className="text-sm text-muted-foreground">Filial - Atendimento comercial</p>
                    <div className="flex items-center gap-2 mt-2 text-xs text-muted-foreground">
                      <Clock className="h-3 w-3" />
                      Seg-Sex: 9h às 18h
                    </div>
                  </div>
                </div>
              </Card>

              <Card className="p-5 border-border hover:border-primary/30 transition-colors">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <MapPin className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Santa Catarina/SC</h4>
                    <p className="text-sm text-muted-foreground">Representante comercial</p>
                    <div className="flex items-center gap-2 mt-2 text-xs text-muted-foreground">
                      <Clock className="h-3 w-3" />
                      Seg-Sex: 9h às 18h
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
