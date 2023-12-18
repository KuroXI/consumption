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

type ExpenseHistoryProps = {
	expenses: {
		id: number;
		description: string;
		category: string;
		date: Date;
		amount: number;
	}[];
}

export const ExpenseHistory = ({ expenses } : Readonly<ExpenseHistoryProps>) => {
  return (
    <Table>
      <TableCaption className="text-primary hover:underline">
        <Link href="/dashboard/expenses">{`${expenses.length - 10} more results`}</Link>
      </TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Description</TableHead>
          <TableHead>Category</TableHead>
          <TableHead className="text-right">Date</TableHead>
          <TableHead className="text-right">Amount</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {expenses.slice(0, 10).map((expense) => (
          <TableRow key={expense.id}>
            <TableCell className="max-w-prose">{expense.description}</TableCell>
            <TableCell className="capitalize">
              <Badge>{expense.category}</Badge>
            </TableCell>
            <TableCell className="text-right">{expense.date.toLocaleDateString()}</TableCell>
            <TableCell className="text-right">{formatCurrency(expense.amount)}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
