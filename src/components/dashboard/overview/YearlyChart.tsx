"use client";

import { AspectRatio } from "@/components/ui/aspect-ratio";
import { SpinnerIcon } from "@/components/ui/icons";
import { api } from "@/trpc/react";
import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import type { NameType, Payload, ValueType } from "recharts/types/component/DefaultTooltipContent";

const color = {
  primary: "hsl(263.4 70% 50.4%)",
  darkForeground: "hsl(210 20% 98%)",
  whiteForeground: "hsl(224 71.4% 4.1%)",
};

export const YearlyChart = () => {
  const chartData = api.expenses.yearlyChart.useQuery({
    year: new Date().getFullYear(),
  });

  return chartData.data ? (
    <ResponsiveContainer width="100%" height="100%" aspect={16 / 9}>
      <LineChart
        data={chartData.data}
        margin={{
          top: 0,
          right: 15,
          left: -15,
          bottom: 0,
        }}
      >
        <XAxis dataKey="name" fontSize={13} />
        <YAxis fontSize={13} />
        <Line
          type="monotone"
          dataKey="lastYear"
          strokeDasharray="5 5"
          strokeWidth={2}
          dot={false}
          activeDot={{
            r: 6,
            style: { fill: color.primary, opacity: 0.5 },
          }}
          stroke={color.primary}
          opacity={0.5}
        />
        <Line
          type="monotone"
          dataKey="currentYear"
          strokeWidth={2}
          activeDot={{
            r: 8,
            style: { fill: color.primary },
          }}
          stroke={color.primary}
        />
        <Tooltip content={<TooltipContent active={true} payload={chartData.data} />} />
      </LineChart>
    </ResponsiveContainer>
  ) : (
    <AspectRatio ratio={16 / 9} className="flex items-center justify-center">
      <SpinnerIcon className="w-8 h-8 animate-spin" />
    </AspectRatio>
  );
};

const TooltipContent = ({
  active,
  payload,
}: {
  active: boolean | undefined;
  payload: Payload<ValueType, NameType>[] | undefined;
}) => {
  return active && payload?.length ? (
    <div className="rounded-lg border bg-background p-2 shadow-sm">
      <div className="grid grid-cols-2 gap-2">
        <div className="flex flex-col">
          <span className="text-xs uppercase text-muted-foreground">Last Year</span>
          <span className="font-bold text-muted-foreground">
            {(payload[0]?.value as number).toFixed(2)}
          </span>
        </div>
        <div className="flex flex-col">
          <span className="text-xs uppercase text-muted-foreground">Current Year</span>
          <span className="font-bold">{(payload[1]?.value as number).toFixed(2)}</span>
        </div>
      </div>
    </div>
  ) : null;
};
