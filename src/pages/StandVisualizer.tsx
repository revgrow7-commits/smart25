import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { Upload, Wand2, Lightbulb, Heart, Trash2, Check, Grid3X3 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import Navbar from "@/components/Navbar";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

// Import booth images
import booth202 from "@/assets/booths/booth-202-b1d2b4.jpg";
import booth203 from "@/assets/booths/booth-203-b4d2b4.jpg";
import booth205 from "@/assets/booths/booth-205-c5c2c5.jpg";
import booth206 from "@/assets/booths/booth-206-b1d5b1.jpg";
import booth208 from "@/assets/booths/booth-208-d4b5b4.jpg";
import booth210 from "@/assets/booths/booth-210-d1a3d1.jpg";
import booth211 from "@/assets/booths/booth-211-a4a6c1a6a4.jpg";
import booth212 from "@/assets/booths/booth-212-b1d5b4.jpg";

interface FavoritePrompt {
  id: string;
  title: string;
  prompt: string;
  created_at: string;
}

interface BoothOption {
  id: string;
  name: string;
  code: string;
  image: string;
  description: string;
}

const boothOptions: BoothOption[] = [
  {
    id: "booth-202",
    name: "Booth 202",
    code: "B1D2B4",
    image: booth202,
    description: "Stand com parede curva, monitor e balcão"
  },
  {
    id: "booth-203",
    name: "Booth 203",
    code: "B4D2B4",
    image: booth203,
    description: "Stand com dois monitores e balcões"
  },
  {
    id: "booth-205",
    name: "Booth 205",
    code: "C5C2C5",
    image: booth205,
    description: "Stand amplo com paredes arredondadas"
  },
  {
    id: "booth-206",
    name: "Booth 206",
    code: "B1D5B1",
    image: booth206,
    description: "Stand simétrico com dois monitores"
  },
  {
    id: "booth-208",
    name: "Booth 208",
    code: "D4B5B4",
    image: booth208,
    description: "Stand compacto com monitor central"
  },
  {
    id: "booth-210",
    name: "Booth 210",
    code: "D1A3D1",
    image: booth210,
    description: "Stand modular com monitor"
  },
  {
    id: "booth-211",
    name: "Booth 211",
    code: "A4A6C1A6A4",
    image: booth211,
    description: "Stand premium com dois monitores"
  },
  {
    id: "booth-212",
    name: "Booth 212",
    code: "B1D5B4",
    image: booth212,
    description: "Stand com arco e monitor lateral"
  },
];


const StandVisualizer = () => {
  const [selectedBooth, setSelectedBooth] = useState<BoothOption | null>(null);
  const [prompt, setPrompt] = useState("");
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [favoritePrompts, setFavoritePrompts] = useState<FavoritePrompt[]>([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [saveDialogOpen, setSaveDialogOpen] = useState(false);
  const [favoriteTitle, setFavoriteTitle] = useState("");
  const { toast } = useToast();

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    setIsAuthenticated(!!session);
    if (session) {
      fetchFavoritePrompts();
    }
  };

  const fetchFavoritePrompts = async () => {
    try {
      const { data, error } = await supabase
        .from("favorite_prompts")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      setFavoritePrompts(data || []);
    } catch (error) {
      console.error("Error fetching favorite prompts:", error);
    }
  };

  const saveFavoritePrompt = async () => {
    if (!isAuthenticated) {
      toast({
        title: "Autenticação necessária",
        description: "Faça login para salvar prompts favoritos",
        variant: "destructive",
      });
      return;
    }

    if (!favoriteTitle.trim() || !prompt.trim()) {
      toast({
        title: "Campos obrigatórios",
        description: "Por favor, preencha o título e o prompt",
        variant: "destructive",
      });
      return;
    }

    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("User not authenticated");

      const { error } = await supabase
        .from("favorite_prompts")
        .insert({
          user_id: user.id,
          title: favoriteTitle,
          prompt: prompt,
        });

      if (error) throw error;

      toast({
        title: "Prompt salvo!",
        description: "Seu prompt foi adicionado aos favoritos",
      });

      setFavoriteTitle("");
      setSaveDialogOpen(false);
      fetchFavoritePrompts();
    } catch (error: any) {
      console.error("Error saving favorite prompt:", error);
      toast({
        title: "Erro ao salvar",
        description: error.message || "Não foi possível salvar o prompt",
        variant: "destructive",
      });
    }
  };

  const deleteFavoritePrompt = async (id: string) => {
    try {
      const { error } = await supabase
        .from("favorite_prompts")
        .delete()
        .eq("id", id);

      if (error) throw error;

      toast({
        title: "Prompt removido",
        description: "O prompt foi removido dos favoritos",
      });

      fetchFavoritePrompts();
    } catch (error: any) {
      console.error("Error deleting favorite prompt:", error);
      toast({
        title: "Erro ao remover",
        description: error.message || "Não foi possível remover o prompt",
        variant: "destructive",
      });
    }
  };

  const loadFavoritePrompt = (favoritePrompt: FavoritePrompt) => {
    setPrompt(favoritePrompt.prompt);
    toast({
      title: "Prompt carregado",
      description: `"${favoritePrompt.title}" foi carregado`,
    });
  };

  const handleBoothSelect = async (booth: BoothOption) => {
    setSelectedBooth(booth);
    
    // Convert imported image to base64 for the AI API
    try {
      console.log('=== SELECIONANDO BOOTH ===');
      console.log('Booth:', booth.name);
      console.log('URL da imagem (resolvida pelo Vite):', booth.image);
      
      const response = await fetch(booth.image);
      
      if (!response.ok) {
        throw new Error(`Falha ao buscar imagem: ${response.status}`);
      }
      
      const blob = await response.blob();
      console.log('Blob criado, tipo:', blob.type, 'tamanho:', blob.size);
      
      // Create a Promise to wait for FileReader to complete
      const base64 = await new Promise<string>((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = (e) => {
          const result = e.target?.result as string;
          if (result && result.startsWith('data:')) {
            console.log('Base64 gerado com sucesso, tamanho:', result.length);
            console.log('Prefix base64:', result.substring(0, 50));
            resolve(result);
          } else {
            reject(new Error('Resultado não é base64 válido'));
          }
        };
        reader.onerror = () => reject(new Error('Erro ao ler arquivo'));
        reader.readAsDataURL(blob);
      });
      
      setUploadedImage(base64);
      console.log('=== BOOTH CARREGADO COM SUCESSO ===');
      
      toast({
        title: "Stand selecionado!",
        description: `${booth.name} (${booth.code}) foi carregado como base`,
      });
    } catch (error) {
      console.error("=== ERRO AO CARREGAR BOOTH ===");
      console.error("Error converting booth image:", error);
      toast({
        title: "Erro ao carregar imagem",
        description: "Não foi possível carregar a imagem do stand",
        variant: "destructive",
      });
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
        setSelectedBooth(null);
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
    console.log('=== INICIANDO GERAÇÃO ===');

    try {
      const boothInfo = selectedBooth 
        ? `O stand deve ser baseado no modelo: ${selectedBooth.name} (${selectedBooth.code}) - ${selectedBooth.description}.`
        : '';
      
      const fullPrompt = `Crie uma visualização realista e profissional de um stand de feira/evento. ${prompt}\n\n${boothInfo} Use fotografia profissional com iluminação adequada, ambiente de feira realista. Aplique a marca e identidade visual solicitada mantendo a estrutura base do stand.`;

      console.log('Prompt completo:', fullPrompt.substring(0, 100) + '...');
      console.log('Imagem de referência:', uploadedImage ? 'Presente' : 'Ausente');

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
          throw new Error("Limite de requisições atingido. Por favor, tente novamente em alguns instantes.");
        }
        if (error.message?.includes("402")) {
          throw new Error("Créditos insuficientes. Por favor, adicione créditos em Settings → Workspace → Usage.");
        }
        throw error;
      }

      console.log('Dados recebidos:', data);

      if (data?.imageUrl) {
        console.log('ImageUrl encontrada, tamanho:', data.imageUrl.length);
        setGeneratedImage(data.imageUrl);
        toast({
          title: "Visualização gerada!",
          description: data.message || "Sua visualização foi criada com sucesso",
        });
      } else {
        console.error('Dados completos:', JSON.stringify(data));
        throw new Error("Nenhuma imagem foi gerada");
      }
    } catch (error: any) {
      console.error("=== ERRO NA GERAÇÃO ===");
      console.error("Error generating visualization:", error);
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
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="container mx-auto px-4 pt-32 pb-20">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Visualizador de <span className="gradient-text">Stands com IA</span>
          </h1>
          <p className="text-xl text-muted-foreground">
            Selecione um stand base e personalize com sua marca
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-7xl mx-auto">
          {/* Left Panel - Input */}
          <div className="space-y-6">
            {/* Booth Gallery */}
            <Card className="p-6 bg-card border-border">
              <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                <Grid3X3 className="w-5 h-5 text-primary" />
                Selecione um Stand Base
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {boothOptions.map((booth) => (
                  <button
                    key={booth.id}
                    onClick={() => handleBoothSelect(booth)}
                    className={`relative group rounded-lg overflow-hidden border-2 transition-all duration-300 ${
                      selectedBooth?.id === booth.id
                        ? "border-primary ring-2 ring-primary/50"
                        : "border-border hover:border-primary/50"
                    }`}
                  >
                    <div className="aspect-[4/3] relative">
                      <img
                        src={booth.image}
                        alt={booth.name}
                        className="w-full h-full object-cover"
                      />
                      {selectedBooth?.id === booth.id && (
                        <div className="absolute inset-0 bg-primary/20 flex items-center justify-center">
                          <div className="bg-primary rounded-full p-1.5">
                            <Check className="w-4 h-4 text-primary-foreground" />
                          </div>
                        </div>
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 p-2 text-left opacity-0 group-hover:opacity-100 transition-opacity">
                      <p className="text-xs font-bold text-white">{booth.name}</p>
                      <p className="text-[10px] text-white/80">{booth.code}</p>
                    </div>
                  </button>
                ))}
              </div>
              {selectedBooth && (
                <div className="mt-4 p-3 rounded-lg bg-muted/50 border border-border">
                  <p className="text-sm font-semibold">{selectedBooth.name} - {selectedBooth.code}</p>
                  <p className="text-xs text-muted-foreground">{selectedBooth.description}</p>
                </div>
              )}
            </Card>

            {/* Custom Upload */}
            <Card className="p-6 bg-card border-border">
              <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                <Upload className="w-5 h-5" />
                Ou Envie Sua Própria Imagem
              </h2>
              <label className="block">
                <input
                  type="file"
                  accept="image/png,image/jpeg,image/jpg"
                  onChange={handleImageUpload}
                  className="hidden"
                  id="image-upload"
                />
                <div className="border-2 border-dashed border-border rounded-lg p-8 text-center cursor-pointer hover:border-primary transition-colors">
                  {uploadedImage && !selectedBooth ? (
                    <img src={uploadedImage} alt="Preview" className="max-h-40 mx-auto rounded" />
                  ) : (
                    <>
                      <Upload className="w-10 h-10 mx-auto mb-3 text-primary" />
                      <p className="font-semibold mb-1 text-sm">Arraste ou clique para upload</p>
                      <p className="text-xs text-muted-foreground">PNG, JPG até 10MB</p>
                    </>
                  )}
                </div>
              </label>
            </Card>

            {/* Favorite Prompts */}
            {isAuthenticated && favoritePrompts.length > 0 && (
              <Card className="p-6 bg-card border-border">
                <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                  <Heart className="w-5 h-5 text-primary" />
                  Meus Prompts Favoritos
                </h2>
                <div className="grid grid-cols-1 gap-2 mb-4">
                  {favoritePrompts.map((favorite) => (
                    <div
                      key={favorite.id}
                      className="flex items-start gap-2 px-4 py-3 rounded-lg border border-border hover:border-primary hover:bg-muted/50 transition-all"
                    >
                      <button
                        onClick={() => loadFavoritePrompt(favorite)}
                        className="flex-1 text-left"
                      >
                        <p className="font-semibold text-sm mb-1">{favorite.title}</p>
                        <p className="text-xs text-muted-foreground line-clamp-2">
                          {favorite.prompt}
                        </p>
                      </button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => deleteFavoritePrompt(favorite.id)}
                        className="flex-shrink-0"
                      >
                        <Trash2 className="w-4 h-4 text-destructive" />
                      </Button>
                    </div>
                  ))}
                </div>
              </Card>
            )}


            {/* Prompt Input */}
            <Card className="p-6 bg-card border-border">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold">Descreva sua marca e edição</h2>
                {isAuthenticated && prompt.trim() && (
                  <Dialog open={saveDialogOpen} onOpenChange={setSaveDialogOpen}>
                    <DialogTrigger asChild>
                      <Button variant="outline" size="sm">
                        <Heart className="mr-2 h-4 w-4" />
                        Salvar Prompt
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="bg-card">
                      <DialogHeader>
                        <DialogTitle>Salvar Prompt Favorito</DialogTitle>
                        <DialogDescription>
                          Dê um nome ao seu prompt para encontrá-lo facilmente depois
                        </DialogDescription>
                      </DialogHeader>
                      <Input
                        placeholder="Ex: Stand Moderno Azul"
                        value={favoriteTitle}
                        onChange={(e) => setFavoriteTitle(e.target.value)}
                        className="bg-background"
                      />
                      <DialogFooter>
                        <Button variant="outline" onClick={() => setSaveDialogOpen(false)}>
                          Cancelar
                        </Button>
                        <Button onClick={saveFavoritePrompt}>
                          Salvar
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                )}
              </div>
              <Textarea
                placeholder="Ex: Aplique a marca Coca-Cola com cores vermelho e branco, adicione logo centralizado no painel principal, iluminação LED vermelha nas laterais..."
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                className="min-h-32 bg-background border-border mb-4"
              />
              <div className="flex items-start gap-2 text-sm text-muted-foreground mb-4">
                <Lightbulb className="w-4 h-4 mt-0.5 flex-shrink-0 text-primary" />
                <p>
                  <span className="font-semibold">Dica:</span> Descreva a marca, cores, logo e elementos visuais que deseja aplicar ao stand
                </p>
              </div>
              <Button
                onClick={handleGenerateVisualization}
                disabled={isGenerating || !prompt.trim()}
                className="w-full bg-gradient-to-r from-primary to-accent hover:opacity-90"
              >
                {isGenerating ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-primary-foreground mr-2" />
                    Gerando visualização...
                  </>
                ) : (
                  <>
                    <Wand2 className="mr-2" />
                    Gerar Visualização com IA
                  </>
                )}
              </Button>
            </Card>
          </div>

          {/* Right Panel - Output */}
          <div className="space-y-6">
            {/* Selected Base Preview */}
            {uploadedImage && (
              <Card className="p-6 bg-card border-border">
                <h2 className="text-xl font-bold mb-4">Stand Base Selecionado</h2>
                <div className="rounded-lg overflow-hidden border border-border">
                  <img
                    src={uploadedImage}
                    alt="Stand base selecionado"
                    className="w-full h-auto"
                  />
                </div>
                {selectedBooth && (
                  <p className="text-sm text-muted-foreground mt-3 text-center">
                    {selectedBooth.name} - {selectedBooth.code}
                  </p>
                )}
              </Card>
            )}

            {/* Generated Result */}
            <Card className="p-6 bg-card border-border">
              <h2 className="text-xl font-bold mb-4">Resultado da Simulação</h2>
              <div className="aspect-[4/3] rounded-lg overflow-hidden border border-border bg-muted flex items-center justify-center">
                {generatedImage ? (
                  <img
                    src={generatedImage}
                    alt="Visualização gerada"
                    className="w-full h-full object-contain"
                  />
                ) : (
                  <div className="text-center p-8">
                    <Wand2 className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
                    <p className="text-muted-foreground">
                      {uploadedImage 
                        ? "Insira um prompt e clique em gerar para ver sua marca aplicada ao stand"
                        : "Selecione um stand base e descreva como deseja aplicar sua marca"
                      }
                    </p>
                  </div>
                )}
              </div>
              {generatedImage && (
                <div className="flex gap-3 mt-4">
                  <Button
                    variant="outline"
                    className="flex-1"
                    onClick={() => {
                      const link = document.createElement('a');
                      link.href = generatedImage;
                      link.download = 'stand-visualization.png';
                      link.click();
                    }}
                  >
                    Baixar Imagem
                  </Button>
                  <Button
                    variant="outline"
                    className="flex-1"
                    onClick={() => setGeneratedImage(null)}
                  >
                    Nova Simulação
                  </Button>
                </div>
              )}
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default StandVisualizer;
