
import React, { useEffect, useRef } from "react";
import { Mail, Github, Linkedin } from "lucide-react";
import { Button } from "@/components/ui/button";

const ContactSection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  
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
    
    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }
    
    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <section id="contact" className="py-20 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div 
          ref={sectionRef}
          className="max-w-3xl mx-auto text-center reveal"
        >
          <h2 className="text-3xl lg:text-4xl font-bold mb-6 text-gray-900 dark:text-white">
            Got a project or idea? <span className="text-highlight">Let's chat.</span>
          </h2>
          
          <p className="text-xl text-gray-600 dark:text-gray-400 mb-10">
            Whether you need strategic guidance, technical expertise, or just want to connect, I'm always open to new opportunities and conversations.
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-4">
            <Button 
              size="lg"
              className="bg-highlight hover:bg-highlight/90 text-white w-full sm:w-auto"
            >
              <a
                href="mailto:kent@alphabits.team"
                className="flex items-center"
              >
                <Mail className="mr-2 h-5 w-5" />
                Send me an email
              </a>
            </Button>

            <Button 
              variant="outline" 
              size="lg"
              className="border-highlight text-highlight hover:bg-highlight hover:text-white w-full sm:w-auto"
            >
              <a
                href="https://cal.com/alphabits/mini"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center"
              >
                Schedule a Call
              </a>
            </Button>
          </div>
          
          <div className="mt-12 flex justify-center space-x-6">
            <a href="https://github.com/kentnguyen" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-highlight dark:text-gray-400 dark:hover:text-highlight transition-colors">
              <Github size={24} />
              <span className="sr-only">GitHub</span>
            </a>
            <a href="https://www.linkedin.com/in/nguyendmz/" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-highlight dark:text-gray-400 dark:hover:text-highlight transition-colors">
              <Linkedin size={24} />
              <span className="sr-only">LinkedIn</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
