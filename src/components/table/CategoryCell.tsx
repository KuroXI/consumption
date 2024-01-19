/**
 * Why this is a component?
 *
 * This is created to fix the duplication code from sonarcloud.
 */

import { Badge } from "@/components/ui/badge";
import { type Expense } from "@/interface/ExpenseColumnDef";
import { type Transaction } from "@/interface/TransactionColumnDef";
import { type Row } from "@tanstack/react-table";

type CategoryCellProps = {
  row: Row<Transaction> | Row<Expense>;
};

export const CategoryCell = ({ row }: CategoryCellProps) => {
  return (
    <div className="flex justify-center">
      <Badge className="capitalize">{row.getValue("category") ?? row.getValue("type")}</Badge>
    </div>
  );
};
