'use client';

import { GetCreditsUsageInPeriod } from '@/actions/analytics/get-credits-usage-in-period';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';
import { ChartColumnStackedIcon } from 'lucide-react';
import { Bar, BarChart, CartesianGrid, XAxis } from 'recharts';

type ChartData = Awaited<ReturnType<typeof GetCreditsUsageInPeriod>>;

interface CreditsUsageChartProps {
  title: string;
  description: string;
  data: ChartData;
}

const chartConfig = {
  success: {
    label: 'Successful phases credits',
    color: 'hsl(var(--chart-2))',
  },
  failed: {
    label: 'Failed phases credits',
    color: 'hsl(var(--chart-1))',
  },
};

const CreditsUsageChart = ({ title, description, data }: CreditsUsageChartProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-2xl font-bold">
          <ChartColumnStackedIcon className="h-6 w-6 text-primary" />
          {title}
        </CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="max-h-[200px] w-full">
          <BarChart data={data} height={200} accessibilityLayer margin={{ top: 20 }}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey={'date'}
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={32}
              tickFormatter={(value) => {
                const date = new Date(value);
                return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
              }}
            />
            <ChartLegend content={<ChartLegendContent />} />
            <ChartTooltip content={<ChartTooltipContent className="w-[250px]" />} />
            <Bar
              radius={[0, 0, 4, 4]}
              fill="var(--color-success)"
              fillOpacity={0.8}
              stroke="var(--color-success)"
              dataKey="success"
              stackId="a"
            />
            <Bar
              radius={[4, 4, 0, 0]}
              fill="var(--color-failed)"
              fillOpacity={0.8}
              stroke="var(--color-failed)"
              dataKey="failed"
              stackId="a"
            />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};

export default CreditsUsageChart;
