
import React, { useEffect, useRef } from "react";

interface ClientProps {
  name: string;
  logo?: string;
  delay: number;
}

const ClientLogo: React.FC<ClientProps> = ({ name, logo, delay }) => {
  const logoRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!logoRef.current) return;
    
    logoRef.current.style.transitionDelay = `${delay}ms`;
    
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
    
    observer.observe(logoRef.current);
    
    return () => {
      if (logoRef.current) {
        observer.unobserve(logoRef.current);
      }
    };
  }, [delay]);

  return (
    <div
      ref={logoRef}
      className="reveal bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100 dark:border-gray-700 flex items-center justify-center h-32"
    >
      {logo ? (
        <img 
          src={logo} 
          alt={name} 
          className="max-h-12 max-w-full opacity-70 hover:opacity-100 transition-opacity duration-300" 
        />
      ) : (
        <div className="text-xl font-heading font-semibold text-gray-800 dark:text-gray-200">
          {name}
        </div>
      )}
    </div>
  );
};

const ClientsSection: React.FC = () => {
  const titleRef = useRef<HTMLDivElement>(null);

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

  const clients = [
    { name: "MAUA", logo: "/images/logos/maua.png", delay: 100 },
    { name: "7Eleven", logo: "/images/logos/7Eleven.png", delay: 100 },
    { name: "Bluebird", logo: "/images/logos/Bluebird.png", delay: 200 },
    { name: "Highlands", logo: "/images/logos/highlands.png", delay: 300 },
    { name: "OP3N", logo: "/images/logos/op3n.png", delay: 400 },
    { name: "Sieuviet", logo: "/images/logos/sieuviet.png", delay: 500 },
    { name: "Vascara", logo: "/images/logos/vascara.png", delay: 600 },
    { name: "VCAM", logo: "/images/logos/vcam.png", delay: 700 },
    { name: "VPOST", logo: "/images/logos/vpost.png", delay: 800 },
  ];

  return (
    <section id="clients" className="py-20 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div ref={titleRef} className="reveal">
          <h2 className="text-3xl lg:text-4xl font-bold mb-4 text-center text-gray-900 dark:text-white">
            Clients & <span className="text-highlight">Partners</span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 mb-12 text-center max-w-3xl mx-auto">
            Trusted by innovative companies across Southeast Asia
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {clients.map((client, index) => (
            <ClientLogo
              key={index}
              name={client.name}
              logo={client.logo}
              delay={client.delay}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ClientsSection;
