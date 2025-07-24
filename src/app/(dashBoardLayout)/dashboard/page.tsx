import DashbaordManagement from "@/components/modules/Dashboard";
import SpinLoader from "@/components/shared/Loaders/SpinLoader";
import { Suspense } from "react";

const DashbaordPage = async () => {
  return (
    <div>
      <Suspense fallback={<SpinLoader />}>
        <DashbaordManagement />
      </Suspense>
    </div>
  );
};

export default DashbaordPage;
