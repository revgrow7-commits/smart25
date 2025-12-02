import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, Package, Ruler, Weight, Box, RotateCcw, RotateCw, ZoomIn, ZoomOut, Plus, ShoppingCart, Sparkles, Image as ImageIcon, Video } from "lucide-react";
import { useBudget } from "@/contexts/BudgetContext";
import { Skeleton } from "@/components/ui/skeleton";
import { Progress } from "@/components/ui/progress";
import placeholderImage from "@/assets/3d-model-placeholder.png";

interface ProductImage {
  id: string;
  image_url: string;
  alt_text: string | null;
  is_primary: boolean | null;
}

interface Product {
  id: string;
  name: string;
  item_code: string;
  description: string | null;
  frame_size: string | null;
  graphic_size: string | null;
  pcs_per_ctn: number | null;
  gross_weight: string | null;
  packing_size: string | null;
  price: number | null;
  is_featured: boolean | null;
  video_url: string | null;
  model_3d_url: string | null;
  sketchfab_url: string | null;
  specifications: any;
  categories: {
    name: string;
  } | null;
  product_images: ProductImage[];
}

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { addItem, isInBudget } = useBudget();
  const [product, setProduct] = useState<Product | null>(null);
  const [selectedImage, setSelectedImage] = useState<string>("");
  const [loading, setLoading] = useState(true);
  const [modelLoading, setModelLoading] = useState(true);
  const [modelProgress, setModelProgress] = useState(0);

  useEffect(() => {
    if (id) {
      fetchProduct();
    }
  }, [id]);

  useEffect(() => {
    const modelViewer = document.getElementById('product-model-viewer') as any;
    
    if (modelViewer) {
      const handleProgress = (event: any) => {
        const progress = Math.round((event.detail.totalProgress || 0) * 100);
        setModelProgress(progress);
        setModelLoading(progress < 100);
      };

      const handleLoad = () => {
        setModelLoading(false);
        setModelProgress(100);
      };

      modelViewer.addEventListener('progress', handleProgress);
      modelViewer.addEventListener('load', handleLoad);

      return () => {
        modelViewer.removeEventListener('progress', handleProgress);
        modelViewer.removeEventListener('load', handleLoad);
      };
    }
  }, [product?.model_3d_url]);

  const fetchProduct = async () => {
    try {
      const { data, error } = await supabase
        .from("products")
        .select(`
          *,
          categories (name),
          product_images (*)
        `)
        .eq("id", id)
        .eq("status", "active")
        .single();

      if (error) throw error;

      setProduct(data);
      
      const primaryImage = data.product_images.find((img: ProductImage) => img.is_primary);
      if (primaryImage) {
        setSelectedImage(primaryImage.image_url);
      } else if (data.product_images.length > 0) {
        setSelectedImage(data.product_images[0].image_url);
      }
    } catch (error) {
      console.error("Error fetching product:", error);
      toast({
        title: "Erro ao carregar produto",
        description: "Não foi possível carregar os detalhes do produto.",
        variant: "destructive",
      });
      navigate("/");
    } finally {
      setLoading(false);
    }
  };

  const handleAddToBudget = () => {
    if (product) {
      addItem({
        id: product.id,
        name: product.name,
        item_code: product.item_code,
        image_url: selectedImage || "/placeholder.svg",
        description: product.description || undefined,
        frame_size: product.frame_size || undefined,
        graphic_size: product.graphic_size || undefined,
      });
      toast({
        title: "Adicionado ao orçamento",
        description: `${product.name} foi adicionado ao seu orçamento.`,
      });
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <Skeleton className="h-[500px] w-full" />
            <div className="space-y-4">
              <Skeleton className="h-12 w-3/4" />
              <Skeleton className="h-6 w-1/4" />
              <Skeleton className="h-32 w-full" />
              <Skeleton className="h-10 w-full" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return null;
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="container mx-auto px-4 py-4">
        <Button
          variant="ghost"
          onClick={() => navigate("/#catalogo")}
          className="mb-3"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Voltar ao Catálogo
        </Button>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr,0.85fr] gap-8 lg:gap-12">
          {/* Visualizador com Abas */}
          <div className="space-y-2">
            <Tabs defaultValue="galeria" className="w-full">
              <TabsList className="grid w-full grid-cols-3 bg-muted/50 p-1 rounded-xl">
                <TabsTrigger 
                  value="galeria" 
                  className="flex items-center gap-2 data-[state=active]:bg-background data-[state=active]:shadow-sm rounded-lg"
                >
                  <ImageIcon className="w-4 h-4" />
                  <span className="hidden sm:inline">Galeria</span>
                </TabsTrigger>
                <TabsTrigger 
                  value="3d" 
                  className="flex items-center gap-2 data-[state=active]:bg-background data-[state=active]:shadow-sm rounded-lg" 
                  disabled={!product.model_3d_url && !product.sketchfab_url}
                >
                  <Box className="w-4 h-4" />
                  <span className="hidden sm:inline">3D</span>
                </TabsTrigger>
                <TabsTrigger 
                  value="video" 
                  className="flex items-center gap-2 data-[state=active]:bg-background data-[state=active]:shadow-sm rounded-lg" 
                  disabled={!product.video_url}
                >
                  <Video className="w-4 h-4" />
                  <span className="hidden sm:inline">Vídeo</span>
                </TabsTrigger>
              </TabsList>

              {/* Galeria de Imagens */}
              <TabsContent value="galeria" className="space-y-2 mt-0">
                <div className="rounded-xl overflow-hidden bg-gradient-to-br from-muted/30 to-muted/60 border border-border/50 shadow-md" style={{ height: '750px' }}>
                  <img
                    src={selectedImage || "/placeholder.svg"}
                    alt={product.name}
                    className="w-full h-full object-contain"
                  />
                </div>
                
                {product.product_images.length > 1 && (
                  <div className="grid grid-cols-5 gap-2">
                    {product.product_images.map((image) => (
                      <button
                        key={image.id}
                        onClick={() => setSelectedImage(image.image_url)}
                        className={`aspect-square rounded-lg overflow-hidden border-2 transition-all hover:scale-105 ${
                          selectedImage === image.image_url
                            ? "border-primary shadow-md scale-105"
                            : "border-border/50 hover:border-primary/50"
                        }`}
                      >
                        <img
                          src={image.image_url}
                          alt={image.alt_text || product.name}
                          className="w-full h-full object-cover"
                        />
                      </button>
                    ))}
                  </div>
                )}
              </TabsContent>

              {/* Visualização 3D */}
              <TabsContent value="3d" className="mt-4">
                {product.sketchfab_url ? (
                  <div className="relative rounded-xl overflow-hidden bg-muted border border-border/50 shadow-md" style={{ height: '600px' }}>
                    <iframe
                      src={product.sketchfab_url}
                      className="w-full h-full"
                      allow="autoplay; fullscreen; xr-spatial-tracking"
                      allowFullScreen
                      title={`Modelo 3D de ${product.name}`}
                    />
                  </div>
                ) : product.model_3d_url ? (
                  <div className="relative rounded-xl overflow-hidden bg-muted border border-border/50 shadow-md" style={{ height: '600px' }}>
                    {modelLoading && (
                      <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-background/80 backdrop-blur-sm">
                        <div className="w-64 space-y-4">
                          <p className="text-center text-sm font-medium">Carregando modelo 3D...</p>
                          <Progress value={modelProgress} className="w-full" />
                          <p className="text-center text-xs text-muted-foreground">{modelProgress}%</p>
                        </div>
                      </div>
                    )}
                    
                    <model-viewer
                      id="product-model-viewer"
                      src={product.model_3d_url}
                      alt={`Modelo 3D de ${product.name}`}
                      style={{ width: '100%', height: '100%' }}
                      {...{
                        poster: placeholderImage,
                        loading: "eager",
                        reveal: "auto",
                        ar: true,
                        "camera-controls": true,
                        "auto-rotate": true,
                        "shadow-intensity": "1",
                        exposure: "1.2",
                        "min-field-of-view": "10deg",
                        "max-field-of-view": "45deg",
                      } as any}
                    >
                    </model-viewer>
                    
                    <div className="absolute bottom-4 right-4 flex gap-2 bg-background/90 backdrop-blur-sm rounded-lg p-2 border border-border shadow-lg">
                      <Button
                        type="button"
                        size="icon"
                        variant="ghost"
                        className="h-9 w-9 hover:bg-primary hover:text-primary-foreground"
                        onClick={() => {
                          const viewer = document.getElementById('product-model-viewer') as any;
                          if (viewer) viewer.resetTurntableRotation();
                        }}
                        title="Resetar Visualização"
                      >
                        <RotateCcw className="h-4 w-4" />
                      </Button>
                      <Button
                        type="button"
                        size="icon"
                        variant="ghost"
                        className="h-9 w-9 hover:bg-primary hover:text-primary-foreground"
                        onClick={() => {
                          const viewer = document.getElementById('product-model-viewer') as any;
                          if (viewer) viewer.fieldOfView = Math.max(10, viewer.fieldOfView - 5);
                        }}
                        title="Aumentar Zoom"
                      >
                        <ZoomIn className="h-4 w-4" />
                      </Button>
                      <Button
                        type="button"
                        size="icon"
                        variant="ghost"
                        className="h-9 w-9 hover:bg-primary hover:text-primary-foreground"
                        onClick={() => {
                          const viewer = document.getElementById('product-model-viewer') as any;
                          if (viewer) viewer.fieldOfView = Math.min(45, viewer.fieldOfView + 5);
                        }}
                        title="Diminuir Zoom"
                      >
                        <ZoomOut className="h-4 w-4" />
                      </Button>
                      <Button
                        type="button"
                        size="icon"
                        variant="ghost"
                        className="h-9 w-9 hover:bg-primary hover:text-primary-foreground"
                        onClick={() => {
                          const viewer = document.getElementById('product-model-viewer') as any;
                          if (viewer) {
                            const rotating = viewer.getAttribute('auto-rotate');
                            if (rotating !== null) {
                              viewer.removeAttribute('auto-rotate');
                            } else {
                              viewer.setAttribute('auto-rotate', '');
                            }
                          }
                        }}
                        title="Auto-rotação On/Off"
                      >
                        <RotateCw className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ) : null}
              </TabsContent>

              {/* Vídeo */}
              <TabsContent value="video" className="mt-4">
                {product.video_url && (
                  <div className="aspect-video rounded-xl overflow-hidden bg-muted border border-border/50 shadow-md">
                    <iframe
                      src={product.video_url}
                      className="w-full h-full"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      title={`Vídeo de ${product.name}`}
                    />
                  </div>
                )}
              </TabsContent>
            </Tabs>

            {/* Botão Simular com IA */}
            <Button
              size="lg"
              className="w-full h-14 text-base font-semibold bg-gradient-to-r from-primary via-primary to-primary/90 hover:from-primary hover:via-primary/90 hover:to-primary shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02]"
              onClick={() => navigate('/visualizador')}
            >
              <Sparkles className="mr-2 h-5 w-5" />
              Simular com IA
            </Button>
          </div>

          {/* Informações do Produto */}
          <div className="space-y-5">
            {/* Badges e Título */}
            <div>
              <div className="flex flex-wrap gap-2 mb-3">
                {product.is_featured && (
                  <Badge className="bg-primary/90 text-primary-foreground text-xs px-3 py-1.5 font-semibold">
                    Destaque
                  </Badge>
                )}
                {product.categories && (
                  <Badge variant="secondary" className="text-xs px-3 py-1.5 font-medium">
                    {product.categories.name}
                  </Badge>
                )}
              </div>
              
              <h1 className="text-3xl md:text-4xl font-bold mb-2 leading-tight">
                {product.name}
              </h1>
              
              <p className="text-sm text-muted-foreground">
                Código: <span className="font-semibold text-foreground">{product.item_code}</span>
              </p>
            </div>

            {/* Descrição */}
            {product.description && (
              <p className="text-sm text-foreground/70 leading-relaxed border-l-4 border-primary/30 pl-4 py-2">
                {product.description}
              </p>
            )}

            {/* Especificações Técnicas */}
            <Card className="border-border/50 shadow-sm bg-muted/20">
              <CardHeader className="pb-3">
                <CardTitle className="text-base font-semibold">Especificações Técnicas</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {product.frame_size && (
                  <div className="flex items-center gap-3 pb-3 border-b border-border/50 last:border-0">
                    <div className="p-2 bg-primary/10 rounded-lg shrink-0">
                      <Ruler className="h-4 w-4 text-primary" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs text-muted-foreground">Tamanho da Moldura</p>
                      <p className="font-semibold text-sm truncate">{product.frame_size}</p>
                    </div>
                  </div>
                )}
                
                {product.graphic_size && (
                  <div className="flex items-center gap-3 pb-3 border-b border-border/50 last:border-0">
                    <div className="p-2 bg-primary/10 rounded-lg shrink-0">
                      <Package className="h-4 w-4 text-primary" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs text-muted-foreground">Tamanho do Gráfico</p>
                      <p className="font-semibold text-sm truncate">{product.graphic_size}</p>
                    </div>
                  </div>
                )}
                
                {product.gross_weight && (
                  <div className="flex items-center gap-3 pb-3 border-b border-border/50 last:border-0">
                    <div className="p-2 bg-primary/10 rounded-lg shrink-0">
                      <Weight className="h-4 w-4 text-primary" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs text-muted-foreground">Peso Bruto</p>
                      <p className="font-semibold text-sm truncate">{product.gross_weight}</p>
                    </div>
                  </div>
                )}
                
                {product.packing_size && (
                  <div className="flex items-center gap-3 pb-3 border-b border-border/50 last:border-0">
                    <div className="p-2 bg-primary/10 rounded-lg shrink-0">
                      <Box className="h-4 w-4 text-primary" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs text-muted-foreground">Tamanho da Embalagem</p>
                      <p className="font-semibold text-sm truncate">{product.packing_size}</p>
                    </div>
                  </div>
                )}
                
                {product.pcs_per_ctn && (
                  <div className="flex items-center gap-3 pb-3 border-b border-border/50 last:border-0">
                    <div className="p-2 bg-primary/10 rounded-lg shrink-0">
                      <Package className="h-4 w-4 text-primary" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs text-muted-foreground">Peças por Caixa</p>
                      <p className="font-semibold text-sm truncate">{product.pcs_per_ctn}</p>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Detalhes Adicionais */}
            {product.specifications && Object.keys(product.specifications).length > 0 && (
              <Card className="border-border/50 shadow-sm bg-muted/20">
                <CardHeader className="pb-3">
                  <CardTitle className="text-base font-semibold">Detalhes Adicionais</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {Object.entries(product.specifications).map(([key, value]) => (
                      <div key={key} className="flex justify-between items-center py-2 border-b border-border/30 last:border-0">
                        <span className="text-xs text-muted-foreground capitalize">
                          {key.replace(/_/g, " ")}
                        </span>
                        <span className="font-medium text-xs text-right ml-2">{String(value)}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Botões de Ação */}
            <div className="flex flex-col gap-2.5 pt-2">
              <Button
                size="lg"
                className="w-full h-12 text-base font-semibold shadow-md hover:shadow-lg transition-all duration-300"
                onClick={() => {
                  toast({
                    title: "Orçamento solicitado",
                    description: "Entraremos em contato em breve!",
                  });
                }}
              >
                Solicitar Orçamento
              </Button>
              
              <Button
                size="lg"
                variant="outline"
                className="w-full h-12 text-base font-semibold border-2 hover:bg-muted/50 transition-all duration-300"
                onClick={handleAddToBudget}
                disabled={isInBudget(product.id)}
              >
                {isInBudget(product.id) ? (
                  <>
                    <ShoppingCart className="mr-2 h-5 w-5" />
                    Já está no Orçamento
                  </>
                ) : (
                  <>
                    <Plus className="mr-2 h-5 w-5" />
                    Adicionar ao Orçamento
                  </>
                )}
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-card border-t border-border py-8 mt-12">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          <p className="mb-2">© 2025 Smart Signage by Indústria Visual. Todos os direitos reservados.</p>
          <p>Produto patenteado e desenvolvido com alumínio 100% reciclável.</p>
        </div>
      </footer>
    </div>
  );
};

export default ProductDetail;
