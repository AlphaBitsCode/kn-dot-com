
import React, { useEffect, useRef, useState } from "react";
import { ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";

interface PhotoProps {
  src: string;
  alt: string;
  category: string;
}

const PhotographySection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [activeCategory, setActiveCategory] = useState<string>("all");
  
  // Sample photography data
  const photos: PhotoProps[] = [
    { 
      src: "https://images.unsplash.com/photo-1434494878577-86c23bcb06b9", 
      alt: "Technology", 
      category: "tech" 
    },
    { 
      src: "https://images.unsplash.com/photo-1605810230434-7631ac76ec81", 
      alt: "People", 
      category: "people" 
    },
    { 
      src: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7", 
      alt: "Workspace", 
      category: "workspace" 
    },
    { 
      src: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158", 
      alt: "Technology", 
      category: "tech" 
    },
    { 
      src: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e", 
      alt: "Technology", 
      category: "tech" 
    },
    { 
      src: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5", 
      alt: "Code", 
      category: "workspace" 
    },
  ];

  const categories = ["all", "tech", "workspace", "people"];

  const filteredPhotos = activeCategory === "all" 
    ? photos 
    : photos.filter(photo => photo.category === activeCategory);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
          }
        });
      },
      { threshold: 0.1 }
    );

    const photoItems = document.querySelectorAll(".photo-item");
    photoItems.forEach((item) => {
      observer.observe(item);
    });

    return () => {
      photoItems.forEach((item) => {
        observer.unobserve(item);
      });
    };
  }, [filteredPhotos]);

  return (
    <section id="photography" className="py-20 bg-white dark:bg-gray-900">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl lg:text-4xl font-bold mb-4 text-center text-gray-900 dark:text-white">
          Photography <span className="text-highlight">Collection</span>
        </h2>
        <p className="text-xl text-gray-600 dark:text-gray-400 mb-8 text-center max-w-3xl mx-auto">
          Capturing moments in street photography and landscapes
        </p>

        <div className="flex justify-center mb-10">
          <div className="inline-flex gap-2 p-1 bg-gray-100 dark:bg-gray-800 rounded-lg">
            {categories.map((category) => (
              <button
                key={category}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
                  activeCategory === category
                    ? "bg-white dark:bg-gray-700 shadow-sm text-highlight"
                    : "text-gray-600 dark:text-gray-400 hover:text-highlight"
                }`}
                onClick={() => setActiveCategory(category)}
              >
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </button>
            ))}
          </div>
        </div>

        <div ref={sectionRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPhotos.map((photo, index) => (
            <div
              key={index}
              className="photo-item animate-on-scroll relative overflow-hidden rounded-lg shadow-md group"
            >
              <img
                src={photo.src}
                alt={photo.alt}
                className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <div className="text-white text-center">
                  <p className="font-semibold text-lg">{photo.alt}</p>
                  <p className="text-sm text-gray-300">
                    {photo.category.charAt(0).toUpperCase() + photo.category.slice(1)}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Button 
            variant="outline" 
            className="border-highlight text-highlight hover:bg-highlight hover:text-white"
          >
            <a 
              href="https://photos.app.goo.gl/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center"
            >
              See More on Google Photos
              <ExternalLink className="ml-2 h-4 w-4" />
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default PhotographySection;
