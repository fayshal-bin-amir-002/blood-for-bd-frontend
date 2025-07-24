import BlogDetailsComponent from "@/components/modules/Blog-Details";
import PageContainer from "@/components/shared/PageContainer";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blood For BD | Blog Details",
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

const BlogDetailsPage = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = await params;
  return (
    <PageContainer>
      <BlogDetailsComponent id={id} />
    </PageContainer>
  );
};

export default BlogDetailsPage;
