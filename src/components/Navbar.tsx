import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X, ChevronDown, Languages } from "lucide-react";
import { Link } from "react-router-dom";
import logo from "@/assets/logo-smartsignage.png";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { supabase } from "@/integrations/supabase/client";
import { useTranslation } from "react-i18next";
interface Category {
  id: string;
  name: string;
  slug: string;
}
const Navbar = () => {
  const { t, i18n } = useTranslation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
    localStorage.setItem('language', lng);
  };
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
      const {
        data,
        error
      } = await supabase.from("categories").select("id, name, slug").order("name");
      if (error) throw error;
      setCategories(data || []);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };
  const navLinks = [{
    href: "#calculadora",
    label: t('nav.roi')
  }, {
    href: "#faq",
    label: t('nav.faq')
  }, {
    href: "#contato",
    label: t('nav.contact')
  }, {
    href: "/admin",
    label: t('nav.admin')
  }];
  return <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-background/95 backdrop-blur-lg border-b border-border shadow-lg' : 'bg-transparent'}`}>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3">
            <img alt="Smart Signage" className="h-12" src="/lovable-uploads/18a5c753-87c2-440b-ad3c-5f2b4c51cdad.jpg" />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <DropdownMenu>
              <DropdownMenuTrigger className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors flex items-center gap-1">
                {t('nav.catalog')}
                <ChevronDown className="w-4 h-4" />
              </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-card border-border z-50">
                <DropdownMenuItem asChild>
                  <a href="#catalogo" className="cursor-pointer">
                    {t('nav.allProducts')}
                  </a>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/visualizador-stand" className="cursor-pointer">
                    {t('nav.visualizer')}
                  </Link>
                </DropdownMenuItem>
                {categories.map(category => <DropdownMenuItem key={category.id} asChild>
                    <a href={`#catalogo`} className="cursor-pointer">
                      {category.name}
                    </a>
                  </DropdownMenuItem>)}
              </DropdownMenuContent>
            </DropdownMenu>

            {navLinks.map(link => link.href.startsWith('#') ? <a key={link.href} href={link.href} className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">
                  {link.label}
                </a> : <Link key={link.href} to={link.href} className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">
                  {link.label}
                </Link>)}

            <DropdownMenu>
              <DropdownMenuTrigger className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors flex items-center gap-1">
                <Languages className="w-4 h-4" />
              </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-card border-border z-50">
                <DropdownMenuItem onClick={() => changeLanguage('pt')} className="cursor-pointer">
                  🇧🇷 Português
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => changeLanguage('en')} className="cursor-pointer">
                  🇺🇸 English
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => changeLanguage('es')} className="cursor-pointer">
                  🇪🇸 Español
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <Button asChild className="btn-primary">
              <a href="#contato">{t('nav.requestDemo')}</a>
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
              {t('nav.catalog')}
            </a>
            <Link to="/visualizador-stand" className="block text-sm font-medium text-muted-foreground hover:text-primary transition-colors py-2 pl-4" onClick={() => setIsMobileMenuOpen(false)}>
              → {t('nav.visualizer')}
            </Link>
            {categories.map(category => <a key={category.id} href="#catalogo" className="block text-sm text-muted-foreground hover:text-primary transition-colors py-2 pl-4" onClick={() => setIsMobileMenuOpen(false)}>
                → {category.name}
              </a>)}
            {navLinks.map(link => link.href.startsWith('#') ? <a key={link.href} href={link.href} className="block text-sm font-medium text-muted-foreground hover:text-primary transition-colors py-2" onClick={() => setIsMobileMenuOpen(false)}>
                  {link.label}
                </a> : <Link key={link.href} to={link.href} className="block text-sm font-medium text-muted-foreground hover:text-primary transition-colors py-2" onClick={() => setIsMobileMenuOpen(false)}>
                  {link.label}
                </Link>)}
            
            <div className="border-t border-border pt-4">
              <p className="text-xs text-muted-foreground mb-2 px-2">Idioma / Language</p>
              <button onClick={() => changeLanguage('pt')} className="block w-full text-left text-sm text-muted-foreground hover:text-primary transition-colors py-2 px-2">
                🇧🇷 Português
              </button>
              <button onClick={() => changeLanguage('en')} className="block w-full text-left text-sm text-muted-foreground hover:text-primary transition-colors py-2 px-2">
                🇺🇸 English
              </button>
              <button onClick={() => changeLanguage('es')} className="block w-full text-left text-sm text-muted-foreground hover:text-primary transition-colors py-2 px-2">
                🇪🇸 Español
              </button>
            </div>

            <Button asChild className="w-full btn-primary">
              <a href="#contato">{t('nav.requestDemo')}</a>
            </Button>
          </div>}
      </div>
    </nav>;
};
export default Navbar;