import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Star, StarOff } from "lucide-react";
import { toast } from "sonner";

interface Product {
  id: string;
  name: string;
  item_code: string;
  is_featured: boolean;
  product_images: Array<{
    image_url: string;
    is_primary: boolean;
  }>;
}

const FeaturedProductsManager = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState<string | null>(null);

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
          is_featured,
          product_images (
            image_url,
            is_primary
          )
        `)
        .eq("status", "active")
        .order("name", { ascending: true });

      if (error) throw error;
      setProducts(data || []);
    } catch (error) {
      console.error("Error fetching products:", error);
      toast.error("Erro ao carregar produtos");
    } finally {
      setLoading(false);
    }
  };

  const toggleFeatured = async (productId: string, currentStatus: boolean) => {
    setUpdating(productId);
    try {
      const { error } = await supabase
        .from("products")
        .update({ is_featured: !currentStatus })
        .eq("id", productId);

      if (error) throw error;

      setProducts(products.map(p => 
        p.id === productId ? { ...p, is_featured: !currentStatus } : p
      ));

      toast.success(
        !currentStatus 
          ? "Produto adicionado aos destaques" 
          : "Produto removido dos destaques"
      );
    } catch (error) {
      console.error("Error updating product:", error);
      toast.error("Erro ao atualizar produto");
    } finally {
      setUpdating(null);
    }
  };

  const getPrimaryImage = (product: Product) => {
    const primaryImage = product.product_images?.find((img) => img.is_primary);
    return primaryImage?.image_url || product.product_images?.[0]?.image_url || "/placeholder.svg";
  };

  if (loading) {
    return (
      <div className="space-y-4">
        {[1, 2, 3, 4].map((i) => (
          <Skeleton key={i} className="h-32" />
        ))}
      </div>
    );
  }

  const featuredProducts = products.filter(p => p.is_featured);
  const otherProducts = products.filter(p => !p.is_featured);

  return (
    <div className="space-y-8">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Star className="h-5 w-5 text-primary" />
            Produtos em Destaque ({featuredProducts.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          {featuredProducts.length === 0 ? (
            <p className="text-muted-foreground text-center py-8">
              Nenhum produto em destaque. Selecione produtos abaixo para adicionar.
            </p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {featuredProducts.map((product) => (
                <Card key={product.id} className="overflow-hidden">
                  <div className="aspect-video overflow-hidden bg-muted">
                    <img
                      src={getPrimaryImage(product)}
                      alt={product.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <CardContent className="p-4">
                    <div className="mb-2">
                      <span className="text-xs text-muted-foreground">{product.item_code}</span>
                    </div>
                    <h4 className="font-semibold mb-3 text-foreground">{product.name}</h4>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => toggleFeatured(product.id, product.is_featured)}
                      disabled={updating === product.id}
                      className="w-full"
                    >
                      <StarOff className="h-4 w-4 mr-2" />
                      Remover dos Destaques
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Todos os Produtos ({otherProducts.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {otherProducts.map((product) => (
              <div
                key={product.id}
                className="flex items-center gap-4 p-3 rounded-lg border border-border bg-card hover:bg-accent transition-colors"
              >
                <div className="w-16 h-16 rounded overflow-hidden bg-muted flex-shrink-0">
                  <img
                    src={getPrimaryImage(product)}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs text-muted-foreground">{product.item_code}</p>
                  <p className="font-medium text-foreground truncate">{product.name}</p>
                </div>
                <Button
                  variant="default"
                  size="sm"
                  onClick={() => toggleFeatured(product.id, product.is_featured)}
                  disabled={updating === product.id}
                >
                  <Star className="h-4 w-4 mr-2" />
                  Adicionar
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default FeaturedProductsManager;
