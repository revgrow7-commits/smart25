import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Eye, Grid, Layers, Box, Lightbulb, Package } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";

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
    slug: string;
  } | null;
  product_images: ProductImage[];
}

interface Category {
  id: string;
  name: string;
  slug: string;
  description: string | null;
}

const getCategoryIcon = (slug: string) => {
  switch (slug) {
    case "solucoes-stands":
      return <Package className="w-5 h-5" />;
    case "modulos":
      return <Box className="w-5 h-5" />;
    case "lightbox-seg":
      return <Lightbulb className="w-5 h-5" />;
    case "acessorios":
      return <Layers className="w-5 h-5" />;
    default:
      return <Grid className="w-5 h-5" />;
  }
};

const ProductCatalog = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, []);

  useEffect(() => {
    let filtered = products;

    // Filter by category
    if (selectedCategory) {
      filtered = filtered.filter(
        (product) => product.categories?.slug === selectedCategory
      );
    }

    // Filter by search term
    if (searchTerm.trim() !== "") {
      filtered = filtered.filter(
        (product) =>
          product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          product.item_code.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredProducts(filtered);
  }, [searchTerm, products, selectedCategory]);

  const fetchCategories = async () => {
    try {
      const { data, error } = await supabase
        .from("categories")
        .select("*")
        .order("name");

      if (error) throw error;

      setCategories(data || []);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  const fetchProducts = async () => {
    try {
      const { data, error } = await supabase
        .from("products")
        .select(`
          *,
          categories (name, slug),
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

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar de categorias */}
          <aside className="lg:w-64 flex-shrink-0">
            <div className="bg-card border border-border rounded-lg p-4 sticky top-4">
              <h3 className="font-bold text-lg mb-4">Categorias</h3>
              <nav className="space-y-2">
                <button
                  onClick={() => setSelectedCategory(null)}
                  className={cn(
                    "w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all text-left",
                    !selectedCategory
                      ? "bg-primary text-primary-foreground"
                      : "hover:bg-muted text-foreground"
                  )}
                >
                  <Grid className="w-5 h-5" />
                  <span>Todos os Produtos</span>
                </button>
                {categories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.slug)}
                    className={cn(
                      "w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all text-left",
                      selectedCategory === category.slug
                        ? "bg-primary text-primary-foreground"
                        : "hover:bg-muted text-foreground"
                    )}
                  >
                    {getCategoryIcon(category.slug)}
                    <span>{category.name}</span>
                  </button>
                ))}
              </nav>
            </div>
          </aside>

          {/* Grid de produtos */}
          <div className="flex-1">
            {loading ? (
              <div className="text-center py-12">
                <p className="text-muted-foreground">Carregando produtos...</p>
              </div>
            ) : filteredProducts.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-muted-foreground">
                  {searchTerm || selectedCategory ? "Nenhum produto encontrado." : "Nenhum produto disponível no momento."}
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
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
                        <p className="text-xs text-muted-foreground mb-1">{product.item_code}</p>
                        <h3 className="text-xl font-bold">{product.name}</h3>
                      </div>
                      
                      {product.description && (
                        <p className="text-sm text-muted-foreground line-clamp-2">
                          {product.description}
                        </p>
                      )}
                      
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        {product.frame_size && (
                          <div>
                            <span className="text-muted-foreground block text-xs">Área</span>
                            <p className="font-semibold">{product.frame_size}</p>
                          </div>
                        )}
                        {product.graphic_size && (
                          <div>
                            <span className="text-muted-foreground block text-xs">Composição</span>
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
        </div>
      </div>
    </section>
  );
};

export default ProductCatalog;
