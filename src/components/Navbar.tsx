import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X, ChevronDown } from "lucide-react";
import { Link } from "react-router-dom";
import logo from "@/assets/logo-smartsignage.png";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { supabase } from "@/integrations/supabase/client";
interface Category {
  id: string;
  name: string;
  slug: string;
}

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const { data, error } = await supabase
        .from("categories")
        .select("id, name, slug")
        .order("name");

      if (error) throw error;
      setCategories(data || []);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };
  const navLinks = [
    {
      href: "#calculadora",
      label: "ROI"
    },
    {
      href: "#faq",
      label: "FAQ"
    },
    {
      href: "#contato",
      label: "Contato"
    },
    {
      href: "/admin",
      label: "Admin"
    }
  ];
  return <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-background/95 backdrop-blur-lg border-b border-border shadow-lg' : 'bg-transparent'}`}>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3">
            <img src={logo} alt="Smart Signage" className="h-12" />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <DropdownMenu>
              <DropdownMenuTrigger className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors flex items-center gap-1">
                Catálogo
                <ChevronDown className="w-4 h-4" />
              </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-card border-border z-50">
                <DropdownMenuItem asChild>
                  <a href="#catalogo" className="cursor-pointer">
                    Todos os Produtos
                  </a>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/visualizador-stand" className="cursor-pointer">
                    Visualizador com IA
                  </Link>
                </DropdownMenuItem>
                {categories.map((category) => (
                  <DropdownMenuItem key={category.id} asChild>
                    <a href={`#catalogo`} className="cursor-pointer">
                      {category.name}
                    </a>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            {navLinks.map(link => 
              link.href.startsWith('#') ? (
                <a key={link.href} href={link.href} className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">
                  {link.label}
                </a>
              ) : (
                <Link key={link.href} to={link.href} className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">
                  {link.label}
                </Link>
              )
            )}
            <Button asChild className="btn-primary">
              <a href="#contato">Solicitar Demo</a>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button className="md:hidden p-2" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
            {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && <div className="md:hidden py-4 space-y-4 border-t border-border">
            <a href="#catalogo" className="block text-sm font-medium text-muted-foreground hover:text-primary transition-colors py-2" onClick={() => setIsMobileMenuOpen(false)}>
              Catálogo
            </a>
            <Link to="/visualizador-stand" className="block text-sm font-medium text-muted-foreground hover:text-primary transition-colors py-2 pl-4" onClick={() => setIsMobileMenuOpen(false)}>
              → Visualizador com IA
            </Link>
            {categories.map((category) => (
              <a key={category.id} href="#catalogo" className="block text-sm text-muted-foreground hover:text-primary transition-colors py-2 pl-4" onClick={() => setIsMobileMenuOpen(false)}>
                → {category.name}
              </a>
            ))}
            {navLinks.map(link => 
              link.href.startsWith('#') ? (
                <a key={link.href} href={link.href} className="block text-sm font-medium text-muted-foreground hover:text-primary transition-colors py-2" onClick={() => setIsMobileMenuOpen(false)}>
                  {link.label}
                </a>
              ) : (
                <Link key={link.href} to={link.href} className="block text-sm font-medium text-muted-foreground hover:text-primary transition-colors py-2" onClick={() => setIsMobileMenuOpen(false)}>
                  {link.label}
                </Link>
              )
            )}
            <Button asChild className="w-full btn-primary">
              <a href="#contato">Solicitar Demo</a>
            </Button>
          </div>}
      </div>
    </nav>;
};
export default Navbar;