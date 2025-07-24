"use server";

import { getValidToken } from "@/lib/verifyToken";

export const getImpactData = async () => {
  try {
    const res = await fetch(`${process.env.BASE_API}/meta/impact-data`, {
      next: {
        revalidate: 86400,
      },
      cache: "force-cache",
    });

    const result = await res.json();
    return result;
  } catch (error: any) {
    return new Error(error?.message || "Failed to fetch impact data.");
  }
};

export const getAdminDashboardData = async (year: string) => {
  const token = await getValidToken();
  try {
    const res = await fetch(
      `${process.env.BASE_API}/meta/dashboard-data/${year}`,
      {
        headers: {
          Authorization: token,
        },
      }
    );

    const result = await res.json();
    return result;
  } catch (error: any) {
    return Error(error);
  }
};
