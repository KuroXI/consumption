import NoTransactionImage from "@/assets/no-transaction.png";
import NoExpensesImage from "@/assets/no-expenses.png";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";
import { flexRender, type Table as TableType } from "@tanstack/react-table";
import { cn, renderBreakPoint } from "@/lib/utils";
import { NoData } from "./NoData";
import { type Transaction, TransactionColumnDef } from "@/interface/TransactionColumnDef";
import { type Expense, ExpenseColumnDef } from "@/interface/ExpenseColumnDef";

type TableDataProps = ({
  table: TableType<Transaction>;
  type: "TRANSACTION";
} | {
  table: TableType<Expense>;
  type: "EXPENSES";
});

export const TableData = ({ table, type }: TableDataProps) => {
  const noTransactionImageSrc = NoTransactionImage.src;
  const noExpensesImageSrc = NoExpensesImage.src;

  const noDataProps = {
    colSpan: type === "TRANSACTION" ? TransactionColumnDef.length : ExpenseColumnDef.length,
    title:
      type === "TRANSACTION"
        ? "You don't have any transaction records"
        : "You don't have any expense records",
    src: type === "TRANSACTION" ? noTransactionImageSrc : noExpensesImageSrc,
  };

  return (
    <Table>
      <TableHeader>
        {table.getHeaderGroups().map((headerGroup) => (
          <TableRow key={headerGroup.id}>
            {headerGroup.headers.map((header) => (
              <TableHead key={header.id} className={cn(renderBreakPoint(header.id))}>
                {header.isPlaceholder
                  ? null
                  : flexRender(header.column.columnDef.header as string, header.getContext())}
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
                  {flexRender(cell.column.columnDef.cell as string, cell.getContext())}
                </TableCell>
              ))}
            </TableRow>
          ))
        ) : (
          <NoData {...noDataProps} />
        )}
      </TableBody>
    </Table>
  );
};
