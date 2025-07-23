import UpdateManagement from "@/components/modules/Dashboard/blog/update";

const UpdateBlogPage = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = await params;
  return (
    <div>
      <UpdateManagement id={id} />
    </div>
  );
};

export default UpdateBlogPage;
