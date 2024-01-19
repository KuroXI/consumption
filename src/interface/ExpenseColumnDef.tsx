import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { formatCurrency } from "@/lib/utils";
import { api } from "@/trpc/react";
import { type ColumnDef } from "@tanstack/react-table";
import { ArrowDownUp, MoreVertical } from "lucide-react";
import { toast } from "sonner";
import { CategoryCell } from "@/components/table/CategoryCell";
import { CategoryHeader } from "@/components/table/CategoryHeader";

export type Expense = {
  id: number;
  description: string;
  category: string;
  amount: number;
  date: Date;
};

export const ExpenseColumnDef: ColumnDef<Expense>[] = [
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
    accessorKey: "category",
    header: ({ column }) => <CategoryHeader title="Category" column={column} />,
    cell: ({ row }) => <CategoryCell row={row} />,
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
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const expenseRemoveMutation = api.expenses.remove.useMutation();

      const onClick = async () => {
        await expenseRemoveMutation.mutateAsync(
          { id: row.original.id },
          {
            onSuccess: () => toast.success("Expense deleted successfully"),
            onError: (error) => toast.error(error.message),
            onSettled: () => window.location.reload(),
          },
        );
      };

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-6 w-6 p-0">
              <span className="sr-only">Open menu</span>
              <MoreVertical className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(String(row.original.id))}
            >
              Copy ID
            </DropdownMenuItem>
            <DropdownMenuItem>Edit</DropdownMenuItem>
            <DropdownMenuItem onClick={onClick}>Delete</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
