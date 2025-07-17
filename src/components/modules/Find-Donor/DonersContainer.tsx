"use client";

import FindDonorLoader from "@/components/shared/Loaders/FindDonorLoader";
import { findDonor } from "@/services/donor";
import { IDonor } from "@/types";
import { useEffect, useState } from "react";
import DonorCard from "./DonorCard";

const DonersContainer = ({
  query,
}: {
  query: { [key: string]: string | string[] | undefined };
}) => {
  const [donors, setDonors] = useState<IDonor[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDonors = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await findDonor(undefined, query);
        if (!res.success) throw new Error("Failed to fetch donors");

        setDonors(res?.data);
      } catch (err: any) {
        setError(err.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    fetchDonors();
  }, [JSON.stringify(query)]);

  if (loading && !error) {
    return <FindDonorLoader />;
  }

  if (!loading && error) {
    return (
      <div className="text-red-600 text-center py-6">
        <p>❌ {error}</p>
      </div>
    );
  }

  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {donors &&
          donors?.map((donor) => <DonorCard key={donor?.id} donor={donor} />)}
      </div>
      {donors?.length === 0 && !loading && (
        <div className="h-20 flex justify-center items-center">
          <p className="text-2xl">No Donor Found!</p>
        </div>
      )}
    </div>
  );
};

export default DonersContainer;
