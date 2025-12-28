import SingleOrganizationContainer from '@/components/modules/Organizations/SingleOrganizationContainer';
import PageContainer from '@/components/shared/PageContainer';

const SingleOrganization = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = await params;
  return (
    <PageContainer>
      <SingleOrganizationContainer id={id} />
    </PageContainer>
  );
};

export default SingleOrganization;
