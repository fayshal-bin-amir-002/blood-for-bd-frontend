"use client";

import { useEffect, useState, useCallback } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "sonner";
import debounce from "lodash.debounce";

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
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";

const UserManagement = ({
  query,
}: {
  query: { [key: string]: string | string[] | undefined };
}) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(Number(query?.page) || 1);
  const [searchTerm, setSearchTerm] = useState(
    (query?.searchTerm as string) || ""
  );
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

  const handleSearch = useCallback(
    debounce((term: string) => {
      const params = new URLSearchParams(searchParams.toString());
      if (term) {
        params.set("searchTerm", term);
      } else {
        params.delete("searchTerm");
      }
      params.set("page", "1");
      router.push(`?${params.toString()}`);
    }, 500),
    [searchParams, router]
  );

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const term = e.target.value;
    setSearchTerm(term);
    handleSearch(term);
  };

  const handleFilterChange = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value && value !== "all") {
      params.set(key, value);
    } else {
      params.delete(key);
    }
    params.set("page", "1");
    router.push(`?${params.toString()}`);
  };

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
    <div className="space-y-4">
      {/* ✅ Search & Filter Bar */}
      <div className="w-full flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <h2 className="text-lg font-semibold w-full">User Management</h2>
        <div className="flex flex-wrap gap-3 items-center w-full">
          <Input
            placeholder="Search by phone..."
            className="max-w-xs"
            value={searchTerm}
            onChange={handleSearchChange}
          />
          <Select
            onValueChange={(value) => handleFilterChange("role", value)}
            defaultValue={(query?.role as string) || ""}
          >
            <SelectTrigger className="w-[120px]">
              <SelectValue placeholder="Role" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All</SelectItem>
              <SelectItem value="ADMIN">Admin</SelectItem>
              <SelectItem value="USER">User</SelectItem>
            </SelectContent>
          </Select>

          <Select
            onValueChange={(value) => handleFilterChange("isDonor", value)}
            defaultValue={(query?.isDonor as string) || ""}
          >
            <SelectTrigger className="w-[140px]">
              <SelectValue placeholder="Donor Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All</SelectItem>
              <SelectItem value="true">Donor</SelectItem>
              <SelectItem value="false">Non-Donor</SelectItem>
            </SelectContent>
          </Select>

          <Select
            onValueChange={(value) => handleFilterChange("isBlocked", value)}
            defaultValue={(query?.isBlocked as string) || ""}
          >
            <SelectTrigger className="w-[140px]">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All</SelectItem>
              <SelectItem value="true">Blocked</SelectItem>
              <SelectItem value="false">Unblocked</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* ✅ Table */}
      <div className="bg-background border rounded-md">
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-transparent">
              <TableHead>Phone</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Donor</TableHead>
              <TableHead>Created At</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              <TableLoader columns={6} rows={5} />
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
                  <TableCell className={`${user?.isDonor && "text-green-600"}`}>
                    {user?.isDonor ? "YES" : "NO"}
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
                <TableCell colSpan={6} className="text-center py-8">
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
          totalPages={Math.ceil((meta?.total || 0) / meta.limit)}
          paginationItemsToDisplay={4}
        />
      )}
    </div>
  );
};

export default UserManagement;
