"use server";

import { getValidToken } from "@/lib/verifyToken";
import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";
import { FieldValues } from "react-hook-form";

export const createDonor = async (payload: FieldValues) => {
  const token = await getValidToken();
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/donor`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
      body: JSON.stringify(payload),
    });
    const result = await res.json();

    if (result.success) {
      (await cookies()).set("accessToken", result.data.accessToken);
      (await cookies()).set("refreshToken", result?.data?.refreshToken);
    }

    return result;
  } catch (error: any) {
    return Error(error);
  }
};

export const findDonor = async (
  page?: string,
  query?: { [key: string]: string | string[] | undefined }
) => {
  const params = new URLSearchParams();

  if (query) {
    Object.entries(query).forEach(([key, value]) => {
      if (value) {
        params.append(key, value.toString());
      }
    });
  }

  if (page) {
    params.append("page", page);
  }

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/donor?page=${page}&${params}`,
      {
        next: {
          tags: ["Donors"],
        },
      }
    );
    const result = await res.json();

    return result;
  } catch (error: any) {
    return Error(error);
  }
};

export const getDonorProfile = async () => {
  const token = await getValidToken();
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/donor/profile`,
      {
        headers: {
          Authorization: token,
        },
        next: {
          tags: ["Donor"],
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

export const updateDonorProfile = async (payload: FieldValues) => {
  const token = await getValidToken();
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/donor/profile-update`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
        body: JSON.stringify(payload),
      }
    );
    const result = await res.json();

    revalidateTag("Donor");

    return result;
  } catch (error: any) {
    return Error(error);
  }
};

export const updateDonorLocation = async (payload: FieldValues) => {
  const token = await getValidToken();
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/donor/location-update`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
        body: JSON.stringify(payload),
      }
    );
    const result = await res.json();

    revalidateTag("Donor");

    return result;
  } catch (error: any) {
    return Error(error);
  }
};
