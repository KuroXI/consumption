"use client";

import { signIn } from "next-auth/react";
import { Button } from "../ui/button";
import { GoogleIcon } from "../ui/icons";
import Image from "next/image";
import Cover from "@/assets/cover.svg";

export const Hero = () => {
  return (
    <div className="flex h-screen w-screen items-center justify-center gap-64 px-24">
      <div className="flex flex-col gap-10">
        <div className="flex flex-col gap-5">
          <h1 className="text-7xl font-bold text-foreground">Welcome to Consumption</h1>
          <p className="text-xl font-medium text-muted-foreground">
            Start tracking your expenses with ease. Join us to take control of your finances.
          </p>
        </div>
        <div className="flex flex-col gap-2">
          <Button className="flex w-fit gap-2 px-7" onClick={() => signIn("google")}>
            <GoogleIcon className="h-5 w-5" />
            Join with Google
          </Button>
          <p className="text-sm text-muted-foreground">
            By joining, you agree to our{" "}
            <span className="text-primary underline">Terms & Conditions</span>.
          </p>
        </div>
      </div>

      <Image
        height={500}
        width={850}
        src={Cover as string}
        alt="A person holding a phone with a graph on the screen"
      />
    </div>
  );
};
