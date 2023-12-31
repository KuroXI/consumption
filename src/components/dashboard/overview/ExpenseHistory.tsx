import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { formatCurrency } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { api } from "@/trpc/server";

export const ExpenseHistory = async () => {
  const expenses = await api.expenses.all.query();

  return expenses.length ? (
    <Table>
      <TableCaption className="text-primary hover:underline">
        <Link href="/dashboard/expenses">{`${expenses.length - 10} more results`}</Link>
      </TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Description</TableHead>
          <TableHead className="hidden md:table-cell">Category</TableHead>
          <TableHead className="hidden text-right md:table-cell">Date</TableHead>
          <TableHead className="text-right">Amount</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {expenses.slice(0, 10).map((expense) => (
          <TableRow key={expense.id}>
            <TableCell className="max-w-prose">{expense.description}</TableCell>
            <TableCell className="hidden capitalize md:table-cell">
              <Badge>{expense.category}</Badge>
            </TableCell>
            <TableCell className="hidden text-right md:table-cell">
              {expense.date.toLocaleDateString()}
            </TableCell>
            <TableCell className="text-right">{formatCurrency(expense.amount)}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  ) : (
    <div className="flex flex-col gap-5">
      <p className="text-center text-sm text-muted-foreground">No expenses yet.</p>
      <div className="flex justify-center">
        <Button>Add Expense</Button>
      </div>
    </div>
  );
};
