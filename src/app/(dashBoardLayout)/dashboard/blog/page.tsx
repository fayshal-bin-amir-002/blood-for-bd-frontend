import BlogManagement from "@/components/modules/Dashboard/blog";
import { ISearchParams } from "@/types";

const BlogPage = async ({ searchParams }: ISearchParams) => {
  const query = await searchParams;
  return (
    <div>
      <BlogManagement query={query} />
    </div>
  );
};

export default BlogPage;
