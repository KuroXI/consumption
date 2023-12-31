import { NavigationBar } from "@/components/dashboard/NavigationBar";
import { MaxWidthWrapper } from "@/components/ui/max-width-wrapper";
import { YearlyChart } from "@/components/dashboard/overview/YearlyChart";
import { ExpenseHistory } from "@/components/dashboard/overview/ExpenseHistory";
import { AddExpense } from "@/components/dashboard/expenses/AddExpense";
import { InfoCard } from "@/components/dashboard/overview/InfoCard";
import { getServerSession } from "next-auth";
import { authOptions } from "@/server/auth";
import { redirect } from "next/navigation";
import { Footer } from "@/components/dashboard/Footer";

export default async function Page() {
  const session = await getServerSession(authOptions);
  if (!session) return redirect("/");

  return (
    <>
      <NavigationBar />
      <MaxWidthWrapper className="min-h-screen py-5">
        <h1 className="px-5 pb-5 text-lg font-semibold">Overview</h1>
        <InfoCard />
        <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
          <div className="col-span-1 rounded-md border p-3 lg:col-span-2">
            <h1 className="text-md py-2 font-semibold">Yearly Expenses</h1>
            <YearlyChart />
          </div>
          <div className="col-span-1 rounded-md border p-3">
            <h1 className="text-md py-2 font-semibold">Add Expense</h1>
            <AddExpense />
          </div>
          <div className="col-span-1 lg:col-span-3">
            <h1 className="text-md py-2 font-semibold">Expenses History</h1>
            <ExpenseHistory />
          </div>
        </div>
      </MaxWidthWrapper>
      <Footer />
    </>
  );
}
