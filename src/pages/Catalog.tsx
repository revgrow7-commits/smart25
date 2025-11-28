import Navbar from "@/components/Navbar";
import ProductCatalog from "@/components/ProductCatalog";
import { useTranslation } from "react-i18next";

const Catalog = () => {
  const { t } = useTranslation();
  
  return (
    <div className="min-h-screen">
      <Navbar />
      
      {/* Header Section */}
      <section className="pt-24 md:pt-32 pb-10 md:pb-16 bg-gradient-to-br from-background via-background to-primary/5">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center space-y-4 md:space-y-6">
            <h1 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold px-2">
              Catálogo de <span className="text-primary">Soluções Modulares</span>
            </h1>
            <p className="text-base md:text-lg lg:text-xl text-muted-foreground px-4">
              Sistemas inteligentes para eventos corporativos
            </p>
          </div>
        </div>
      </section>

      {/* Product Catalog */}
      <ProductCatalog showFilters={true} />
      
      {/* Footer */}
      <footer className="bg-card border-t border-border py-8">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          <p className="mb-2">{t('footer.rights')}</p>
          <p>{t('footer.patent')}</p>
        </div>
      </footer>
    </div>
  );
};

export default Catalog;
