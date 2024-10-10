"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown, User } from "lucide-react";
import { Button } from "./ui/button";
import { logOut } from "@/lib/actions/auth.actions";
import clsx from "clsx";

export default function DropdownProfile({ className }: { className?: string }) {
  const handleLogOut = async () => {
    await logOut();
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild className={clsx(className)}>
        <Button variant={"outline"} className="btn-icon-container">
          <User /> Profile <ChevronDown size={18} />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-full font-medium">
        <DropdownMenuItem>Profile</DropdownMenuItem>
        <DropdownMenuItem>Wishlist</DropdownMenuItem>

        <DropdownMenuItem
          className="text-red-600 hover:!text-red-700"
          onClick={handleLogOut}
        >
          Log Out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
