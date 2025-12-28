import CampaignContainer from '@/components/modules/Campaign';
import PageContainer from '@/components/shared/PageContainer';
import { ISearchParams } from '@/types';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Blood For BD | Campaigns',
};

const CampaignPage = async ({ searchParams }: ISearchParams) => {
  const query = await searchParams;
  return (
    <PageContainer>
      <CampaignContainer query={query} />
    </PageContainer>
  );
};

export default CampaignPage;
