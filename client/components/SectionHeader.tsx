import React from "react";
import { Separator } from "./ui/separator";
import clsx from "clsx";

export default function SectionHeader({
  separatorClasses,
  children,
}: {
  separatorClasses?: string;
  children: React.ReactNode;
}) {
  return (
    <section className="section-header">
      <Separator className={clsx("my-1 my my w-full", separatorClasses)} />
      {children}
    </section>
  );
}
