import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatCurrency(amount: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "PHP",
    minimumFractionDigits: 2,
  }).format(amount);
}

export function renderBreakPoint(id: string): string {
  if (id === "date" || id === "category") {
    return "hidden md:table-cell";
  } else return "";
}

export function formatCardInfo({ current, last } : {
  current: number;
  last: number;
}): string {
  if (last === 0) return "100% more from";

  const percentage = ((current - last) / last) * 100;
  return `${Math.abs(percentage).toFixed(2)}% ${percentage > 0 ? "more" : "less"} from`;
}