import FindDonorManagement from "@/components/modules/Find-Donor";
import PageContainer from "@/components/shared/PageContainer";
import { ISearchParams } from "@/types";

const FindDonorPage = async ({ searchParams }: ISearchParams) => {
  const query = await searchParams;
  return (
    <PageContainer>
      <FindDonorManagement query={query} />
    </PageContainer>
  );
};

export default FindDonorPage;
