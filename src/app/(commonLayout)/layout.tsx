import { Footer } from "@/components/modules/Footer/Footer";
import NavBar from "@/components/shared/NavBar";
import { ReactNode } from "react";

const CommonLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="flex flex-col min-h-screen">
      <NavBar />
      <main className="flex-1 min-h-[calc(100vh-442px)] md:min-h-[calc(100vh-442px)] lg:min-h-[calc(100vh-442px)] xl:min-h-[calc(100vh-442px)]">
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default CommonLayout;
