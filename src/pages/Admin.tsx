import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Package, Upload, Grid3x3, Settings, Image, Star, FileText, LogOut, Loader2 } from "lucide-react";
import ProductList from "@/components/admin/ProductList";
import ProductForm from "@/components/admin/ProductForm";
import ExcelUpload from "@/components/admin/ExcelUpload";
import CategoryManager from "@/components/admin/CategoryManager";
import { HeroImageManager } from "@/components/admin/HeroImageManager";
import FeaturedProductsManager from "@/components/admin/FeaturedProductsManager";
import BlogPostManager from "@/components/admin/BlogPostManager";
import { useAdminAuth } from "@/hooks/useAdminAuth";

const Admin = () => {
  const [activeTab, setActiveTab] = useState("products");
  const [editingProduct, setEditingProduct] = useState<string | null>(null);
  const { signOut, user, isAdmin, loading } = useAdminAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading) {
      if (!user) {
        navigate("/auth");
      } else if (!isAdmin) {
        navigate("/access-denied");
      }
    }
  }, [user, isAdmin, loading, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  if (!user || !isAdmin) {
    return null;
  }

  return (
    <div className="min-h-screen bg-background py-4 md:py-8">
      <div className="container mx-auto px-4">
        <div className="mb-6 md:mb-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-2xl md:text-4xl font-bold mb-2">
              Painel <span className="gradient-text">Administrativo</span>
            </h1>
            <p className="text-sm md:text-base text-muted-foreground">
              {user?.email}
            </p>
          </div>
          <Button variant="outline" onClick={signOut} className="w-fit">
            <LogOut className="h-4 w-4 mr-2" />
            Sair
          </Button>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4 md:space-y-6">
          <div className="overflow-x-auto -mx-4 px-4 md:mx-0 md:px-0">
            <TabsList className="inline-flex w-max md:w-full md:grid md:grid-cols-7 bg-card min-w-max">
              <TabsTrigger value="products" className="gap-1 md:gap-2 text-xs md:text-sm whitespace-nowrap">
                <Package className="h-3 w-3 md:h-4 md:w-4" />
                <span className="hidden sm:inline">Produtos</span>
              </TabsTrigger>
              <TabsTrigger value="featured" className="gap-1 md:gap-2 text-xs md:text-sm whitespace-nowrap">
                <Star className="h-3 w-3 md:h-4 md:w-4" />
                <span className="hidden sm:inline">Destaques</span>
              </TabsTrigger>
              <TabsTrigger value="categories" className="gap-1 md:gap-2 text-xs md:text-sm whitespace-nowrap">
                <Grid3x3 className="h-3 w-3 md:h-4 md:w-4" />
                <span className="hidden sm:inline">Categorias</span>
              </TabsTrigger>
              <TabsTrigger value="blog" className="gap-1 md:gap-2 text-xs md:text-sm whitespace-nowrap">
                <FileText className="h-3 w-3 md:h-4 md:w-4" />
                <span className="hidden sm:inline">Blog</span>
              </TabsTrigger>
              <TabsTrigger value="hero" className="gap-1 md:gap-2 text-xs md:text-sm whitespace-nowrap">
                <Image className="h-3 w-3 md:h-4 md:w-4" />
                <span className="hidden sm:inline">Hero</span>
              </TabsTrigger>
              <TabsTrigger value="upload" className="gap-1 md:gap-2 text-xs md:text-sm whitespace-nowrap">
                <Upload className="h-3 w-3 md:h-4 md:w-4" />
                <span className="hidden sm:inline">Upload</span>
              </TabsTrigger>
              <TabsTrigger value="settings" className="gap-1 md:gap-2 text-xs md:text-sm whitespace-nowrap">
                <Settings className="h-3 w-3 md:h-4 md:w-4" />
                <span className="hidden sm:inline">Config</span>
              </TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="products" className="space-y-4 md:space-y-6">
            {editingProduct ? (
              <Card className="p-4 md:p-6">
                <ProductForm
                  productId={editingProduct}
                  onClose={() => setEditingProduct(null)}
                />
              </Card>
            ) : (
              <>
                <Card className="p-4 md:p-6">
                  <ProductForm onClose={() => {}} />
                </Card>
                <ProductList onEdit={setEditingProduct} />
              </>
            )}
          </TabsContent>

          <TabsContent value="featured">
            <FeaturedProductsManager />
          </TabsContent>

          <TabsContent value="categories">
            <CategoryManager />
          </TabsContent>

          <TabsContent value="blog">
            <BlogPostManager />
          </TabsContent>

          <TabsContent value="hero">
            <HeroImageManager />
          </TabsContent>

          <TabsContent value="upload">
            <ExcelUpload />
          </TabsContent>

          <TabsContent value="settings">
            <Card className="p-4 md:p-6">
              <h3 className="text-lg md:text-xl font-semibold mb-4">Configurações do Sistema</h3>
              <p className="text-sm md:text-base text-muted-foreground">
                Configurações adicionais estarão disponíveis em breve.
              </p>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Admin;
