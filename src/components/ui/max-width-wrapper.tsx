import { cn } from "@/lib/utils";
import { type ReactNode } from "react";

type MaxWidthWrapperProps = {
  className?: string;
  children: ReactNode;
};

export function MaxWidthWrapper({ className, children }: Readonly<MaxWidthWrapperProps>) {
  return (
    <div className={cn("mx-auto w-full max-w-screen-lg px-2.5 lg:px-20", className)}>
      {children}
    </div>
  );
}
