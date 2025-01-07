'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface PriceOverviewProps {
  pricingDetails: Array<{
    title: string;
    subTitle: string;
    features: string[];
    buttonTitle: string;
    buttonVariant:
      | 'link'
      | 'default'
      | 'destructive'
      | 'outline'
      | 'secondary'
      | 'ghost'
      | 'sidebarItem'
      | 'sidebarActiveItem'
      | null
      | undefined;
  }>;
}

const PriceOverview = ({ pricingDetails }: PriceOverviewProps) => {
  if (!pricingDetails) return null;

  return (
    <div className="mx-auto grid max-w-[83rem] grid-cols-1 items-center gap-4 md:grid-cols-2 xl:grid-cols-2">
      {pricingDetails.map((pricingDetail) => (
        <Card key={pricingDetail.title}>
          <CardHeader>
            <CardTitle className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white">
              {pricingDetail.title}
            </CardTitle>
            <p className="mt-6 h-24 text-sm leading-7 text-gray-600 dark:text-neutral-200 md:h-32 xl:h-24">
              {pricingDetail.subTitle}
            </p>
          </CardHeader>
          <CardContent>
            <ul
              role="list"
              className="mt-8 space-y-3 text-sm leading-6 text-gray-600 dark:text-neutral-100 sm:mt-10"
            >
              {pricingDetail.features.map((feature) => (
                <li key={feature} className="flex gap-x-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    className="h-6 w-5 flex-none text-blue-600"
                    aria-hidden="true"
                  >
                    <path
                      d="M17 3.34a10 10 0 1 1 -14.995 8.984l-.005 -.324l.005 -.324a10 10 0 0 1 14.995 -8.336zm-1.293 5.953a1 1 0 0 0 -1.32 -.083l-.094 .083l-3.293 3.292l-1.293 -1.292l-.094 -.083a1 1 0 0 0 -1.403 1.403l.083 .094l2 2l.094 .083a1 1 0 0 0 1.226 0l.094 -.083l4 -4l.083 -.094a1 1 0 0 0 -.083 -1.32z"
                      fill="currentColor"
                      stroke-width="0"
                    ></path>
                  </svg>
                  {feature}
                </li>
              ))}
            </ul>
            <Button variant={pricingDetail.buttonVariant} className="mt-8 w-full">
              {pricingDetail.buttonTitle}
            </Button>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default PriceOverview;
