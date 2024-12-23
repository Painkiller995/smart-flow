import { GetAvailableCredits } from '@/actions/billing/get-available-credits';
import { cn } from '@/lib/utils';
import { useQuery } from '@tanstack/react-query';
import { CoinsIcon, Loader2Icon } from 'lucide-react';
import Link from 'next/link';
import ReactCountupWrapper from './react-countup-wrapper';
import { buttonVariants } from './ui/button';

const UserAvailableBadge = () => {
  const query = useQuery({
    queryKey: ['user-available-credits'],
    queryFn: GetAvailableCredits,
    refetchInterval: 30 * 1000,
  });

  return (
    <Link
      href={'/billing'}
      className={cn('w-full items-center space-x-2', buttonVariants({ variant: 'outline' }))}
    >
      <CoinsIcon size={20} className="text-primary" />
      <span className="font-semibold capitalize">
        {query.isLoading && <Loader2Icon className="h-4 w-4 animate-spin" />}
        {!query.isLoading && query.data && <ReactCountupWrapper value={query.data} />}
        {!query.isLoading && !query.data && '-'}
      </span>
    </Link>
  );
};

export default UserAvailableBadge;
