"use server";

import { FieldValues } from "react-hook-form";

export const postToTestimonial = async (payload: FieldValues) => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/testimonial`, {
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
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/testimonial`, {
      next: {
        tags: ["Testimonial"],
      },
    });
    const result = await res.json();

    return result;
  } catch (error: any) {
    return Error(error);
  }
};
