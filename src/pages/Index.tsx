import { useEffect } from "react";
import Navbar from "@/components/layout/Navbar";
import HeroSection from "@/components/sections/HeroSection";
import CibleSection from "@/components/sections/CibleSection";
import RadarSection from "@/components/sections/RadarSection";
import ProspectionSection from "@/components/sections/ProspectionSection";
import PlaybooksSection from "@/components/sections/PlaybooksSection";
import PropositionSection from "@/components/sections/PropositionSection";
import LtvSection from "@/components/sections/LtvSection";
import FooterCta from "@/components/sections/FooterCta";

const Index = () => {
  // Global reveal observer for sections that don't have their own
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) e.target.classList.add("visible");
        });
      },
      { threshold: 0.08, rootMargin: "0px 0px -40px 0px" }
    );
    document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <Navbar />
      <HeroSection />
      {/* Divider */}
      <div style={{ height: 1, background: "rgb(212 207 197)" }} />
      <CibleSection />
      <RadarSection />
      <ProspectionSection />
      <PlaybooksSection />
      <PropositionSection />
      <LtvSection />
      <FooterCta />
    </>
  );
};

export default Index;
