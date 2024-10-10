"use client";
import { QueryClientProvider } from "@tanstack/react-query";
import { getQueryClient } from "./QueryClientProvider";
// import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import ApolloWrapper from "./apollo-wrapper-provider";
import { ThemeProvider } from "./theme-provider";
import ToastMessageProvider from "./toast-message-provider";
import { SessionProvider } from "next-auth/react";
import { Toaster } from "../ui/toaster";

export default function Providers({ children }: { children: React.ReactNode }) {
  const queryClient = getQueryClient();

  return (
    <SessionProvider>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <ToastMessageProvider>
            <ApolloWrapper>{children}</ApolloWrapper>
            <Toaster />
          </ToastMessageProvider>
        </ThemeProvider>
        {/* <ReactQueryDevtools initialIsOpen={false}  /> */}
      </QueryClientProvider>
    </SessionProvider>
  );
}
