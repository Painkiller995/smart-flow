'use client';

import { Workflow } from '@prisma/client';
import {
  CornerDownRight,
  FileTextIcon,
  GemIcon,
  ListIcon,
  MoreVerticalIcon,
  MoveRightIcon,
  PlayIcon,
  ShuffleIcon,
  TrashIcon,
} from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

import TooltipWrapper from '@/components/tooltip-wrapper';
import { Badge } from '@/components/ui/badge';
import { Button, buttonVariants } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/carousel';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { cn } from '@/lib/utils';
import { WorkflowStatus } from '@/types/workflow';
import DeleteWorkflowDialog from './delete-workflow-dialog';
import DuplicateWorkflowDialog from './duplicate-workflow-dialog';
import LastRunDetails from './last-run-detials';
import RunWorkflowButton from './run-workflow-button';
import SchedulerDialog from './scheduler-dialog';
import WebhookTriggerDialog from './webhook-trigger-dialog';

interface WorkflowCardProps {
  workflow: Workflow;
}

const statusColors = {
  [WorkflowStatus.DRAFT]: 'bg-gradient-to-r from-teal-400 via-teal-500 to-teal-600 text-teal-800',
  [WorkflowStatus.PUBLISHED]: 'bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 text-white',
};

const WorkflowCard = ({ workflow }: WorkflowCardProps) => {
  const isDraft = workflow.status === WorkflowStatus.DRAFT;
  return (
    <Card className="group/card border-separate overflow-hidden rounded-lg border shadow-sm hover:shadow-md dark:shadow-primary/30">
      <CardContent className="flex h-[100px] items-center justify-between p-4">
        <div className="flex items-center justify-end space-x-3">
          <div
            className={cn(
              'flex h-10 w-10 items-center justify-center rounded-sm',
              statusColors[workflow.status as WorkflowStatus]
            )}
          >
            {isDraft ? (
              <FileTextIcon className="h-5 w-5" />
            ) : (
              <PlayIcon className="h-5 w-5 text-white" />
            )}
          </div>
          <div>
            <h3 className="flex items-center text-base font-bold text-muted-foreground">
              <TooltipWrapper content={workflow.description}>
                <Link
                  href={`/workflow/editor/${workflow.id}`}
                  className="flex items-center hover:underline"
                >
                  {workflow.name}
                </Link>
              </TooltipWrapper>
              {isDraft && (
                <span className="text-sx ml-2 rounded-full bg-orange-100 px-2 py-0.5 font-medium text-orange-800">
                  Draft
                </span>
              )}
              <DuplicateWorkflowDialog workflowId={workflow.id} />
            </h3>
            <Carousel
              className="flex w-full max-w-xs items-center justify-center"
              opts={{
                align: 'start',
                loop: true,
              }}
            >
              <CarouselContent>
                <CarouselItem>
                  <WebhookTriggerSection
                    workflowId={workflow.id}
                    secretId={workflow.secretId || undefined}
                    isDraft={isDraft}
                    creditCost={workflow.creditsCost}
                  />
                </CarouselItem>
                <CarouselItem>
                  <ScheduleSection
                    workflowId={workflow.id}
                    isDraft={isDraft}
                    creditCost={workflow.creditsCost}
                    cron={workflow.cron}
                  />
                </CarouselItem>
              </CarouselContent>
            </Carousel>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          {!isDraft && <RunWorkflowButton workflowId={workflow.id} />}
          <Link
            href={`/workflow/editor/${workflow.id}`}
            className={cn(
              buttonVariants({ variant: 'outline', size: 'sm' }),
              'flex items-center gap-2'
            )}
          >
            <ShuffleIcon size={16} />
            Edit
          </Link>
          <WorkflowActions workflowId={workflow.id} workflowName={workflow.name} />
        </div>
      </CardContent>
      <LastRunDetails workflow={workflow} />
    </Card>
  );
};

interface WorkflowActionsProps {
  workflowId: string;
  workflowName: string;
}

function WorkflowActions({ workflowId, workflowName }: WorkflowActionsProps) {
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  return (
    <>
      <DeleteWorkflowDialog
        open={showDeleteDialog}
        setOpen={setShowDeleteDialog}
        workflowId={workflowId}
        workflowName={workflowName}
      />
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant={'outline'} size="sm">
            <TooltipWrapper content={'More actions'}>
              <div className="flex h-full w-full items-center justify-center">
                <MoreVerticalIcon size={18} />
              </div>
            </TooltipWrapper>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem className="flex items-center gap-2">
            <Link href={`/workflow/runs/${workflowId}`} className="flex items-center gap-2">
              <ListIcon size={16} /> Runs
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem
            className="flex items-center gap-2 text-destructive"
            onSelect={() => {
              setShowDeleteDialog((prev) => !prev);
            }}
          >
            <TrashIcon size={16} /> Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}

function ScheduleSection({
  workflowId,
  isDraft,
  creditCost,
  cron,
}: {
  workflowId: string;
  isDraft: boolean;
  creditCost: number;
  cron: string | null;
}) {
  if (isDraft) return null;

  return (
    <div className="flex items-center gap-2 pt-2">
      <CornerDownRight className="h-4 w-4 text-muted-foreground" />
      <SchedulerDialog key={`${cron}-${workflowId}`} workflowId={workflowId} cron={cron} />
      <MoveRightIcon className="h-4 w-4 text-muted-foreground" />
      <TooltipWrapper content="Credit consumption for full run">
        <div className="gap3 flex items-center">
          <Badge variant="outline" className="space-x-2 rounded-sm text-muted-foreground">
            <GemIcon className="h-4 w-4" />
            <span>{creditCost}</span>
          </Badge>
        </div>
      </TooltipWrapper>
    </div>
  );
}

function WebhookTriggerSection({
  workflowId,
  secretId,
  isDraft,
  creditCost,
}: {
  workflowId: string;
  secretId?: string;
  isDraft: boolean;
  creditCost: number;
}) {
  if (isDraft) return null;

  return (
    <div className="flex items-center gap-2 pt-2">
      <CornerDownRight className="h-4 w-4 text-muted-foreground" />
      <WebhookTriggerDialog key={workflowId} workflowId={workflowId} secretId={secretId} />
      <MoveRightIcon className="h-4 w-4 text-muted-foreground" />
      <TooltipWrapper content="Credit consumption for full run">
        <div className="gap3 flex items-center">
          <Badge variant="outline" className="space-x-2 rounded-sm text-muted-foreground">
            <GemIcon className="h-4 w-4" />
            <span>{creditCost}</span>
          </Badge>
        </div>
      </TooltipWrapper>
    </div>
  );
}

export default WorkflowCard;
