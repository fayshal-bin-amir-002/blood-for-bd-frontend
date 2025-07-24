"use client";

import { getABlog } from "@/services/blog";
import { IBlog } from "@/types";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";

const BlogDetailsComponent = ({ id }: { id: string }) => {
  const [loading, setLoading] = useState(true);
  const [blog, setBlog] = useState<IBlog | null>(null);

  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await getABlog(id);
      if (res?.success) {
        setBlog(res?.data);
      } else {
        toast.error(res?.message || "Failed to fetch blog.");
      }
    } catch (err: any) {
      toast.error(err?.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [id]);

  if (loading) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-10">
        <Card>
          <CardHeader>
            <Skeleton className="h-8 w-3/4 mb-2" />
            <Skeleton className="h-5 w-1/2" />
          </CardHeader>
          <CardContent>
            <Skeleton className="w-full h-64 rounded-md mb-4" />
            <Skeleton className="h-4 w-full mb-2" />
            <Skeleton className="h-4 w-5/6 mb-2" />
            <Skeleton className="h-4 w-2/3" />
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="text-center py-10 text-muted-foreground">
        Blog not found.
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle className="text-3xl leading-snug">{blog.title}</CardTitle>
        </CardHeader>

        <CardContent>
          {blog.image && (
            <Image
              width={500}
              height={500}
              src={blog.image}
              alt={blog.title}
              className="w-full h-auto rounded-lg mb-6 object-cover max-h-[400px]"
              priority
            />
          )}

          <Separator className="my-4" />

          <div
            className="prose dark:prose-invert max-w-none"
            dangerouslySetInnerHTML={{
              __html: blog.details || "<p>No content available</p>",
            }}
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default BlogDetailsComponent;
