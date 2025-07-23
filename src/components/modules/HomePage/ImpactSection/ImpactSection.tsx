"use client";

import SectionContainer from "@/components/shared/SectionContainer";
import { useEffect, useState } from "react";
import { HeartPulse, Users, UserCheck } from "lucide-react";
import { NumberTicker } from "@/components/ui/number-ticker";
import { getImpactData } from "@/services/meta";
import { toast } from "sonner";

interface StatsData {
  totalDonors: number;
  registeredUsers: number;
  activeDonors: number;
  totalLivesSaved: number;
}

const ImpactSection = () => {
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState<StatsData>({
    totalLivesSaved: 0,
    totalDonors: 0,
    registeredUsers: 0,
    activeDonors: 0,
  });

  const fetchStats = async () => {
    setLoading(true);
    try {
      const res = await getImpactData();
      if (res?.success) {
        setStats({
          totalLivesSaved: res.data.totalDonations,
          totalDonors: res.data.totalDonor,
          registeredUsers: res.data.totalUser,
          activeDonors: res.data.totalActiveDonor,
        });
      }
    } catch (err: any) {
      toast.error(err?.message || "Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  return (
    <div className="bg-white dark:bg-neutral-950">
      <SectionContainer>
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-10">
          রক্তদানের প্রভাব ও আমাদের অর্জন
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-center">
          {loading ? (
            <>
              <StatBoxSkeleton />
              <StatBoxSkeleton />
              <StatBoxSkeleton />
              <StatBoxSkeleton />
            </>
          ) : (
            <>
              <StatBox
                icon={<HeartPulse className="w-8 h-8 text-red-500" />}
                title="Lives Saved"
                value={stats.totalLivesSaved}
              />
              <StatBox
                icon={<Users className="w-8 h-8 text-blue-600" />}
                title="Total Donors"
                value={stats.totalDonors}
              />
              <StatBox
                icon={<Users className="w-8 h-8 text-green-600" />}
                title="Registered Users"
                value={stats.registeredUsers}
              />
              <StatBox
                icon={<UserCheck className="w-8 h-8 text-purple-600" />}
                title="Active Donors"
                value={stats.activeDonors}
              />
            </>
          )}
        </div>
      </SectionContainer>
    </div>
  );
};

const StatBox = ({
  icon,
  title,
  value,
}: {
  icon: React.ReactNode;
  title: string;
  value: number;
}) => (
  <div className="flex flex-col items-center justify-center p-6 border rounded-lg shadow-md hover:scale-105 transition-transform bg-gray-50 dark:bg-neutral-900">
    <div className="mb-3">{icon}</div>
    <h3 className="text-lg font-medium text-gray-800 dark:text-white mb-1">
      {title}
    </h3>
    <div className="flex flex-row items-center justify-start">
      <p className="whitespace-pre-wrap text-4xl font-medium tracking-tighter text-black dark:text-white">
        <NumberTicker value={value} />
      </p>
      <span className="text-4xl font-medium text-black">+</span>
    </div>
  </div>
);

const StatBoxSkeleton = () => (
  <div className="flex flex-col items-center justify-center p-6 border rounded-lg shadow-md bg-gray-100 dark:bg-neutral-900 animate-pulse">
    <div className="w-8 h-8 mb-3 bg-gray-300 dark:bg-neutral-700 rounded-full" />
    <div className="w-28 h-4 mb-2 bg-gray-300 dark:bg-neutral-700 rounded" />
    <div className="w-20 h-6 bg-gray-300 dark:bg-neutral-700 rounded" />
  </div>
);

export default ImpactSection;
