"use client";
import { useSearchParams } from "next/navigation";
import React, { useEffect } from "react";
import { Toaster } from "../ui/toaster";

export default function ToastMessageProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  // const router = useRouter();
  const messageParam = useSearchParams().get("message") as string;
  const messageTypeParam = useSearchParams().get("messageType") as string;
  // const { toast } = useToast();

  useEffect(() => {
    if (messageParam) {
      console.log({ messageParam, messageTypeParam });
      // router.replace(router.);
    }
  }, [messageParam, messageTypeParam]);

  return (
    <>
      {children}
      <Toaster />
    </>
  );
}
