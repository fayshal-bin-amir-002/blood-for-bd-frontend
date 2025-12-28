'use client';

import { useRouter, usePathname } from 'next/navigation';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Plus, Users, Megaphone } from 'lucide-react';
import CampaignsTable from './CampaignsTable';
import MembersTable from './MembersTable';

const OrganizationManageContainer = ({
  query,
}: {
  query: { [key: string]: string | string[] | undefined };
}) => {
  const router = useRouter();
  const pathname = usePathname();

  const activeTab = (query?.tab as string) || 'members';
  const orgId = pathname.split('/')[2];

  const handleTabChange = (val: string) => {
    router.push(`${pathname}?tab=${val}&page=1`);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b pb-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-gray-900">
            Organization Dashboard
          </h1>
          <p className="text-gray-500 text-sm">
            Manage members, roles and campaigns.
          </p>
        </div>

        {activeTab === 'campaigns' && (
          <Button className="bg-red-600 hover:bg-red-700 rounded-full gap-2 shadow-lg shadow-red-100">
            <Plus size={18} /> Create Campaign
          </Button>
        )}
      </div>

      <Tabs
        value={activeTab}
        onValueChange={handleTabChange}
        className="w-full"
      >
        <TabsList className="bg-gray-100 p-1 rounded-xl w-full max-w-100">
          <TabsTrigger
            value="members"
            className="rounded-lg gap-2 data-[state=active]:bg-white"
          >
            <Users size={16} /> Members
          </TabsTrigger>
          <TabsTrigger
            value="campaigns"
            className="rounded-lg gap-2 data-[state=active]:bg-white"
          >
            <Megaphone size={16} /> Campaigns
          </TabsTrigger>
        </TabsList>

        <div className="mt-8">
          {activeTab === 'members' && (
            <MembersTable orgId={orgId} query={query} />
          )}
          {activeTab === 'campaigns' && (
            <CampaignsTable orgId={orgId} query={query} />
          )}
        </div>
      </Tabs>
    </div>
  );
};

export default OrganizationManageContainer;
