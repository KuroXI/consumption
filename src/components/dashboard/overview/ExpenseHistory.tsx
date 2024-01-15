import Image from "next/image";
import Link from "next/link";
import NoExpensesImage from "@/assets/no-expenses.png";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { formatCurrency } from "@/lib/utils";
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
      <h1 className="text-md text-center font-medium text-muted-foreground mt-10">
        You don't have any expense records
      </h1>
      <Image
        draggable={false}
        src={NoExpensesImage}
        alt="NoData"
        width={550}
        height={550}
        quality={100}
        className="mx-auto"
      />
    </div>
  );
};
