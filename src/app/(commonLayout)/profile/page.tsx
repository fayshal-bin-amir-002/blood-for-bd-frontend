import ProfileManagement from "@/components/modules/Profile";
import PageContainer from "@/components/shared/PageContainer";
import { ISearchParams } from "@/types";

const ProfilePage = async ({ searchParams }: ISearchParams) => {
  const query = await searchParams;
  return (
    <PageContainer>
      <ProfileManagement query={query} />
    </PageContainer>
  );
};

export default ProfilePage;
