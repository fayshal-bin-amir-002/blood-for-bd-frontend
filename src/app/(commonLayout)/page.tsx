import BlogSection from "@/components/modules/HomePage/BlogSection/BlogSection";
import { FAQSection } from "@/components/modules/HomePage/FAQSection/FAQSection";
import GallerySection from "@/components/modules/HomePage/GallerySection/GallerySection";
import HeroSection from "@/components/modules/HomePage/Hero/HeroSection";
import HowItWorksSection from "@/components/modules/HomePage/HowItWorksSection/HowItWorksSection";
import ImpactSection from "@/components/modules/HomePage/ImpactSection/ImpactSection";
import { ExperienceSection } from "@/components/modules/HomePage/ExperienceSection/ExperienceSection";
import EligibilitySection from "@/components/modules/HomePage/EligibilitySection/EligibilitySection";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blood For BD | Home",
  description:
    "Join our blood donation network in Bangladesh. Find donors, request blood, and help save lives with just one click. Your blood can be someone’s lifeline.",
  keywords: [
    "blood donation",
    "blood donor Bangladesh",
    "need blood BD",
    "blood group search",
    "Rangpur blood donor",
    "free blood service",
    "save lives BD",
    "donate blood BD",
    "blood bank Bangladesh",
  ],
};

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
