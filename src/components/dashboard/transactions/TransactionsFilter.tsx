import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { type Transaction } from "@/interface/TransactionColumnDef";
import { type Table } from "@tanstack/react-table";

type TranscationsFilterProps = {
  table: Table<Transaction>;
};

export const TransactionsFilter = ({ table }: TranscationsFilterProps) => {
  const onValueChange = (value: string) => {
    if (value === "all") return table.getColumn("type")?.setFilterValue("");
    return table.getColumn("type")?.setFilterValue(value);
  };

  return (
    <div className="flex flex-col items-end justify-start gap-5">
      <Input
        id="name"
        placeholder="Filter name..."
        autoComplete="off"
        value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
        onChange={(event) => table.getColumn("name")?.setFilterValue(event.target.value)}
      />
      <Select
        value={(table.getColumn("type")?.getFilterValue() as string) ?? ""}
        onValueChange={onValueChange}
      >
        <SelectTrigger>
          <SelectValue placeholder="Type" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectItem value="all">All</SelectItem>
            <SelectItem value="add">Add</SelectItem>
            <SelectItem value="remove">Remove</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
};
