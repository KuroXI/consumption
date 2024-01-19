import { NavigationBar } from "@/components/dashboard/NavigationBar";
import { MaxWidthWrapper } from "@/components/ui/max-width-wrapper";
import { api } from "@/trpc/server";
import { ExpenseClient } from "@/components/dashboard/expenses/ExpenseClient";
import { getServerSession } from "next-auth";
import { authOptions } from "@/server/auth";
import { redirect } from "next/navigation";
import { Separator } from "@/components/ui/separator";
import { Footer } from "@/components/dashboard/Footer";
import { ExpenseForm } from "@/components/dashboard/expenses/ExpenseForm";

export const metadata = {
  title: "Expenses - Consumption",
  description: "Start tracking your expenses with ease. Join us to take control of your finances.",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default async function Page() {
  const session = await getServerSession(authOptions);
  if (!session) return redirect("/");

  const expenses = await api.expenses.all.query();

  return (
    <>
      <NavigationBar />
      <MaxWidthWrapper className="min-h-screen py-5">
        <h1 className="px-5 pb-3 text-lg font-semibold">Expenses</h1>
        <div className="grid grid-cols-1 gap-5 space-y-5 lg:grid-cols-7">
          <ExpenseForm className="col-span-2 hidden h-fit rounded-md pb-0 md:pb-5 lg:block" />
          <div className="col-span-1 block lg:col-span-2 lg:hidden">
            <h1 className="text-md py-2 text-center font-semibold">Add Expense</h1>
            <ExpenseForm className="h-fit rounded-md p-0 md:p-5" />
            <Separator className="mt-10" />
          </div>
          <ExpenseClient className="col-span-1 lg:col-span-5" expenses={expenses} />
        </div>
      </MaxWidthWrapper>
      <Footer />
    </>
  );
}
