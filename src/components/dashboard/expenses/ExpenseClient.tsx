"use client";

import { cn } from "@/lib/utils";
import { type Expense, ExpenseColumnDef } from "@/interface/ExpenseColumnDef";
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

type ExpensesTableProps = {
  className?: string;
  expenses: Expense[];
};

export const ExpenseClient = ({ className, expenses }: ExpensesTableProps) => {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);

  const table = useReactTable({
    data: expenses,
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
