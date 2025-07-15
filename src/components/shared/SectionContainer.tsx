import { ReactNode } from "react";

const SectionContainer = ({ children }: { children: ReactNode }) => {
  return (
    <div className="my-12 md:my-16 lg:my-20 w-full max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
      {children}
    </div>
  );
};

export default SectionContainer;
