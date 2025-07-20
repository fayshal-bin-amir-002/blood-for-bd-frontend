"use client";

import { getBloodDonations } from "@/services/blood-donation";
import { IDonation } from "@/types";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { HeartPlus, Loader2, Pencil, Trash2 } from "lucide-react";
import { format } from "date-fns";
import { FieldValues } from "react-hook-form";
import AddDonationModal from "./AddDonationModal";

const BloodDonations = () => {
  const [loading, setLoading] = useState(true);
  const [addOpen, setAddOpen] = useState(false);
  const [addEdit, setAddEdit] = useState(false);
  const [donations, setDonations] = useState<IDonation[]>([]);

  const refetchDonations = async () => {
    try {
      setLoading(true);
      const res = await getBloodDonations();
      if (res?.success && res?.data) {
        setDonations(res.data);
      } else {
        toast.error("Failed to fetch blood donations.");
      }
    } catch (error) {
      toast.error("Something went wrong while fetching.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    refetchDonations();
  }, []);

  const handleEdit = (donation: IDonation) => {
    console.log("Edit donation:", donation);
    toast.info(`Edit donation: ${donation.title}`);
  };

  const handleDelete = (id: string) => {
    console.log("Delete donation ID:", id);
    toast.warning("Delete functionality not yet implemented.");
  };

  return (
    <div className="relative pt-2">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl md:text-2xl font-semibold">Blood Donations</h2>
        <AddDonationModal refetchDonations={refetchDonations} />
      </div>

      {loading && (
        <div className="absolute inset-0 bg-white/80 dark:bg-black/60 flex items-center justify-center z-10 rounded-md">
          <Loader2 className="animate-spin w-6 h-6 text-primary mr-2" />
          <span className="text-gray-700 dark:text-gray-200">
            Loading donations...
          </span>
        </div>
      )}

      <div
        className={`grid gap-4 md:grid-cols-2 lg:grid-cols-3 ${
          loading ? "opacity-50 pointer-events-none" : ""
        }`}
      >
        {donations.length === 0 ? (
          <p className="col-span-full text-center text-gray-500">
            No donations found.
          </p>
        ) : (
          donations.map((donation) => (
            <div
              key={donation.id}
              className="border rounded-lg p-4 bg-white dark:bg-gray-900 shadow-sm relative h-full flex flex-col justify-between"
            >
              <div>
                <h3 className="font-medium text-lg text-primary mb-2">
                  {donation.title}
                </h3>
                <p className="text-sm text-gray-700 dark:text-gray-300">
                  <strong>Date:</strong>{" "}
                  {format(new Date(donation.donation_date), "dd MMM yyyy")}
                </p>
                <p className="text-sm text-gray-700 dark:text-gray-300 mb-4">
                  <strong>Note:</strong> {donation.note}
                </p>
              </div>

              <div className="flex justify-end gap-2">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => handleEdit(donation)}
                >
                  <Pencil className="w-4 h-4 mr-1" />
                  Edit
                </Button>
                <Button
                  size="sm"
                  variant="destructive"
                  onClick={() => handleDelete(donation.id)}
                >
                  <Trash2 className="w-4 h-4 mr-1" />
                  Delete
                </Button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default BloodDonations;
