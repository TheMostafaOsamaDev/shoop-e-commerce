import { auth } from "@/auth";
import { auth_routes, protected_routes } from "./lib/constants";
import { NextResponse } from "next/server";

export default auth((req) => {
  const isAuthRoute = auth_routes.includes(req.nextUrl.pathname);
  const isAdminRoute = req.nextUrl.pathname.includes("/dashboard");
  const isProtectedRoute = protected_routes.includes(req.nextUrl.pathname);
  const newUrl = new URL("/", req.nextUrl.origin);

  const isAdmin = req.auth?.user?.role === "admin";

  if (req.auth && isAuthRoute) {
    return Response.redirect(newUrl);
  }

  if (isAdminRoute && !isAdmin) {
    const authUrl = new URL("/auth/log-in", req.nextUrl.origin);
    return Response.redirect(authUrl);
  }

  if (isProtectedRoute && !req.auth) {
    return Response.redirect(newUrl);
  }

  return NextResponse.next();
});

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
