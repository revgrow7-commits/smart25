import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import { ArrowRight, Shield } from "lucide-react";

const TrainingLeadForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    whatsapp: "",
    city: "",
    profile: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1000));

    toast.success("Inscrição realizada com sucesso!", {
      description: "Em breve você receberá acesso às aulas.",
    });

    setFormData({
      name: "",
      email: "",
      whatsapp: "",
      city: "",
      profile: "",
    });
    setIsSubmitting(false);
  };

  return (
    <section id="lead-form" className="py-16 md:py-24 relative bg-[#0d0520]/50">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,rgba(139,92,246,0.15),transparent_50%)]" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white text-center mb-4">
            Entre agora para a{" "}
            <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Escola de Treinamento Smart Signage
            </span>
          </h2>

          <p className="text-gray-300 text-center text-lg mb-10">
            Preencha o formulário abaixo para receber acesso às aulas, materiais e novidades da Escola de Treinamento em stands modulares.
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-gray-300">
                  Nome completo *
                </Label>
                <Input
                  id="name"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="bg-purple-900/30 border-purple-500/30 text-white placeholder:text-gray-500 focus:border-purple-400"
                  placeholder="Seu nome"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email" className="text-gray-300">
                  E-mail *
                </Label>
                <Input
                  id="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="bg-purple-900/30 border-purple-500/30 text-white placeholder:text-gray-500 focus:border-purple-400"
                  placeholder="seu@email.com"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="whatsapp" className="text-gray-300">
                  WhatsApp *
                </Label>
                <Input
                  id="whatsapp"
                  required
                  value={formData.whatsapp}
                  onChange={(e) => setFormData({ ...formData, whatsapp: e.target.value })}
                  className="bg-purple-900/30 border-purple-500/30 text-white placeholder:text-gray-500 focus:border-purple-400"
                  placeholder="(00) 00000-0000"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="city" className="text-gray-300">
                  Cidade *
                </Label>
                <Input
                  id="city"
                  required
                  value={formData.city}
                  onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                  className="bg-purple-900/30 border-purple-500/30 text-white placeholder:text-gray-500 focus:border-purple-400"
                  placeholder="Sua cidade"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="profile" className="text-gray-300">
                Você é: *
              </Label>
              <Select
                value={formData.profile}
                onValueChange={(value) => setFormData({ ...formData, profile: value })}
                required
              >
                <SelectTrigger className="bg-purple-900/30 border-purple-500/30 text-white">
                  <SelectValue placeholder="Selecione seu perfil" />
                </SelectTrigger>
                <SelectContent className="bg-[#1a0a2e] border-purple-500/30">
                  <SelectItem value="montador">Montador</SelectItem>
                  <SelectItem value="agencia">Agência</SelectItem>
                  <SelectItem value="empresa">Empresa</SelectItem>
                  <SelectItem value="outro">Outro</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-start gap-3 text-gray-400 text-sm">
              <Shield className="h-5 w-5 text-purple-400 shrink-0 mt-0.5" />
              <p>
                Não se preocupe: não enviamos spam. Você receberá apenas conteúdos relevantes sobre stands modulares, montagem e oportunidades de negócio.
              </p>
            </div>

            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:opacity-90 text-white py-6 text-lg rounded-xl shadow-[0_0_30px_rgba(139,92,246,0.3)]"
            >
              {isSubmitting ? "Enviando..." : "Quero me inscrever na Escola"}
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default TrainingLeadForm;
