"use server";
import jwt from "jsonwebtoken";

import { signIn, signOut } from "@/auth";
import { IApiUser } from "@/types/user";
import { cookies } from "next/headers";

export const logIn = async (props: IApiUser) => {
  const data = await signIn("credentials", props);
  console.log(data);
};

export const logOut = async () => {
  cookies().delete("authorization");
  await signOut();
};

export const createAuthorizationToken = async (token: any) => {
  if (token) {
    if (token.name && token.email && token.sub && token.username) {
      const payload = {
        username: token.username,
        name: token.name,
        email: token.email,
        role: token.role,
        id: token.sub,
        createdAt: token.createdAt,
      };

      const secret = `${process.env.AUTHORIZATION_SECRET}`;

      const jwtToken = jwt.sign(payload, secret, {
        expiresIn: "19d",
      });

      const authorization = `Bearer ${jwtToken}`;

      console.log(authorization);

      cookies().set("authorization", authorization, {
        maxAge: 60 * 60 * 24 * 19,
        httpOnly: true,
        sameSite: "strict",
        secure: process.env.NODE_ENV === "production",
      });
    }
  } else {
    await logOut();
    cookies().delete("authorization");
  }
};

export const getAuthorizationToken = () => {
  return cookies()?.get("authorization")?.value;
};
