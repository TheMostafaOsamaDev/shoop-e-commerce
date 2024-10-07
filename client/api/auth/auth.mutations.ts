import { baseApi } from "@/lib/baseApi";

export const logInMutationFn = (body: { email: string; password: string }) => {
  return baseApi.post("/auth/log-in", body);
};
