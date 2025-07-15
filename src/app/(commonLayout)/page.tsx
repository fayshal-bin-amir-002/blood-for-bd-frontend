import HeroSection from "@/components/modules/HomePage/Hero/HeroSection";
import Container from "@/components/shared/Container";
import NavBar from "@/components/shared/NavBar";

export default function Home() {
  return (
    <div>
      <NavBar />
      <main className="h-[2000px]">
        <Container>
          <HeroSection />
        </Container>
      </main>
    </div>
  );
}
