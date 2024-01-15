import { Button } from "@/components/ui/button";
import { type Transaction } from "@/interface/TransactionColumnDef";
import { type Table } from "@tanstack/react-table";

type TransactionsPaginationProps = {
  table: Table<Transaction>;
};

export const TransactionsPagination = ({ table }: TransactionsPaginationProps) => {
  return table.getPageCount() ? (
    <div className="flex items-center justify-between space-x-2">
      <p className="text-sm text-muted-foreground">
        Page {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}
      </p>
      <div className="space-x-2">
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
  ) : null;
};
