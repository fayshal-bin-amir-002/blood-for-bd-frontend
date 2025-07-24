"use server";

import { getValidToken } from "@/lib/verifyToken";
import { revalidateTag } from "next/cache";
import { FieldValues } from "react-hook-form";

export const postToTestimonial = async (payload: FieldValues) => {
  try {
    const res = await fetch(`${process.env.BASE_API}/testimonial`, {
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

export const getAllTestimonial = async () => {
  try {
    const res = await fetch(`${process.env.BASE_API}/testimonial`, {
      next: {
        revalidate: 86400,
      },
      cache: "force-cache",
    });
    const result = await res.json();

    return result;
  } catch (error: any) {
    return Error(error);
  }
};

export const getAllTestimonialByAdmin = async (page?: string) => {
  const token = await getValidToken();
  const params = new URLSearchParams();

  if (page) {
    params.append("page", page);
  }

  try {
    const res = await fetch(
      `${process.env.BASE_API}/testimonial/admin?page${page}`,
      {
        headers: {
          Authorization: token,
        },
        next: {
          tags: ["TestimonialAdmin"],
        },
      }
    );
    const result = await res.json();

    return result;
  } catch (error: any) {
    return Error(error);
  }
};

export const deleteTestimonial = async (id: string) => {
  const token = await getValidToken();
  try {
    const res = await fetch(`${process.env.BASE_API}/testimonial/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    });
    const result = await res.json();

    revalidateTag("TestimonialAdmin");

    return result;
  } catch (error: any) {
    return Error(error);
  }
};

export const updateTestimonialStatus = async (
  id: string,
  payload: FieldValues
) => {
  const token = await getValidToken();
  try {
    const res = await fetch(`${process.env.BASE_API}/testimonial/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
      body: JSON.stringify(payload),
    });
    const result = await res.json();

    revalidateTag("TestimonialAdmin");

    return result;
  } catch (error: any) {
    return Error(error);
  }
};
