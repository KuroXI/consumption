import { formatCurrency } from "@/lib/utils";
import { api } from "@/trpc/server";
import { AddBalance } from "../transactions/AddBalance";

export const InfoCard = async () => {
  const balance = await api.transaction.balance.query();
  const daily = await api.expenses.daily.query();
  const monthly = await api.expenses.monthly.query();

  return (
    <div className="mb-5 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-5">
      <div className="col-span-1 rounded-md border px-3 py-1">
        <h1 className="text-md py-1 font-semibold text-primary">Balance</h1>
        <p className="text-xl font-medium">{formatCurrency(balance ?? 0)}</p>
      </div>
      <div className="col-span-1 rounded-md border px-3 py-1">
        <h1 className="text-md py-1 font-semibold text-primary">Daily Expense</h1>
        <p className="text-xl font-medium">{formatCurrency(daily ?? 0)}</p>
      </div>
      <div className="col-span-1 rounded-md border px-3 py-1">
        <h1 className="text-md py-1 font-semibold text-primary">Monthly Expense</h1>
        <p className="text-xl font-medium">{formatCurrency(monthly ?? 0)}</p>
      </div>
      <div className="col-span-1 py-1 lg:col-span-2">
        <h1 className="text-md py-1 font-semibold text-primary">Add Income</h1>
        <AddBalance className="flex w-full gap-2" />
      </div>
    </div>
  );
};
