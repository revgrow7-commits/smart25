import Navbar from "@/components/Navbar";
import ProductCatalog from "@/components/ProductCatalog";
import { useTranslation } from "react-i18next";
const Catalog = () => {
  const {
    t
  } = useTranslation();
  return <div className="min-h-screen">
      <Navbar />
      
      {/* Header Section */}
      

      {/* Product Catalog */}
      <ProductCatalog showFilters={true} />
      
      {/* Footer */}
      <footer className="bg-card border-t border-border py-8">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          <p className="mb-2">{t('footer.rights')}</p>
          <p>{t('footer.patent')}</p>
        </div>
      </footer>
    </div>;
};
export default Catalog;