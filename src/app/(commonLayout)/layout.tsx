import { Footer } from "@/components/modules/Footer/Footer";
import NavBar from "@/components/shared/NavBar";
import { ReactNode } from "react";

const CommonLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div>
      <NavBar />
      <main>{children}</main>
      <Footer />
    </div>
  );
};

export default CommonLayout;
