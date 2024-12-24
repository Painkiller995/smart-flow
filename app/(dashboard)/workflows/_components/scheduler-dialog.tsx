'use client';

import { UpdateWorkflowCron } from '@/actions/workflows/update-workflow-cron';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { useMutation } from '@tanstack/react-query';
import parser from 'cron-parser';
import cronstrue from 'cronstrue';
import { CalendarIcon, ClockIcon, TriangleAlertIcon } from 'lucide-react';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import CustomDialogHeader from './custom-dialog-header';

const SchedulerDialog = (props: { workflowId: string; cron: string | null }) => {
  const [cron, setCron] = useState(props.cron || '');
  const [validCron, setValidCron] = useState(false);
  const [readableCron, setReadableCron] = useState('');

  const mutation = useMutation({
    mutationFn: UpdateWorkflowCron,
    onSuccess: () => {
      toast.success('Schedule updated successfully', { id: 'cron' });
    },
    onError: () => {
      toast.error('Something went wrong', { id: 'cron' });
    },
  });

  useEffect(() => {
    if (cron) {
      try {
        parser.parseExpression(cron);
        const humanCronStr = cronstrue.toString(cron);
        setReadableCron(humanCronStr);
        setValidCron(true);
      } catch (error) {
        setValidCron(false);
        setReadableCron('');
      }
    } else {
      setValidCron(false);
      setReadableCron('');
    }
  }, [cron]);

  const workflowHasValidCron = props.cron && props.cron.length > 0;
  const readableSavedCron = workflowHasValidCron && cronstrue.toString(props.cron!);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="link"
          size="sm"
          className={cn(
            'h-auto p-0 text-sm text-orange-500',
            workflowHasValidCron && 'text-primary'
          )}
        >
          {readableSavedCron && (
            <div className="flex items-center gap-1">
              <ClockIcon /> {readableSavedCron}
            </div>
          )}
          {!readableSavedCron && (
            <div className="flex items-center gap-1">
              <TriangleAlertIcon className="h-3 w-3" /> Set schedule
            </div>
          )}
        </Button>
      </DialogTrigger>
      <DialogContent className="px-0">
        <CustomDialogHeader title="Schedule workflow execution" icon={CalendarIcon} />
        <div className="space-y-4 p-6">
          <p className="text-sm text-muted-foreground">
            Specify a cron expression to schedule periodic workflow execution. All times are in UTC
          </p>
          <Input
            placeholder="E.g. * * * * *"
            value={cron}
            onChange={(e) => {
              setCron(e.target.value);
            }}
          />
          <div
            className={cn(
              'rounded-md border border-destructive bg-accent p-4 text-sm text-destructive',
              validCron && 'border-primary text-primary'
            )}
          >
            {validCron ? readableCron : 'Not a valid cron expression'}
          </div>
        </div>
        <DialogFooter className="gap-2 px-6">
          <DialogClose asChild>
            <Button className="w-full" variant="secondary">
              Cancel
            </Button>
          </DialogClose>
          <DialogClose asChild>
            <Button
              className="w-full"
              disabled={mutation.isPending || !validCron}
              onClick={() => {
                toast.loading('Saving...', { id: 'cron' });
                mutation.mutate({
                  id: props.workflowId,
                  cron,
                });
              }}
            >
              Save
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default SchedulerDialog;
