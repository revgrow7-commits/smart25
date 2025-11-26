import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import ProductCatalog from "@/components/ProductCatalog";
import AIVisualizer from "@/components/AIVisualizer";
import ROICalculator from "@/components/ROICalculator";
import ComparisonTable from "@/components/ComparisonTable";
import Testimonials from "@/components/Testimonials";
import HowItWorks from "@/components/HowItWorks";
import FAQ from "@/components/FAQ";
import ContactForm from "@/components/ContactForm";
import ProductChatbot from "@/components/ProductChatbot";
import { useTranslation } from "react-i18next";

const Index = () => {
  const { t } = useTranslation();
  return (
    <div className="min-h-screen">
      <Navbar />
      <HeroSection />
      <ProductCatalog />
      <AIVisualizer />
      <ROICalculator />
      <ComparisonTable />
      <Testimonials />
      <HowItWorks />
      <FAQ />
      <ContactForm />
      <ProductChatbot />
      
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

export default Index;
