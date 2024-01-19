import { NavigationBar } from "@/components/dashboard/NavigationBar";
import { MaxWidthWrapper } from "@/components/ui/max-width-wrapper";
import { api } from "@/trpc/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/server/auth";
import { redirect } from "next/navigation";
import { Footer } from "@/components/dashboard/Footer";
import { TransactionsClient } from "@/components/dashboard/transactions/TransactionsClient";

export default async function Page() {
  const session = await getServerSession(authOptions);
  if (!session) return redirect("/");

  const transaction = await api.transaction.all.query();

  return (
    <>
      <NavigationBar />
      <MaxWidthWrapper className="min-h-screen py-5">
        <h1 className="px-5 pb-3 text-lg font-semibold">Transactions</h1>
        <TransactionsClient transactions={transaction} />
      </MaxWidthWrapper>
      <Footer />
    </>
  );
}
