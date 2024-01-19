import { Button } from "@/components/ui/button";
import { formatCurrency } from "@/lib/utils";
import { type ColumnDef } from "@tanstack/react-table";
import { ArrowDownUp } from "lucide-react";

export type Transaction = {
  id: number;
  name: string;
  amount: number;
  createdAt: Date;
};

export const TransactionColumnDef: ColumnDef<Transaction>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => (
      <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
        Name
        <ArrowDownUp className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => <p>{row.getValue("name")}</p>,
  },
  {
    accessorKey: "amount",
    header: ({ column }) => (
      <div className="flex justify-center">
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Amount
          <ArrowDownUp className="ml-2 h-4 w-4" />
        </Button>
      </div>
    ),
    cell: ({ row }) => <p className="text-center">{formatCurrency(row.getValue("amount"))}</p>,
  },
  {
    accessorKey: "createdAt",
    header: ({ column }) => (
      <div className="flex justify-center">
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
      <p className="text-center">{new Date(row.getValue("createdAt")).toLocaleDateString()}</p>
    ),
  },
];
