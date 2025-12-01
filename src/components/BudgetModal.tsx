import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useBudget } from "@/contexts/BudgetContext";
import { Trash2, Send } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { useTranslation } from "react-i18next";

interface BudgetModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const BudgetModal = ({ open, onOpenChange }: BudgetModalProps) => {
  const { items, removeItem, clearBudget } = useBudget();
  const { toast } = useToast();
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Format the budget items for the message
    const itemsList = items.map(item => `- ${item.name} (${item.item_code})`).join('\n');
    const fullMessage = `${formData.message}\n\nProdutos selecionados:\n${itemsList}`;

    // Here you would typically send this to your backend
    console.log({ ...formData, message: fullMessage, items });

    toast({
      title: "Orçamento solicitado!",
      description: "Em breve entraremos em contato.",
    });

    clearBudget();
    setFormData({ name: "", email: "", phone: "", message: "" });
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl">Orçamento</DialogTitle>
          <DialogDescription>
            {items.length} {items.length === 1 ? 'produto selecionado' : 'produtos selecionados'}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Lista de produtos */}
          <div className="space-y-3">
            {items.map((item) => (
              <div key={item.id} className="flex gap-3 p-3 border border-border rounded-lg bg-card">
                <img
                  src={item.image_url}
                  alt={item.name}
                  className="w-20 h-20 object-cover rounded"
                />
                <div className="flex-1">
                  <p className="text-xs text-muted-foreground">{item.item_code}</p>
                  <h4 className="font-semibold">{item.name}</h4>
                  {item.description && (
                    <p className="text-sm text-muted-foreground line-clamp-1">{item.description}</p>
                  )}
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => removeItem(item.id)}
                  className="flex-shrink-0"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>

          {items.length > 0 && (
            <>
              <div className="border-t pt-4">
                <h3 className="font-semibold mb-4">Solicitar Orçamento</h3>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <Label htmlFor="name">Nome Completo *</Label>
                    <Input
                      id="name"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label htmlFor="email">Email *</Label>
                    <Input
                      id="email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label htmlFor="phone">Telefone *</Label>
                    <Input
                      id="phone"
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label htmlFor="message">Mensagem</Label>
                    <Textarea
                      id="message"
                      rows={4}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Conte-nos mais sobre suas necessidades..."
                    />
                  </div>
                  <div className="flex gap-2">
                    <Button type="submit" className="flex-1 btn-primary">
                      <Send className="mr-2 h-4 w-4" />
                      Enviar Solicitação
                    </Button>
                    <Button type="button" variant="outline" onClick={() => clearBudget()}>
                      Limpar Tudo
                    </Button>
                  </div>
                </form>
              </div>
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default BudgetModal;
