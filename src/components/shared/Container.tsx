import { ReactNode } from "react";

const Container = ({ children }: { children: ReactNode }) => {
  return (
    <div className="w-full max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
      {children}
    </div>
  );
};

export default Container;
