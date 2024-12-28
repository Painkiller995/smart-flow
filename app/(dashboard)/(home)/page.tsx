import { GetPeriods } from '@/actions/analytics/get-periods';
import { Suspense } from 'react';
import PeriodSelector from './_components/period-selector';

interface HomePageProps {
  searchParams: {
    month?: string;
    year?: string;
  };
}
const HomePage = ({ searchParams }: HomePageProps) => {
  return (
    <div>
      <Suspense>
        <PeriodSelectorWrapper />
      </Suspense>
    </div>
  );
};

async function PeriodSelectorWrapper() {
  const periods = await GetPeriods();
  return <PeriodSelector periods={periods} />;
}
export default HomePage;
