export const getAllBlogs = async (page?: string, limit?: string) => {
  const params = new URLSearchParams();

  if (limit) {
    params.append("limit", limit);
  }

  console.log(limit);

  if (page) {
    params.append("page", page);
  }

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/blog?page=${page}&limit=${limit}`,
      {
        next: {
          tags: ["Blogs"],
        },
      }
    );
    const result = await res.json();

    return result;
  } catch (error: any) {
    return Error(error);
  }
};
