import { type Config } from "tailwindcss";
import TailwindAnimate from "tailwindcss-animate";
import TailwindShadCN from "@/lib/shadcn";

export default {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  plugins: [TailwindAnimate, TailwindShadCN],
} satisfies Config;
