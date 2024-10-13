import { baseApi } from "@/lib/baseApi";
import { IApiUser } from "@/types/user";
import { AxiosResponse } from "axios";

export const logInMutationFn = async (body: {
  email: string;
  password: string;
}) => {
  const promise: AxiosResponse<IApiUser> = await baseApi.post(
    "/auth/log-in",
    body
  );

  return promise;
};

export const signUpMutationFn = async (body: {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}) => {
  console.log(body);

  const promise: AxiosResponse<IApiUser> = await baseApi.post(
    "/auth/sign-up",
    body
  );

  return promise;
};

export const authAdminMutationFn = async (body: {
  email: string;
  passkey: string;
}) => {
  const promise: AxiosResponse<IApiUser> = await baseApi.post(
    "/auth/admin",
    body
  );

  return promise;
};
