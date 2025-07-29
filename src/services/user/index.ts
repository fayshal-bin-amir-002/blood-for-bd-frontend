"use server";

import { getValidToken } from "@/lib/verifyToken";
import { revalidateTag } from "next/cache";
import { FieldValues } from "react-hook-form";

export const getAllUser = async (query?: {
  [key: string]: string | string[] | undefined;
}) => {
  const params = new URLSearchParams();

  if (query) {
    Object.entries(query).forEach(([key, value]) => {
      if (value) {
        params.append(key, value.toString());
      }
    });
  }

  const token = await getValidToken();

  try {
    const res = await fetch(`${process.env.BASE_API}/user?${params}`, {
      headers: {
        Authorization: token,
      },
      next: {
        tags: ["Users"],
        revalidate: 60,
      },
      cache: "force-cache",
    });
    const result = await res.json();

    return result;
  } catch (error: any) {
    return Error(error);
  }
};

export const updateUserRole = async (id: string, payload: FieldValues) => {
  const token = await getValidToken();
  try {
    const res = await fetch(`${process.env.BASE_API}/user/update-role/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
      body: JSON.stringify(payload),
    });
    const result = await res.json();

    revalidateTag("Users");

    return result;
  } catch (error: any) {
    return Error(error);
  }
};

export const updateUserStatus = async (id: string, payload: FieldValues) => {
  const token = await getValidToken();
  try {
    const res = await fetch(
      `${process.env.BASE_API}/user/update-status/${id}`,
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

    revalidateTag("Users");

    return result;
  } catch (error: any) {
    return Error(error);
  }
};
