
import React from "react";
import { Github, Linkedin, Mail } from "lucide-react";

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="py-16 bg-white dark:bg-gray-900 border-t border-gray-100 dark:border-gray-800">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <div className="text-gray-600 dark:text-gray-400 text-sm">
            © 2026 Year of Reckoning
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
