import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, Package, Ruler, Weight, Box, Play, RotateCcw, RotateCw, ZoomIn, ZoomOut } from "lucide-react";
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
  const [product, setProduct] = useState<Product | null>(null);
  const [selectedImage, setSelectedImage] = useState<string>("");
  const [loading, setLoading] = useState(true);
  const [modelLoading, setModelLoading] = useState(false);
  const [modelProgress, setModelProgress] = useState(0);

  useEffect(() => {
    if (id) {
      fetchProduct();
    }
  }, [id]);

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

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Galeria de Imagens */}
          <div className="space-y-4">
            <div className="aspect-square rounded-lg overflow-hidden bg-muted border border-border">
              <img
                src={selectedImage || "/placeholder.svg"}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
            
            {product.product_images.length > 1 && (
              <div className="grid grid-cols-4 gap-4">
                {product.product_images.map((image) => (
                  <button
                    key={image.id}
                    onClick={() => setSelectedImage(image.image_url)}
                    className={`aspect-square rounded-lg overflow-hidden border-2 transition-all ${
                      selectedImage === image.image_url
                        ? "border-primary"
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
          <div className="space-y-6">
            <div>
              <div className="flex gap-2 mb-3">
                {product.is_featured && (
                  <Badge className="bg-primary">Destaque</Badge>
                )}
                {product.categories && (
                  <Badge variant="secondary">{product.categories.name}</Badge>
                )}
              </div>
              
              <h1 className="text-3xl md:text-4xl font-bold mb-2">
                {product.name}
              </h1>
              
              <p className="text-lg text-muted-foreground mb-4">
                Código: {product.item_code}
              </p>

              {product.description && (
                <p className="text-foreground/90 leading-relaxed">
                  {product.description}
                </p>
              )}
            </div>

            {/* Especificações Rápidas */}
            <div className="grid grid-cols-2 gap-4">
              {product.frame_size && (
                <Card>
                  <CardContent className="p-4 flex items-center gap-3">
                    <Ruler className="h-5 w-5 text-primary" />
                    <div>
                      <p className="text-sm text-muted-foreground">Moldura</p>
                      <p className="font-semibold">{product.frame_size}</p>
                    </div>
                  </CardContent>
                </Card>
              )}
              
              {product.graphic_size && (
                <Card>
                  <CardContent className="p-4 flex items-center gap-3">
                    <Package className="h-5 w-5 text-primary" />
                    <div>
                      <p className="text-sm text-muted-foreground">Gráfico</p>
                      <p className="font-semibold">{product.graphic_size}</p>
                    </div>
                  </CardContent>
                </Card>
              )}
              
              {product.gross_weight && (
                <Card>
                  <CardContent className="p-4 flex items-center gap-3">
                    <Weight className="h-5 w-5 text-primary" />
                    <div>
                      <p className="text-sm text-muted-foreground">Peso</p>
                      <p className="font-semibold">{product.gross_weight}</p>
                    </div>
                  </CardContent>
                </Card>
              )}
              
              {product.packing_size && (
                <Card>
                  <CardContent className="p-4 flex items-center gap-3">
                    <Box className="h-5 w-5 text-primary" />
                    <div>
                      <p className="text-sm text-muted-foreground">Embalagem</p>
                      <p className="font-semibold">{product.packing_size}</p>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>

            <Button size="lg" className="w-full btn-primary">
              Solicitar Orçamento
            </Button>
          </div>
        </div>

        {/* Tabs de Conteúdo Expandido */}
        <Tabs defaultValue="specs" className="w-full">
          <TabsList className="grid w-full grid-cols-3 lg:w-auto lg:inline-grid">
            <TabsTrigger value="specs">Especificações</TabsTrigger>
            {product.video_url && (
              <TabsTrigger value="video">Vídeo</TabsTrigger>
            )}
            {product.model_3d_url && (
              <TabsTrigger value="3d">Modelo 3D</TabsTrigger>
            )}
          </TabsList>

          <TabsContent value="specs" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Especificações Técnicas</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {product.frame_size && (
                    <div className="space-y-1">
                      <p className="text-sm font-medium text-muted-foreground">Tamanho da Moldura</p>
                      <p className="text-lg font-semibold">{product.frame_size}</p>
                    </div>
                  )}
                  
                  {product.graphic_size && (
                    <div className="space-y-1">
                      <p className="text-sm font-medium text-muted-foreground">Tamanho do Gráfico</p>
                      <p className="text-lg font-semibold">{product.graphic_size}</p>
                    </div>
                  )}
                  
                  {product.gross_weight && (
                    <div className="space-y-1">
                      <p className="text-sm font-medium text-muted-foreground">Peso Bruto</p>
                      <p className="text-lg font-semibold">{product.gross_weight}</p>
                    </div>
                  )}
                  
                  {product.packing_size && (
                    <div className="space-y-1">
                      <p className="text-sm font-medium text-muted-foreground">Tamanho da Embalagem</p>
                      <p className="text-lg font-semibold">{product.packing_size}</p>
                    </div>
                  )}
                  
                  {product.pcs_per_ctn && (
                    <div className="space-y-1">
                      <p className="text-sm font-medium text-muted-foreground">Peças por Caixa</p>
                      <p className="text-lg font-semibold">{product.pcs_per_ctn}</p>
                    </div>
                  )}

                  {product.specifications && Object.keys(product.specifications).length > 0 && (
                    <div className="md:col-span-2 space-y-3 pt-4 border-t border-border">
                      <h4 className="font-semibold text-lg">Detalhes Adicionais</h4>
                      {Object.entries(product.specifications).map(([key, value]) => (
                        <div key={key} className="flex justify-between py-2 border-b border-border/50">
                          <span className="text-muted-foreground capitalize">{key.replace(/_/g, ' ')}</span>
                          <span className="font-medium">{String(value)}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {product.video_url && (
            <TabsContent value="video" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
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
            </TabsContent>
          )}

          {product.model_3d_url && (
            <TabsContent value="3d" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Box className="h-5 w-5" />
                    Modelo 3D - Visualização Interativa
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="relative rounded-lg overflow-hidden bg-muted border border-border" style={{ height: '600px' }}>
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
                      poster={placeholderImage}
                      loading="eager"
                      reveal="interaction"
                      alt={`Modelo 3D de ${product.name}`}
                      ar="true"
                      camera-controls="true"
                      auto-rotate="true"
                      shadow-intensity="1"
                      exposure="1.2"
                      min-field-of-view="10deg"
                      max-field-of-view="45deg"
                      style={{ width: '100%', height: '100%' }}
                      {...{
                        onLoad: () => {
                          setModelLoading(false);
                          setModelProgress(100);
                        },
                        onProgress: (event: any) => {
                          const progress = Math.round((event.detail.totalProgress || 0) * 100);
                          setModelProgress(progress);
                          if (progress < 100) {
                            setModelLoading(true);
                          }
                        }
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
                  <p className="text-sm text-muted-foreground mt-4">
                    Use o mouse ou toque na tela para rotacionar, zoom e explorar o modelo 3D. Em dispositivos compatíveis, você pode visualizar em Realidade Aumentada.
                  </p>
                </CardContent>
              </Card>
            </TabsContent>
          )}
        </Tabs>
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
