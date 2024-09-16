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

  useEffect(() => {}, []);

  return (
    <>
      <Loader />
      {children}
    </>
  );
}

const Loader = () => {
  const loaderRef = React.useRef<HTMLDivElement>(null);

  useEffect(() => {
    let opacityTimeout: NodeJS.Timeout, displayTimeout: NodeJS.Timeout;

    // document overflow hidden
    document.body.style.overflow = "hidden";

    setTimeout(() => {
      loaderRef.current?.classList.add("opacity-0");

      opacityTimeout = setTimeout(() => {
        loaderRef.current?.classList.add("hidden");
        // document overflow visible
        document.body.style.overflow = "visible";
      }, 500);
    }, 1000);

    return () => {
      clearTimeout(opacityTimeout);
      clearTimeout(displayTimeout);
    };
  }, []);

  return (
    <div
      className="fixed h-screen w-screen left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-white z-[100] grid place-content-center transition-opacity"
      ref={loaderRef}
    >
      <span className="loader"></span>
    </div>
  );
};
