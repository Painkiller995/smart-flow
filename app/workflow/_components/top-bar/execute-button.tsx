'use client';

import { Button } from '@/components/ui/button';
import { PlayIcon } from 'lucide-react';

interface ExecuteButtonProps {
  workflowId: string;
}
const ExecuteButton = ({ workflowId }: ExecuteButtonProps) => {
  return (
    <Button variant="outline" className="flex items-center gap-2" onClick={() => {}}>
      <PlayIcon size={16} className="stroke-orange-400" />
      Execute
    </Button>
  );
};

export default ExecuteButton;
