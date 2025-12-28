'use client';

import { useEffect, useState } from 'react';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import Image from 'next/image';
import { format } from 'date-fns';
import {
  MapPin,
  Calendar,
  Users,
  Loader2,
  ChevronLeft,
  ChevronRight,
  Search,
} from 'lucide-react';
import { ICampaign } from '@/types/campaign';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { getAllCampaigns } from '@/services/campaign';
import Link from 'next/link';

const CampaignContainer = ({
  query,
}: {
  query: { [key: string]: string | string[] | undefined };
}) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [campaigns, setCampaigns] = useState<ICampaign[]>([]);
  const [loading, setLoading] = useState(true);
  const [meta, setMeta] = useState({ total: 0, page: 1, limit: 10 });

  const currentPage = Number(query?.page) || 1;

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await getAllCampaigns(query);
        if (res?.success) {
          setCampaigns(res.data);
          setMeta(res.meta);
        }
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [query]);

  const handlePageChange = (newPage: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('page', newPage.toString());
    router.push(`${pathname}?${params.toString()}`);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-8">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">
            Blood Donation Campaigns
          </h1>
          <p className="text-gray-500 mt-2">
            Find and join blood donation events near you to save lives.
          </p>
        </div>
        <div className="relative w-full md:w-80">
          <Search
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            size={18}
          />
          <input
            type="text"
            placeholder="Search campaigns..."
            className="w-full pl-10 pr-4 py-2 border rounded-full bg-white focus:outline-none focus:ring-2 focus:ring-red-100 transition"
          />
        </div>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <CampaignSkeleton key={i} />
          ))}
        </div>
      ) : campaigns.length > 0 ? (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {campaigns.map((campaign) => (
              <div
                key={campaign.id}
                className="group bg-white rounded-3xl border border-gray-100 overflow-hidden hover:shadow-2xl hover:shadow-red-100 transition-all duration-300 flex flex-col"
              >
                {/* Banner Image */}
                <div className="relative h-52 w-full overflow-hidden">
                  <Image
                    src={campaign.image}
                    alt={campaign.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-4 left-4">
                    <div className="bg-white/95 backdrop-blur px-3 py-1.5 rounded-2xl shadow-sm flex items-center gap-2">
                      <div className="h-6 w-6 relative rounded-full overflow-hidden">
                        <Image
                          src={campaign.organization.logo}
                          alt="org"
                          fill
                          className="object-cover"
                        />
                      </div>
                      <span className="text-[10px] font-bold text-gray-700 uppercase tracking-wider truncate max-w-25">
                        {campaign.organization.name}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 flex flex-col flex-1">
                  <div className="flex items-center gap-2 text-red-600 font-bold text-xs uppercase tracking-widest mb-3">
                    <Calendar size={14} />
                    {format(new Date(campaign.campaign_date), 'PPP')}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2 min-h-14 group-hover:text-red-600 transition-colors">
                    {campaign.title}
                  </h3>
                  <p className="text-gray-500 text-sm line-clamp-3 mb-6">
                    {campaign.description}
                  </p>

                  <div className="mt-auto space-y-4">
                    <div className="flex items-center gap-2 text-sm text-gray-600 bg-gray-50 p-3 rounded-2xl">
                      <MapPin size={16} className="text-red-500" />
                      <span className="truncate">{campaign.location}</span>
                    </div>
                    <Link href={`/campaign/${campaign.id}`}>
                      <Button className="w-full rounded-2xl bg-gray-900 hover:bg-red-600 text-white font-bold transition-all h-12">
                        View Details
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination */}
          <div className="flex items-center justify-between pt-8 border-t">
            <p className="text-sm text-gray-500 font-medium">
              Showing{' '}
              <span className="text-gray-900 font-bold">
                {campaigns.length}
              </span>{' '}
              of <span className="text-gray-900 font-bold">{meta.total}</span>{' '}
              campaigns
            </p>
            <div className="flex gap-3">
              <Button
                variant="outline"
                disabled={currentPage <= 1}
                onClick={() => handlePageChange(currentPage - 1)}
                className="rounded-xl px-4"
              >
                <ChevronLeft size={18} className="mr-1" /> Previous
              </Button>
              <Button
                variant="outline"
                disabled={currentPage * meta.limit >= meta.total}
                onClick={() => handlePageChange(currentPage + 1)}
                className="rounded-xl px-4"
              >
                Next <ChevronRight size={18} className="ml-1" />
              </Button>
            </div>
          </div>
        </>
      ) : (
        <div className="py-24 text-center bg-gray-50 rounded-[40px] border border-dashed border-gray-200">
          <Calendar className="mx-auto text-gray-300 mb-4" size={64} />
          <h3 className="text-xl font-bold text-gray-900">
            No campaigns found
          </h3>
          <p className="text-gray-500">
            There are no active campaigns at the moment. Please check back
            later.
          </p>
        </div>
      )}
    </div>
  );
};

const CampaignSkeleton = () => (
  <div className="bg-white rounded-3xl border border-gray-100 overflow-hidden space-y-4 pb-6">
    <Skeleton className="h-52 w-full" />
    <div className="px-6 space-y-3">
      <Skeleton className="h-4 w-1/3" />
      <Skeleton className="h-8 w-full" />
      <Skeleton className="h-20 w-full" />
      <Skeleton className="h-12 w-full rounded-2xl" />
    </div>
  </div>
);

export default CampaignContainer;
