"use client";

import Image from "next/image";
import Link from "next/link";
import NoTransactionsImage from "@/assets/no-transaction.png";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { formatCurrency } from "@/lib/utils";
import { api } from "@/trpc/react";
import { Skeleton } from "@/components/ui/skeleton";

export const TransactionHistory = () => {
  const { data: transactions, isFetching } = api.transaction.all.useQuery();

  if (isFetching) return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead className="text-right">Amount</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {new Array(5).fill(null).map(() => (
          <TableRow key="skeleton-table">
            <TableCell className="max-w-prose"><Skeleton className="h-4 w-full"/></TableCell>
            <TableCell className="text-right"><Skeleton className="h-4 w-full"/></TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );

  return transactions?.length ? (
    <Table>
      {transactions.length > 5 ? (
        <TableCaption className="text-primary hover:underline">
          <Link href="/dashboard/transactions">{`${transactions.length - 5} more results`}</Link>
        </TableCaption>
      ) : null}

      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead className="text-right">Amount</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {transactions.slice(0, 5).map((transaction) => (
          <TableRow key={transaction.id}>
            <TableCell className="max-w-prose">{transaction.name}</TableCell>
            <TableCell className="text-right">{formatCurrency(transaction.amount)}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  ) : (
    <div className="flex flex-col gap-5">
      <h1 className="text-md mt-10 text-center font-medium text-muted-foreground">
        You don't have any transaction records
      </h1>
      <Image
        draggable={false}
        src={NoTransactionsImage}
        alt="NoData"
        width={550}
        height={550}
        quality={100}
        className="mx-auto"
      />
    </div>
  );
};
