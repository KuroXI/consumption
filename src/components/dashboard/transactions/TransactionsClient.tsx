"use client";

import { TransactionColumnDef, type Transaction } from "@/interface/TransactionColumnDef";
import { useState } from "react";
import {
  useReactTable,
  type ColumnFiltersState,
  type SortingState,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
} from "@tanstack/react-table";
import { TransactionsFilter } from "./TransactionsFilter";
import { TransactionForm } from "./TransactionsForm";
import { TableData } from "../TableData";
import { TablePagination } from "../TablePagination";

type TransactionsClientProps = {
  transactions: Transaction[];
};

export const TransactionsClient = ({ transactions }: Readonly<TransactionsClientProps>) => {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);

  const table = useReactTable({
    data: transactions,
    columns: TransactionColumnDef,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    state: {
      sorting,
      columnFilters,
    },
  });

  return (
    <div className="grid grid-cols-1 gap-5 lg:grid-cols-7">
      <div className="col-span-1 flex flex-col gap-10 text-left lg:col-span-2">
        <div className="flex flex-col gap-2">
          <div className="col-span-1 py-1 lg:col-span-2">
            <h1 className="text-md py-1 font-semibold text-primary">Add Transaction</h1>
            <TransactionForm />
          </div>
        </div>
        <div className="col-span-1 py-1 lg:col-span-2">
          <h1 className="text-md py-1 font-semibold text-primary">Filter</h1>
          <TransactionsFilter table={table} />
        </div>
      </div>
      <div className="col-span-1 flex flex-col gap-2 lg:col-span-5">
        <TableData table={table} type="TRANSACTION" />
        <TablePagination table={table} />
      </div>
    </div>
  );
};
