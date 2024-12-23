'use client';

import { Tabs, TabsContent, TabsList } from '@/components/ui/tabs';
import Link from 'next/link';

const NavigationTabs = ({ workflowId }: { workflowId: string }) => {
  return (
    <Tabs className="w-[400px]">
      <TabsList className="grid w-full grid-cols-2">
        <Link href={`/workflow/editor/${workflowId}`}>Editor</Link>
        <Link href={`/workflow/runs/${workflowId}`}>Runs</Link>
      </TabsList>
      <TabsContent value="account"></TabsContent>
    </Tabs>
  );
};

export default NavigationTabs;
