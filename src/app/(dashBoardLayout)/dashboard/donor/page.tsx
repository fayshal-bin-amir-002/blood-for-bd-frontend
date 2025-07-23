import DonorManagement from "@/components/modules/Dashboard/donor";
import { ISearchParams } from "@/types";

const DonorPage = async ({ searchParams }: ISearchParams) => {
  const query = await searchParams;
  return (
    <div>
      <DonorManagement query={query} />
    </div>
  );
};

export default DonorPage;
