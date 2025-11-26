import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { Upload, Wand2, Lightbulb } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import Navbar from "@/components/Navbar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface Product {
  id: string;
  name: string;
  item_code: string;
  categories: {
    name: string;
  } | null;
}

const StandVisualizer = () => {
  const [selectedProduct, setSelectedProduct] = useState<string>("");
  const [products, setProducts] = useState<Product[]>([]);
  const [prompt, setPrompt] = useState("");
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const { data, error } = await supabase
        .from("products")
        .select(`
          id,
          name,
          item_code,
          categories (name)
        `)
        .eq("status", "active")
        .order("name");

      if (error) throw error;
      setProducts(data || []);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 10 * 1024 * 1024) {
        toast({
          title: "Arquivo muito grande",
          description: "O arquivo deve ter no máximo 10MB",
          variant: "destructive",
        });
        return;
      }

      const reader = new FileReader();
      reader.onload = (event) => {
        setUploadedImage(event.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleGenerateVisualization = async () => {
    if (!prompt.trim()) {
      toast({
        title: "Prompt necessário",
        description: "Por favor, descreva a visualização desejada",
        variant: "destructive",
      });
      return;
    }

    setIsGenerating(true);

    try {
      const selectedProductData = products.find(p => p.id === selectedProduct);
      const fullPrompt = selectedProductData 
        ? `${prompt}\n\nModelo base: ${selectedProductData.name} (${selectedProductData.item_code})`
        : prompt;

      const { data, error } = await supabase.functions.invoke("generate-stand-visualization", {
        body: {
          prompt: fullPrompt,
          baseImage: uploadedImage,
        },
      });

      if (error) {
        if (error.message?.includes("429")) {
          throw new Error("Limite de requisições atingido. Por favor, tente novamente em alguns instantes.");
        }
        if (error.message?.includes("402")) {
          throw new Error("Créditos insuficientes. Por favor, adicione créditos em Settings → Workspace → Usage.");
        }
        throw error;
      }

      if (data?.image) {
        setGeneratedImage(data.image);
        toast({
          title: "Visualização gerada!",
          description: "Sua visualização foi criada com sucesso",
        });
      }
    } catch (error: any) {
      console.error("Error generating visualization:", error);
      toast({
        title: "Erro ao gerar visualização",
        description: error.message || "Não foi possível gerar a visualização. Tente novamente.",
        variant: "destructive",
      });
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="container mx-auto px-4 pt-32 pb-20">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Visualizador de <span className="gradient-text">Stands com IA</span>
          </h1>
          <p className="text-xl text-muted-foreground">
            Gere visualizações personalizadas dos nossos stands
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-7xl mx-auto">
          {/* Left Panel - Input */}
          <div className="space-y-6">
            <Card className="p-6 bg-card border-border">
              <h2 className="text-xl font-bold mb-4">Selecione um Modelo Base</h2>
              <Select value={selectedProduct} onValueChange={setSelectedProduct}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Escolha um modelo de stand..." />
                </SelectTrigger>
                <SelectContent className="bg-card border-border z-50">
                  {products.map((product) => (
                    <SelectItem key={product.id} value={product.id}>
                      {product.name} - {product.item_code}
                      {product.categories && (
                        <span className="text-xs text-muted-foreground ml-2">
                          ({product.categories.name})
                        </span>
                      )}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </Card>

            <Card className="p-6 bg-card border-border">
              <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                <Upload className="w-5 h-5" />
                Imagem Base (Opcional)
              </h2>
              <label className="block">
                <input
                  type="file"
                  accept="image/png,image/jpeg,image/jpg"
                  onChange={handleImageUpload}
                  className="hidden"
                  id="image-upload"
                />
                <div className="border-2 border-dashed border-border rounded-lg p-12 text-center cursor-pointer hover:border-primary transition-colors">
                  {uploadedImage ? (
                    <img src={uploadedImage} alt="Preview" className="max-h-48 mx-auto rounded" />
                  ) : (
                    <>
                      <Upload className="w-12 h-12 mx-auto mb-4 text-primary" />
                      <p className="font-semibold mb-2">Arraste uma imagem ou clique para fazer upload</p>
                      <p className="text-sm text-muted-foreground">PNG, JPG até 10MB</p>
                    </>
                  )}
                </div>
              </label>
            </Card>

            <Card className="p-6 bg-card border-border">
              <h2 className="text-xl font-bold mb-4">Descreva a edição desejada</h2>
              <Textarea
                placeholder="Ex: Adicione um stand Smart Curved vermelho com logo da marca centralizado, iluminação led azul nas laterais..."
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                className="min-h-32 bg-background border-border mb-4"
              />
              <div className="flex items-start gap-2 text-sm text-muted-foreground mb-4">
                <Lightbulb className="w-4 h-4 mt-0.5 flex-shrink-0 text-primary" />
                <p>
                  <span className="font-semibold">Dica Pro:</span> Quanto mais detalhes, melhor o resultado
                </p>
              </div>
              <Button
                onClick={handleGenerateVisualization}
                disabled={isGenerating}
                className="w-full btn-primary"
                size="lg"
              >
                <Wand2 className="mr-2 h-5 w-5" />
                {isGenerating ? "Gerando Visualização..." : "Gerar Visualização com IA"}
              </Button>
            </Card>
          </div>

          {/* Right Panel - Preview */}
          <div className="lg:sticky lg:top-24 h-fit">
            <Card className="p-6 bg-card border-border">
              <h2 className="text-xl font-bold mb-4">Sua visualização aparecerá aqui</h2>
              <div className="aspect-square bg-gradient-to-br from-muted/50 to-muted rounded-lg flex items-center justify-center overflow-hidden">
                {generatedImage ? (
                  <img src={generatedImage} alt="Generated visualization" className="w-full h-full object-contain" />
                ) : (
                  <div className="text-center text-muted-foreground">
                    <Wand2 className="w-16 h-16 mx-auto mb-4 opacity-50" />
                    <p>Aguardando geração...</p>
                  </div>
                )}
              </div>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default StandVisualizer;
