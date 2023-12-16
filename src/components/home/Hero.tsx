"use client";

import Link from "next/link";
import { signIn, useSession } from "next-auth/react";
import { Button } from "../ui/button";
import { GoogleIcon } from "../ui/icons";
import { Github } from "lucide-react";
import { DashboardSkeleton } from "./DashboardSkeleton";
import { MaxWidthWrapper } from "../ui/max-width-wrapper";

export const Hero = () => {
  const { data: session } = useSession();

  return (
    <MaxWidthWrapper className="flex lg:flex-row flex-col gap-10 lg:max-w-screen-2xl max-w-screen-sm h-screen items-center justify-between py-10">
      <div className="flex flex-col gap-10 lg:text-left text-center lg:pb-0 pb-10">
        <div className="flex flex-col gap-3">
          <h1 className="md:text-5xl text-3xl font-bold text-foreground">Welcome to Consumption</h1>
          <p className="md:text-lg text-sm font-medium text-muted-foreground">
            Start tracking your expenses with ease. Join us to take control of your finances.
          </p>
        </div>

        <div className="flex flex-col gap-1 text-center lg:items-start items-center">
          <div className="flex gap-2">
            {session?.user ? (
              <Link href="/dashboard">
                <Button className="flex gap-2 px-7">Dashboard</Button>
              </Link>
            ) : (
              <Button className="flex gap-2 px-7" onClick={() => signIn("google")}>
                <GoogleIcon className="h-5 w-5" />
                Join with Google
              </Button>
            )}
            <Link href="https://github.com/KuroXI/consumption">
              <Button variant="outline" className="flex gap-2 px-7">
                <Github className="h-5 w-5" />
                Star on Github
              </Button>
            </Link>
          </div>
          <p className="md:text-sm text-xs text-muted-foreground">
            By joining, you agree to our{" "}
            <span className="text-primary underline">Terms & Conditions</span>.
          </p>
        </div>
      </div>

      <DashboardSkeleton />
    </MaxWidthWrapper>
  );
};
