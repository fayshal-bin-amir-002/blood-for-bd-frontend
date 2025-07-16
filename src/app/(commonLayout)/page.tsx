import BlogSection from "@/components/modules/HomePage/BlogSection/BlogSection";
import { FAQSection } from "@/components/modules/HomePage/FAQSection/FAQSection";
import GallerySection from "@/components/modules/HomePage/GallerySection/GallerySection";
import HeroSection from "@/components/modules/HomePage/Hero/HeroSection";
import HowItWorksSection from "@/components/modules/HomePage/HowItWorksSection/HowItWorksSection";
import ImpactSection from "@/components/modules/HomePage/ImpactSection/ImpactSection";
import { ExperienceSection } from "@/components/modules/HomePage/ExperienceSection/ExperienceSection";
import EligibilitySection from "@/components/modules/HomePage/EligibilitySection/EligibilitySection";

export default function Home() {
  return (
    <div>
      <HeroSection />
      <HowItWorksSection />
      <BlogSection />
      <ImpactSection />
      <GallerySection />
      <FAQSection />
      <EligibilitySection />
      <ExperienceSection />
    </div>
  );
}
