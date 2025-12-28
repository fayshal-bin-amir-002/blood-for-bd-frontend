'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  getSingleOrganization,
  joinOrganization,
  leaveOrganization,
} from '@/services/organization';
import { ISingleOrganization } from '@/types/organization';
import { Skeleton } from '@/components/ui/skeleton';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  MapPin,
  Mail,
  Phone,
  Users,
  Calendar,
  LogOut,
  Settings,
  LayoutDashboard,
} from 'lucide-react';
import { toast } from 'sonner';
import { format } from 'date-fns';

const SingleOrganizationContainer = ({ id }: { id: string }) => {
  const [data, setData] = useState<ISingleOrganization | null>(null);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);

  const fetchDetails = async () => {
    try {
      setLoading(true);
      const res = await getSingleOrganization(id);
      if (res?.success) setData(res.data);
    } catch (error) {
      toast.error('Failed to load organization details');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDetails();
  }, [id]);

  const handleJoin = async () => {
    setActionLoading(true);
    const res = await joinOrganization(id);
    if (res?.success) {
      toast.success('Join request sent successfully');
      fetchDetails();
    } else {
      toast.error(res?.message || 'Something went wrong');
    }
    setActionLoading(false);
  };

  const handleLeave = async () => {
    if (!confirm('Are you sure you want to leave this organization?')) return;
    setActionLoading(true);
    const res = await leaveOrganization(id);
    if (res?.success) {
      toast.success('Left the organization');
      fetchDetails();
    }
    setActionLoading(false);
  };

  if (loading) return <DetailSkeleton />;
  if (!data)
    return <div className="text-center py-20">Organization not found</div>;

  const membership = data.membershipInfo;
  const isJoined = membership?.status === 'JOINED';
  const isAdminOrMod =
    isJoined &&
    (membership.role === 'ADMIN' || membership.role === 'MODERATOR');

  return (
    <div>
      {/* Hero Section */}
      <div className="relative bg-white rounded-3xl border shadow-sm overflow-hidden mb-6 md:mb-8">
        <div className="h-48 bg-linear-to-r from-red-500 to-red-700" />
        <div className="px-8 pb-8">
          <div className="relative -mt-16 flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <div className="flex flex-col md:flex-row items-center md:items-end gap-5">
              <div className="relative h-32 w-32 rounded-2xl border-4 border-white bg-white overflow-hidden shadow-md">
                <Image
                  src={data.logo || '/org-placeholder.png'}
                  alt={data.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="text-center md:text-left space-y-1">
                <h1 className="text-3xl font-bold text-gray-900">
                  {data.name}
                </h1>
                <div className="flex items-center justify-center md:justify-start gap-2 text-gray-500">
                  <MapPin size={16} />
                  <span>
                    {data.district}, {data.division}
                  </span>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap justify-center gap-3">
              {/* Conditional Buttons based on status */}
              {!membership && (
                <Button
                  onClick={handleJoin}
                  disabled={actionLoading}
                  className="bg-red-600 hover:bg-red-700 rounded-full px-8"
                >
                  Join Organization
                </Button>
              )}
              {membership?.status === 'PENDING' && (
                <Badge
                  variant="outline"
                  className="text-orange-500 border-orange-200 bg-orange-50 px-4 py-2"
                >
                  Pending Approval
                </Badge>
              )}
              {membership?.status === 'REJECTED' && (
                <Badge variant="destructive">Request Rejected</Badge>
              )}
              {isJoined && (
                <>
                  {isAdminOrMod && (
                    <Link href={`/organization/${id}/manage`}>
                      <Button variant="outline" className="rounded-full gap-2">
                        <Settings size={16} /> Manage
                      </Button>
                    </Link>
                  )}
                  <Button
                    onClick={handleLeave}
                    disabled={actionLoading}
                    variant="ghost"
                    className="text-red-500 hover:text-red-600 hover:bg-red-50 rounded-full gap-2"
                  >
                    <LogOut size={16} /> Leave
                  </Button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Info */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white p-6 rounded-2xl border space-y-4">
            <h3 className="font-bold text-lg">Contact Information</h3>
            <div className="space-y-3 text-gray-600">
              <div className="flex items-center gap-3">
                <Mail size={18} className="text-red-500" />
                <span className="text-sm">{data.email}</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone size={18} className="text-red-500" />
                <span className="text-sm">{data.contact_number}</span>
              </div>
              <div className="flex items-center gap-3">
                <Users size={18} className="text-red-500" />
                <span className="text-sm">
                  {data._count.members} Registered Members
                </span>
              </div>
            </div>
          </div>

          {isJoined && (
            <div className="bg-red-50 p-6 rounded-2xl border border-red-100">
              <h3 className="font-bold text-red-900 mb-2">Your Membership</h3>
              <p className="text-red-700 text-sm">
                Role: <strong>{membership.role}</strong>
              </p>
              <p className="text-red-700 text-sm">
                Status: <strong>{membership.status}</strong>
              </p>
            </div>
          )}
        </div>

        {/* Right Column: Description & Campaigns */}
        <div className="lg:col-span-2 space-y-8">
          <div className="bg-white p-6 rounded-2xl border">
            <h3 className="font-bold text-xl mb-4">About Us</h3>
            <p className="text-gray-600 leading-relaxed">{data.description}</p>
          </div>

          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-xl">Recent Campaigns</h3>
              {isAdminOrMod && (
                <Button size="sm" className="bg-black text-white rounded-full">
                  Add Campaign
                </Button>
              )}
            </div>

            <div className="grid grid-cols-1 gap-4">
              {data.campaigns.length > 0 ? (
                data.campaigns.map((camp) => (
                  <div
                    key={camp.id}
                    className="group flex flex-col md:flex-row bg-white border rounded-2xl overflow-hidden hover:shadow-md transition"
                  >
                    <div className="relative h-48 md:w-48 overflow-hidden">
                      <Image
                        src={camp.image}
                        alt={camp.title}
                        fill
                        className="object-cover group-hover:scale-105 transition duration-500"
                      />
                    </div>
                    <div className="p-5 flex-1 flex flex-col justify-between">
                      <div>
                        <h4 className="font-bold text-lg text-gray-900 mb-2">
                          {camp.title}
                        </h4>
                        <p className="text-sm text-gray-500 line-clamp-2">
                          {camp.description}
                        </p>
                      </div>
                      <div className="mt-4 flex flex-wrap gap-4 text-xs font-medium text-gray-500">
                        <div className="flex items-center gap-1.5 text-red-600 bg-red-50 px-2 py-1 rounded-md">
                          <Calendar size={14} />
                          {format(new Date(camp.campaign_date), 'PPP')}
                        </div>
                        <div className="flex items-center gap-1.5 px-2 py-1">
                          <MapPin size={14} />
                          {camp.location}
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-10 bg-gray-50 rounded-2xl border border-dashed">
                  No active campaigns found.
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const DetailSkeleton = () => (
  <div className="max-w-6xl mx-auto p-8 space-y-8">
    <Skeleton className="h-64 w-full rounded-3xl" />
    <div className="grid grid-cols-3 gap-8">
      <Skeleton className="h-48 col-span-1 rounded-2xl" />
      <div className="col-span-2 space-y-4">
        <Skeleton className="h-40 w-full rounded-2xl" />
        <Skeleton className="h-20 w-full rounded-2xl" />
      </div>
    </div>
  </div>
);

export default SingleOrganizationContainer;
