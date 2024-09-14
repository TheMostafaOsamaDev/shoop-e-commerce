import { auth } from "@/auth";
// import { createAuthorizationToken } from "@/lib/actions/auth.actions";
import React from "react";
import TokenRefresherProvider from "./token-refresher-provider";

export default async function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  return (
    <TokenRefresherProvider session={session}>
      {children}
    </TokenRefresherProvider>
  );
}
