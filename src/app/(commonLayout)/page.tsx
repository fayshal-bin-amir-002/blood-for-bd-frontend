import BlogSection from "@/components/modules/HomePage/BlogSection/BlogSection";
import HeroSection from "@/components/modules/HomePage/Hero/HeroSection";
import HowItWorksSection from "@/components/modules/HomePage/HowItWorksSection/HowItWorksSection";
import ImpactSection from "@/components/modules/HomePage/ImpactSection/ImpactSection";

export default function Home() {
  return (
    <div>
      <HeroSection />
      <HowItWorksSection />
      <BlogSection />
      <ImpactSection />
    </div>
  );
}
