import FindDonorManagement from "@/components/modules/Find-Donor";
import SpinLoader from "@/components/shared/Loaders/SpinLoader";
import PageContainer from "@/components/shared/PageContainer";
import { ISearchParams } from "@/types";
import { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Blood For BD | Find Donor",
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

const FindDonorPage = async ({ searchParams }: ISearchParams) => {
  const query = await searchParams;
  return (
    <PageContainer>
      <Suspense fallback={<SpinLoader />}>
        <FindDonorManagement query={query} />
      </Suspense>
    </PageContainer>
  );
};

export default FindDonorPage;
