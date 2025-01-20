import { useQuery } from '@tanstack/react-query';
import { GemIcon, Loader2Icon } from 'lucide-react';
import Link from 'next/link';

import { GetAvailableCredits } from '@/actions/credits/get-available-credits';
import { cn } from '@/lib/utils';
import ReactCountupWrapper from './react-countup-wrapper';
import { buttonVariants } from './ui/button';

interface UserAvailableBadgeProps {
  hideIcon?: boolean;
}

const UserAvailableBadge = ({ hideIcon }: UserAvailableBadgeProps) => {
  const query = useQuery({
    queryKey: ['user-available-credits'],
    queryFn: GetAvailableCredits,
    refetchInterval: 30 * 1000,
  });

  return (
    <div className="px-2">
      <Link
        href={'/credits'}
        className={cn('w-full items-center space-x-2', buttonVariants({ variant: 'outline' }))}
      >
        {!hideIcon && <GemIcon size={20} className="text-primary" />}
        <span className="font-semibold capitalize">
          {query.isLoading && <Loader2Icon className="h-4 w-4 animate-spin" />}
          {!query.isLoading && query.data && <ReactCountupWrapper value={query.data} />}
          {!query.isLoading && query.data === undefined && '-'}
        </span>
      </Link>
    </div>
  );
};

export default UserAvailableBadge;
