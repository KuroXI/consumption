"use client";

import { Line } from "react-chartjs-2";
import { CategoryScale, Chart, LineElement, LinearScale, PointElement, Tooltip } from "chart.js";
import { useTheme } from "next-themes";
import { months } from "@/lib/utils";

Chart.register(CategoryScale, LinearScale, LineElement, PointElement, Tooltip);

const color = {
  primary: "hsl(263.4 70% 50.4%)",
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
            backgroundColor: color.primary,
            fill: true,
            tension: 0.35,
            pointRadius: 4,
            pointBackgroundColor: color.darkForeground,
          },
        ],
      }}
      options={{
        responsive: true,
        scales: {
          x: {
            grid: {
              display: false,
            },
            ticks: {
              color: theme === "dark" ? color.darkForeground : color.whiteForeground,
            },
          },
          y: {
            grid: {
              display: false,
            },
            ticks: {
              color: theme === "dark" ? color.darkForeground : color.whiteForeground,
            },
          },
        },

        plugins: {
          subtitle: {
            display: true
          },
          tooltip: {
            enabled: true,
            displayColors: false,
            callbacks: {
              label: (context) => {
                return `${(context.parsed.y ?? 0).toFixed(2)}`;
              },
            },
          },
        },
      }}
    />
  );
};
