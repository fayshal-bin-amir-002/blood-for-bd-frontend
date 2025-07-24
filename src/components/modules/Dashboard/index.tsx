"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "sonner";

import SpinLoader from "@/components/shared/Loaders/SpinLoader";
import { getAdminDashboardData } from "@/services/meta";
import { IImpactData, IMonthlyStat } from "@/types";
import ImpactStats from "./ImpactStats";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import ChartComponent from "./ChartComponent";

const DashboardManagement = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const currentYear = new Date().getFullYear();
  const selectedYearParam = searchParams.get("year") || currentYear.toString();

  const [selectedYear, setSelectedYear] = useState(selectedYearParam);
  const [loading, setLoading] = useState(true);
  const [impactData, setImpactData] = useState<IImpactData | null>(null);
  const [monthlyStat, setMonthlyStat] = useState<IMonthlyStat[] | null>(null);

  const yearOptions = Array.from({ length: 6 }, (_, i) =>
    (currentYear - i).toString()
  );

  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await getAdminDashboardData(selectedYear);
      if (res?.success) {
        setImpactData(res?.data?.impactData);
        setMonthlyStat(res?.data?.statsByYear);
      } else {
        toast.error(res?.message);
      }
    } catch (err) {
      toast.error("Failed to load dashboard data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [selectedYear]);

  const handleYearChange = (value: string) => {
    setSelectedYear(value);
    const params = new URLSearchParams(searchParams.toString());
    params.set("year", value);
    router.push(`?${params.toString()}`);
  };

  if (loading) {
    return (
      <div>
        <SpinLoader />
      </div>
    );
  }

  return (
    <div>
      {/* Impact summary cards */}
      <ImpactStats data={impactData} />

      {/* Divider and Year Select */}
      <div className="flex items-center gap-4 my-6">
        <div className="flex-1 h-px bg-muted" />

        <div className="w-[200px]">
          <Select value={selectedYear} onValueChange={handleYearChange}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select year" />
            </SelectTrigger>
            <SelectContent>
              {yearOptions.map((year) => (
                <SelectItem key={year} value={year}>
                  {year}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="flex-1 h-px bg-muted" />
      </div>

      <div>
        <ChartComponent data={monthlyStat} />
      </div>
    </div>
  );
};

export default DashboardManagement;
