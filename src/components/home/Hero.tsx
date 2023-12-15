"use client";

import { signIn } from "next-auth/react";
import { Button } from "../ui/button";
import { GoogleIcon } from "../ui/icons";
import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";
import { MaxWidthWrapper } from "../ui/max-width-wrapper";

export const Hero = () => {
  const { theme, setTheme } = useTheme();

  return (
    <MaxWidthWrapper className="flex flex-col gap-20 h-screen text-center items-center justify-center">
      <div className="flex flex-col gap-3">
        <h1 className="text-7xl font-bold text-foreground">Welcome to Consumption</h1>
        <p className="text-xl font-medium text-muted-foreground">
          Start tracking your expenses with ease. Join us to take control of your finances.
        </p>
      </div>
      <div className="flex flex-col gap-2 w-full items-center">
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
    </MaxWidthWrapper>
  );
};
