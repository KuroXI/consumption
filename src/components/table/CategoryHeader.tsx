/**
 * Why this is a component?
 *
 * This is created to fix the duplication code from sonarcloud.
 */

import { ArrowDownUp } from "lucide-react";
import { Button } from "../ui/button";
import { type Column } from "@tanstack/react-table";
import { type Transaction } from "@/interface/TransactionColumnDef";
import { type Expense } from "@/interface/ExpenseColumnDef";

type CategoryHeaderProps = {
  title: string;
  column: Column<Transaction, unknown> | Column<Expense, unknown>;
};

export const CategoryHeader = ({ title, column }: CategoryHeaderProps) => {
  return (
    <div className="flex justify-center">
      <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
        {title}
        <ArrowDownUp className="ml-2 h-4 w-4" />
      </Button>
    </div>
  );
};
