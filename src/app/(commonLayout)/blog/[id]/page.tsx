import BlogDetailsComponent from "@/components/modules/Blog-Details";
import PageContainer from "@/components/shared/PageContainer";

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
