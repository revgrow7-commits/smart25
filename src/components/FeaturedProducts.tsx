import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Box, Sparkles, Plus, ShoppingCart } from "lucide-react";
import { useBudget } from "@/contexts/BudgetContext";
import { useToast } from "@/hooks/use-toast";

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  item_code: string;
  model_3d_url: string | null;
  sketchfab_url: string | null;
  product_images: Array<{
    image_url: string;
    is_primary: boolean;
  }>;
}

const FeaturedProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { addItem, isInBudget } = useBudget();
  const { toast } = useToast();

  useEffect(() => {
    fetchFeaturedProducts();
  }, []);

  const fetchFeaturedProducts = async () => {
    try {
      const { data, error } = await supabase
        .from("products")
        .select(`
          id,
          name,
          description,
          price,
          item_code,
          model_3d_url,
          sketchfab_url,
          product_images (
            image_url,
            is_primary
          )
        `)
        .eq("is_featured", true)
        .eq("status", "active")
        .order("created_at", { ascending: false });

      if (error) throw error;
      setProducts(data || []);
    } catch (error) {
      console.error("Error fetching featured products:", error);
    } finally {
      setLoading(false);
    }
  };

  const getPrimaryImage = (product: Product) => {
    const primaryImage = product.product_images?.find((img) => img.is_primary);
    return primaryImage?.image_url || product.product_images?.[0]?.image_url || "/placeholder.svg";
  };

  const handleAddToBudget = (product: Product, e: React.MouseEvent) => {
    e.stopPropagation();
    addItem({
      id: product.id,
      name: product.name,
      item_code: product.item_code,
      image_url: getPrimaryImage(product),
      description: product.description || undefined,
    });
    toast({
      title: "Adicionado ao orçamento",
      description: `${product.name} foi adicionado ao seu orçamento.`,
    });
  };

  if (loading) {
    return (
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <Skeleton className="h-10 w-64 mx-auto mb-4" />
            <Skeleton className="h-6 w-96 mx-auto" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <Skeleton key={i} className="h-96" />
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (!products.length) return null;

  return (
    <section className="py-12 md:py-16 lg:py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8 md:mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-3 md:mb-4 text-foreground">
            {t('featuredProducts.title', 'Produtos em Destaque')}
          </h2>
          <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto px-4">
            {t('featuredProducts.subtitle', 'Confira nossa seleção especial de produtos')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {products.map((product) => (
            <Card
              key={product.id}
              className="group overflow-hidden hover:shadow-lg transition-all duration-300 border-border bg-card"
            >
              <div className="relative aspect-square overflow-hidden bg-muted cursor-pointer" onClick={() => navigate(`/produto/${product.id}`)}>
                <img
                  src={getPrimaryImage(product)}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
                
                {/* Ícones 3D e IA */}
                <div className="absolute top-3 right-3 flex gap-2">
                  {(product.model_3d_url || product.sketchfab_url) && (
                    <Badge className="bg-primary/90 hover:bg-primary text-xs flex items-center gap-1">
                      <Box className="w-3 h-3" />
                      3D
                    </Badge>
                  )}
                  <Badge className="bg-accent/90 hover:bg-accent text-accent-foreground text-xs flex items-center gap-1">
                    <Sparkles className="w-3 h-3" />
                    IA
                  </Badge>
                </div>
              </div>
              <CardContent className="p-4 md:p-6">
                <div className="mb-2">
                  <span className="text-xs text-muted-foreground">{product.item_code}</span>
                </div>
                <h3 className="text-lg md:text-xl font-semibold mb-2 text-foreground group-hover:text-primary transition-colors cursor-pointer" onClick={() => navigate(`/produto/${product.id}`)}>
                  {product.name}
                </h3>
                <p className="text-sm text-muted-foreground line-clamp-2 mb-3 md:mb-4">
                  {product.description}
                </p>
                {product.price && (
                  <p className="text-base md:text-lg font-bold text-primary mb-3">
                    ${product.price.toFixed(2)}
                  </p>
                )}
                <Button
                  variant={isInBudget(product.id) ? "secondary" : "outline"}
                  size="sm"
                  onClick={(e) => handleAddToBudget(product, e)}
                  disabled={isInBudget(product.id)}
                  className="w-full"
                >
                  {isInBudget(product.id) ? (
                    <>
                      <ShoppingCart className="mr-2 h-4 w-4" />
                      No Orçamento
                    </>
                  ) : (
                    <>
                      <Plus className="mr-2 h-4 w-4" />
                      Adicionar ao Orçamento
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
