import OrganizationsComponent from '@/components/modules/Organizations';
import PageContainer from '@/components/shared/PageContainer';
import { ISearchParams } from '@/types';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Blood For BD | Organizations',
};

const OrganizationsPage = async ({ searchParams }: ISearchParams) => {
  const query = await searchParams;
  return (
    <PageContainer>
      <OrganizationsComponent query={query} />
    </PageContainer>
  );
};

export default OrganizationsPage;
