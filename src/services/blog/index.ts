"use server";

import { getValidToken } from "@/lib/verifyToken";
import { revalidateTag } from "next/cache";
import { FieldValues } from "react-hook-form";

export const getAllBlogs = async (page?: string, limit?: string) => {
  const params = new URLSearchParams();

  if (limit) {
    params.append("limit", limit);
  }

  if (page) {
    params.append("page", page);
  }

  try {
    const res = await fetch(
      `${process.env.BASE_API}/blog?page=${page}&limit=${limit}`,
      {
        next: {
          tags: ["Blogs"],
          revalidate: 86400,
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

export const getABlog = async (id: string) => {
  try {
    const res = await fetch(`${process.env.BASE_API}/blog/${id}`, {
      next: {
        tags: ["Blog"],
      },
    });
    const result = await res.json();

    return result;
  } catch (error: any) {
    return Error(error);
  }
};

export const postBlog = async (payload: FieldValues) => {
  const token = await getValidToken();
  try {
    const res = await fetch(`${process.env.BASE_API}/blog`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
      body: JSON.stringify(payload),
    });
    const result = await res.json();

    revalidateTag("Blogs");

    return result;
  } catch (error: any) {
    return Error(error);
  }
};

export const deleteBlog = async (id: string) => {
  const token = await getValidToken();
  try {
    const res = await fetch(`${process.env.BASE_API}/blog/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    });
    const result = await res.json();

    revalidateTag("Blogs");

    return result;
  } catch (error: any) {
    return Error(error);
  }
};

export const updateBlog = async (id: string, payload: FieldValues) => {
  const token = await getValidToken();
  try {
    const res = await fetch(`${process.env.BASE_API}/blog/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
      body: JSON.stringify(payload),
    });
    const result = await res.json();

    revalidateTag("Blogs");

    return result;
  } catch (error: any) {
    return Error(error);
  }
};
