'use client';

import { cn } from '@/lib/utils';
import { WorkflowIcon } from 'lucide-react';
import Link from 'next/link';

interface LogoProps {
  fontSize?: string;
  iconSize?: number;
}
const Logo = ({ fontSize = 'text-2xl', iconSize = 20 }: LogoProps) => {
  return (
    <Link href="/" className={cn('flex items-center gap-2 text-2xl font-extrabold', fontSize)}>
      <div className="rounded-xl bg-gradient-to-r from-blue-500 to-blue-600 p-2">
        <WorkflowIcon size={iconSize} className="stroke-white" />
      </div>
      <div>
        <span className="bg-gradient-to-r from-blue-500 to-blue-600 bg-clip-text text-transparent">
          Smart
        </span>
        <span className="text-stone-700 dark:text-stone-300">Flow</span>
      </div>
    </Link>
  );
};

export default Logo;
