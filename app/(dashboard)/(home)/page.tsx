import { GetPeriods } from '@/actions/analytics/get-periods';
import { Suspense } from 'react';
import PeriodSelector from './_components/period-selector';

const HomePage = () => {
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
