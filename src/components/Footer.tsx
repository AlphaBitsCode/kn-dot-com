
import React from "react";
import { Github, Linkedin, Mail } from "lucide-react";

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="py-16 bg-white dark:bg-gray-900 border-t border-gray-100 dark:border-gray-800">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="mb-8 md:mb-0">
            <span className="text-xl font-heading font-bold text-gray-900 dark:text-white">
              Kent Nguyen
            </span>
            <p className="text-gray-600 dark:text-gray-400 mt-2">
              Serial Tech Entrepreneur & Fractional CTO
            </p>
          </div>
          
          <div className="text-center">
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white tracking-wider uppercase mb-4">
              Connect
            </h3>
            <div className="flex items-center justify-center space-x-6">
              <a href="https://blog.kentnguyen.com/?utm_source=kn&utm_campaign=debug&utm_medium=1" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-highlight dark:text-gray-400 dark:hover:text-highlight transition-colors">
                Blog
              </a>
              <a href="https://github.com/kentnguyen" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-highlight dark:text-gray-400 dark:hover:text-highlight transition-colors">
                <Github size={20} />
              </a>
              <a href="https://www.linkedin.com/in/nguyendmz/" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-highlight dark:text-gray-400 dark:hover:text-highlight transition-colors">
                <Linkedin size={20} />
              </a>
              <a href="mailto:kent@alphabits.team" className="text-gray-600 hover:text-highlight dark:text-gray-400 dark:hover:text-highlight transition-colors">
                <Mail size={20} />
              </a>
            </div>
          </div>
          
          <div className="text-right">
            <div className="text-gray-600 dark:text-gray-400 text-sm">
              © 2026 Year of Reckoning
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
