import { Card, CardContent } from "@/components/ui/card";
import { bloodGroupLabelMap } from "@/lib/bloodGroupLabelMap";
import { IDonor } from "@/types";

const DonorCard = ({ donor }: { donor: IDonor }) => {
  return (
    <div
      key={donor.id}
      className="rounded-xl border p-4 shadow-sm hover:shadow-md transition"
    >
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-lg font-semibold">{donor?.name}</h2>
        <span className="text-sm px-2 py-1 bg-red-100 text-red-600 rounded">
          {bloodGroupLabelMap[donor?.blood_group] || donor?.blood_group}
        </span>
      </div>
      <div className="space-y-1">
        <p className="text-sm text-gray-600">{donor?.address}</p>
        <p className="text-sm text-gray-600">
          {donor?.sub_district}, {donor?.district}, {donor?.division}
        </p>
        <p className="text-sm text-gray-800 mt-2">📞 {donor?.contact_number}</p>
        <p className="text-xs text-gray-500 mt-1">
          Last Donation:{" "}
          {new Date(donor?.last_donation_date)?.toLocaleDateString() || "N/A"}
        </p>
      </div>
    </div>
  );
};

function formatBlood(group: string) {
  return group.replace("_POS", "+").replace("_NEG", "-").replace("_", "");
}

export default DonorCard;
