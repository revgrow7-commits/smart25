import { Link } from "react-router-dom";
import { 
  Box, Monitor, Lightbulb, Store, Calendar, TrendingUp, FileText, Scale,
  Instagram, Facebook, Linkedin, MessageCircle, MapPin
} from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

const iconMap: { [key: string]: any } = {
  Box, Monitor, Lightbulb, Store, Calendar, TrendingUp, FileText, Scale
};

const HomeFooter = () => {
  const { data: categories } = useQuery({
    queryKey: ['blog-categories'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('blog_categories')
        .select('*')
        .order('display_order');
      if (error) throw error;
      return data;
    }
  });

  return (
    <footer className="bg-[#0a0a2e] border-t border-primary/20 py-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Logo & Description */}
          <div>
            <h3 className="text-2xl font-bold mb-2">
              <span className="text-white">sm</span>
              <span className="text-white relative">
                a
                <span className="absolute -bottom-0.5 left-1/2 -translate-x-1/2 w-3 h-2 border-2 border-primary border-t-0 rounded-b-full"></span>
              </span>
              <span className="text-white">rt</span>
              <span className="text-primary">signage</span>
            </h3>
            <p className="text-gray-400 text-xs mb-3 flex items-center gap-1">
              by Indústria Visual
              <Lightbulb className="w-4 h-4 text-gray-400" />
            </p>
            <p className="text-gray-400 text-sm">
              Soluções inteligentes em comunicação visual, stands modulares e estruturas para eventos.
            </p>
          </div>

          {/* Blog Categories */}
          <div className="lg:col-span-2">
            <h4 className="text-white font-semibold mb-4 flex items-center gap-2">
              <FileText className="w-5 h-5 text-primary" />
              Blog - Conteúdo Especializado
            </h4>
            <div className="grid grid-cols-2 gap-3">
              {categories?.map((category) => {
                const IconComponent = iconMap[category.icon || 'FileText'] || FileText;
                return (
                  <Link 
                    key={category.id}
                    to={`/blog?categoria=${category.slug}`}
                    className="flex items-center gap-2 text-gray-400 hover:text-primary transition-colors text-sm group"
                  >
                    <IconComponent className="w-4 h-4 text-primary/60 group-hover:text-primary" />
                    {category.name}
                  </Link>
                );
              })}
            </div>
            <Link 
              to="/blog" 
              className="inline-flex items-center gap-2 mt-4 text-primary hover:text-primary/80 font-medium text-sm"
            >
              Ver todos os artigos →
            </Link>
          </div>

          {/* Contact & Social */}
          <div>
            <h4 className="text-white font-semibold mb-4">Localidades</h4>
            <ul className="space-y-3 mb-6">
              <li className="flex items-center gap-2 text-gray-400 text-sm">
                <MapPin className="w-4 h-4 text-primary" />
                Porto Alegre/RS
              </li>
              <li className="flex items-center gap-2 text-gray-400 text-sm">
                <MapPin className="w-4 h-4 text-primary" />
                São Paulo/SP
              </li>
              <li className="flex items-center gap-2 text-gray-400 text-sm">
                <MapPin className="w-4 h-4 text-primary" />
                Santa Catarina/SC
              </li>
            </ul>

            <h4 className="text-white font-semibold mb-4">Redes Sociais</h4>
            <div className="flex gap-3">
              <a href="#" className="w-10 h-10 rounded-lg border border-primary/30 flex items-center justify-center text-primary hover:bg-primary/20 transition-all">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-lg border border-primary/30 flex items-center justify-center text-primary hover:bg-primary/20 transition-all">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-lg border border-primary/30 flex items-center justify-center text-primary hover:bg-primary/20 transition-all">
                <Linkedin className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-lg border border-primary/30 flex items-center justify-center text-primary hover:bg-primary/20 transition-all">
                <MessageCircle className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-primary/10 text-center">
          <p className="text-gray-500 text-sm">
            © {new Date().getFullYear()} Smart Signage by Indústria Visual. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default HomeFooter;
