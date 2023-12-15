import { Feature } from "@/components/home/Feature";
import { Hero } from "@/components/home/Hero";
import { Pricing } from "@/components/home/Pricing";

export const metadata = {
  title: "Consumption",
  description: "Start tracking your expenses with ease. Join us to take control of your finances.",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default async function Page() {
  return (
    <main className="h-full w-screen">
      <Hero />
      <Feature />
      <Pricing />
    </main>
  );
}
