import { Input } from "@/components/ui/input";
import { type Transaction } from "@/interface/TransactionColumnDef";
import { type Table } from "@tanstack/react-table";

type TranscationsFilterProps = {
  table: Table<Transaction>;
};

export const TransactionsFilter = ({ table }: TranscationsFilterProps) => {
  return (
    <div className="flex flex-col items-end justify-start gap-5">
      <Input
        id="name"
        placeholder="Filter name..."
        autoComplete="off"
        value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
        onChange={(event) => table.getColumn("name")?.setFilterValue(event.target.value)}
      />
    </div>
  );
};
