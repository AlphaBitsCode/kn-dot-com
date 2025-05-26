
import React from "react";
import { ArrowDown } from "lucide-react";
import { Button } from "@/components/ui/button";

const HeroSection: React.FC = () => {
  const scrollToAbout = () => {
    const aboutSection = document.getElementById("about");
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      className="relative min-h-screen flex items-center py-20 bg-white dark:bg-gray-900"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          {/* Portrait Photo */}
          <div className="flex justify-center lg:justify-end order-1 lg:order-2">
            <div className="relative w-full max-w-md">
              <div className="aspect-[3/4] rounded-xl overflow-hidden shadow-2xl">
                <img 
                  src="images/kent_2.jpg"
                  alt="Kent Nguyen portrait" 
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
          
          {/* Content */}
          <div className="order-2 lg:order-1 text-center lg:text-left">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight text-gray-900 dark:text-white">
              Hi, I'm Kent.
              <br />
              <span className="text-highlight">
                I build Startups, Sand Battery, ICE Battery, and also AI Agents.
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl mb-10 font-light text-gray-600 dark:text-gray-400">
              Over 20 years, 15+ ventures, and still pushing code daily.
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
      </div>
      
      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 animate-bounce">
        <ArrowDown className="h-6 w-6 text-gray-500 dark:text-gray-400" />
      </div>
    </section>
  );
};

export default HeroSection;
