"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";

import { getAllUser, updateUserRole, updateUserStatus } from "@/services/user";
import { IMeta, IUser, UserRole } from "@/types";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import PaginationComponent from "@/components/shared/PaginationComponent";
import TableLoader from "@/components/shared/Loaders/TableLoader";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const UserManagement = ({
  query,
}: {
  query: { [key: string]: string | string[] | undefined };
}) => {
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(Number(query?.page) || 1);
  const [users, setUsers] = useState<IUser[] | []>([]);
  const [meta, setMeta] = useState<IMeta | null>(null);

  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await getAllUser(query);
      if (res?.success) {
        setUsers(res?.data);
        setMeta(res?.meta);
      } else {
        toast.error(res?.message || "Failed to fetch users.");
      }
    } catch (err: any) {
      toast.error(err?.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [page, JSON.stringify(query)]);

  const handleRoleChange = async (id: string, role: string) => {
    try {
      const res = await updateUserRole(id, { role });
      if (res?.success) {
        toast.success(res?.message);
        await fetchData();
      } else {
        toast.error(res?.message);
      }
    } catch (err: any) {
      toast.error(err?.message);
    }
  };

  const handleStatusChange = async (id: string, status: string) => {
    try {
      const res = await updateUserStatus(id, { status });
      if (res?.success) {
        toast.success(res?.message);
        await fetchData();
      } else {
        toast.error(res?.message);
      }
    } catch (err: any) {
      toast.error(err?.message);
    }
  };

  return (
    <div>
      <div className="bg-background border rounded-md">
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-transparent">
              <TableHead>Phone</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Created At</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              <TableLoader columns={5} rows={5} />
            ) : users?.length > 0 ? (
              users.map((user) => (
                <TableRow key={user.id}>
                  <TableCell>{user?.phone}</TableCell>
                  <TableCell
                    className={`${
                      user?.role === UserRole.ADMIN && "text-amber-600"
                    }`}
                  >
                    {user?.role}
                  </TableCell>
                  <TableCell
                    className={`${
                      user?.isBlocked ? "text-red-600" : "text-green-600"
                    }`}
                  >
                    {user?.isBlocked ? "Blocked" : "Active"}
                  </TableCell>
                  <TableCell>
                    {new Date(user?.createdAt).toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Select
                        onValueChange={(e) => handleRoleChange(user?.id, e)}
                      >
                        <SelectTrigger className="w-[130px]">
                          <SelectValue placeholder="Update Role" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            <SelectItem value={UserRole.USER}>
                              {UserRole.USER}
                            </SelectItem>
                            <SelectItem value={UserRole.ADMIN}>
                              {UserRole.ADMIN}
                            </SelectItem>
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                      <Select
                        onValueChange={(e) => handleStatusChange(user?.id, e)}
                      >
                        <SelectTrigger className="w-[150px]">
                          <SelectValue placeholder="Update Status" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            <SelectItem value="true">Block</SelectItem>
                            <SelectItem value="false">Unblock</SelectItem>
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={5} className="text-center py-8">
                  No users found.
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
          totalPages={meta.total}
          paginationItemsToDisplay={4}
        />
      )}
    </div>
  );
};

export default UserManagement;
