import { ReactNode } from "react";

const PageContainer = ({ children }: { children: ReactNode }) => {
  return (
    <div className="my-8 md:my-10 lg:my-12 w-full max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
      {children}
    </div>
  );
};

export default PageContainer;
