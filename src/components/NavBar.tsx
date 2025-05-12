
import React, { useState, useEffect } from "react";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";

const NavBar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const scrollToSection = (id: string) => {
    setMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      const yOffset = -80; // Offset for navbar height
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white/90 backdrop-blur-sm shadow-sm dark:bg-gray-900/90"
          : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          <div className="flex items-center">
            <span className="text-xl font-heading font-bold text-gray-900 dark:text-white">
              Kent Nguyen
            </span>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-6">
            <a
              href="https://blog.kentnguyen.com/"
              target="_blank"
              className="text-sm text-gray-700 hover:text-highlight dark:text-gray-300 dark:hover:text-white transition-colors"
            >Blog</a>
            <button
              className="text-sm text-gray-700 hover:text-highlight dark:text-gray-300 dark:hover:text-white transition-colors"
              onClick={() => scrollToSection("services")}
            >
              Services
            </button>
            <button
              className="text-sm text-gray-700 hover:text-highlight dark:text-gray-300 dark:hover:text-white transition-colors"
              onClick={() => scrollToSection("timeline")}
            >
              Career
            </button>
            <button
              className="text-sm text-gray-700 hover:text-highlight dark:text-gray-300 dark:hover:text-white transition-colors"
              onClick={() => scrollToSection("clients")}
            >
              Clients
            </button>
            <Button 
              variant="default" 
              size="sm"
              onClick={() => scrollToSection("contact")}
            >
              Get in Touch
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Menu"
            >
              <Menu className="h-5 w-5" />
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="md:hidden bg-white dark:bg-gray-900 shadow-lg rounded-b-lg animate-fade-in">
            <div className="flex flex-col space-y-4 px-4 py-6">
              <button
                className="text-gray-700 hover:text-highlight dark:text-gray-300 dark:hover:text-white transition-colors py-2"
                onClick={() => scrollToSection("about")}
              >
                About
              </button>
              <button
                className="text-gray-700 hover:text-highlight dark:text-gray-300 dark:hover:text-white transition-colors py-2"
                onClick={() => scrollToSection("services")}
              >
                Services
              </button>
              <button
                className="text-gray-700 hover:text-highlight dark:text-gray-300 dark:hover:text-white transition-colors py-2"
                onClick={() => scrollToSection("timeline")}
              >
                Timeline
              </button>
              <button
                className="text-gray-700 hover:text-highlight dark:text-gray-300 dark:hover:text-white transition-colors py-2"
                onClick={() => scrollToSection("clients")}
              >
                Clients
              </button>
              <button
                className="text-gray-700 hover:text-highlight dark:text-gray-300 dark:hover:text-white transition-colors py-2"
                onClick={() => scrollToSection("photography")}
              >
                Photography
              </button>
              <Button 
                variant="default" 
                size="sm" 
                className="w-full"
                onClick={() => scrollToSection("contact")}
              >
                Get in Touch
              </Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default NavBar;
