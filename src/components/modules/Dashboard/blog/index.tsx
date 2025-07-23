"use client";

import { Button } from "@/components/ui/button";
import { deleteBlog, getAllBlogs } from "@/services/blog";
import { IBlog, IMeta } from "@/types";
import Link from "next/link";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import TableLoader from "@/components/shared/Loaders/TableLoader";
import Image from "next/image";
import PaginationComponent from "@/components/shared/PaginationComponent";
import { Eye, SquarePen, Trash } from "lucide-react";
import ViewBlogModal from "./ViewBlogModal";
import Swal from "sweetalert2";

const BlogManagement = ({
  query,
}: {
  query: { [key: string]: string | string[] | undefined };
}) => {
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(Number(query?.page) || 1);
  const [blogs, setBlogs] = useState<IBlog[] | []>([]);
  const [blog, setBlog] = useState<IBlog | null>(null);
  const [meta, setMeta] = useState<IMeta | null>(null);
  const [openView, setOpenView] = useState(false);

  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await getAllBlogs(page.toString(), undefined);
      if (res?.success) {
        setBlogs(res?.data || []);
        setMeta(res?.meta || null);
      } else {
        toast.error(res?.message || "Failed to fetch blogs.");
      }
    } catch (err: any) {
      toast.error(err?.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [page]);

  const handleDeleteBlog = async (id: string) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res = await deleteBlog(id);
          if (res?.success) {
            toast.success(res?.message);
            await fetchData();
          } else {
            toast.error(res?.message || "Failed to fetch blogs.");
          }
        } catch (err: any) {
          toast.error(err?.message);
        }
      }
    });
  };

  return (
    <div>
      <div className="mb-6 flex justify-between items-center">
        <h3 className="text-2xl font-medium">Blog Management</h3>
        <Link href="/dashboard/blog/post">
          <Button>Post Blog</Button>
        </Link>
      </div>
      <div className="bg-background border rounded-md">
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-transparent">
              <TableHead>Image</TableHead>
              <TableHead>Title</TableHead>
              <TableHead>Created At</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              <TableLoader columns={4} rows={5} />
            ) : blogs?.length > 0 ? (
              blogs.map((blog) => (
                <TableRow key={blog.id}>
                  <TableCell>
                    <Image
                      src={blog?.image}
                      alt={blog.title}
                      width={50}
                      height={50}
                      priority
                    />
                  </TableCell>
                  <TableCell className="truncate">{blog?.title}</TableCell>
                  <TableCell>
                    {new Date(blog?.createdAt).toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center justify-start gap-3">
                      <Button
                        size="icon"
                        variant={"outline"}
                        onClick={() => {
                          setBlog(blog);
                          setOpenView(true);
                        }}
                      >
                        <Eye />
                      </Button>
                      <Link href={`/dashboard/blog/${blog?.id}`}>
                        <Button size="icon" variant={"outline"}>
                          <SquarePen />
                        </Button>
                      </Link>
                      <Button
                        size="icon"
                        variant={"outline"}
                        onClick={() => handleDeleteBlog(blog.id)}
                      >
                        <Trash />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={8} className="text-center py-8">
                  No donors found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {!loading && meta && (
        <PaginationComponent
          currentPage={page}
          onPageChange={setPage}
          totalPages={Math.ceil((meta?.total || 0) / meta.limit)}
          paginationItemsToDisplay={4}
        />
      )}
      <ViewBlogModal
        blog={blog}
        openView={openView}
        setOpenView={setOpenView}
      />
    </div>
  );
};

export default BlogManagement;
