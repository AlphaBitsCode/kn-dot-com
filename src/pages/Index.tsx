
import React, { useEffect } from "react";
import NavBar from "@/components/NavBar";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import ServicesSection from "@/components/ServicesSection";
import TimelineSection from "@/components/TimelineSection";
import ClientsSection from "@/components/ClientsSection";
import PhotographySection from "@/components/PhotographySection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import useScrollAnimation from "@/hooks/useScrollAnimation";

const Index: React.FC = () => {
  useScrollAnimation();
  
  useEffect(() => {
    document.title = "Kent Nguyen | Tech Entrepreneur & Fractional CTO";
  }, []);
  
  return (
    <div className="min-h-screen bg-background text-foreground">
      <NavBar />
      <HeroSection />
      <AboutSection />
      <ServicesSection />
      <TimelineSection />
      <ClientsSection />
      <PhotographySection />
      <ContactSection />
      <Footer />
    </div>
  );
};

export default Index;
