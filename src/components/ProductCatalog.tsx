import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

const ProductCatalog = () => {
  const products = [
    {
      id: 1,
      name: "Smart Flat Premium",
      code: "Booth101-C4A4",
      area: "3x3m (9m²)",
      composition: "1x C4, 1x A4, 1x B2",
      tags: ["Mais vendido", "Setup rápido"],
      image: "/placeholder.svg"
    },
    {
      id: 2,
      name: "Smart Curved Executive",
      code: "Booth102-L6B2",
      area: "4x3m (12m²)",
      composition: "2x L6, 1x B2",
      tags: ["Premium", "Imersivo"],
      image: "/placeholder.svg"
    },
    {
      id: 3,
      name: "Módulo Central C4",
      code: "Module-C4",
      area: "2x2m (4m²)",
      composition: "C4+C5",
      tags: ["Design único"],
      image: "/placeholder.svg"
    }
  ];

  return (
    <section id="catalogo" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Catálogo de <span className="gradient-text">Soluções Modulares</span>
          </h2>
          <p className="text-xl text-muted-foreground mb-8">
            Sistemas inteligentes para eventos corporativos
          </p>
          
          <div className="max-w-md mx-auto">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input 
                placeholder="Buscar por nome ou código..." 
                className="pl-10 bg-card border-border"
              />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <Card 
              key={product.id}
              className="group overflow-hidden bg-card border-border hover:border-primary/50 transition-all duration-500 hover-lift"
            >
              <div className="relative h-64 bg-gradient-to-br from-muted/50 to-muted overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-t from-card/90 to-transparent"></div>
                <div className="absolute top-4 left-4 flex gap-2">
                  {product.tags.map((tag, idx) => (
                    <Badge key={idx} className="bg-primary/90 hover:bg-primary">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
              
              <div className="p-6 space-y-4">
                <div>
                  <h3 className="text-xl font-bold mb-1">{product.name}</h3>
                  <p className="text-sm text-muted-foreground">{product.code}</p>
                </div>
                
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-muted-foreground">Área</span>
                    <p className="font-semibold">{product.area}</p>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Composição</span>
                    <p className="font-semibold">{product.composition}</p>
                  </div>
                </div>
                
                <Button className="w-full btn-primary">
                  <Plus className="mr-2 h-4 w-4" />
                  Adicionar
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductCatalog;
