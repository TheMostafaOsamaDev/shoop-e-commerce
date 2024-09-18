"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown, User } from "lucide-react";
import { Button } from "./ui/button";
import { logOut } from "@/lib/actions/auth.actions";
import Link from "next/link";

export default function DropdownProfile() {
  const handleLogOut = async () => {
    await logOut();
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
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
