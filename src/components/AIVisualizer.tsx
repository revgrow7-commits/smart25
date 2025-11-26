import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Sparkles, Upload, Wand2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const AIVisualizer = () => {
  return (
    <section className="py-20 bg-gradient-to-b from-background to-card">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <Badge className="mb-4 bg-gradient-to-r from-primary to-secondary">
            <Sparkles className="mr-2 h-4 w-4" />
            Tecnologia IA
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Visualize Seu Stand em <span className="gradient-text">Segundos</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Faça upload de uma foto do seu espaço ou produto e veja como ficaria com Smart Signage
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {/* Upload Section */}
          <Card className="p-8 bg-card border-border">
            <div className="space-y-6">
              <div className="border-2 border-dashed border-primary/30 rounded-lg p-12 text-center hover:border-primary/60 transition-colors cursor-pointer">
                <Upload className="h-12 w-12 mx-auto mb-4 text-primary" />
                <p className="font-semibold mb-2">Arraste uma imagem ou clique para fazer upload</p>
                <p className="text-sm text-muted-foreground">PNG, JPG até 10MB</p>
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2">
                  Descreva a edição desejada
                </label>
                <Textarea 
                  placeholder="Ex: Adicione um stand Smart Curved vermelho com logo da marca centralizado, iluminação led azul nas laterais..."
                  className="min-h-32 bg-background border-border resize-none"
                />
                <p className="text-xs text-muted-foreground mt-2">
                  💡 <strong>Dica Pro:</strong> Quanto mais detalhes, melhor o resultado
                </p>
              </div>

              <Button className="w-full btn-primary text-lg py-6">
                <Wand2 className="mr-2 h-5 w-5" />
                Gerar Visualização com IA
              </Button>
            </div>
          </Card>

          {/* Preview Section */}
          <Card className="p-8 bg-card border-border flex items-center justify-center min-h-[400px]">
            <div className="text-center space-y-4">
              <div className="inline-flex p-4 rounded-full bg-muted/50">
                <Wand2 className="h-12 w-12 text-muted-foreground" />
              </div>
              <p className="text-muted-foreground">Sua visualização aparecerá aqui</p>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default AIVisualizer;
