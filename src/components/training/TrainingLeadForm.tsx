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
import { supabase } from "@/integrations/supabase/client";
import { z } from "zod";

const trainingLeadSchema = z.object({
  name: z.string().trim().min(2, "Nome deve ter pelo menos 2 caracteres").max(100, "Nome deve ter no máximo 100 caracteres"),
  email: z.string().trim().email("Email inválido").max(255, "Email deve ter no máximo 255 caracteres"),
  whatsapp: z.string().trim().min(10, "WhatsApp deve ter pelo menos 10 dígitos").max(20, "WhatsApp deve ter no máximo 20 caracteres"),
  city: z.string().trim().min(2, "Cidade deve ter pelo menos 2 caracteres").max(100, "Cidade deve ter no máximo 100 caracteres"),
  profile: z.enum(["montador", "agencia", "empresa", "outro"], { errorMap: () => ({ message: "Selecione um perfil válido" }) }),
});

const TrainingLeadForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    whatsapp: "",
    city: "",
    profile: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});
    
    const result = trainingLeadSchema.safeParse(formData);
    
    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      result.error.errors.forEach((err) => {
        if (err.path[0]) {
          fieldErrors[err.path[0] as string] = err.message;
        }
      });
      setErrors(fieldErrors);
      toast.error("Por favor, corrija os erros no formulário");
      return;
    }

    setIsSubmitting(true);

    try {
      const { error } = await supabase.from("training_leads").insert({
        name: result.data.name,
        email: result.data.email,
        whatsapp: result.data.whatsapp,
        city: result.data.city,
        profile: result.data.profile,
      });

      if (error) throw error;

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
    } catch (error) {
      console.error("Error saving lead:", error);
      toast.error("Erro ao enviar inscrição", {
        description: "Por favor, tente novamente.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="lead-form" className="py-16 md:py-24 relative bg-[#050515]/50">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,rgba(220,38,38,0.1),transparent_50%)]" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white text-center mb-4">
            Entre agora para a{" "}
            <span className="text-red-500">
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
                  maxLength={100}
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className={`bg-[#0a0a2e]/50 border-red-500/30 text-white placeholder:text-gray-500 focus:border-red-400 ${errors.name ? "border-red-500" : ""}`}
                  placeholder="Seu nome"
                />
                {errors.name && <p className="text-red-400 text-sm">{errors.name}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="email" className="text-gray-300">
                  E-mail *
                </Label>
                <Input
                  id="email"
                  type="email"
                  required
                  maxLength={255}
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className={`bg-[#0a0a2e]/50 border-red-500/30 text-white placeholder:text-gray-500 focus:border-red-400 ${errors.email ? "border-red-500" : ""}`}
                  placeholder="seu@email.com"
                />
                {errors.email && <p className="text-red-400 text-sm">{errors.email}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="whatsapp" className="text-gray-300">
                  WhatsApp *
                </Label>
                <Input
                  id="whatsapp"
                  required
                  maxLength={20}
                  value={formData.whatsapp}
                  onChange={(e) => setFormData({ ...formData, whatsapp: e.target.value })}
                  className={`bg-[#0a0a2e]/50 border-red-500/30 text-white placeholder:text-gray-500 focus:border-red-400 ${errors.whatsapp ? "border-red-500" : ""}`}
                  placeholder="(00) 00000-0000"
                />
                {errors.whatsapp && <p className="text-red-400 text-sm">{errors.whatsapp}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="city" className="text-gray-300">
                  Cidade *
                </Label>
                <Input
                  id="city"
                  required
                  maxLength={100}
                  value={formData.city}
                  onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                  className={`bg-[#0a0a2e]/50 border-red-500/30 text-white placeholder:text-gray-500 focus:border-red-400 ${errors.city ? "border-red-500" : ""}`}
                  placeholder="Sua cidade"
                />
                {errors.city && <p className="text-red-400 text-sm">{errors.city}</p>}
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
                <SelectTrigger className={`bg-[#0a0a2e]/50 border-red-500/30 text-white ${errors.profile ? "border-red-500" : ""}`}>
                  <SelectValue placeholder="Selecione seu perfil" />
                </SelectTrigger>
                <SelectContent className="bg-[#0a0a2e] border-red-500/30">
                  <SelectItem value="montador">Montador</SelectItem>
                  <SelectItem value="agencia">Agência</SelectItem>
                  <SelectItem value="empresa">Empresa</SelectItem>
                  <SelectItem value="outro">Outro</SelectItem>
                </SelectContent>
              </Select>
              {errors.profile && <p className="text-red-400 text-sm">{errors.profile}</p>}
            </div>

            <div className="flex items-start gap-3 text-gray-400 text-sm">
              <Shield className="h-5 w-5 text-red-400 shrink-0 mt-0.5" />
              <p>
                Não se preocupe: não enviamos spam. Você receberá apenas conteúdos relevantes sobre stands modulares, montagem e oportunidades de negócio.
              </p>
            </div>

            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-red-600 hover:bg-red-700 text-white py-6 text-lg rounded-xl shadow-[0_0_30px_rgba(220,38,38,0.4)]"
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
