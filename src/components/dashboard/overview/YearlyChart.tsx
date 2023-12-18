"use client";

import { Line } from "react-chartjs-2";
import { CategoryScale, Chart, LineElement, LinearScale, PointElement } from "chart.js";
import { useTheme } from "next-themes";
import { months } from "@/lib/utils";

Chart.register(CategoryScale, LinearScale, LineElement, PointElement);

const color = {
  primary: "hsl(263.4 70% 50.4%)",
  darkSecondary: "hsl(215 27.9% 16.9%)",
  whiteSecondary: "hsl(220 14.3% 95.9%)",
  darkForeground: "hsl(210 20% 98%)",
  whiteForeground: "hsl(224 71.4% 4.1%)",
};

type YearlyChartProps = {
  data: {
    month: string;
    amount: number;
  }[];
};

export const YearlyChart = ({ data }: Readonly<YearlyChartProps>) => {
  const { theme } = useTheme();

  return (
    <Line
      data={{
        labels: months,
        datasets: [
          {
            data: data.map((o) => o.amount),
            borderColor: color.primary,
            tension: 0.35,
            pointRadius: 0,
          },
        ],
      }}
      options={{
        responsive: true,
        scales: {
          x: {
            grid: {
              color: theme === "dark" ? color.darkSecondary : color.whiteSecondary,
            },
            ticks: {
              color: theme === "dark" ? color.darkForeground : color.whiteForeground,
            },
          },
          y: {
            grid: {
              color: theme === "dark" ? color.darkSecondary : color.whiteSecondary,
            },
            ticks: {
              color: theme === "dark" ? color.darkForeground : color.whiteForeground,
            },
          },
        },
      }}
    />
  );
};
