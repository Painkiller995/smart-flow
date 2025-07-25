'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const NavigationTabs = ({ workflowId }: { workflowId: string }) => {
  const pathname = usePathname();
  const activeValue = pathname?.split('/')[2];
  return (
    <Tabs value={activeValue} className="hidden w-[400px] md:block">
      <TabsList className="grid w-full grid-cols-2">
        <Link href={`/workflow/editor/${workflowId}`}>
          <TabsTrigger value="editor" className="w-full">
            Editor
          </TabsTrigger>
        </Link>
        <Link href={`/workflow/runs/${workflowId}`}>
          <TabsTrigger value="runs" className="w-full">
            Runs
          </TabsTrigger>
        </Link>
      </TabsList>
      <TabsContent value="account"></TabsContent>
    </Tabs>
  );
};

export default NavigationTabs;
