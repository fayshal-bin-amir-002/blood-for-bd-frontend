"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

import SectionContainer from "@/components/shared/SectionContainer";
import { IBlog } from "@/types";
import { Button } from "@/components/ui/button";
import BlogCard from "./BlogCard";
import BlogCardSkeleton from "@/components/shared/Loaders/BlogCardSkeleton";
import { getAllBlogs } from "@/services/blog";

const BlogSection = () => {
  const [blogs, setBlogs] = useState<IBlog[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBlogs = async () => {
      setLoading(true);
      setError(null);

      try {
        const res = await getAllBlogs(undefined, "3");
        if (!res.success) throw new Error("Failed to fetch blogs");
        setBlogs(res.data);
      } catch (err: any) {
        setError(err.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  return (
    <div className="bg-white">
      <SectionContainer>
        <div className="mb-10 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
            সাম্প্রতিক ব্লগ
          </h2>
          <p className="text-gray-700 mt-2">
            রক্তদানের গুরুত্ব ও তথ্যভিত্তিক ব্লগ পড়ুন
          </p>
        </div>

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

            <div className="pt-6 md:pt-8 text-center">
              <Link href="/blog">
                <Button>আরও ব্লগ পড়ুন →</Button>
              </Link>
            </div>
          </>
        )}
      </SectionContainer>
    </div>
  );
};

export default BlogSection;
