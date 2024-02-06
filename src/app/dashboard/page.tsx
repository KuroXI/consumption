import { NavigationBar } from "@/components/dashboard/NavigationBar";
import { MaxWidthWrapper } from "@/components/ui/max-width-wrapper";
import { YearlyChart } from "@/components/dashboard/overview/YearlyChart";
import { ExpenseHistory } from "@/components/dashboard/overview/ExpenseHistory";
import { ExpenseForm } from "@/components/dashboard/expenses/ExpenseForm";
import { InfoCard } from "@/components/dashboard/overview/InfoCard";
import { getServerSession } from "next-auth";
import { authOptions } from "@/server/auth";
import { redirect } from "next/navigation";
import { Footer } from "@/components/dashboard/Footer";
import { TransactionForm } from "@/components/dashboard/transactions/TransactionsForm";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export const metadata = {
  title: "Overview - Consumption",
  description: "Start tracking your expenses with ease. Join us to take control of your finances.",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

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
          <div className="col-span-1 flex flex-col gap-5">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Add Expense</CardTitle>
              </CardHeader>
              <CardContent>
                <ExpenseForm />
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Add Transaction</CardTitle>
              </CardHeader>
              <CardContent>
                <TransactionForm />
              </CardContent>
            </Card>
          </div>
          <div className="col-span-1 lg:col-span-2 flex flex-col gap-5">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Yearly Chart</CardTitle>
              </CardHeader>
              <CardContent>
                <YearlyChart />
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Recent Expenses</CardTitle>
              </CardHeader>
              <CardContent>
                <ExpenseHistory />
              </CardContent>
            </Card>
          </div>
        </div>
      </MaxWidthWrapper>
      <Footer />
    </>
  );
}
