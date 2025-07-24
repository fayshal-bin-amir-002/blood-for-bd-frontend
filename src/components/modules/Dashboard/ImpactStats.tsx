import { Card, CardContent } from "@/components/ui/card";
import { IImpactData } from "@/types";
import { HeartPulse, Users, Activity, UserPlus } from "lucide-react";

type Props = {
  data: IImpactData | null;
};

const statItems = [
  {
    label: "Lives Saved",
    icon: HeartPulse,
    key: "totalLivesSaved",
    color: "text-red-600",
  },
  {
    label: "Total Donors",
    icon: Users,
    key: "totalDonors",
    color: "text-blue-600",
  },
  {
    label: "Active Donors",
    icon: Activity,
    key: "activeDonors",
    color: "text-green-600",
  },
  {
    label: "Registered Users",
    icon: UserPlus,
    key: "registeredUsers",
    color: "text-purple-600",
  },
];

export default function ImpactStats({ data }: Props) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {statItems.map(({ label, icon: Icon, key, color }) => (
        <Card
          key={key}
          className="shadow-md hover:shadow-lg transition rounded-2xl"
        >
          <CardContent className="flex items-center gap-4 p-6">
            <div className={`p-3 bg-gray-100 rounded-full ${color} text-xl`}>
              <Icon className="w-6 h-6" />
            </div>
            <div>
              <p className="text-muted-foreground text-sm">{label}</p>
              <p className="text-2xl font-bold">
                {data && data[key as keyof IImpactData]}
              </p>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
