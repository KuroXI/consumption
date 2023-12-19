"use client";

import { MaxWidthWrapper } from "../ui/max-width-wrapper";
import { UserProfile } from "./UserProfile";
import { NavigationLinks } from "./NavigationLinks";
import { AlignJustify } from "lucide-react";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "../ui/sheet";
import { Button } from "../ui/button";

export const NavigationBar = () => {
  return (
    <header className="sticky top-0 border-b">
      <MaxWidthWrapper className="flex max-w-screen-xl items-center justify-between px-5 py-2 backdrop-blur-lg">
        <Sheet>
          <SheetTrigger asChild>
            <Button className="md:hidden" variant="ghost">
              <AlignJustify />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-72">
            <SheetHeader>
              <SheetTitle>LOGO HERE</SheetTitle>
            </SheetHeader>
            <nav className="mt-16 flex flex-col gap-10 text-center text-sm font-medium">
              <NavigationLinks />
            </nav>
          </SheetContent>
        </Sheet>
        <h1 className="hidden md:flex">LOGO HERE</h1>
        <nav className="hidden gap-10 text-sm font-medium md:flex">
          <NavigationLinks />
        </nav>
        <UserProfile />
      </MaxWidthWrapper>
    </header>
  );
};
