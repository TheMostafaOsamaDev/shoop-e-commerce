import axios, { AxiosResponse, CancelTokenSource } from "axios";
import { getAuthorizationToken } from "./actions/auth.actions";

export const baseApi = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
  withCredentials: true,
});

// // Utility function to handle API calls with signal and token
// export async function apiRequestWithSignal<T>(
//   endpoint: string,
//   requestMethod: (url: string, config?: any) => Promise<AxiosResponse<T>>,
//   signal?: AbortSignal
// ): Promise<AxiosResponse<T>> {
//   const CancelToken = axios.CancelToken;
//   const source = CancelToken.source();

//   const token = await getAuthorizationToken();

//   const config = {
//     headers: {
//       Authorization: token,
//     },
//     cancelToken: source.token,
//   };

//   const promise: AxiosResponse<T> = await requestMethod(endpoint, config);

//   // Handle the abort signal
//   signal?.addEventListener("abort", () => {
//     source.cancel();
//   });

//   return promise;
// }
