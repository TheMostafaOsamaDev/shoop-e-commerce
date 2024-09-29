"use client";
import { QueryClientProvider } from "@tanstack/react-query";
import { getQueryClient } from "./QueryClientProvider";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import ApolloWrapper from "./apollo-wrapper-provider";
import { ThemeProvider } from "./theme-provider";
import ToastMessageProvider from "./toast-message-provider";

export default function Providers({ children }: { children: React.ReactNode }) {
  // NOTE: Avoid useState when initializing the query client if you don't
  //       have a suspense boundary between this and the code that may
  //       suspend because React will throw away the client on the initial
  //       render if it suspends and there is no boundary
  const queryClient = getQueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      >
        <ToastMessageProvider>
          <ApolloWrapper>{children}</ApolloWrapper>
        </ToastMessageProvider>
      </ThemeProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}
