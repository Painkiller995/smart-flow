'use client';

import UseExecutionPlan from '@/components/hooks/use-execution-plan';
import { Button } from '@/components/ui/button';
import { PlayIcon } from 'lucide-react';

interface ExecuteButtonProps {
  workflowId: string;
}
const ExecuteButton = ({ workflowId }: ExecuteButtonProps) => {
  const generate = UseExecutionPlan();
  return (
    <Button
      variant="outline"
      className="flex items-center gap-2"
      onClick={() => {
        const plan = generate();
        console.log('---Plan---');
        console.log(plan);
      }}
    >
      <PlayIcon size={16} className="stroke-orange-400" />
      Execute
    </Button>
  );
};

export default ExecuteButton;
