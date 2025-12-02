import { Instagram, Facebook, Linkedin, MessageCircle, MapPin, Lightbulb } from "lucide-react";

const SubscriptionFooter = () => {
  return (
    <footer className="py-16 bg-[#0a0a2e] border-t border-red-500/20">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Logo & Description */}
          <div className="md:col-span-1">
            <h3 className="text-2xl font-bold mb-2">
              <span className="text-white">sm</span>
              <span className="text-white relative">
                a
                <span className="absolute -bottom-0.5 left-1/2 -translate-x-1/2 w-3 h-2 border-2 border-red-500 border-t-0 rounded-b-full"></span>
              </span>
              <span className="text-white">rt</span>
              <span className="text-red-500">signage</span>
            </h3>
            <p className="text-gray-400 text-xs mb-3 flex items-center gap-1">
              by Indústria Visual
              <Lightbulb className="w-4 h-4 text-gray-400" />
            </p>
            <p className="text-gray-400 text-sm">
              Soluções inteligentes em sinalização e estruturas para eventos em todo o Brasil.
            </p>
          </div>
          
          {/* Links */}
          <div>
            <h4 className="text-white font-semibold mb-4">Navegação</h4>
            <ul className="space-y-3">
              <li>
                <a href="#planos" className="text-gray-400 hover:text-red-300 transition-colors text-sm">
                  Planos
                </a>
              </li>
              <li>
                <a href="#beneficios" className="text-gray-400 hover:text-red-300 transition-colors text-sm">
                  Benefícios
                </a>
              </li>
              <li>
                <a href="#suporte" className="text-gray-400 hover:text-red-300 transition-colors text-sm">
                  Suporte
                </a>
              </li>
            </ul>
          </div>
          
          {/* Locations */}
          <div>
            <h4 className="text-white font-semibold mb-4">Localidades</h4>
            <ul className="space-y-3">
              <li className="flex items-center gap-2 text-gray-400 text-sm">
                <MapPin className="w-4 h-4 text-red-400" />
                Porto Alegre/RS
              </li>
              <li className="flex items-center gap-2 text-gray-400 text-sm">
                <MapPin className="w-4 h-4 text-red-400" />
                São Paulo/SP
              </li>
              <li className="flex items-center gap-2 text-gray-400 text-sm">
                <MapPin className="w-4 h-4 text-red-400" />
                Santa Catarina/SC
              </li>
            </ul>
          </div>
          
          {/* Social */}
          <div>
            <h4 className="text-white font-semibold mb-4">Redes Sociais</h4>
            <div className="flex gap-4">
              <a 
                href="#" 
                className="w-10 h-10 rounded-lg border border-red-500/30 flex items-center justify-center text-red-400 hover:bg-red-500/20 hover:border-red-400/50 hover:text-red-300 transition-all duration-300"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a 
                href="#" 
                className="w-10 h-10 rounded-lg border border-red-500/30 flex items-center justify-center text-red-400 hover:bg-red-500/20 hover:border-red-400/50 hover:text-red-300 transition-all duration-300"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a 
                href="#" 
                className="w-10 h-10 rounded-lg border border-red-500/30 flex items-center justify-center text-red-400 hover:bg-red-500/20 hover:border-red-400/50 hover:text-red-300 transition-all duration-300"
              >
                <Linkedin className="w-5 h-5" />
              </a>
              <a 
                href="#" 
                className="w-10 h-10 rounded-lg border border-red-500/30 flex items-center justify-center text-red-400 hover:bg-red-500/20 hover:border-red-400/50 hover:text-red-300 transition-all duration-300"
              >
                <MessageCircle className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
        
        {/* Bottom bar */}
        <div className="pt-8 border-t border-red-500/10 text-center">
          <p className="text-gray-500 text-sm">
            © {new Date().getFullYear()} Smart Signage by Indústria Visual. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default SubscriptionFooter;
