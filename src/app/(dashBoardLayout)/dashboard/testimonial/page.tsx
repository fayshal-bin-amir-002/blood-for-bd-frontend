import TestimonialManagement from "@/components/modules/Dashboard/testimonial";
import { ISearchParams } from "@/types";

const TestimonialPage = async ({ searchParams }: ISearchParams) => {
  const query = await searchParams;
  return (
    <div>
      <TestimonialManagement query={query} />
    </div>
  );
};

export default TestimonialPage;
