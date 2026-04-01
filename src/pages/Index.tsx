import Navbar from "@/components/layout/Navbar";
import Divider from "@/components/layout/Divider";
import HeroSection from "@/components/sections/HeroSection";
import CibleSection from "@/components/sections/CibleSection";
import SystemeSection from "@/components/sections/SystemeSection";
import RadarSection from "@/components/sections/RadarSection";
import ProspectionSection from "@/components/sections/ProspectionSection";
import PropositionSection from "@/components/sections/PropositionSection";
import LtvSection from "@/components/sections/LtvSection";
import FooterCta from "@/components/sections/FooterCta";

const Index = () => (
  <>
    <Navbar />
    <HeroSection />
    <Divider />
    <CibleSection />
    <Divider />
    <SystemeSection />
    <Divider />
    <RadarSection />
    <Divider />
    <ProspectionSection />
    <Divider />
    <PropositionSection />
    <Divider />
    <LtvSection />
    <Divider />
    <FooterCta />
  </>
);

export default Index;
