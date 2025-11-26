import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Package, Upload, Grid3x3, Settings, Loader2, LogOut, Image } from "lucide-react";
import ProductList from "@/components/admin/ProductList";
import ProductForm from "@/components/admin/ProductForm";
import ExcelUpload from "@/components/admin/ExcelUpload";
import CategoryManager from "@/components/admin/CategoryManager";
import { HeroImageManager } from "@/components/admin/HeroImageManager";
import { useAdminAuth } from "@/hooks/useAdminAuth";

const Admin = () => {
  const { user, isAdmin, loading, signOut } = useAdminAuth();
  const [activeTab, setActiveTab] = useState("products");
  const [editingProduct, setEditingProduct] = useState<string | null>(null);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  if (!isAdmin) {
    return null;
  }

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="container mx-auto px-4">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold mb-2">
              Painel <span className="gradient-text">Administrativo</span>
            </h1>
            <p className="text-muted-foreground">
              Gerencie produtos, categorias e uploads do catálogo
            </p>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm text-muted-foreground">{user?.email}</span>
            <Button variant="outline" onClick={signOut}>
              <LogOut className="h-4 w-4 mr-2" />
              Sair
            </Button>
          </div>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-5 lg:w-auto lg:inline-grid bg-card">
            <TabsTrigger value="products" className="gap-2">
              <Package className="h-4 w-4" />
              Produtos
            </TabsTrigger>
            <TabsTrigger value="categories" className="gap-2">
              <Grid3x3 className="h-4 w-4" />
              Categorias
            </TabsTrigger>
            <TabsTrigger value="hero" className="gap-2">
              <Image className="h-4 w-4" />
              Hero
            </TabsTrigger>
            <TabsTrigger value="upload" className="gap-2">
              <Upload className="h-4 w-4" />
              Upload Excel
            </TabsTrigger>
            <TabsTrigger value="settings" className="gap-2">
              <Settings className="h-4 w-4" />
              Configurações
            </TabsTrigger>
          </TabsList>

          <TabsContent value="products" className="space-y-6">
            {editingProduct ? (
              <Card className="p-6">
                <ProductForm
                  productId={editingProduct}
                  onClose={() => setEditingProduct(null)}
                />
              </Card>
            ) : (
              <>
                <Card className="p-6">
                  <ProductForm onClose={() => {}} />
                </Card>
                <ProductList onEdit={setEditingProduct} />
              </>
            )}
          </TabsContent>

          <TabsContent value="categories">
            <CategoryManager />
          </TabsContent>

          <TabsContent value="hero">
            <HeroImageManager />
          </TabsContent>

          <TabsContent value="upload">
            <ExcelUpload />
          </TabsContent>

          <TabsContent value="settings">
            <Card className="p-6">
              <h3 className="text-xl font-semibold mb-4">Configurações do Sistema</h3>
              <p className="text-muted-foreground">
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
