import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { BudgetProvider } from "@/contexts/BudgetContext";
import BudgetIndicator from "@/components/BudgetIndicator";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Admin from "./pages/Admin";
import Auth from "./pages/Auth";
import AccessDenied from "./pages/AccessDenied";
import ProductDetail from "./pages/ProductDetail";
import StandVisualizer from "./pages/StandVisualizer";
import Catalog from "./pages/Catalog";
import SubscriptionClub from "./pages/SubscriptionClub";
import TrainingSchool from "./pages/TrainingSchool";
import Blog from "./pages/Blog";
import BlogPost from "./pages/BlogPost";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <BudgetProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/access-denied" element={<AccessDenied />} />
            <Route path="/admin" element={
              <ProtectedRoute requireAdmin>
                <Admin />
              </ProtectedRoute>
            } />
            <Route path="/catalogo" element={<Catalog />} />
            <Route path="/produto/:id" element={<ProductDetail />} />
            <Route path="/visualizador-stand" element={<StandVisualizer />} />
            <Route path="/clube-assinatura" element={<SubscriptionClub />} />
            <Route path="/escola-montadores" element={<TrainingSchool />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:slug" element={<BlogPost />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
          <BudgetIndicator />
        </BrowserRouter>
      </TooltipProvider>
    </BudgetProvider>
  </QueryClientProvider>
);

export default App; // build v1.1
