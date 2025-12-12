import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Sparkles, Upload, Wand2, ChevronLeft, ChevronRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useState, useEffect, useRef } from "react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useQuery } from "@tanstack/react-query";

interface StandProduct {
  id: string;
  name: string;
  item_code: string;
  image_url: string | null;
}

const AIVisualizer = () => {
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [prompt, setPrompt] = useState("");
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [selectedStand, setSelectedStand] = useState<StandProduct | null>(null);
  const { toast } = useToast();
  const scrollRef = useRef<HTMLDivElement>(null);

  // Fetch stands from "Stands Modulados" category
  const { data: standProducts = [] } = useQuery({
    queryKey: ["stands-modulados-home"],
    queryFn: async () => {
      const { data: category } = await supabase
        .from("categories")
        .select("id")
        .or("name.ilike.%stands modulados%,slug.ilike.%stands-modulados%")
        .limit(1)
        .single();

      if (!category) return [];

      const { data: products } = await supabase
        .from("products")
        .select(`
          id, name, item_code,
          product_images (image_url, is_primary)
        `)
        .eq("category_id", category.id)
        .eq("status", "active")
        .limit(12);

      return (products || []).map((p: any) => ({
        id: p.id,
        name: p.name,
        item_code: p.item_code,
        image_url: p.product_images?.find((img: any) => img.is_primary)?.image_url 
          || p.product_images?.[0]?.image_url || null,
      }));
    },
  });

  const handleStandSelect = async (stand: StandProduct) => {
    setSelectedStand(stand);
    if (stand.image_url) {
      try {
        const response = await fetch(stand.image_url);
        const blob = await response.blob();
        const reader = new FileReader();
        reader.onloadend = () => {
          setUploadedImage(reader.result as string);
          toast({
            title: "Stand selecionado",
            description: `${stand.name} - agora descreva as alterações`,
          });
        };
        reader.readAsDataURL(blob);
      } catch {
        setUploadedImage(stand.image_url);
      }
    }
  };

  const scrollGallery = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const scrollAmount = 300;
      scrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  const examplePrompts = [
    {
      title: "Stand Natura Feira Tecnologia",
      prompt: "Crie um estande profissional semelhante ao anexo montado em uma feira de tecnologia indoor. O estande apresenta uma imagem espontânea de uma mulher loira falando, e uma tela secundária menor mostrando o retrato de perfil de um homem em um ambiente escuro. A estrutura do estande é moderna e elegante, com iluminação suave e acabamento linear. O logotipo da Natura está em destaque nos painéis e no balcão de recepção. O fundo mostra uma multidão levemente desfocada caminhando pelo pavilhão da feira, com iluminação ambiente quente criando uma atmosfera profissional. Fotografia tirada com uma DSLR em f/1.8 para obter pouca profundidade de campo, imitando a fotografia urbana de produtos com tons cinematográficos."
    },
    {
      title: "Stand Outdoor Feira",
      prompt: "Crie um stand promocional ao ar livre com dois banners laterais curvos e um backdrop central grande com cena de estrada ao nascer do sol e um grande pote de café impresso. Duas cadeiras brancas e uma mesa redonda na frente, colocadas sobre um tapete preto. O stand está cercado por pessoas aproveitando uma feira ao ar livre ensolarada com árvores ao fundo. A marca é limpa, ousada e destaca o logotipo e o produto. A luz solar natural realça os tons quentes da cena."
    },
    {
      title: "Stand Corporativo Moderno",
      prompt: "Um stand de feira corporativo moderno com linhas limpas e design minimalista. Apresenta retroiluminação LED, vitrines de vidro, móveis brancos e marca corporativa profissional. Fotografado em um centro de convenções com iluminação profissional, f2.8, ambiente de conferência de alto nível."
    },
    {
      title: "Stand Tecnológico Futurista",
      prompt: "Um stand tecnológico futurista com telas LED curvas exibindo conteúdo dinâmico, elementos holográficos, superfícies metálicas elegantes e iluminação de destaque azul neon. Móveis modernos, atmosfera high-tech, fotografado com lente grande angular em uma expo de tecnologia."
    }
  ];

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log('=== UPLOAD INICIADO ===');
    const file = e.target.files?.[0];
    console.log('Arquivo selecionado:', file ? file.name : 'nenhum');
    
    if (file) {
      console.log('Tamanho do arquivo:', file.size);
      
      if (file.size > 10 * 1024 * 1024) {
        console.error('Arquivo muito grande:', file.size);
        toast({
          title: "Arquivo muito grande",
          description: "O arquivo deve ter no máximo 10MB",
          variant: "destructive",
        });
        return;
      }

      const reader = new FileReader();
      reader.onload = (event) => {
        console.log('Arquivo lido com sucesso');
        const result = event.target?.result as string;
        console.log('Tamanho do base64:', result?.length);
        setUploadedImage(result);
        toast({
          title: "Imagem carregada",
          description: "Agora descreva as alterações desejadas",
        });
      };
      reader.onerror = (error) => {
        console.error('Erro ao ler arquivo:', error);
        toast({
          title: "Erro ao carregar imagem",
          description: "Não foi possível ler o arquivo",
          variant: "destructive",
        });
      };
      reader.readAsDataURL(file);
    } else {
      console.log('Nenhum arquivo foi selecionado');
    }
  };

  const handleGenerate = async () => {
    if (!prompt.trim()) {
      toast({
        title: "Descrição necessária",
        description: "Por favor, descreva as alterações desejadas",
        variant: "destructive",
      });
      return;
    }

    setIsGenerating(true);
    console.log('=== INICIANDO GERAÇÃO (Home) ===');

    try {
      const fullPrompt = `Crie uma visualização realista e profissional de um stand de feira/evento. ${prompt}. Use fotografia profissional com iluminação adequada, ambiente de feira realista.`;

      console.log('Chamando edge function...');

      const { data, error } = await supabase.functions.invoke("generate-stand-image", {
        body: {
          prompt: fullPrompt,
          referenceImage: uploadedImage,
        },
      });

      console.log('Resposta recebida:', { hasData: !!data, hasError: !!error });

      if (error) {
        console.error('Erro da função:', error);
        if (error.message?.includes("429")) {
          throw new Error("Limite de requisições atingido. Tente novamente em alguns instantes.");
        }
        if (error.message?.includes("402")) {
          throw new Error("Créditos insuficientes. Adicione créditos em Settings → Workspace → Usage.");
        }
        throw error;
      }

      if (data?.imageUrl) {
        console.log('Imagem gerada com sucesso');
        setGeneratedImage(data.imageUrl);
        toast({
          title: "Visualização gerada!",
          description: data.message || "Sua visualização foi criada com sucesso",
        });
      } else {
        console.error('Dados recebidos:', data);
        throw new Error("Nenhuma imagem foi gerada");
      }
    } catch (error: any) {
      console.error("=== ERRO NA GERAÇÃO ===");
      console.error("Erro:", error);
      toast({
        title: "Erro ao gerar visualização",
        description: error.message || "Não foi possível gerar a visualização. Tente novamente.",
        variant: "destructive",
      });
    } finally {
      setIsGenerating(false);
      console.log('=== FIM DA GERAÇÃO ===');
    }
  };

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
            Crie o seu Stand com a ajuda da IA.
          </p>
        </div>

        {/* Gallery with horizontal scroll */}
        {standProducts.length > 0 && (
          <div className="mb-10 max-w-6xl mx-auto">
            <h3 className="text-lg font-semibold mb-4 text-center">
              Ou escolha um stand pronto:
            </h3>
            <div className="relative group">
              <Button
                variant="outline"
                size="icon"
                className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-background/80 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity"
                onClick={() => scrollGallery("left")}
              >
                <ChevronLeft className="h-5 w-5" />
              </Button>
              
              <div
                ref={scrollRef}
                className="flex gap-4 overflow-x-auto scrollbar-hide pb-2 px-2 scroll-smooth"
                style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
              >
                {standProducts.map((stand) => (
                  <div
                    key={stand.id}
                    onClick={() => handleStandSelect(stand)}
                    className={`flex-shrink-0 w-40 cursor-pointer rounded-lg overflow-hidden border-2 transition-all hover:scale-105 ${
                      selectedStand?.id === stand.id
                        ? "border-primary ring-2 ring-primary/50"
                        : "border-border hover:border-primary/50"
                    }`}
                  >
                    {stand.image_url ? (
                      <img
                        src={stand.image_url}
                        alt={stand.name}
                        className="w-full h-28 object-cover"
                      />
                    ) : (
                      <div className="w-full h-28 bg-muted flex items-center justify-center">
                        <Sparkles className="h-8 w-8 text-muted-foreground" />
                      </div>
                    )}
                    <div className="p-2 bg-card">
                      <p className="text-xs font-medium truncate">{stand.name}</p>
                      <p className="text-xs text-muted-foreground">{stand.item_code}</p>
                    </div>
                  </div>
                ))}
              </div>

              <Button
                variant="outline"
                size="icon"
                className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-background/80 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity"
                onClick={() => scrollGallery("right")}
              >
                <ChevronRight className="h-5 w-5" />
              </Button>
            </div>
          </div>
        )}

        <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {/* Upload Section */}
          <Card className="p-8 bg-card border-border">
            <div className="space-y-6">
              <input
                type="file"
                accept="image/png,image/jpeg,image/jpg"
                onChange={handleImageUpload}
                className="hidden"
                id="home-image-upload"
              />
              <label
                htmlFor="home-image-upload"
                className="block border-2 border-dashed border-primary/30 rounded-lg p-12 text-center hover:border-primary/60 transition-colors cursor-pointer"
                onClick={() => console.log('Label clicado')}
              >
                {uploadedImage ? (
                  <img src={uploadedImage} alt="Preview" className="max-h-48 mx-auto rounded mb-4" />
                ) : (
                  <>
                    <Upload className="h-12 w-12 mx-auto mb-4 text-primary" />
                    <p className="font-semibold mb-2">Arraste uma imagem ou clique para fazer upload</p>
                    <p className="text-sm text-muted-foreground">PNG, JPG até 10MB</p>
                  </>
                )}
              </label>

              <div>
                <label className="block text-sm font-semibold mb-2">
                  Descreva a edição desejada
                </label>
                
                {/* Botões de sugestões de prompts */}
                <div className="mb-3 flex flex-wrap gap-2">
                  {examplePrompts.map((example, index) => (
                    <Button
                      key={index}
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        setPrompt(example.prompt);
                        toast({
                          title: "Prompt carregado",
                          description: example.title,
                        });
                      }}
                      className="text-xs"
                    >
                      {example.title}
                    </Button>
                  ))}
                </div>

                <Textarea 
                  placeholder="Ex: Adicione um stand Smart Curved vermelho com logo da marca centralizado, iluminação led azul nas laterais..."
                  className="min-h-32 bg-background border-border resize-none text-lg"
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                />
                <p className="text-xs text-muted-foreground mt-2">
                  💡 <strong>Dica Pro:</strong> Quanto mais detalhes, melhor o resultado
                </p>
              </div>

              <Button 
                onClick={handleGenerate}
                disabled={isGenerating}
                className="w-full btn-primary text-lg py-6"
              >
                <Wand2 className="mr-2 h-5 w-5" />
                {isGenerating ? "Gerando..." : "Gerar Visualização com IA"}
              </Button>
            </div>
          </Card>

          {/* Preview Section */}
          <Card className="p-8 bg-card border-border flex items-center justify-center min-h-[400px]">
            {generatedImage ? (
              <img 
                src={generatedImage} 
                alt="Generated visualization" 
                className="w-full h-full object-contain rounded-lg" 
              />
            ) : (
              <div className="text-center space-y-4">
                <div className="inline-flex p-4 rounded-full bg-muted/50">
                  <Wand2 className="h-12 w-12 text-muted-foreground" />
                </div>
                <p className="text-muted-foreground">
                  {isGenerating ? "Gerando visualização..." : "Sua visualização aparecerá aqui"}
                </p>
              </div>
            )}
          </Card>
        </div>
      </div>
    </section>
  );
};

export default AIVisualizer;
