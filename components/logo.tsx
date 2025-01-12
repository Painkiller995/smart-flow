'use client';

import LogoIcon from '@/app/assets/logo';
import { cn } from '@/lib/utils';
import Link from 'next/link';
interface LogoProps {
  fontSize?: string;
  iconSize?: number;
  hideText?: boolean;
}
const Logo = ({ fontSize = 'text-2xl', iconSize = 35, hideText = false }: LogoProps) => {
  return (
    <Link href="/" className={cn('flex items-center gap-2 text-2xl font-extrabold', fontSize)}>
      <div className="rounded-xl bg-gradient-to-r from-blue-500 to-blue-600 p-2">
        <LogoIcon width={iconSize.toString() || '35'} height={iconSize.toString() || '35'} />
      </div>
      {!hideText && (
        <div>
          <span className="text-stone-700 dark:text-stone-300">SmartFlow</span>
        </div>
      )}
    </Link>
  );
};

export default Logo;
