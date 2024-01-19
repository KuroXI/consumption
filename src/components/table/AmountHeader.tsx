import { ArrowDownUp } from "lucide-react";
import { Button } from "../ui/button";
import { type Column } from "@tanstack/react-table";
import { type Transaction } from "@/interface/TransactionColumnDef";
import { type Expense } from "@/interface/ExpenseColumnDef";

type AmountHeader = {
  column: Column<Transaction, unknown> | Column<Expense, unknown>;
};

export const AmountHeader = ({ column }: Readonly<AmountHeader>) => (
  <div className="flex justify-center">
    <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
      Amount
      <ArrowDownUp className="ml-2 h-4 w-4" />
    </Button>
  </div>
);
