import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Eye, Grid, Layers, Box, Lightbulb, Package, Sparkles, ShoppingCart, Plus } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";
import { useBudget } from "@/contexts/BudgetContext";

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
  product_group: string | null;
  model_3d_url: string | null;
  sketchfab_url: string | null;
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

interface ProductCatalogProps {
  categorySlug?: string;
  limit?: number;
  productGroup?: string;
  showFilters?: boolean;
}

const ProductCatalog = ({ categorySlug, limit, productGroup, showFilters = true }: ProductCatalogProps = {}) => {
  const navigate = useNavigate();
  const { addItem, isInBudget } = useBudget();
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [groups, setGroups] = useState<string[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedGroup, setSelectedGroup] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    fetchProducts();
    if (!categorySlug) {
      fetchCategories();
    }
  }, [categorySlug]);

  useEffect(() => {
    let filtered = products;

    // Filter by category (família)
    if (selectedCategory) {
      filtered = filtered.filter(
        (product) => product.categories?.slug === selectedCategory
      );
    }

    // Filter by group (grupo)
    if (selectedGroup) {
      filtered = filtered.filter(
        (product) => product.product_group === selectedGroup
      );
    }

    // Filter by search term
    if (searchTerm.trim() !== "") {
      filtered = filtered.filter(
        (product) =>
          product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          product.item_code.toLowerCase().includes(searchTerm.toLowerCase()) ||
          (product.description && product.description.toLowerCase().includes(searchTerm.toLowerCase())) ||
          (product.product_group && product.product_group.toLowerCase().includes(searchTerm.toLowerCase())) ||
          (product.categories?.name && product.categories.name.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    setFilteredProducts(filtered);
    
    // Update available groups based on selected category
    if (selectedCategory) {
      const availableGroups = Array.from(
        new Set(
          filtered
            .filter(p => p.product_group)
            .map(p => p.product_group as string)
        )
      ).sort();
      setGroups(availableGroups);
    } else {
      const allGroups = Array.from(
        new Set(
          products
            .filter(p => p.product_group)
            .map(p => p.product_group as string)
        )
      ).sort();
      setGroups(allGroups);
    }
  }, [searchTerm, products, selectedCategory, selectedGroup]);

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
      let query = supabase
        .from("products")
        .select(`
          *,
          categories (name, slug),
          product_images (*)
        `)
        .eq("status", "active");

      // Filter by category if categorySlug prop is provided
      if (categorySlug) {
        const { data: categoryData } = await supabase
          .from('categories')
          .select('id')
          .eq('slug', categorySlug)
          .maybeSingle();
        
        if (categoryData) {
          query = query.eq('category_id', categoryData.id);
        }
      }

      // Filter by product group if productGroup prop is provided
      if (productGroup) {
        query = query.eq('product_group', productGroup);
      }

      let { data, error } = await query.order("created_at", { ascending: false });

      if (error) throw error;

      // Apply limit if provided
      if (limit && data) {
        data = data.slice(0, limit);
      }

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

  const handleAddToBudget = (product: Product, e: React.MouseEvent) => {
    e.stopPropagation();
    addItem({
      id: product.id,
      name: product.name,
      item_code: product.item_code,
      image_url: getPrimaryImage(product),
      description: product.description || undefined,
      frame_size: product.frame_size || undefined,
      graphic_size: product.graphic_size || undefined,
    });
    toast({
      title: "Adicionado ao orçamento",
      description: `${product.name} foi adicionado ao seu orçamento.`,
    });
  };

  return (
    <section id="catalogo" className="py-8 md:py-12 lg:py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-6 md:mb-8 lg:mb-12">
          <h2 className="text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold mb-2 md:mb-3 lg:mb-4">
            Catálogo de <span className="gradient-text">Soluções Modulares</span>
          </h2>
          <p className="text-sm md:text-base lg:text-xl text-muted-foreground mb-4 md:mb-6 lg:mb-8 px-2">
            Sistemas inteligentes para eventos corporativos
          </p>
          
          <div className="max-w-md mx-auto">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 md:h-5 md:w-5 text-muted-foreground" />
              <Input 
                placeholder="Buscar por nome, código, descrição, grupo ou categoria..." 
                className="pl-9 md:pl-10 bg-card border-border text-sm md:text-base"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-4 md:gap-6 lg:gap-8">
          {/* Sidebar de filtros hierárquicos - only show if no categorySlug prop */}
          {showFilters && !categorySlug && (
          <aside className="lg:w-64 flex-shrink-0 space-y-3 md:space-y-4">
            {/* Filtro de Famílias (Categorias) */}
            <div className="bg-card border border-border rounded-lg p-3 md:p-4 lg:sticky lg:top-4">
              <h3 className="font-bold text-base md:text-lg mb-3 md:mb-4">Famílias</h3>
              <nav className="space-y-1.5 md:space-y-2">
                {categories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => {
                      setSelectedCategory(category.slug);
                      setSelectedGroup(null);
                    }}
                    className={cn(
                      "w-full flex items-center gap-2 md:gap-3 px-3 md:px-4 py-2 md:py-3 rounded-lg transition-all text-left text-sm md:text-base",
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

            {/* Filtro de Grupos - só mostra se houver grupos disponíveis */}
            {groups.length > 0 && (
              <div className="bg-card border border-border rounded-lg p-3 md:p-4">
                <h3 className="font-bold text-base md:text-lg mb-3 md:mb-4">Grupos</h3>
                <nav className="space-y-1.5 md:space-y-2">
                  <button
                    onClick={() => setSelectedGroup(null)}
                    className={cn(
                      "w-full flex items-center gap-2 md:gap-3 px-3 md:px-4 py-2 md:py-3 rounded-lg transition-all text-left text-sm md:text-base",
                      !selectedGroup
                        ? "bg-secondary text-secondary-foreground"
                        : "hover:bg-muted text-foreground"
                    )}
                  >
                    <Layers className="w-3 h-3 md:w-4 md:h-4 flex-shrink-0" />
                    <span>Todos os Grupos</span>
                  </button>
                  {groups.map((group) => (
                    <button
                      key={group}
                      onClick={() => setSelectedGroup(group)}
                      className={cn(
                        "w-full flex items-center gap-2 md:gap-3 px-3 md:px-4 py-2 md:py-3 rounded-lg transition-all text-left text-xs md:text-sm",
                        selectedGroup === group
                          ? "bg-secondary text-secondary-foreground"
                          : "hover:bg-muted text-foreground"
                      )}
                    >
                      <Box className="w-3 h-3 md:w-4 md:h-4 flex-shrink-0" />
                      <span>{group}</span>
                    </button>
                  ))}
                </nav>
              </div>
            )}
          </aside>
          )}

          {/* Grid de produtos */}
          <div className="flex-1">
            {loading ? (
              <div className="text-center py-8 md:py-12">
                <p className="text-sm md:text-base text-muted-foreground">Carregando produtos...</p>
              </div>
            ) : filteredProducts.length === 0 ? (
              <div className="text-center py-8 md:py-12">
                <p className="text-sm md:text-base text-muted-foreground">
                  {searchTerm || selectedCategory ? "Nenhum produto encontrado." : "Nenhum produto disponível no momento."}
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-6">
                {filteredProducts.map((product) => (
                  <Card 
                    key={product.id}
                    className="group overflow-hidden bg-card border-border hover:border-primary/50 transition-all duration-500 hover-lift"
                  >
                    <div className="relative h-48 md:h-56 lg:h-64 bg-gradient-to-br from-muted/50 to-muted overflow-hidden">
                      <img 
                        src={getPrimaryImage(product)} 
                        alt={product.name}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-card/90 to-transparent"></div>
                      
                      {/* Ícones 3D e IA */}
                      <div className="absolute top-2 md:top-4 right-2 md:right-4 flex gap-1 md:gap-2">
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

                      <div className="absolute top-2 md:top-4 left-2 md:left-4 flex flex-wrap gap-1 md:gap-2">
                        {product.is_featured && (
                          <Badge className="bg-primary/90 hover:bg-primary text-xs">
                            Destaque
                          </Badge>
                        )}
                        {product.categories && (
                          <Badge className="bg-secondary/90 hover:bg-secondary text-xs">
                            {product.categories.name}
                          </Badge>
                        )}
                        {product.product_group && (
                          <Badge variant="outline" className="bg-background/90 text-xs">
                            {product.product_group}
                          </Badge>
                        )}
                      </div>
                    </div>
                    
                    <div className="p-4 md:p-6 space-y-3 md:space-y-4">
                      <div>
                        <p className="text-xs text-muted-foreground mb-1">{product.item_code}</p>
                        <h3 className="text-base md:text-lg lg:text-xl font-bold">{product.name}</h3>
                      </div>
                      
                      {product.description && (
                        <p className="text-xs md:text-sm text-muted-foreground line-clamp-2">
                          {product.description}
                        </p>
                      )}
                      
                      <div className="grid grid-cols-2 gap-3 md:gap-4 text-xs md:text-sm">
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
                      
                      <div className="flex gap-2">
                        <Button 
                          className="flex-1 btn-primary text-sm md:text-base"
                          onClick={() => navigate(`/produto/${product.id}`)}
                        >
                          <Eye className="mr-2 h-3 w-3 md:h-4 md:w-4" />
                          Ver Detalhes
                        </Button>
                        <Button
                          variant={isInBudget(product.id) ? "secondary" : "outline"}
                          size="icon"
                          onClick={(e) => handleAddToBudget(product, e)}
                          disabled={isInBudget(product.id)}
                          className="flex-shrink-0"
                        >
                          {isInBudget(product.id) ? (
                            <ShoppingCart className="h-4 w-4" />
                          ) : (
                            <Plus className="h-4 w-4" />
                          )}
                        </Button>
                      </div>
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
