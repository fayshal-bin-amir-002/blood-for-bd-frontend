const BlogCardSkeleton = () => {
  return (
    <div className="border rounded-xl shadow-sm p-4 animate-pulse space-y-4">
      <div className="w-full h-[225px] bg-gray-200 rounded-md" />
      <div className="h-3 bg-gray-300 rounded w-1/3" />
      <div className="h-4 bg-gray-300 rounded w-2/3" />
      <div className="h-4 bg-gray-300 rounded w-full" />
      <div className="h-4 bg-gray-300 rounded w-5/6" />
      <div className="h-4 bg-gray-300 rounded w-1/4" />
    </div>
  );
};

export default BlogCardSkeleton;
