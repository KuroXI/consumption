"use client";

import { cn } from "@/lib/utils";
import { ExpenseColumnDef } from "@/interface/ExpenseColumnDef";
import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  type SortingState,
  type ColumnFiltersState,
  getFilteredRowModel,
  getPaginationRowModel,
} from "@tanstack/react-table";
import { useState } from "react";
import { ExpenseFilter } from "./ExpenseFilter";
import { TableData } from "../TableData";
import { TablePagination } from "../TablePagination";
import { api } from "@/trpc/react";

type ExpensesTableProps = {
  className?: string;
};

export const ExpenseClient = ({ className }: ExpensesTableProps) => {
  const expenses = api.expenses.all.useQuery();
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);

  const table = useReactTable({
    data: expenses.data ?? [],
    columns: ExpenseColumnDef,
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
    <div className={cn(className, "flex flex-col gap-2")}>
      <ExpenseFilter table={table} />
      <TableData table={table} type="EXPENSES" />
      <TablePagination table={table} />
    </div>
  );
};
