import { NavigationBar } from "@/components/dashboard/NavigationBar";
import { AddExpense } from "@/components/dashboard/AddExpense";
import { MaxWidthWrapper } from "@/components/ui/max-width-wrapper";
import { api } from "@/trpc/server";
import { ExpensesTable } from "@/components/dashboard/expenses/ExpensesTable";

export default async function Page() {
  const expenses = await api.expenses.all.query();

  return (
    <>
      <NavigationBar />
      <MaxWidthWrapper className="max-w-screen-xl py-5">
        <h1 className="pb-5 pl-5 text-lg font-semibold">Expenses</h1>
        <div className="grid grid-cols-1 gap-5 space-y-5 lg:grid-cols-7">
          <AddExpense className="h-fit rounded-md p-0 md:p-5 col-span-2 hidden lg:block" />
          <ExpensesTable className="col-span-1 lg:col-span-5" expenses={expenses} />
          <AddExpense className="col-span-1 h-fit rounded-md p-0 md:p-5 lg:col-span-2 block lg:hidden" />
        </div>
      </MaxWidthWrapper>
    </>
  );
}
