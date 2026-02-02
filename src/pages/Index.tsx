
import React, { useEffect } from "react";
import HeroSection from "@/components/HeroSection";

const Index: React.FC = () => {
  useEffect(() => {
    document.title = "Kent Nguyen | Serial Entrepreneur, Tech Advisor";
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <HeroSection />
    </div>
  );
};

export default Index;
