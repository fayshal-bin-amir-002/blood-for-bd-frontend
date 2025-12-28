import SingleCampaign from '@/components/modules/Campaign/SingleCampaign';
import PageContainer from '@/components/shared/PageContainer';

const page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  return (
    <PageContainer>
      <SingleCampaign id={id} />
    </PageContainer>
  );
};

export default page;
