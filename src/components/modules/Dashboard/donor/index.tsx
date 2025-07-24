"use client";

import PaginationComponent from "@/components/shared/PaginationComponent";
import { findDonor } from "@/services/donor";
import { IDonor, IMeta } from "@/types";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import TableLoader from "@/components/shared/Loaders/TableLoader";
import { bloodGroupLabelMap } from "@/lib/bloodGroupLabelMap";

const DonorManagement = ({
  query,
}: {
  query: { [key: string]: string | string[] | undefined };
}) => {
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(Number(query?.page) || 1);
  const [donors, setDonors] = useState<IDonor[] | []>([]);
  const [meta, setMeta] = useState<IMeta | null>(null);

  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await findDonor(query);
      if (res?.success) {
        setDonors(res?.data || []);
        setMeta(res?.meta || null);
      } else {
        toast.error(res?.message || "Failed to fetch donors.");
      }
    } catch (err) {
      toast.error("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [page, JSON.stringify(query)]);

  return (
    <div>
      <div className="bg-background border rounded-md">
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-transparent">
              <TableHead>Name</TableHead>
              <TableHead>Phone</TableHead>
              <TableHead>Address</TableHead>
              <TableHead>Blood Group</TableHead>
              <TableHead>Division</TableHead>
              <TableHead>District</TableHead>
              <TableHead>Sub District</TableHead>
              <TableHead>Last Donation</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              <TableLoader columns={8} rows={5} />
            ) : donors?.length > 0 ? (
              donors.map((donor) => (
                <TableRow key={donor.id}>
                  <TableCell>{donor?.name}</TableCell>
                  <TableCell>{donor?.contact_number}</TableCell>
                  <TableCell className="truncate">{donor?.address}</TableCell>
                  <TableCell>
                    {bloodGroupLabelMap[donor?.blood_group]}
                  </TableCell>
                  <TableCell>{donor?.division}</TableCell>
                  <TableCell>{donor?.district}</TableCell>
                  <TableCell>{donor?.sub_district}</TableCell>
                  <TableCell>
                    {donor?.last_donation_date
                      ? new Date(donor.last_donation_date).toLocaleDateString()
                      : "N/A"}
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={8} className="text-center py-8">
                  No donors found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {!loading && meta && (
        <PaginationComponent
          currentPage={page}
          onPageChange={setPage}
          totalPages={Math.ceil((meta?.total || 0) / meta.limit)}
          paginationItemsToDisplay={4}
        />
      )}
    </div>
  );
};

export default DonorManagement;
