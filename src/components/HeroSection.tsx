
import React, { useEffect, useRef } from "react";
import { ArrowDown } from "lucide-react";
import { Button } from "@/components/ui/button";

const HeroSection: React.FC = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const handleScroll = () => {
      if (!heroRef.current) return;
      const scrollPosition = window.scrollY;
      heroRef.current.style.backgroundPositionY = `${scrollPosition * 0.5}px`;
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const scrollToAbout = () => {
    const aboutSection = document.getElementById("about");
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      ref={heroRef}
      className="relative min-h-screen flex items-center justify-center bg-cover bg-center bg-fixed"
      style={{
        backgroundImage: "url('https://alphabits.team/images/office/profile.jpg')",
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/60 z-10"></div>
      
      {/* Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-20 text-white">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
            Hi, I'm Kent.
            <br />
            <span className="text-highlight">
              I build startups, systems, and solutions that last.
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl mb-10 font-light">
            Over 20 years, 10+ ventures, and still pushing code daily.
          </p>
          
          <Button 
            size="lg"
            className="bg-highlight hover:bg-highlight/90 text-white"
            onClick={scrollToAbout}
          >
            See My Work
            <ArrowDown className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
      
      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 animate-bounce">
        <ArrowDown className="h-6 w-6 text-white" />
      </div>
    </section>
  );
};

export default HeroSection;
