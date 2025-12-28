'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { format } from 'date-fns';
import {
  MapPin,
  Calendar,
  Clock,
  ChevronLeft,
  Share2,
  Info,
  Building2,
  Phone,
  Mail,
} from 'lucide-react';
import { ICampaign } from '@/types/campaign';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { toast } from 'sonner';
import { getSingleCampaign } from '@/services/campaign';

const SingleCampaign = ({ id }: { id: string }) => {
  const [data, setData] = useState<ICampaign | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDetail = async () => {
      try {
        setLoading(true);
        const res = await getSingleCampaign(id);
        if (res?.success) {
          setData(res.data);
        }
      } catch (error) {
        toast.error('Failed to load campaign details');
      } finally {
        setLoading(false);
      }
    };
    fetchDetail();
  }, [id]);

  if (loading) return <CampaignDetailSkeleton />;
  if (!data)
    return (
      <div className="text-center py-20 text-gray-500 font-medium">
        Campaign not found.
      </div>
    );

  const campaignDate = new Date(data.campaign_date);

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 space-y-8">
      {/* Navigation & Header */}
      <div className="flex items-center justify-between">
        <Link href="/campaign">
          <Button
            variant="ghost"
            className="gap-2 text-gray-600 hover:text-red-600"
          >
            <ChevronLeft size={20} /> Back to Campaigns
          </Button>
        </Link>
        <Button variant="outline" size="icon" className="rounded-full">
          <Share2 size={18} />
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Side: Image & Content */}
        <div className="lg:col-span-2 space-y-6">
          <div className="relative h-[300px] md:h-[450px] w-full rounded-[32px] overflow-hidden shadow-xl shadow-red-50/50">
            <Image
              src={data.image}
              alt={data.title}
              fill
              className="object-cover"
              priority
            />
            <div className="absolute top-6 left-6">
              <span className="bg-red-600 text-white px-4 py-2 rounded-xl text-sm font-bold shadow-lg">
                Upcoming Event
              </span>
            </div>
          </div>

          <div className="space-y-4">
            <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 leading-tight">
              {data.title}
            </h1>
            <div className="flex flex-wrap gap-4 items-center text-gray-600">
              <div className="flex items-center gap-2 bg-gray-100 px-4 py-2 rounded-full text-sm font-medium">
                <Calendar size={18} className="text-red-500" />
                {format(campaignDate, 'PPP')}
              </div>
              <div className="flex items-center gap-2 bg-gray-100 px-4 py-2 rounded-full text-sm font-medium">
                <Clock size={18} className="text-red-500" />
                {format(campaignDate, 'p')}
              </div>
            </div>
          </div>

          <div className="bg-white p-8 rounded-[32px] border border-gray-100 shadow-sm space-y-4">
            <div className="flex items-center gap-2 text-gray-900 font-bold text-lg">
              <Info size={22} className="text-red-500" />
              About this Campaign
            </div>
            <p className="text-gray-600 leading-relaxed whitespace-pre-line">
              {data.description}
            </p>
          </div>
        </div>

        {/* Right Side: Sidebar Info */}
        <div className="space-y-6">
          {/* Location Card */}
          <div className="bg-red-50 p-6 rounded-[32px] border border-red-100 space-y-4">
            <h3 className="text-red-900 font-bold text-xl flex items-center gap-2">
              <MapPin size={22} /> Location
            </h3>
            <div className="text-red-800">
              <p className="font-semibold">{data.location}</p>
              <p className="text-sm opacity-80">
                {data.organization.district}, {data.organization.division}
              </p>
            </div>
            <Button className="w-full bg-red-600 hover:bg-red-700 text-white rounded-2xl h-12 font-bold transition-all">
              Join as Volunteer
            </Button>
          </div>

          {/* Organizer Card */}
          <div className="bg-white p-6 rounded-[32px] border border-gray-100 shadow-sm space-y-5">
            <h3 className="text-gray-900 font-bold text-lg flex items-center gap-2">
              <Building2 size={20} className="text-gray-400" /> Organizer
              Details
            </h3>
            <Link
              href={`/organization/${data.organization_id}`}
              className="flex items-center gap-4 p-2 hover:bg-gray-50 rounded-2xl transition"
            >
              <div className="relative h-14 w-14 rounded-xl overflow-hidden border">
                <Image
                  src={data.organization.logo}
                  alt={data.organization.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="flex-1">
                <p className="font-bold text-gray-900 line-clamp-1">
                  {data.organization.name}
                </p>
                <p className="text-xs text-blue-600 font-semibold uppercase tracking-wider">
                  View Profile
                </p>
              </div>
            </Link>

            <div className="pt-4 border-t space-y-3">
              <div className="flex items-center gap-3 text-sm text-gray-600">
                <Mail size={16} className="text-gray-400" />
                <span>contact@blooddonation.org</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-gray-600">
                <Phone size={16} className="text-gray-400" />
                <span>+880 1700-000000</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const CampaignDetailSkeleton = () => (
  <div className="max-w-5xl mx-auto px-4 py-8 space-y-8">
    <div className="flex justify-between">
      <Skeleton className="h-10 w-32" />
      <Skeleton className="h-10 w-10 rounded-full" />
    </div>
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div className="lg:col-span-2 space-y-6">
        <Skeleton className="h-[450px] w-full rounded-[32px]" />
        <Skeleton className="h-12 w-3/4" />
        <Skeleton className="h-32 w-full rounded-[32px]" />
      </div>
      <div className="space-y-6">
        <Skeleton className="h-48 w-full rounded-[32px]" />
        <Skeleton className="h-64 w-full rounded-[32px]" />
      </div>
    </div>
  </div>
);

export default SingleCampaign;
