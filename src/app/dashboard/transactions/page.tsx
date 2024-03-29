import { NavigationBar } from "@/components/dashboard/NavigationBar";
import { MaxWidthWrapper } from "@/components/ui/max-width-wrapper";
import { getServerSession } from "next-auth";
import { authOptions } from "@/server/auth";
import { redirect } from "next/navigation";
import { Footer } from "@/components/dashboard/Footer";
import { TransactionsClient } from "@/components/dashboard/transactions/TransactionsClient";
import { api } from "@/trpc/server";

export const metadata = {
  title: "Transactions - Consumption",
  description: "Start tracking your expenses with ease. Join us to take control of your finances.",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default async function Page() {
  const session = await getServerSession(authOptions);
  if (!session) return redirect("/");

  const transactions = await api.transaction.all.query();

  return (
    <>
      <NavigationBar />
      <MaxWidthWrapper className="min-h-screen py-5">
        <h1 className="px-5 pb-3 text-lg font-semibold">Transactions</h1>
        <TransactionsClient transactions={transactions} />
      </MaxWidthWrapper>
      <Footer />
    </>
  );
}
