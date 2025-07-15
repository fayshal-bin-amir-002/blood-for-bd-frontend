import HeroSection from "@/components/modules/HomePage/Hero/HeroSection";
import NavBar from "@/components/shared/NavBar";

export default function Home() {
  return (
    <div>
      <NavBar />
      <main className="h-[2000px]">
        <HeroSection />
      </main>
    </div>
  );
}
