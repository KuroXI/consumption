"use client";

import { usePathname } from "next/navigation";
import { MaxWidthWrapper } from "../ui/max-width-wrapper";
import { Skeleton } from "../ui/skeleton";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { useSession } from "next-auth/react";
import { Button } from "../ui/button";
import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";
import { UserProfile } from "./UserProfile";

const links = [
  { href: "/dashboard", label: "Overview" },
  { href: "/dashboard/expenses", label: "Expenses" },
  { href: "/dashboard/goals", label: "Goals" },
  { href: "/dashboard/settings", label: "Settings" },
];

export const NavigationBar = () => {
  const { data: session } = useSession();
  const { theme, setTheme } = useTheme();
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 w-screen border-b">
      <MaxWidthWrapper className="flex max-w-screen-xl items-center justify-between py-2 px-5 backdrop-blur-lg">
        <div>
          <h1>LOGO HERE</h1>
        </div>
        <nav className="flex gap-10 text-sm font-medium">
          {links.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className={cn(
                "transition-colors hover:text-foreground/80",
                pathname === href ? "text-foreground" : "text-foreground/60",
              )}
            >
              {label}
            </Link>
          ))}
        </nav>
        <div className="flex gap-3">
          <Button
            size="icon"
            variant="outline"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          >
            {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </Button>
          {session ? (
            <UserProfile session={session} />
          ) : (
            <Skeleton className="h-8 w-8 rounded-full" />
          )}
        </div>
      </MaxWidthWrapper>
    </header>
  );
};
