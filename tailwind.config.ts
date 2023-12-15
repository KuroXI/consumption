import { type Config } from "tailwindcss";
import TailwindAnimate from "tailwindcss-animate";
import TailwindShadCN from "./src/lib/shadcn";

const config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  plugins: [TailwindAnimate, TailwindShadCN],
} satisfies Config;

export default config;
