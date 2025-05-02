
import React, { useEffect, useRef } from "react";
import { Brain, Settings, Sprout, TestTube, Compass } from "lucide-react";

type ServiceCardProps = {
  icon: React.ReactNode;
  title: string;
  description: string;
  delay: number;
};

const ServiceCard: React.FC<ServiceCardProps> = ({ icon, title, description, delay }) => {
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!cardRef.current) return;
    
    cardRef.current.style.transitionDelay = `${delay}ms`;
    
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("active");
          }
        });
      },
      { threshold: 0.1 }
    );
    
    observer.observe(cardRef.current);
    
    return () => {
      if (cardRef.current) {
        observer.unobserve(cardRef.current);
      }
    };
  }, [delay]);

  return (
    <div 
      ref={cardRef}
      className="reveal bg-white dark:bg-gray-800 rounded-lg p-6 shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-700"
    >
      <div className="h-12 w-12 bg-highlight/10 rounded-lg flex items-center justify-center mb-4">
        <div className="text-highlight">{icon}</div>
      </div>
      <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">{title}</h3>
      <p className="text-gray-600 dark:text-gray-400">{description}</p>
    </div>
  );
};

const ServicesSection: React.FC = () => {
  const titleRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("active");
          }
        });
      },
      { threshold: 0.1 }
    );
    
    if (titleRef.current) {
      observer.observe(titleRef.current);
    }
    
    return () => {
      if (titleRef.current) {
        observer.unobserve(titleRef.current);
      }
    };
  }, []);

  const services = [
    {
      icon: <Brain size={24} />,
      title: "CTO-as-a-Service",
      description: "Strategic guidance for your digital roadmap and technology infrastructure.",
      delay: 100
    },
    {
      icon: <Settings size={24} />,
      title: "AI & Workflow Automation",
      description: "Streamline your business with intelligent systems and automated processes.",
      delay: 200
    },
    {
      icon: <Sprout size={24} />,
      title: "Startup Advisory",
      description: "From 0 to Seed and beyond – guidance on product, tech, and growth strategy.",
      delay: 300
    },
    {
      icon: <TestTube size={24} />,
      title: "Deeptech R&D",
      description: "Energy, IoT, and scalable prototypes for innovative products and solutions.",
      delay: 400
    },
    {
      icon: <Compass size={24} />,
      title: "Speaking & Mentoring",
      description: "Experienced talks, workshops, and guidance for founders and teams.",
      delay: 500
    }
  ];

  return (
    <section id="services" className="py-20 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 
          ref={titleRef}
          className="text-3xl lg:text-4xl font-bold mb-3 text-center text-gray-900 dark:text-white reveal"
        >
          What I Can <span className="text-highlight">Help With</span>
        </h2>
        <p className="text-xl text-gray-600 dark:text-gray-400 mb-12 text-center max-w-3xl mx-auto reveal">
          With over two decades of experience, I offer specialized expertise across multiple tech domains
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <ServiceCard
              key={index}
              icon={service.icon}
              title={service.title}
              description={service.description}
              delay={service.delay}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
