import React from "react";
import { Separator } from "./ui/separator";

export default function SectionHeader({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="section-header">
      <Separator className="my-1 w-full" />
      {children}
    </section>
  );
}
