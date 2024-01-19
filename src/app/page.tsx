import { Hero } from "@/components/home/Hero";
import { getServerAuthSession } from "@/server/auth";
import { redirect } from "next/navigation";

export const metadata = {
  title: "Consumption",
  description: "Start tracking your expenses with ease. Join us to take control of your finances.",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default async function Page() {
  const session = await getServerAuthSession();

  if (session) {
    return redirect("/dashboard");
  }

  return (
    <main className="h-full w-screen">
      <Hero />
    </main>
  );
}
