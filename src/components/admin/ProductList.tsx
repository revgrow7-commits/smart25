import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Edit, Trash2, ImageIcon } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface ProductImage {
  id: string;
  image_url: string;
  is_primary: boolean;
}

interface Product {
  id: string;
  item_code: string;
  name: string;
  category_id: string;
  status: string;
  price: number;
  categories?: {
    name: string;
  };
  product_images?: ProductImage[];
}

interface ProductListProps {
  onEdit: (id: string) => void;
}

const ProductList = ({ onEdit }: ProductListProps) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchProducts = async () => {
    try {
      const { data, error } = await supabase
        .from('products')
        .select(`
          id,
          item_code,
          name,
          category_id,
          status,
          price,
          categories (
            name
          ),
          product_images (
            id,
            image_url,
            is_primary
          )
        `)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setProducts(data || []);
    } catch (error) {
      console.error('Erro ao buscar produtos:', error);
      toast.error("Erro ao carregar produtos");
    } finally {
      setLoading(false);
    }
  };

  const deleteProduct = async (id: string) => {
    if (!confirm("Tem certeza que deseja deletar este produto?")) return;

    try {
      // Deletar imagens do storage primeiro
      const { data: images } = await supabase
        .from('product_images')
        .select('image_url')
        .eq('product_id', id);

      if (images) {
        for (const img of images) {
          const path = img.image_url.split('/').pop();
          if (path) {
            await supabase.storage
              .from('product-images')
              .remove([path]);
          }
        }
      }

      // Deletar registros de imagens
      await supabase
        .from('product_images')
        .delete()
        .eq('product_id', id);

      // Deletar produto
      const { error } = await supabase
        .from('products')
        .delete()
        .eq('id', id);

      if (error) throw error;
      toast.success("Produto deletado com sucesso");
      fetchProducts();
    } catch (error) {
      console.error('Erro ao deletar produto:', error);
      toast.error("Erro ao deletar produto");
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const getPrimaryImage = (product: Product) => {
    if (!product.product_images || product.product_images.length === 0) return null;
    return product.product_images.find(img => img.is_primary) || product.product_images[0];
  };

  if (loading) {
    return <Card className="p-6">Carregando produtos...</Card>;
  }

  return (
    <Card className="p-6">
      <h3 className="text-xl font-semibold mb-4">Lista de Produtos</h3>
      
      {products.length === 0 ? (
        <p className="text-muted-foreground text-center py-8">
          Nenhum produto cadastrado ainda
        </p>
      ) : (
        <div className="space-y-4">
          {products.map((product) => {
            const primaryImage = getPrimaryImage(product);
            
            return (
              <div
                key={product.id}
                className="flex items-center gap-4 p-4 border border-border rounded-lg hover:bg-muted/50 transition-colors"
              >
                {/* Imagem do Produto */}
                <div className="w-20 h-20 flex-shrink-0 bg-muted rounded-lg overflow-hidden">
                  {primaryImage ? (
                    <img
                      src={primaryImage.image_url}
                      alt={product.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <ImageIcon className="h-8 w-8 text-muted-foreground" />
                    </div>
                  )}
                </div>

                {/* Informações do Produto */}
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h4 className="font-semibold">{product.name}</h4>
                    <Badge variant={product.status === 'active' ? 'default' : 'secondary'}>
                      {product.status}
                    </Badge>
                    {product.product_images && product.product_images.length > 0 && (
                      <Badge variant="outline">
                        {product.product_images.length} {product.product_images.length === 1 ? 'imagem' : 'imagens'}
                      </Badge>
                    )}
                  </div>
                  <div className="flex gap-4 text-sm text-muted-foreground">
                    <span>Código: {product.item_code}</span>
                    {product.categories && (
                      <span>Categoria: {product.categories.name}</span>
                    )}
                    {product.price > 0 && (
                      <span>Preço: R$ {product.price.toFixed(2)}</span>
                    )}
                  </div>
                </div>

                {/* Ações */}
                <div className="flex gap-2">
                  <Button
                    size="icon"
                    variant="outline"
                    onClick={() => onEdit(product.id)}
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button
                    size="icon"
                    variant="outline"
                    onClick={() => deleteProduct(product.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </Card>
  );
};

export default ProductList;
