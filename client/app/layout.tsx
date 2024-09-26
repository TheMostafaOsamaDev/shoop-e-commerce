import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import { ThemeProvider } from "next-themes";
import { Toaster } from "@/components/ui/toaster";
import AuthProvider from "@/components/providers/auth-provider";
import ToastMessageProvider from "@/components/providers/toast-message-provider";
import ApolloWrapperProvider from "@/components/providers/apollo-wrapper-provider";
import Footer from "@/components/Footer";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "700", "200", "500", "600"],
});

export const metadata: Metadata = {
  title: "Shoop!",
  description: "Start shopping today!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={poppins.className + " relative overflow-hidden"}>
        <AuthProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <ApolloWrapperProvider>
              <ToastMessageProvider>
                <Header />
                {children}
              </ToastMessageProvider>
            </ApolloWrapperProvider>

            <Toaster />
          </ThemeProvider>
        </AuthProvider>

        <Footer />
      </body>
    </html>
  );
}
