"use client";

import FindDonorLoader from "@/components/shared/Loaders/FindDonorLoader";
import { findDonor } from "@/services/donor";
import { IDonor, IMeta } from "@/types";
import { useEffect, useState } from "react";
import DonorCard from "./DonorCard";
import PaginationComponent from "@/components/shared/PaginationComponent";
import { toast } from "sonner";

const DonersContainer = ({
  query,
}: {
  query: { [key: string]: string | string[] | undefined };
}) => {
  const [page, setPage] = useState(Number(query?.page) || 1);
  const [donors, setDonors] = useState<IDonor[]>([]);
  const [meta, setMeta] = useState<IMeta | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDonors = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await findDonor(query);
        if (res.success) {
          setDonors(res?.data);
          setMeta(res?.meta);
        } else {
          toast.error(res?.message || "Failed to fetch donors");
        }
      } catch (err) {
        toast.error("Something went wrong");
        setError("Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    fetchDonors();
  }, [JSON.stringify(query), page]);

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
      <div>
        {!loading && meta && (
          <PaginationComponent
            currentPage={page}
            onPageChange={setPage}
            totalPages={Math.ceil((meta?.total || 0) / meta.limit)}
            paginationItemsToDisplay={4}
          />
        )}
      </div>
    </div>
  );
};

export default DonersContainer;
