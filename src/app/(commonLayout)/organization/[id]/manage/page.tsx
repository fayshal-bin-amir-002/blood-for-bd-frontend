import OrganizationManageContainer from '@/components/modules/Organizations/manage';
import PageContainer from '@/components/shared/PageContainer';
import { ISearchParams } from '@/types';

const OrganizationManage = async ({ searchParams }: ISearchParams) => {
  const query = await searchParams;
  return (
    <PageContainer>
      <OrganizationManageContainer query={query} />
    </PageContainer>
  );
};

export default OrganizationManage;
