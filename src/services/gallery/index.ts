"use server";

import { FieldValues } from "react-hook-form";

export const postToGallery = async (payload: FieldValues) => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/gallery`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });
    const result = await res.json();

    return result;
  } catch (error: any) {
    return Error(error);
  }
};

export const getAllGallery = async () => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/gallery`, {
      next: {
        tags: ["Gallery"],
      },
    });
    const result = await res.json();

    return result;
  } catch (error: any) {
    return Error(error);
  }
};
