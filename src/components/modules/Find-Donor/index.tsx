import DonersContainer from "./DonersContainer";
import FilterDonor from "./FilterDonor";

const FindDonorManagement = ({
  query,
}: {
  query: { [key: string]: string | string[] | undefined };
}) => {
  return (
    <div className="space-y-6 md:space-y-8 lg:space-y-10">
      <FilterDonor />
      <DonersContainer query={query} />
    </div>
  );
};

export default FindDonorManagement;
