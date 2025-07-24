"use client";

import { Button } from "@/components/ui/button";
import { IMeta } from "@/types";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import TableLoader from "@/components/shared/Loaders/TableLoader";
import PaginationComponent from "@/components/shared/PaginationComponent";
import { Eye, Trash } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Swal from "sweetalert2";
import {
  deleteTestimonial,
  getAllTestimonialByAdmin,
  updateTestimonialStatus,
} from "@/services/testimonial";
import { ITestimonial } from "@/types/testimonial";
import ViewTestimonialModal from "./ViewTestimonialModal";

const TestimonialManagement = ({
  query,
}: {
  query: { [key: string]: string | string[] | undefined };
}) => {
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(Number(query?.page) || 1);
  const [items, setItems] = useState<ITestimonial[] | []>([]);
  const [item, setItem] = useState<ITestimonial | null>(null);
  const [meta, setMeta] = useState<IMeta | null>(null);
  const [openView, setOpenView] = useState(false);

  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await getAllTestimonialByAdmin(page.toString());
      if (res?.success) {
        setItems(res?.data || []);
        setMeta(res?.meta || null);
      } else {
        toast.error(res?.message || "Failed to fetch testimonial data.");
      }
    } catch (err) {
      toast.error("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [page]);

  const handleDeleteItem = async (id: string) => {
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
          const res = await deleteTestimonial(id);
          if (res?.success) {
            toast.success(res?.message);
            await fetchData();
          } else {
            toast.error(res?.message);
          }
        } catch (err) {
          toast.error("Something went wrong!");
        }
      }
    });
  };

  const handleStatusChange = async (id: string, status: string) => {
    try {
      const res = await updateTestimonialStatus(id, { status });
      if (res?.success) {
        toast.success(res?.message);
        fetchData();
      } else {
        toast.success(res?.message);
      }
    } catch (err) {
      toast.error("Something went wrong!");
    }
  };

  return (
    <div>
      <div className="bg-background border rounded-md">
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-transparent">
              <TableHead>Name</TableHead>
              <TableHead>Address</TableHead>
              <TableHead>Published</TableHead>
              <TableHead>Posted At</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              <TableLoader columns={5} rows={5} />
            ) : items?.length > 0 ? (
              items.map((item) => (
                <TableRow key={item.id}>
                  <TableCell className="truncate">{item?.name}</TableCell>
                  <TableCell className="truncate">{item?.address}</TableCell>
                  <TableCell
                    className={`${
                      item?.isPublished ? "text-green-600" : "text-red-600"
                    }`}
                  >
                    {item?.isPublished ? "YES" : "NO"}
                  </TableCell>
                  <TableCell>
                    {new Date(item?.createdAt).toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center justify-start gap-3">
                      <Select
                        onValueChange={(e) => handleStatusChange(item?.id, e)}
                      >
                        <SelectTrigger className="w-[150px]">
                          <SelectValue placeholder="Update Status" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            <SelectItem value="true">Approve</SelectItem>
                            <SelectItem value="false">Decline</SelectItem>
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                      <Button
                        size="icon"
                        variant={"outline"}
                        onClick={() => {
                          setItem(item);
                          setOpenView(true);
                        }}
                      >
                        <Eye />
                      </Button>
                      <Button
                        size="icon"
                        variant={"outline"}
                        onClick={() => handleDeleteItem(item.id)}
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
                  No Testimonial Item found.
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

      {item && (
        <ViewTestimonialModal
          item={item}
          openView={openView}
          setOpenView={setOpenView}
        />
      )}
    </div>
  );
};

export default TestimonialManagement;
