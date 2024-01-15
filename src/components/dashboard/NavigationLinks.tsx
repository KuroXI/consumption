"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/dashboard", label: "Overview" },
  { href: "/dashboard/expenses", label: "Expenses" },
  { href: "/dashboard/transactions", label: "Transactions" },
];

export const NavigationLinks = () => {
  const pathname = usePathname();

  return links.map(({ href, label }) => (
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
  ));
};
