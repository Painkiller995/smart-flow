'use client';

import { GetWorkflowExecutionWithPhases } from '@/actions/workflows/get-workflow-execution-with-phases';
import { GetWorkflowPhaseDetails } from '@/actions/workflows/get-workflow-phase-details';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { DatesToDurationString } from '@/lib/helper/dates';
import { GetPhasesTotalCost } from '@/lib/helper/phases';
import { WorkflowExecutionStatus } from '@/types/workflow';
import { useQuery } from '@tanstack/react-query';
import { formatDistanceToNow } from 'date-fns';
import {
  CalendarIcon,
  CircleDashedIcon,
  ClockIcon,
  CoinsIcon,
  Loader2Icon,
  LucideIcon,
  WorkflowIcon,
} from 'lucide-react';
import { ReactNode, useState } from 'react';
type ExecutionData = Awaited<ReturnType<typeof GetWorkflowExecutionWithPhases>>;

interface ExecutionViewerProps {
  initialData: ExecutionData;
}

const ExecutionViewer = ({ initialData }: ExecutionViewerProps) => {
  const [selectedPhase, setSelectedPhase] = useState<string | null>(null);

  const query = useQuery({
    queryKey: ['execution', initialData?.id],
    initialData,
    queryFn: () => GetWorkflowExecutionWithPhases(initialData!.id),
    refetchInterval: (q) =>
      q.state.data?.status === WorkflowExecutionStatus.RUNNING ? 1000 : false,
  });

  const phaseDetails = useQuery({
    queryKey: ['phaseDetails', selectedPhase],
    enabled: selectedPhase !== null,
    queryFn: () => GetWorkflowPhaseDetails(selectedPhase!),
  });

  const isRunning = query.data?.status === WorkflowExecutionStatus.RUNNING;

  const duration = DatesToDurationString(query.data?.completedAt, query.data?.startedAt);

  const creditsConsumed = GetPhasesTotalCost(query.data?.phases || []);

  return (
    <div className="flex h-full w-full">
      <aside className="flex w-[440px] min-w-[440px] max-w-[440px] flex-grow border-separate flex-col overflow-hidden border-r-2">
        <div className="px-2 py-4">
          <ExecutionLabel label="Status" icon={CircleDashedIcon} value={query.data?.status} />
          <ExecutionLabel
            label="Started at"
            icon={CalendarIcon}
            value={
              <span className="lowercase">
                {query.data?.startedAt
                  ? formatDistanceToNow(new Date(query.data?.startedAt), { addSuffix: true })
                  : '-'}
              </span>
            }
          />
          <ExecutionLabel
            label="Duration"
            icon={ClockIcon}
            value={duration ? duration : <Loader2Icon className="animate-spin" size={20} />}
          />
          <ExecutionLabel label="Credits consumed" icon={CoinsIcon} value={creditsConsumed} />
        </div>
        <Separator />
        <div className="flex items-center justify-center px-4 py-2">
          <div className="flex items-center gap-2 text-muted-foreground">
            <WorkflowIcon size={20} className="stroke-muted-foreground/80" />
            <span className="font-semibold">Phases</span>
          </div>
        </div>
        <Separator />
        <div className="h-full overflow-auto px-2 py-4">
          {query.data?.phases.map((phase, index) => {
            return (
              <Button
                variant={selectedPhase === phase.id ? 'secondary' : 'ghost'}
                key={phase.id}
                className="w-full justify-between"
                onClick={() => {
                  if (isRunning) return;
                  setSelectedPhase(phase.id);
                }}
              >
                <div className="flex items-center gap-2">
                  <Badge variant="outline">{index + 1}</Badge>
                  <p className="font-semibold">{phase.name}</p>
                </div>
                <p className="text-xs text-muted-foreground">{phase.status}</p>
              </Button>
            );
          })}
        </div>
      </aside>
      <div className="flex h-full w-full">
        {isRunning && (
          <div className="flex h-full w-full flex-col items-center justify-center gap-2">
            <p className="font-bold">Run in progress, Please wait</p>
          </div>
        )}
        {!isRunning && !selectedPhase && (
          <div className="flex h-full w-full flex-col items-center justify-center gap-2">
            <div className="flex flex-col gap-1 text-center">
              <p className="font-bold">No phase selected</p>
              <p className="text-sm text-muted-foreground">Select a phase to view details</p>
            </div>
          </div>
        )}
        {!isRunning && selectedPhase && phaseDetails.data && (
          <div className="container flex flex-col gap-4 overflow-auto py-4">
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="space-x-4">
                <div className="flex items-center gap-1">
                  <CoinsIcon size={18} className="stroke-muted-foreground" />
                  <span>Credits</span>
                </div>
                <span>Todo</span>
              </Badge>
              <Badge variant="outline" className="space-x-4">
                <div className="flex items-center gap-1">
                  <ClockIcon size={18} className="stroke-muted-foreground" />
                  <span>Duration</span>
                </div>
                <span>
                  {DatesToDurationString(
                    phaseDetails.data.completedAt,
                    phaseDetails.data.startedAt
                  ) || '-'}
                </span>
              </Badge>
            </div>
            <ParameterViewer
              title="Inputs"
              subtitle="Inputs used for this phase"
              paramsJson={phaseDetails.data.inputs}
            />
          </div>
        )}
      </div>
    </div>
  );
};

function ExecutionLabel({
  icon,
  label,
  value,
}: {
  icon: LucideIcon;
  label: ReactNode;
  value: ReactNode;
}) {
  const Icon = icon;
  return (
    <div className="flex items-center justify-between px-4 py-2 text-sm">
      <div className="flex items-center gap-2 text-muted-foreground">
        <Icon size={20} className="stroke-muted-foreground/80" />
        <span>{label}</span>
      </div>
      <div className="flex items-center gap-2 font-semibold capitalize">{value}</div>
    </div>
  );
}

function ParameterViewer({
  title,
  subtitle,
  paramsJson,
}: {
  title: string;
  subtitle: string;
  paramsJson: string | null;
}) {
  const param = paramsJson ? JSON.parse(paramsJson) : undefined;
  return (
    <Card>
      <CardHeader className="rounded-lg rounded-b-none border-b bg-gray-50 py-4 dark:bg-background">
        <CardTitle className="text-base">{title}</CardTitle>
        <CardDescription className="text-sm text-muted-foreground">{subtitle}</CardDescription>
      </CardHeader>
    </Card>
  );
}

export default ExecutionViewer;
