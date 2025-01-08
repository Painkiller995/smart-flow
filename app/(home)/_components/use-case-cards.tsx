'use client';

import { HoverEffect } from '@/components/ui/card-hover-effect';

export function UseCaseCards({
  useCaseCards,
}: {
  useCaseCards: {
    title: string;
    description: string;
  }[];
}) {
  return (
    <div className="mx-auto max-w-5xl px-8">
      <HoverEffect items={useCaseCards} />
    </div>
  );
}
