
import React from "react";

const HeroSection: React.FC = () => {
  return (
    <section className="min-h-screen flex items-center justify-center bg-white dark:bg-gray-900">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-4 leading-tight text-gray-900 dark:text-white">
            Kent Nguyen
          </h1>

          <p className="text-2xl md:text-3xl font-light text-gray-600 dark:text-gray-400">
            Serial Entrepreneur, Tech Advisor
          </p>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
