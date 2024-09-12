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
  // // createAuthorizationToken(session?.user);

  // try {
  //   const res = await fetch(`${process.env.URL}/api/sign-jwt`, {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify(session?.user),
  //   });

  //   await res.json();
  // } catch (error) {
  //   console.log(error);
  // }

  return (
    <TokenRefresherProvider session={session}>
      {children}
    </TokenRefresherProvider>
  );
}
