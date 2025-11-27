import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X, ChevronDown, Home, Box, Wand2, Calculator, Grid3x3 } from "lucide-react";
import { Link } from "react-router-dom";
import LogoProcessor from "@/components/LogoProcessor";
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

  const getLanguageInfo = (lng: string) => {
    const languages: Record<string, { flag: string; name: string }> = {
      pt: { flag: '🇧🇷', name: 'Português' },
      en: { flag: '🇺🇸', name: 'English' },
      es: { flag: '🇪🇸', name: 'Español' }
    };
    return languages[lng] || languages.pt;
  };

  const currentLanguage = getLanguageInfo(i18n.language || 'pt');
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
    href: "/",
    label: t('nav.home') || 'Início',
    icon: Home
  }, {
    href: "/visualizador-stand",
    label: t('nav.standSimulator'),
    icon: Box
  }, {
    href: "#calculadora",
    label: t('nav.roi'),
    icon: Calculator
  }, {
    href: "#faq",
    label: t('nav.faq'),
    icon: null
  }, {
    href: "#contato",
    label: t('nav.contact'),
    icon: null
  }, {
    href: "/admin",
    label: t('nav.admin'),
    icon: null
  }];
  return <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-background/95 backdrop-blur-lg border-b border-border shadow-lg' : 'bg-transparent'}`}>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <a href="https://smart-canvas-labs.lovable.app/" className="flex items-center gap-3">
            <LogoProcessor />
          </a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <DropdownMenu>
              <DropdownMenuTrigger className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors flex items-center gap-2">
                <Grid3x3 className="w-4 h-4" />
                {t('nav.catalog')}
                <ChevronDown className="w-4 h-4" />
              </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-card border-border z-50 w-72">
                <div className="px-2 py-1.5 text-xs font-semibold text-muted-foreground">
                  {t('nav.allProducts')}
                </div>
                <DropdownMenuItem asChild>
                  <a href="#catalogo" className="cursor-pointer font-medium flex items-center gap-2">
                    <Grid3x3 className="w-4 h-4" />
                    Ver Todos os Produtos
                  </a>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/visualizador-stand" className="cursor-pointer font-medium flex items-center gap-2">
                    <Wand2 className="w-4 h-4" />
                    {t('nav.visualizer')}
                  </Link>
                </DropdownMenuItem>
                
                <div className="px-2 py-1.5 text-xs font-semibold text-muted-foreground mt-2 border-t border-border">
                  Famílias de Produtos
                </div>
                {categories.map(category => (
                  <DropdownMenuItem key={category.id} asChild>
                    <a href="#catalogo" className="cursor-pointer pl-6">
                      → {category.name}
                    </a>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            {navLinks.map(link => {
              const Icon = link.icon;
              return link.href.startsWith('#') ? (
                <a key={link.href} href={link.href} className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors flex items-center gap-2">
                  {Icon && <Icon className="w-4 h-4" />}
                  {link.label}
                </a>
              ) : (
                <Link key={link.href} to={link.href} className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors flex items-center gap-2">
                  {Icon && <Icon className="w-4 h-4" />}
                  {link.label}
                </Link>
              );
            })}

            <DropdownMenu>
              <DropdownMenuTrigger className="text-sm font-medium text-foreground hover:text-primary transition-colors flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-accent">
                <span className="text-lg">{currentLanguage.flag}</span>
                <span className="hidden lg:inline">{currentLanguage.name}</span>
                <ChevronDown className="w-4 h-4" />
              </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-card border-border z-50 min-w-[160px]">
                <DropdownMenuItem 
                  onClick={() => changeLanguage('pt')} 
                  className={`cursor-pointer flex items-center gap-2 ${i18n.language === 'pt' ? 'bg-accent' : ''}`}
                >
                  <span className="text-lg">🇧🇷</span>
                  <span>Português</span>
                  {i18n.language === 'pt' && <span className="ml-auto text-primary">✓</span>}
                </DropdownMenuItem>
                <DropdownMenuItem 
                  onClick={() => changeLanguage('en')} 
                  className={`cursor-pointer flex items-center gap-2 ${i18n.language === 'en' ? 'bg-accent' : ''}`}
                >
                  <span className="text-lg">🇺🇸</span>
                  <span>English</span>
                  {i18n.language === 'en' && <span className="ml-auto text-primary">✓</span>}
                </DropdownMenuItem>
                <DropdownMenuItem 
                  onClick={() => changeLanguage('es')} 
                  className={`cursor-pointer flex items-center gap-2 ${i18n.language === 'es' ? 'bg-accent' : ''}`}
                >
                  <span className="text-lg">🇪🇸</span>
                  <span>Español</span>
                  {i18n.language === 'es' && <span className="ml-auto text-primary">✓</span>}
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
            <a href="#catalogo" className="flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-primary transition-colors py-2" onClick={() => setIsMobileMenuOpen(false)}>
              <Grid3x3 className="w-4 h-4" />
              {t('nav.catalog')}
            </a>
            <Link to="/visualizador-stand" className="flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-primary transition-colors py-2 pl-4" onClick={() => setIsMobileMenuOpen(false)}>
              <Wand2 className="w-4 h-4" />
              {t('nav.visualizer')}
            </Link>
            {categories.map(category => <a key={category.id} href="#catalogo" className="block text-sm text-muted-foreground hover:text-primary transition-colors py-2 pl-4" onClick={() => setIsMobileMenuOpen(false)}>
                → {category.name}
              </a>)}
            
            {navLinks.map(link => {
              const Icon = link.icon;
              return link.href.startsWith('#') ? (
                <a key={link.href} href={link.href} className="flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-primary transition-colors py-2" onClick={() => setIsMobileMenuOpen(false)}>
                  {Icon && <Icon className="w-4 h-4" />}
                  {link.label}
                </a>
              ) : (
                <Link key={link.href} to={link.href} className="flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-primary transition-colors py-2" onClick={() => setIsMobileMenuOpen(false)}>
                  {Icon && <Icon className="w-4 h-4" />}
                  {link.label}
                </Link>
              );
            })}
            
            <div className="border-t border-border pt-4">
              <p className="text-xs text-muted-foreground mb-2 px-2">Idioma / Language</p>
              <button 
                onClick={() => changeLanguage('pt')} 
                className={`flex items-center gap-2 w-full text-left text-sm transition-colors py-2 px-2 rounded ${i18n.language === 'pt' ? 'bg-accent text-primary' : 'text-muted-foreground hover:text-primary'}`}
              >
                <span className="text-lg">🇧🇷</span>
                <span>Português</span>
                {i18n.language === 'pt' && <span className="ml-auto">✓</span>}
              </button>
              <button 
                onClick={() => changeLanguage('en')} 
                className={`flex items-center gap-2 w-full text-left text-sm transition-colors py-2 px-2 rounded ${i18n.language === 'en' ? 'bg-accent text-primary' : 'text-muted-foreground hover:text-primary'}`}
              >
                <span className="text-lg">🇺🇸</span>
                <span>English</span>
                {i18n.language === 'en' && <span className="ml-auto">✓</span>}
              </button>
              <button 
                onClick={() => changeLanguage('es')} 
                className={`flex items-center gap-2 w-full text-left text-sm transition-colors py-2 px-2 rounded ${i18n.language === 'es' ? 'bg-accent text-primary' : 'text-muted-foreground hover:text-primary'}`}
              >
                <span className="text-lg">🇪🇸</span>
                <span>Español</span>
                {i18n.language === 'es' && <span className="ml-auto">✓</span>}
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