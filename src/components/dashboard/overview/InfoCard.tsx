import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatCardInfo, formatCurrency } from "@/lib/utils";
import { api } from "@/trpc/server";

export const InfoCard = async () => {
  const balance = await api.transaction.balance.query();
  const daily = await api.expenses.daily.query({ date: new Date() });
  const monthly = await api.expenses.monthly.query({ date: new Date() });
  const yearly = await api.expenses.yearly.query({ date: new Date() });

  return (
    <div className="mb-5 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-4">
      <Card className="col-span-1">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium">Balance</CardTitle>
        </CardHeader>
        <CardContent>
          <h1 className="text-2xl font-bold">{formatCurrency(balance ?? 0)}</h1>
        </CardContent>
      </Card>
      <Card className="col-span-1">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium">Daily</CardTitle>
        </CardHeader>
        <CardContent>
          <h1 className="text-2xl font-bold">{formatCurrency(daily.current ?? 0)}</h1>
          <p className="text-xs text-muted-foreground">{formatCardInfo(daily)} yesterday</p>
        </CardContent>
      </Card>
      <Card className="col-span-1">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium">Monthly</CardTitle>
        </CardHeader>
        <CardContent>
          <h1 className="text-2xl font-bold">{formatCurrency(monthly.current ?? 0)}</h1>
          <p className="text-xs text-muted-foreground">{formatCardInfo(monthly)} last month</p>
        </CardContent>
      </Card>
      <Card className="col-span-1">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium">Yearly</CardTitle>
        </CardHeader>
        <CardContent>
          <h1 className="text-2xl font-bold">{formatCurrency(yearly.current ?? 0)}</h1>
          <p className="text-xs text-muted-foreground">{formatCardInfo(yearly)} last year</p>
        </CardContent>
      </Card>
    </div>
  );
};
