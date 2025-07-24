"use server";

import { getValidToken } from "@/lib/verifyToken";
import { revalidateTag } from "next/cache";
import { FieldValues } from "react-hook-form";

export const postToGallery = async (payload: FieldValues) => {
  try {
    const res = await fetch(`${process.env.BASE_API}/gallery`, {
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
    const res = await fetch(`${process.env.BASE_API}/gallery`, {
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

export const getAllGalleryByAdmin = async (page?: string) => {
  const token = await getValidToken();
  const params = new URLSearchParams();

  if (page) {
    params.append("page", page);
  }

  try {
    const res = await fetch(
      `${process.env.BASE_API}/gallery/admin?page${page}`,
      {
        headers: {
          Authorization: token,
        },
        next: {
          tags: ["GalleryAdmin"],
        },
      }
    );
    const result = await res.json();

    return result;
  } catch (error: any) {
    return Error(error);
  }
};

export const deleteGallery = async (id: string) => {
  const token = await getValidToken();
  try {
    const res = await fetch(`${process.env.BASE_API}/gallery/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    });
    const result = await res.json();

    revalidateTag("GalleryAdmin");

    return result;
  } catch (error: any) {
    return Error(error);
  }
};

export const updateGalleryStatus = async (id: string, payload: FieldValues) => {
  const token = await getValidToken();
  try {
    const res = await fetch(`${process.env.BASE_API}/gallery/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
      body: JSON.stringify(payload),
    });
    const result = await res.json();

    revalidateTag("GalleryAdmin");

    return result;
  } catch (error: any) {
    return Error(error);
  }
};
