import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { Link } from "react-router-dom";
import logo from "@/assets/logo-smartsignage.png";
const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  const navLinks = [{
    href: "#catalogo",
    label: "Catálogo"
  }, {
    href: "#calculadora",
    label: "ROI"
  }, {
    href: "#faq",
    label: "FAQ"
  }, {
    href: "#contato",
    label: "Contato"
  }, {
    href: "/admin",
    label: "Admin"
  }];
  return <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-background/95 backdrop-blur-lg border-b border-border shadow-lg' : 'bg-transparent'}`}>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div className="flex items-center gap-3">
            
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
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
            <Button className="btn-primary">
              Solicitar Demo
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button className="md:hidden p-2" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
            {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && <div className="md:hidden py-4 space-y-4 border-t border-border">
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
            <Button className="w-full btn-primary">
              Solicitar Demo
            </Button>
          </div>}
      </div>
    </nav>;
};
export default Navbar;