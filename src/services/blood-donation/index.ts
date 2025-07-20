"use server";

import { getValidToken } from "@/lib/verifyToken";
import { revalidateTag } from "next/cache";
import { FieldValues } from "react-hook-form";

export const getBloodDonations = async () => {
  const token = await getValidToken();
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/blood-donation`,
      {
        headers: {
          Authorization: token,
        },
        next: {
          tags: ["Donations"],
        },
        cache: "force-cache",
      }
    );
    const result = await res.json();

    return result;
  } catch (error: any) {
    return Error(error);
  }
};

export const createDonation = async (payload: FieldValues) => {
  const token = await getValidToken();
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/blood-donation`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
        body: JSON.stringify(payload),
      }
    );
    const result = await res.json();

    revalidateTag("Donations");

    return result;
  } catch (error: any) {
    return Error(error);
  }
};
