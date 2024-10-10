import React from "react";
import { Button } from "./ui/button";
import { Facebook, Handshake, Linkedin, Twitter, Youtube } from "lucide-react";
import Link from "next/link";

export default function Footer() {
  const socialMediaButton =
    "rounded-full h-fit p-3 btn-icon-container bg-black text-white dark:bg-white dark:text-black dark:hover:bg-primary dark:hover:text-white";

  const thisYear = new Date().getFullYear();

  return (
    <footer className="relative before:absolute before:content-[''] before:top-0 before:left-1/2 before:-translate-x-1/2 before:w-[80%] before:h-[1px] before:bg-input mt-7">
      <div className="container flex items-center justify-between flex-col-reverse gap-5 md:gap-0 md:flex-row">
        <div>&#169; {thisYear} Shoop!</div>

        <div className="flex items-center gap-1">
          <Button className={socialMediaButton}>
            <Facebook />
          </Button>

          <Button className={socialMediaButton}>
            <Linkedin />
          </Button>

          <Button className={socialMediaButton}>
            <Twitter />
          </Button>

          <Button className={socialMediaButton}>
            <Youtube />
          </Button>
        </div>

        <Button
          asChild
          variant={"ghost"}
          className="btn-icon-container text-foreground"
        >
          <Link href={"/become-a-partner"}>
            <Handshake /> Become a Partner
          </Link>
        </Button>
      </div>
    </footer>
  );
}
