import BecomeDonorForm from "@/components/modules/Become-Donor/BecomeDonorForm";
import PageContainer from "@/components/shared/PageContainer";

const BecomeDonorPage = () => {
  return (
    <PageContainer>
      <div className="mb-6 md:mb-8 lg:mb-10">
        <h1 className="text-3xl md:text-4xl font-bold text-center">
          Register as a Blood Donor
        </h1>
        <p className="mt-4 text-muted-foreground text-center max-w-2xl mx-auto">
          Your single donation can be someone's second chance at life. Fill out
          this simple form and be part of something life-saving.
        </p>
      </div>
      <div>
        <BecomeDonorForm />
      </div>
    </PageContainer>
  );
};

export default BecomeDonorPage;
