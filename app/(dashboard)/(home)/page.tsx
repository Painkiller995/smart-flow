import { GetPeriods } from '@/actions/analytics/get-periods';
import { GetStatsCardsValues } from '@/actions/analytics/get-stats-cards-values';
import { Skeleton } from '@/components/ui/skeleton';
import { Period } from '@/types/analytics';
import { Suspense } from 'react';
import PeriodSelector from './_components/period-selector';

interface HomePageProps {
  searchParams: {
    month?: string;
    year?: string;
  };
}
const HomePage = ({ searchParams }: HomePageProps) => {
  const currentDate = new Date();
  const { month, year } = searchParams;
  const period: Period = {
    month: month ? parseInt(month) : currentDate.getMonth(),
    year: year ? parseInt(year) : currentDate.getFullYear(),
  };

  return (
    <div className="flex h-full flex-1 flex-col">
      <div className="flex justify-between">
        <h1 className="text-3xl font-bold"></h1>
        <Suspense fallback={<Skeleton className="h-[40px] w-[180px]" />}>
          <PeriodSelectorWrapper selectedPeriod={period} />
        </Suspense>
      </div>
      <StatsCards selectedPeriod={period} />
    </div>
  );
};

async function PeriodSelectorWrapper({ selectedPeriod }: { selectedPeriod: Period }) {
  const periods = await GetPeriods();
  return <PeriodSelector selectedPeriod={selectedPeriod} periods={periods} />;
}

async function StatsCards({ selectedPeriod }: { selectedPeriod: Period }) {
  const data = await GetStatsCardsValues(selectedPeriod);
  return <pre>{JSON.stringify(data, null, 4)}</pre>;
}

export default HomePage;
