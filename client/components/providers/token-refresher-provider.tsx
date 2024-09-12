"use client";
import { createAuthorizationToken } from "@/lib/actions/auth.actions";
import { Session } from "next-auth";
import { usePathname } from "next/navigation";
import React, { useEffect } from "react";

export default function TokenRefresherProvider({
  session,
  children,
}: {
  session: Session | null;
  children: React.ReactNode;
}) {
  const path = usePathname();

  useEffect(() => {
    const handleAuthorization = async () => {
      if (session?.user) {
        await createAuthorizationToken(session.user);
      } else {
        await createAuthorizationToken(null);
      }
    };

    handleAuthorization();
  }, [path]);

  return children;
}
