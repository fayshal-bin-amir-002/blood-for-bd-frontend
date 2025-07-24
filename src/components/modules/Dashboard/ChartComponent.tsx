"use client";

import { LineChart, Line, XAxis, CartesianGrid } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartConfig,
} from "@/components/ui/chart";
import { IMonthlyStat } from "@/types";

const chartConfig = {
  users: {
    label: "Users",
    color: "var(--chart-1)",
  },
  donors: {
    label: "Donors",
    color: "var(--chart-2)",
  },
  donations: {
    label: "Donations",
    color: "var(--chart-3)",
  },
  galleries: {
    label: "Galleries",
    color: "var(--chart-4)",
  },
  testimonials: {
    label: "Testimonials",
    color: "var(--chart-5)",
  },
} satisfies ChartConfig;

const ChartComponent = ({ data }: { data: IMonthlyStat[] | null }) => {
  if (!data || data.length === 0) return null;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Monthly Activity Overview</CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <LineChart
            data={data}
            margin={{ left: 12, right: 12, top: 10, bottom: 5 }}
            width={800}
            height={300}
          >
            <CartesianGrid vertical={false} strokeDasharray="3 3" />
            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
            {Object.keys(chartConfig).map((key) => (
              <Line
                key={key}
                type="monotone"
                dataKey={key}
                stroke={chartConfig[key as keyof typeof chartConfig].color}
                strokeWidth={2}
                dot={false}
              />
            ))}
          </LineChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};

export default ChartComponent;
