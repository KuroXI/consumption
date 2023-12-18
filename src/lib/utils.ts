import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatCurrency(amount: number) {
  const formatted = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "PHP",
    minimumFractionDigits: 2,
  }).format(amount);

  return `PHP ${formatted.slice(1)}`
}

export const months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "June",
  "July",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];
