"use client";

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
import { api } from "@/trpc/react";

export const ExpenseHistory = () => {
  const { data: expenses } = api.expenses.all.useQuery();

  return expenses?.length ? (
    <Table>
      {expenses.length > 10 ? (
        <TableCaption className="text-primary hover:underline">
          <Link href="/dashboard/expenses">{`${expenses.length - 10} more results`}</Link>
        </TableCaption>
      ) : null}

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
            <TableCell className="text-right">
              {expense.createdAt.toLocaleDateString()}
            </TableCell>
            <TableCell className="text-right">{formatCurrency(expense.amount)}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  ) : (
    <div className="flex flex-col gap-5">
      <h1 className="text-md mt-10 text-center font-medium text-muted-foreground">
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
