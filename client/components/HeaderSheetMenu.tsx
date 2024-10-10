import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "./ui/button";
import { AlignJustify } from "lucide-react";
import clsx from "clsx";

export default function HeaderSheetMenu({ className }: { className?: string }) {
  return (
    <Sheet>
      <SheetTrigger asChild className={clsx(className)}>
        <Button variant={"outline"}>
          <AlignJustify strokeWidth={"0.75px"} />
        </Button>
      </SheetTrigger>
      <SheetContent side={"left"}></SheetContent>
    </Sheet>
  );
}
