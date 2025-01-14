'use client';

import { useRouter, useSearchParams } from 'next/navigation';

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Period } from '@/types/analytics';

const MONTH_NAMES = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
] as const;

interface PeriodSelectorProps {
  periods: Period[];
  selectedPeriod: Period;
}

const PeriodSelector = ({ periods, selectedPeriod }: PeriodSelectorProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  return (
    <Select
      value={`${selectedPeriod.month}-${selectedPeriod.year}`}
      onValueChange={(value) => {
        const [month, year] = value.split('-');
        const params = new URLSearchParams(searchParams);
        params.set('month', month);
        params.set('year', year);
        router.push(`?${params.toString()}`);
      }}
    >
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Select a period" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Fruits</SelectLabel>
          {periods.map((period, index) => {
            return (
              <SelectItem key={index} value={`${period.month}-${period.year}`}>
                {MONTH_NAMES[period.month]} {period.year}
              </SelectItem>
            );
          })}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

export default PeriodSelector;
