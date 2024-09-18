"use server";
import { auth } from "@/auth";
import { redirect } from "next/navigation";

export const addToFavorites = async (formData: FormData) => {
  const session = await auth();

  if (!session?.user) {
    return redirect("/auth/log-in");
  }

  const productId = formData.get("productId");
};
