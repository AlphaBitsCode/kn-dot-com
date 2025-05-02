import React, { useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
const AboutSection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const elementsRef = useRef<HTMLDivElement[]>([]);
  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("active");
        }
      });
    }, {
      threshold: 0.1
    });
    const currentElements = elementsRef.current;
    currentElements.forEach(el => {
      if (el) observer.observe(el);
    });
    return () => {
      currentElements.forEach(el => {
        if (el) observer.unobserve(el);
      });
    };
  }, []);
  return <section id="about" className="py-20 bg-white dark:bg-gray-900">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Text content */}
          <div>
            <div className="reveal" ref={el => el && elementsRef.current.push(el)}>
              <h2 className="text-3xl lg:text-4xl font-bold mb-6 text-gray-900 dark:text-white">
                About <span className="text-highlight">Kent Nguyen</span>
              </h2>
              
              <p className="text-lg text-gray-700 dark:text-gray-300 mb-6">
                I'm a serial tech entrepreneur with over 20 years of experience. My core passion has always been coding, and I still find myself doing git push almost every day. Over the years, I've founded more than 10 different startups across various countries, gaining countless lessons from both successes and failures.
              </p>
              
              <p className="text-lg text-gray-700 dark:text-gray-300 mb-8">
                My background spans software, hardware, and related services. In 2018, I made a significant decision to return to Vietnam, shifting my focus from material pursuits to core values like Communication, Courage, Compassion, and Consistency.
              </p>

              
              
              <Button variant="outline" className="border-highlight text-highlight hover:bg-highlight hover:text-white">
                <a href="mailto:kent@alphabits.team">Get in Touch</a>
              </Button>
            </div>
          </div>
          
          {/* Image */}
          <div className="reveal" ref={el => el && elementsRef.current.push(el)}>
            <div className="relative">
              <div className="absolute -inset-4 bg-highlight/10 rounded-xl transform rotate-3"></div>
              <img src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158" alt="Kent Nguyen" className="rounded-lg shadow-lg w-full h-auto object-cover relative z-10" />
              <div className="absolute -bottom-4 -right-4 bg-white dark:bg-gray-800 p-4 shadow-lg rounded-lg z-20">
                <p className="font-semibold text-gray-900 dark:text-white">
                  20+ Years Experience
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Serial Entrepreneur & Technologist
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>;
};
export default AboutSection;