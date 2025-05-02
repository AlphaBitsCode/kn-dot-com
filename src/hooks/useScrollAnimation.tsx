
import { useEffect } from 'react';

interface ScrollAnimationOptions {
  threshold?: number;
  root?: Element | null;
  rootMargin?: string;
}

export const useScrollAnimation = (options: ScrollAnimationOptions = {}) => {
  const { threshold = 0.1, root = null, rootMargin = "0px" } = options;

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
          }
        });
      },
      {
        threshold,
        root,
        rootMargin,
      }
    );

    const animatedElements = document.querySelectorAll('.animate-on-scroll');
    
    animatedElements.forEach((el) => {
      observer.observe(el);
    });

    return () => {
      animatedElements.forEach((el) => {
        observer.unobserve(el);
      });
    };
  }, [threshold, root, rootMargin]);
};

export default useScrollAnimation;
