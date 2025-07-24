"use client";

import { getAllBlogs } from "@/services/blog";
import { IBlog, IMeta } from "@/types";
import { useEffect, useState } from "react";
import BlogCard from "../HomePage/BlogSection/BlogCard";
import BlogCardSkeleton from "@/components/shared/Loaders/BlogCardSkeleton";
import PaginationComponent from "@/components/shared/PaginationComponent";
import { toast } from "sonner";

const BlogsContainer = () => {
  const [blogs, setBlogs] = useState<IBlog[]>([]);
  const [meta, setMeta] = useState<IMeta | null>(null);
  const [currentPage, setCurrentPage] = useState(meta?.page || 1);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBlogs = async () => {
      setLoading(true);
      setError(null);

      try {
        const res = await getAllBlogs(currentPage.toString(), "9");
        if (!res.success) throw new Error("Failed to fetch blogs");
        setBlogs(res?.data);
        setMeta(res?.meta);
      } catch (err) {
        toast.error("Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, [currentPage]);

  return (
    <div>
      {(loading || blogs?.length === 0) && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(3)].map((_, i) => (
            <BlogCardSkeleton key={i} />
          ))}
        </div>
      )}

      {!loading && error && (
        <div className="text-center text-red-600 py-6">❌ {error}</div>
      )}

      {!loading && !error && blogs?.length > 0 && (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {blogs?.map((blog) => (
              <BlogCard blog={blog} key={blog.id} />
            ))}
          </div>
        </>
      )}
      {!loading && meta && (
        <PaginationComponent
          currentPage={currentPage}
          totalPages={Math.ceil((meta?.total || 0) / meta.limit)}
          paginationItemsToDisplay={4}
          onPageChange={setCurrentPage}
        />
      )}
    </div>
  );
};

export default BlogsContainer;
