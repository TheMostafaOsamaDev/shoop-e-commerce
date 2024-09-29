import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Providers from "@/components/providers/Providers";
import AuthProvider from "@/components/providers/auth-provider";

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
          <Providers>
            <Header />
            {children}
          </Providers>
        </AuthProvider>
        <Footer />
      </body>
    </html>
  );
}
