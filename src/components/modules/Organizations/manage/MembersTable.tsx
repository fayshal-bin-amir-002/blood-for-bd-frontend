'use client';

import { useEffect, useState } from 'react';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import { IMember } from '@/types/organization';
import {
  getOrganizationMembers,
  approveMemberRequest,
  updateMemberRole,
} from '@/services/organization';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  UserCog,
  UserMinus,
  Phone,
  ShieldCheck,
  ShieldAlert,
  Users,
  UserPlus,
  Loader2,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { toast } from 'sonner';

const MembersTable = ({ orgId, query }: { orgId: string; query: any }) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [members, setMembers] = useState<IMember[]>([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState<string | null>(null);
  const [meta, setMeta] = useState({ total: 0, page: 1, limit: 10 });

  const currentPage = Number(query?.page) || 1;

  // ডাটা ফেচিং লজিক (Component-এর ভেতরে)
  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await getOrganizationMembers(orgId); // আপনার API অনুযায়ী query-ও পাস করতে পারেন
      if (res?.success) {
        setMembers(res.data);
        setMeta(res.meta || { total: res.data.length, page: 1, limit: 10 });
      }
    } catch (error) {
      toast.error('Failed to load members');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [orgId, currentPage]);

  const handlePageChange = (newPage: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('page', newPage.toString());
    router.push(`${pathname}?${params.toString()}`);
  };

  const handleAction = async (
    memberId: string,
    actionFn: any,
    ...args: any
  ) => {
    setActionLoading(memberId);
    const res = await actionFn(memberId, ...args);
    if (res?.success) {
      toast.success(res.message || 'Updated successfully');
      fetchData(); // ডাটা রি-ফেচ করা
    } else {
      toast.error(res?.message || 'Action failed');
    }
    setActionLoading(null);
  };

  if (loading)
    return (
      <div className="flex flex-col items-center justify-center py-20 bg-white border rounded-2xl">
        <Loader2 className="animate-spin text-red-600 mb-2" size={32} />
        <p className="text-sm text-gray-500">Fetching members...</p>
      </div>
    );

  return (
    <div className="space-y-4">
      <div className="rounded-2xl border bg-white overflow-hidden shadow-sm">
        <Table>
          <TableHeader className="bg-gray-50">
            <TableRow>
              <TableHead className="font-semibold">User / Phone</TableHead>
              <TableHead className="font-semibold">Role</TableHead>
              <TableHead className="font-semibold">Status</TableHead>
              <TableHead className="text-right font-semibold">Manage</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {members?.length > 0 ? (
              members.map((member) => (
                <TableRow
                  key={member.id}
                  className="hover:bg-gray-50/50 transition-colors"
                >
                  <TableCell>
                    <div className="flex flex-col">
                      <span className="font-bold text-gray-900">
                        {member.user.donor?.name || 'Unknown User'}
                      </span>
                      <span className="text-xs text-gray-500 flex items-center gap-1">
                        <Phone size={12} /> {member.user.phone}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant="outline"
                      className={
                        member.role === 'ADMIN'
                          ? 'border-purple-200 text-purple-700'
                          : 'border-blue-200 text-blue-700'
                      }
                    >
                      {member.role}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge
                      className={
                        member.status === 'JOINED'
                          ? 'bg-green-50 text-green-700 border-green-100'
                          : 'bg-orange-50 text-orange-700'
                      }
                    >
                      {member.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      {actionLoading === member.id ? (
                        <Loader2
                          className="animate-spin text-gray-300"
                          size={20}
                        />
                      ) : (
                        <>
                          {member.status === 'JOINED' && (
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button
                                  variant="outline"
                                  size="sm"
                                  className="h-8 gap-2"
                                >
                                  <UserCog size={14} /> Role
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end" className="w-44">
                                <DropdownMenuItem
                                  className="gap-2"
                                  onClick={() =>
                                    handleAction(member.id, updateMemberRole, {
                                      role: 'ADMIN',
                                    })
                                  }
                                >
                                  <ShieldCheck
                                    size={14}
                                    className="text-purple-600"
                                  />{' '}
                                  Make Admin
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                  className="gap-2"
                                  onClick={() =>
                                    handleAction(member.id, updateMemberRole, {
                                      role: 'MODERATOR',
                                    })
                                  }
                                >
                                  <ShieldCheck
                                    size={14}
                                    className="text-blue-600"
                                  />{' '}
                                  Make Moderator
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                  className="gap-2 text-red-600"
                                  onClick={() =>
                                    handleAction(member.id, updateMemberRole, {
                                      role: 'MEMBER',
                                    })
                                  }
                                >
                                  <ShieldAlert size={14} /> Make Member
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          )}
                          {member.status === 'PENDING' && (
                            <Button
                              onClick={() =>
                                handleAction(member.id, approveMemberRequest, {
                                  status: 'JOINED',
                                })
                              }
                              variant="outline"
                              size="sm"
                              className="h-8 text-green-600 border-green-100 hover:bg-green-50"
                            >
                              <UserPlus size={14} />
                            </Button>
                          )}
                          <Button
                            variant="outline"
                            size="sm"
                            className="h-8 text-red-500 border-red-100 hover:bg-red-50"
                          >
                            <UserMinus size={14} />
                          </Button>
                        </>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={4}
                  className="text-center py-12 text-gray-500"
                >
                  <div className="flex flex-col items-center gap-2">
                    <Users size={32} className="text-gray-300" />
                    <p>No members found.</p>
                  </div>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Pagination Controls */}
      <div className="flex items-center justify-between px-2">
        <p className="text-sm text-gray-500">
          Page {meta.page} of {Math.ceil(meta.total / meta.limit) || 1}
        </p>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            disabled={currentPage <= 1}
            onClick={() => handlePageChange(currentPage - 1)}
          >
            <ChevronLeft size={16} />
          </Button>
          <Button
            variant="outline"
            size="sm"
            disabled={currentPage * meta.limit >= meta.total}
            onClick={() => handlePageChange(currentPage + 1)}
          >
            <ChevronRight size={16} />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default MembersTable;
