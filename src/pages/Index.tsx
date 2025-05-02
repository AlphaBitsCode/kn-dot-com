
import React, { useEffect } from "react";
import NavBar from "@/components/NavBar";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import ServicesSection from "@/components/ServicesSection";
import TimelineSection from "@/components/TimelineSection";
import ClientsSection from "@/components/ClientsSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import useScrollAnimation from "@/hooks/useScrollAnimation";

const Index: React.FC = () => {
  useScrollAnimation();
  
  useEffect(() => {
    document.title = "Kent Nguyen | Tech Entrepreneur & Fractional CTO";
  }, []);

  // Add Ken Burns effect thumbnails when actual images will be uploaded
  useEffect(() => {
    // This is a placeholder for future ken burns effect implementation
    // Will be replaced with actual implementation when images are uploaded
    const thumbnails = document.querySelectorAll('.timeline-thumbnail');
    if (thumbnails.length > 0) {
      console.log('Thumbnails ready for Ken Burns effect:', thumbnails.length);
    }
  }, []);
  
  return (
    <div className="min-h-screen bg-background text-foreground">
      <NavBar />
      <HeroSection />
      <AboutSection />
      <ServicesSection />
      <TimelineSection />
      <ClientsSection />
      <ContactSection />
      <Footer />
    </div>
  );
};

export default Index;
