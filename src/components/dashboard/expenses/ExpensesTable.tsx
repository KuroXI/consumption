"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn, formatCurrency, renderBreakPoint } from "@/lib/utils";
import {
  useReactTable,
  type ColumnDef,
  getCoreRowModel,
  flexRender,
  getSortedRowModel,
  type SortingState,
  type ColumnFiltersState,
  getFilteredRowModel,
  getPaginationRowModel,
} from "@tanstack/react-table";
import { ArrowDownUp } from "lucide-react";
import { useState } from "react";

type ExpensesTableProps = {
  className?: string;
  expenses: Expense[];
};

type Expense = {
  id: number;
  description: string;
  category: string;
  amount: number;
  date: Date;
};

const columns: ColumnDef<Expense>[] = [
  {
    accessorKey: "description",
    header: ({ column }) => (
      <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
        Description
        <ArrowDownUp className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => <p className="max-w-prose">{row.getValue("description")}</p>,
  },
  {
    accessorKey: "category",
    header: ({ column }) => (
      <div className="flex justify-end">
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Category
          <ArrowDownUp className="ml-2 h-4 w-4" />
        </Button>
      </div>
    ),
    cell: ({ row }) => (
      <div className="flex justify-end">
        <Badge className="capitalize">{row.getValue("category")}</Badge>
      </div>
    ),
  },
  {
    accessorKey: "date",
    header: ({ column }) => (
      <div className="flex justify-end">
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Date
          <ArrowDownUp className="ml-2 h-4 w-4" />
        </Button>
      </div>
    ),
    cell: ({ row }) => (
      <p className="text-right">{new Date(row.getValue("date")).toLocaleDateString()}</p>
    ),
  },
  {
    accessorKey: "amount",
    header: ({ column }) => (
      <div className="flex justify-end">
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Amount
          <ArrowDownUp className="ml-2 h-4 w-4" />
        </Button>
      </div>
    ),
    cell: ({ row }) => <p className="text-right">{formatCurrency(row.getValue("amount"))}</p>,
  },
];

export const ExpensesTable = ({ className, expenses }: ExpensesTableProps) => {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);

  const table = useReactTable({
    data: expenses,
    columns,
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
      <div className="flex items-end justify-start gap-2">
        <Input
          placeholder="Filter description..."
          value={(table.getColumn("description")?.getFilterValue() as string) ?? ""}
          onChange={(event) => table.getColumn("description")?.setFilterValue(event.target.value)}
        />
        <Input
          placeholder="Filter category..."
          value={(table.getColumn("category")?.getFilterValue() as string) ?? ""}
          onChange={(event) => table.getColumn("category")?.setFilterValue(event.target.value)}
        />
      </div>

      <div className="rounded-md border p-5">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id} className={cn(renderBreakPoint(header.id))}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(header.column.columnDef.header, header.getContext())}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell
                      key={cell.id}
                      className={cn(renderBreakPoint(cell.id.split("_")![1]!))}
                    >
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          Previous
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          Next
        </Button>
      </div>
    </div>
  );
};
