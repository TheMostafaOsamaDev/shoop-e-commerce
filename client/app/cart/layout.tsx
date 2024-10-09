import React from "react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cart",
  description:
    "See what you have in your cart, and checkout to enjoy your new items.",
};

export default function CartLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
