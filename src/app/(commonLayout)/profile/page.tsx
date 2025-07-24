import ProfileManagement from "@/components/modules/Profile";
import PageContainer from "@/components/shared/PageContainer";
import { ISearchParams } from "@/types";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blood For BD | Profile",
  description:
    "Join our blood donation network in Bangladesh. Find donors, request blood, and help save lives with just one click. Your blood can be someone’s lifeline.",
  keywords: [
    "blood donation",
    "blood donor Bangladesh",
    "need blood BD",
    "blood group search",
    "Rangpur blood donor",
    "free blood service",
    "save lives BD",
    "donate blood BD",
    "blood bank Bangladesh",
  ],
};

const ProfilePage = async ({ searchParams }: ISearchParams) => {
  const query = await searchParams;
  return (
    <PageContainer>
      <ProfileManagement query={query} />
    </PageContainer>
  );
};

export default ProfilePage;
