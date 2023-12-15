"use client";

import { signIn } from "next-auth/react";
import { Button } from "../ui/button";
import { GoogleIcon } from "../ui/icons";
import Image from "next/image";
import Cover from "@/assets/cover.svg";
import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";

export const Hero = () => {
  const { theme, setTheme } = useTheme();

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
          <div className="flex gap-2">
            <Button className="flex gap-2 px-7" onClick={() => signIn("google")}>
              <GoogleIcon className="h-5 w-5" />
              Join with Google
            </Button>
            <Button
              size="icon"
              variant="outline"
              className="flex gap-2"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            >
              {theme === "dark" ? <Sun /> : <Moon />}
            </Button>
          </div>

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
