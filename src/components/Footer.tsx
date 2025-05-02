
import React from "react";

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="py-10 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <span className="text-xl font-heading font-bold text-gray-900 dark:text-white">
              Kent Nguyen
            </span>
            <p className="text-gray-600 dark:text-gray-400 mt-2">
              Tech Entrepreneur & Fractional CTO
            </p>
          </div>
          
          <div className="text-gray-600 dark:text-gray-400 text-sm">
            © {currentYear} Kent Nguyen. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
