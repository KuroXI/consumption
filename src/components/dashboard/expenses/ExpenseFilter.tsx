import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { budgetCategory } from "@/lib/constant";
import { type Expense } from "@/interface/ExpenseColumnDef";
import { type Table } from "@tanstack/react-table";

type ExpenseFilterProps = {
  table: Table<Expense>;
};

export const ExpenseFilter = ({ table }: ExpenseFilterProps) => {
  const onValueChange = (value: string) => {
    if (value === "all") return table.getColumn("category")?.setFilterValue("");
    return table.getColumn("category")?.setFilterValue(value);
  };

  return (
    <div className="flex items-end justify-start gap-2">
      <Input
        placeholder="Filter description..."
        value={(table.getColumn("description")?.getFilterValue() as string) ?? ""}
        onChange={(event) => table.getColumn("description")?.setFilterValue(event.target.value)}
      />
      <Select
        value={(table.getColumn("category")?.getFilterValue() as string) ?? ""}
        onValueChange={onValueChange}
      >
        <SelectTrigger>
          <SelectValue placeholder="Categories" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectItem value="all">All</SelectItem>
            {budgetCategory.map((category) => (
              <SelectItem key={category} value={category}>
                {category}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
};
