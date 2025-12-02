import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Link } from "react-router-dom";

const TrainingNav = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { label: "Por que Modulares", href: "#why-modular" },
    { label: "Currículo", href: "#curriculum" },
    { label: "Comparativo", href: "#comparison" },
    { label: "Para Quem", href: "#audience" },
    { label: "Certificação", href: "#certification" },
    { label: "Inscrição", href: "#lead-form" },
  ];

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    setIsOpen(false);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#0a0a2e]/95 backdrop-blur-md border-b border-red-500/20">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-2">
            <span className="font-bold text-xl tracking-tight">
              <span className="text-white">smart</span>
              <span className="text-red-500">signage</span>
              <span className="text-white font-light ml-1">academy</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-6">
            {navItems.map((item) => (
              <button
                key={item.href}
                onClick={() => scrollToSection(item.href)}
                className="text-gray-300 hover:text-red-400 transition-colors text-sm"
              >
                {item.label}
              </button>
            ))}
            <button
              onClick={() => scrollToSection("#lead-form")}
              className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors shadow-[0_0_20px_rgba(220,38,38,0.3)]"
            >
              Inscreva-se
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-white"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Nav */}
        {isOpen && (
          <div className="md:hidden py-4 border-t border-red-500/20">
            {navItems.map((item) => (
              <button
                key={item.href}
                onClick={() => scrollToSection(item.href)}
                className="block w-full text-left py-2 text-gray-300 hover:text-red-400 transition-colors"
              >
                {item.label}
              </button>
            ))}
            <button
              onClick={() => scrollToSection("#lead-form")}
              className="mt-4 w-full bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg text-sm font-medium"
            >
              Inscreva-se
            </button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default TrainingNav;
