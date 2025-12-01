import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Package, Ruler, Weight, Box, Play, RotateCcw, RotateCw, ZoomIn, ZoomOut, Plus, ShoppingCart } from "lucide-react";
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
      
      // Define a imagem principal como selecionada
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
      
      <div className="container mx-auto px-4 py-8">
        <Button
          variant="ghost"
          onClick={() => navigate("/#catalogo")}
          className="mb-6"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Voltar ao Catálogo
        </Button>

        <div className="grid grid-cols-1 lg:grid-cols-[1.2fr,1fr] gap-6 lg:gap-10 mb-12">
          {/* Galeria de Imagens */}
          <div className="space-y-4 lg:sticky lg:top-24 lg:self-start">
            <div className="aspect-square rounded-2xl overflow-hidden bg-gradient-to-br from-muted/50 to-muted border border-border shadow-lg">
              <img
                src={selectedImage || "/placeholder.svg"}
                alt={product.name}
                className="w-full h-full object-contain p-4"
              />
            </div>
            
            {product.product_images.length > 1 && (
              <div className="grid grid-cols-4 gap-3">
                {product.product_images.map((image) => (
                  <button
                    key={image.id}
                    onClick={() => setSelectedImage(image.image_url)}
                    className={`aspect-square rounded-lg overflow-hidden border-2 transition-all ${
                      selectedImage === image.image_url
                        ? "border-primary shadow-md"
                        : "border-border hover:border-primary/50"
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
          </div>

          {/* Informações do Produto */}
          <div className="space-y-6 lg:space-y-8">
            <div>
              <div className="flex flex-wrap gap-2 mb-4">
                {product.is_featured && (
                  <Badge className="bg-primary text-sm px-3 py-1">Destaque</Badge>
                )}
                {product.categories && (
                  <Badge variant="secondary" className="text-sm px-3 py-1">{product.categories.name}</Badge>
                )}
              </div>
              
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-3 leading-tight">
                {product.name}
              </h1>
              
              <p className="text-base text-muted-foreground mb-6">
                Código: <span className="font-semibold">{product.item_code}</span>
              </p>

              {product.description && (
                <p className="text-base text-foreground/80 leading-relaxed">
                  {product.description}
                </p>
              )}
            </div>

            {/* Especificações Detalhadas */}
            <div className="bg-muted/30 border border-border rounded-xl p-6 space-y-6">
              <h3 className="font-semibold text-lg">Especificações Técnicas</h3>
              <div className="grid grid-cols-1 gap-6">
                {product.frame_size && (
                  <div className="flex items-start gap-3">
                    <div className="p-2 bg-primary/10 rounded-lg">
                      <Ruler className="h-5 w-5 text-primary" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm text-muted-foreground">Tamanho da Moldura</p>
                      <p className="font-semibold text-base">{product.frame_size}</p>
                    </div>
                  </div>
                )}
                
                {product.graphic_size && (
                  <div className="flex items-start gap-3">
                    <div className="p-2 bg-primary/10 rounded-lg">
                      <Package className="h-5 w-5 text-primary" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm text-muted-foreground">Tamanho do Gráfico</p>
                      <p className="font-semibold text-base">{product.graphic_size}</p>
                    </div>
                  </div>
                )}
                
                {product.gross_weight && (
                  <div className="flex items-start gap-3">
                    <div className="p-2 bg-primary/10 rounded-lg">
                      <Weight className="h-5 w-5 text-primary" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm text-muted-foreground">Peso Bruto</p>
                      <p className="font-semibold text-base">{product.gross_weight}</p>
                    </div>
                  </div>
                )}
                
                {product.packing_size && (
                  <div className="flex items-start gap-3">
                    <div className="p-2 bg-primary/10 rounded-lg">
                      <Box className="h-5 w-5 text-primary" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm text-muted-foreground">Tamanho da Embalagem</p>
                      <p className="font-semibold text-base">{product.packing_size}</p>
                    </div>
                  </div>
                )}
                
                {product.pcs_per_ctn && (
                  <div className="flex items-start gap-3">
                    <div className="p-2 bg-primary/10 rounded-lg">
                      <Package className="h-5 w-5 text-primary" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm text-muted-foreground">Peças por Caixa</p>
                      <p className="font-semibold text-base">{product.pcs_per_ctn}</p>
                    </div>
                  </div>
                )}

                {product.specifications && Object.keys(product.specifications).length > 0 && (
                  <div className="space-y-3 pt-4 border-t border-border">
                    <h4 className="font-semibold text-base">Detalhes Adicionais</h4>
                    {Object.entries(product.specifications).map(([key, value]) => (
                      <div key={key} className="flex justify-between py-2 border-b border-border/50">
                        <span className="text-muted-foreground capitalize text-sm">{key.replace(/_/g, ' ')}</span>
                        <span className="font-medium text-sm">{String(value)}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Botões de Ação */}
            <div className="space-y-3">
              <Button 
                size="lg" 
                className="w-full btn-primary text-base h-14 font-semibold"
              >
                Solicitar Orçamento
              </Button>
              
              <Button
                variant={isInBudget(product.id) ? "secondary" : "outline"}
                size="lg"
                onClick={handleAddToBudget}
                disabled={isInBudget(product.id)}
                className="w-full h-12"
              >
                {isInBudget(product.id) ? (
                  <>
                    <ShoppingCart className="mr-2 h-5 w-5" />
                    No Orçamento
                  </>
                ) : (
                  <>
                    <Plus className="mr-2 h-5 w-5" />
                    Adicionar ao Orçamento
                  </>
                )}
              </Button>
            </div>

            {/* Vídeo de Demonstração */}
            {product.video_url && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <Play className="h-5 w-5" />
                    Vídeo de Demonstração
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="aspect-video rounded-lg overflow-hidden bg-muted">
                    <iframe
                      src={product.video_url}
                      className="w-full h-full"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      title={`Vídeo de ${product.name}`}
                    />
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Modelo 3D */}
            {(product.model_3d_url || product.sketchfab_url) && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <Box className="h-5 w-5" />
                    Modelo 3D - Visualização Interativa
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {product.sketchfab_url ? (
                    <div className="relative rounded-lg overflow-hidden bg-muted border border-border" style={{ height: '500px' }}>
                      <iframe
                        src={product.sketchfab_url}
                        className="w-full h-full"
                        allow="autoplay; fullscreen; xr-spatial-tracking"
                        allowFullScreen
                        title={`Modelo 3D de ${product.name}`}
                      />
                    </div>
                  ) : (
                    <div className="relative rounded-lg overflow-hidden bg-muted border border-border" style={{ height: '500px' }}>
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
                  )}
                  <p className="text-sm text-muted-foreground mt-4">
                    {product.sketchfab_url 
                      ? "Modelo 3D fornecido pelo Sketchfab. Use o mouse para interagir com o modelo."
                      : "Use o mouse ou toque na tela para rotacionar, zoom e explorar o modelo 3D. Em dispositivos compatíveis, você pode visualizar em Realidade Aumentada."
                    }
                  </p>
                </CardContent>
              </Card>
            )}
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
