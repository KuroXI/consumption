import { NavigationBar } from "@/components/dashboard/NavigationBar";
import { MaxWidthWrapper } from "@/components/ui/max-width-wrapper";
import { api } from "@/trpc/server";
import { YearlyChart } from "@/components/dashboard/overview/YearlyChart";
import { ExpenseHistory } from "@/components/dashboard/overview/ExpenseHistory";

export default async function Page() {
  const expenses = await api.expenses.all.query();
  const yearly = await api.expenses.yearly.query({
    year: new Date().getFullYear(),
  });

  return (
    <>
      <NavigationBar />
      <MaxWidthWrapper className="max-w-screen-xl py-5">
        <h1 className="pb-5 pl-5 text-lg font-semibold">Overview</h1>
        <div className="grid grid-cols-1 gap-2 md:grid-cols-3">
          <div className="col-span-2 rounded-md border p-3">
            <h1 className="text-md py-2 font-semibold">Yearly Expenses</h1>
            <YearlyChart data={yearly} />
          </div>
          <div className="col-span-1 rounded-md border p-3">
            <h1 className="text-md py-2 font-semibold">Yearly Statistics</h1>
          </div>
          <div className="col-span-2 rounded-md border p-3">
            <h1 className="text-md py-2 font-semibold">Expenses History</h1>
            <ExpenseHistory expenses={expenses} />
          </div>
          <div className="col-span-1 rounded-md border p-3">
            <h1 className="text-md py-2 font-semibold">Goals</h1>
          </div>
        </div>
      </MaxWidthWrapper>
    </>
  );
}
