"use client";

import Link from "next/link";
import { signIn, useSession } from "next-auth/react";
import { Button } from "../ui/button";
import { GoogleIcon } from "../ui/icons";
import { Github } from "lucide-react";
import Image from "next/image";
import { useTheme } from "next-themes";

export const Hero = () => {
  const { theme } = useTheme();
  const { data: session } = useSession();

  return (
    <div className="flex lg:flex-row flex-col gap-10 w-screen h-screen items-center justify-center py-10 lg:px-24 px-5">
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
        </div>
      </div>

      <Image
        src={theme !== "dark" ? "/landing-dark.svg" : "/landing-light.svg"}
        alt="Landing Image"
        width={0}
        height={0}
        sizes="100vw"
        className="md:w-2/4 w-full h-auto"
        draggable={false}
      />
    </div>
  );
};
