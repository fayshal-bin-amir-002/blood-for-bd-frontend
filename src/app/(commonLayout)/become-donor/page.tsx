import BecomeDonorForm from "@/components/modules/Become-Donor/BecomeDonorForm";
import PageContainer from "@/components/shared/PageContainer";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blood For BD | Become A Donor",
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

const BecomeDonorPage = () => {
  return (
    <PageContainer>
      <div className="mb-6 md:mb-8 lg:mb-10">
        <h1 className="text-3xl md:text-4xl font-bold text-center">
          Register as a Blood Donor
        </h1>
        <p className="mt-4 text-muted-foreground text-center max-w-2xl mx-auto">
          Your single donation can be someone&apos;s second chance at life. Fill
          out this simple form and be part of something life-saving.
        </p>
      </div>
      <div>
        <BecomeDonorForm />
      </div>
    </PageContainer>
  );
};

export default BecomeDonorPage;
