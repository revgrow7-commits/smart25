// Smart Signage - Build: 2025-12-19T14:35:00
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import FeaturedProducts from "@/components/FeaturedProducts";
import VideoShowcase from "@/components/VideoShowcase";
import AIVisualizer from "@/components/AIVisualizer";
import ROICalculator from "@/components/ROICalculator";
import ComparisonTable from "@/components/ComparisonTable";
import Testimonials from "@/components/Testimonials";
import HowItWorks from "@/components/HowItWorks";
import FAQ from "@/components/FAQ";
import ContactForm from "@/components/ContactForm";
import ProductChatbot from "@/components/ProductChatbot";
import HomeFooter from "@/components/HomeFooter";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <HeroSection />
      <FeaturedProducts />
      <VideoShowcase />
      <AIVisualizer />
      <ROICalculator />
      <ComparisonTable />
      <Testimonials />
      <HowItWorks />
      <FAQ />
      <ContactForm />
      <ProductChatbot />
      <HomeFooter />
    </div>
  );
};

export default Index; // v1.1 - Published
