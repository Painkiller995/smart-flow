import { GetCreditsUsageInPeriod } from '@/actions/analytics/get-credits-usage-in-period';
import { GetPeriods } from '@/actions/analytics/get-periods';
import { GetStatsCardsValues } from '@/actions/analytics/get-stats-cards-values';
import { GetWorkflowExecutionStats } from '@/actions/analytics/get-workflow-execution-stats';
import { Skeleton } from '@/components/ui/skeleton';
import { Period } from '@/types/analytics';
import { CirclePlayIcon, CoinsIcon, WaypointsIcon } from 'lucide-react';
import { Suspense } from 'react';
import CreditsUsageChart from '../billing/_components/credits-usage-chart';
import ExecutionStatusChart from './_components/execution-status-chart';
import PeriodSelector from './_components/period-selector';
import StatsCard from './_components/stats-card';

interface AnalyticsPageProps {
  searchParams: Promise<{
    month?: string;
    year?: string;
  }>;
}

const AnalyticsPage = async ({ searchParams }: AnalyticsPageProps) => {
  const currentDate = new Date();

  const { month, year } = await searchParams;

  const period: Period = {
    month: month ? parseInt(month, 10) : currentDate.getMonth(),
    year: year ? parseInt(year, 10) : currentDate.getFullYear(),
  };

  return (
    <div className="flex h-full flex-1 flex-col">
      <div className="flex justify-between">
        <h1 className="text-3xl font-bold"></h1>
        <Suspense fallback={<Skeleton className="h-[40px] w-[180px]" />}>
          <PeriodSelectorWrapper selectedPeriod={period} />
        </Suspense>
      </div>
      <div className="flex h-full flex-col gap-4 py-6">
        <Suspense fallback={<StatsCardsSkeleton />}>
          <StatsCards selectedPeriod={period} />
        </Suspense>
        <Suspense fallback={<Skeleton className="h-[300px] w-full" />}>
          <StatsExecutionStatus selectedPeriod={period} />
        </Suspense>
        <Suspense fallback={<Skeleton className="h-[300px] w-full" />}>
          <CreditsUsageInPeriod selectedPeriod={period} />
        </Suspense>
      </div>
    </div>
  );
};

async function PeriodSelectorWrapper({ selectedPeriod }: { selectedPeriod: Period }) {
  const periods = await GetPeriods();
  return <PeriodSelector selectedPeriod={selectedPeriod} periods={periods} />;
}

async function StatsCards({ selectedPeriod }: { selectedPeriod: Period }) {
  const data = await GetStatsCardsValues(selectedPeriod);
  return (
    <div className="min-h-[120px]: grid gap-3 lg:grid-cols-3 lg:gap-8">
      <StatsCard title="Workflow executions" value={data.workflowExecution} icon={CirclePlayIcon} />
      <StatsCard title="Phase executions" value={data.phaseExecutions} icon={WaypointsIcon} />
      <StatsCard title="Credits consumed" value={data.creditsConsumed} icon={CoinsIcon} />
    </div>
  );
}

function StatsCardsSkeleton() {
  return (
    <div className="grid gap-3 lg:grid-cols-3 lg:gap-8">
      {[1, 2, 3].map((i) => (
        <Skeleton key={i} className="min-h-[120px] w-full" />
      ))}
    </div>
  );
}

async function StatsExecutionStatus({ selectedPeriod }: { selectedPeriod: Period }) {
  const data = await GetWorkflowExecutionStats(selectedPeriod);
  return <ExecutionStatusChart data={data} />;
}

async function CreditsUsageInPeriod({ selectedPeriod }: { selectedPeriod: Period }) {
  const data = await GetCreditsUsageInPeriod(selectedPeriod);
  return (
    <CreditsUsageChart
      data={data}
      title="Daily credits spent"
      description="Daily credit consumed in selected period"
    />
  );
}

export default AnalyticsPage;
