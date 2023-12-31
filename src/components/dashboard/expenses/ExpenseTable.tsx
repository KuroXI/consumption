import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn, renderBreakPoint } from "@/lib/utils";
import { ExpenseColumnDef, type Expense } from "@/interface/ExpenseColumnDef";
import { flexRender, type Table as TableType } from "@tanstack/react-table";
import Image from "next/image";
import NoExpensesImage from "@/assets/no-expenses.png";

type ExpenseTableProps = {
  table: TableType<Expense>;
};

export const ExpenseTable = ({ table }: ExpenseTableProps) => {
  return (
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
        {table.getRowModel().rows.length ? (
          table.getRowModel().rows.map((row) => (
            <TableRow key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <TableCell key={cell.id} className={cn(renderBreakPoint(cell.id.split("_")![1]!))}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </TableCell>
              ))}
            </TableRow>
          ))
        ) : (
          <TableRow>
            <TableCell colSpan={ExpenseColumnDef.length}>
              <h1 className="text-center text-xl font-medium">
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
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
};
