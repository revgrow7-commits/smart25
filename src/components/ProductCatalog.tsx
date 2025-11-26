import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Eye } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";

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
  is_featured: boolean | null;
  categories: {
    name: string;
  } | null;
  product_images: ProductImage[];
}

const ProductCatalog = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    if (searchTerm.trim() === "") {
      setFilteredProducts(products);
    } else {
      const filtered = products.filter(
        (product) =>
          product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          product.item_code.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredProducts(filtered);
    }
  }, [searchTerm, products]);

  const fetchProducts = async () => {
    try {
      const { data, error } = await supabase
        .from("products")
        .select(`
          *,
          categories (name),
          product_images (*)
        `)
        .eq("status", "active")
        .order("created_at", { ascending: false });

      if (error) throw error;

      setProducts(data || []);
      setFilteredProducts(data || []);
    } catch (error) {
      console.error("Error fetching products:", error);
      toast({
        title: "Erro ao carregar produtos",
        description: "Não foi possível carregar os produtos. Tente novamente.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const getPrimaryImage = (product: Product) => {
    const primaryImage = product.product_images.find((img) => img.is_primary);
    if (primaryImage) return primaryImage.image_url;
    if (product.product_images.length > 0) return product.product_images[0].image_url;
    return "/placeholder.svg";
  };

  return (
    <section id="catalogo" className="py-12 md:py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8 md:mb-12">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-3 md:mb-4">
            Catálogo de <span className="gradient-text">Soluções Modulares</span>
          </h2>
          <p className="text-base md:text-xl text-muted-foreground mb-6 md:mb-8">
            Sistemas inteligentes para eventos corporativos
          </p>
          
          <div className="max-w-md mx-auto">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input 
                placeholder="Buscar por nome ou código..." 
                className="pl-10 bg-card border-border"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
        </div>

        {loading ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">Carregando produtos...</p>
          </div>
        ) : filteredProducts.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">
              {searchTerm ? "Nenhum produto encontrado com esse termo." : "Nenhum produto disponível no momento."}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map((product) => (
              <Card 
                key={product.id}
                className="group overflow-hidden bg-card border-border hover:border-primary/50 transition-all duration-500 hover-lift"
              >
                <div className="relative h-64 bg-gradient-to-br from-muted/50 to-muted overflow-hidden">
                  <img 
                    src={getPrimaryImage(product)} 
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-card/90 to-transparent"></div>
                  <div className="absolute top-4 left-4 flex gap-2">
                    {product.is_featured && (
                      <Badge className="bg-primary/90 hover:bg-primary">
                        Destaque
                      </Badge>
                    )}
                    {product.categories && (
                      <Badge className="bg-secondary/90 hover:bg-secondary">
                        {product.categories.name}
                      </Badge>
                    )}
                  </div>
                </div>
                
                <div className="p-6 space-y-4">
                  <div>
                    <h3 className="text-xl font-bold mb-1">{product.name}</h3>
                    <p className="text-sm text-muted-foreground">{product.item_code}</p>
                  </div>
                  
                  {product.description && (
                    <p className="text-sm text-muted-foreground line-clamp-2">
                      {product.description}
                    </p>
                  )}
                  
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    {product.frame_size && (
                      <div>
                        <span className="text-muted-foreground">Moldura</span>
                        <p className="font-semibold">{product.frame_size}</p>
                      </div>
                    )}
                    {product.graphic_size && (
                      <div>
                        <span className="text-muted-foreground">Gráfico</span>
                        <p className="font-semibold">{product.graphic_size}</p>
                      </div>
                    )}
                  </div>
                  
                  <Button 
                    className="w-full btn-primary"
                    onClick={() => navigate(`/produto/${product.id}`)}
                  >
                    <Eye className="mr-2 h-4 w-4" />
                    Ver Detalhes
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default ProductCatalog;
