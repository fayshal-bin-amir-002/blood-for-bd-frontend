'use client';

import { useEffect, useState } from 'react';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import {
  Trash2,
  ExternalLink,
  Loader2,
  Calendar,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import { format } from 'date-fns';
import { toast } from 'sonner';
import {
  deleteCampaign,
  getCampaignsByOrganization,
} from '@/services/campaign';

const CampaignsTable = ({ orgId, query }: { orgId: string; query: any }) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [campaigns, setCampaigns] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleteLoading, setDeleteLoading] = useState<string | null>(null);
  const [meta, setMeta] = useState({ total: 0, page: 1, limit: 10 });

  const currentPage = Number(query?.page) || 1;

  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await getCampaignsByOrganization(orgId);
      if (res?.success) {
        setCampaigns(res.data);
        setMeta(res.meta);
      }
    } catch (error) {
      toast.error('Failed to load campaigns');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [orgId, currentPage]);

  const handleDelete = async (campaignId: string) => {
    if (!confirm('Are you sure you want to delete this campaign?')) return;

    setDeleteLoading(campaignId);
    try {
      const res = await deleteCampaign(campaignId);
      if (res?.success) {
        toast.success('Campaign deleted');
        fetchData();
      }
    } catch (error) {
      toast.error('Delete failed');
    } finally {
      setDeleteLoading(null);
    }
  };

  const handlePageChange = (newPage: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('page', newPage.toString());
    router.push(`${pathname}?${params.toString()}`);
  };

  if (loading)
    return (
      <div className="flex flex-col items-center justify-center py-20 bg-white border rounded-2xl border-dashed">
        <Loader2 className="animate-spin text-red-600 mb-2" size={32} />
        <p className="text-sm text-gray-500">Loading campaigns...</p>
      </div>
    );

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-4">
        {campaigns.length > 0 ? (
          campaigns?.map((campaign) => (
            <div
              key={campaign.id}
              className="flex items-center justify-between p-5 bg-white border rounded-2xl hover:shadow-md transition group"
            >
              <div className="flex items-center gap-5">
                <div className="h-14 w-14 rounded-2xl bg-red-50 flex flex-col items-center justify-center text-red-600 border border-red-100 shadow-sm">
                  <span className="text-lg font-bold leading-none">
                    {format(new Date(campaign.campaign_date), 'dd')}
                  </span>
                  <span className="text-[10px] uppercase font-medium">
                    {format(new Date(campaign.campaign_date), 'MMM')}
                  </span>
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 group-hover:text-red-600 transition-colors">
                    {campaign.title}
                  </h4>
                  <p className="text-sm text-gray-500 flex items-center gap-1 mt-0.5">
                    <Calendar size={13} /> {campaign.location} •{' '}
                    {format(new Date(campaign.campaign_date), 'PPP')}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Button
                  size="icon"
                  variant="outline"
                  className="h-9 w-9 rounded-xl"
                >
                  <ExternalLink size={16} />
                </Button>
                <Button
                  onClick={() => handleDelete(campaign.id)}
                  disabled={deleteLoading === campaign.id}
                  size="icon"
                  variant="outline"
                  className="h-9 w-9 rounded-xl text-red-500 hover:bg-red-50 border-red-100"
                >
                  {deleteLoading === campaign.id ? (
                    <Loader2 className="animate-spin" size={16} />
                  ) : (
                    <Trash2 size={16} />
                  )}
                </Button>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-16 bg-gray-50 border border-dashed rounded-3xl">
            <div className="bg-white h-16 w-16 rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm">
              <Calendar className="text-gray-300" size={30} />
            </div>
            <h3 className="text-gray-900 font-semibold">No campaigns yet</h3>
            <p className="text-gray-500 text-sm mt-1">
              Start by creating your first blood donation campaign.
            </p>
          </div>
        )}
      </div>

      {/* Pagination */}
      {campaigns.length > 0 && (
        <div className="flex items-center justify-between bg-white p-4 border rounded-2xl shadow-sm">
          <p className="text-sm text-gray-500">
            Page {meta.page} of {Math.ceil(meta.total / meta.limit) || 1}
          </p>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              className="rounded-lg"
              disabled={currentPage <= 1}
              onClick={() => handlePageChange(currentPage - 1)}
            >
              <ChevronLeft size={16} />
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="rounded-lg"
              disabled={currentPage * meta.limit >= meta.total}
              onClick={() => handlePageChange(currentPage + 1)}
            >
              <ChevronRight size={16} />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CampaignsTable;
