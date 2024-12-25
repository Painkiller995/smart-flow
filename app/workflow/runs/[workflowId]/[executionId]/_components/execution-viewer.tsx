'use client';

import { GetWorkflowExecutionWithPhases } from '@/actions/workflows/get-workflow-execution-with-phases';
import { GetWorkflowPhaseDetails } from '@/actions/workflows/get-workflow-phase-details';
import ReactCountupWrapper from '@/components/react-countup-wrapper';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { DatesToDurationString } from '@/lib/helper/dates';
import { GetPhasesTotalCost } from '@/lib/helper/phases';
import { cn } from '@/lib/utils';
import { LogLevel } from '@/types/log';
import { ExecutionPhaseStatus, WorkflowExecutionStatus } from '@/types/workflow';
import { ExecutionLog } from '@prisma/client';
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
import { ReactNode, useEffect, useState } from 'react';
import PhaseStatusBadge from './phase-status-badge';
import WorkflowStatusBadge from './workflow-status-badge';

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
    queryKey: ['phaseDetails', selectedPhase, query.data?.status],
    enabled: selectedPhase !== null,
    queryFn: () => GetWorkflowPhaseDetails(selectedPhase!),
  });

  const isRunning = query.data?.status === WorkflowExecutionStatus.RUNNING;

  const duration = DatesToDurationString(query.data?.completedAt, query.data?.startedAt);

  const creditsConsumed = GetPhasesTotalCost(query.data?.phases || []);

  useEffect(() => {
    const phases = query.data?.phases || [];
    if (isRunning) {
      const phaseToSelect = phases.toSorted((a, b) => (a.startedAt! > b.startedAt! ? -1 : 1))[0];
      setSelectedPhase(phaseToSelect.id);
      return;
    }
    const phaseToSelect = phases.toSorted((a, b) => (a.completedAt! > b.completedAt! ? -1 : 1))[0];
    setSelectedPhase(phaseToSelect.id);
  }, [isRunning, query.data?.phases]);

  return (
    <div className="flex h-full w-full">
      <aside className="flex w-[440px] min-w-[440px] max-w-[440px] flex-grow border-separate flex-col overflow-hidden border-r-2">
        <div className="px-2 py-4">
          <ExecutionLabel
            label="Status"
            icon={CircleDashedIcon}
            value={
              <div className="flex items-center gap-2 font-semibold capitalize">
                <WorkflowStatusBadge status={query.data?.status as WorkflowExecutionStatus} />
                <span>{query.data?.status}</span>
              </div>
            }
          />
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
          <ExecutionLabel
            label="Credits consumed"
            icon={CoinsIcon}
            value={<ReactCountupWrapper value={creditsConsumed} />}
          />
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
                <PhaseStatusBadge status={phase.status as ExecutionPhaseStatus} />
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
                <span>{phaseDetails.data.creditsConsumed}</span>
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
            <ParameterViewer
              title="Outputs"
              subtitle="Outputs generated by this phase"
              paramsJson={phaseDetails.data.outputs}
            />
            <LogViewer logs={phaseDetails.data.logs} />
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
  const params = paramsJson ? JSON.parse(paramsJson) : undefined;
  return (
    <Card>
      <CardHeader className="rounded-lg rounded-b-none border-b bg-gray-50 py-4 dark:bg-background">
        <CardTitle className="text-base">{title}</CardTitle>
        <CardDescription className="text-sm text-muted-foreground">{subtitle}</CardDescription>
      </CardHeader>
      <CardContent className="py-4">
        <div className="flex flex-col gap-2">
          {(!params || Object.keys(params).length === 0) && (
            <p className="text-sm">No parameter generated by this phase</p>
          )}
        </div>
        {params &&
          Object.entries(params).map(([key, value]) => {
            return (
              <div key={key} className="flex items-center justify-between space-y-1">
                <p className="flex-1 basis-1/3 text-sm text-muted-foreground">{key}</p>
                <Input readOnly className="flex-1 basis-2/3" value={value as string} />
              </div>
            );
          })}
      </CardContent>
    </Card>
  );
}

function LogViewer({ logs }: { logs: ExecutionLog[] | undefined }) {
  if (!logs || logs.length === 0) return null;

  return (
    <Card className="w-full">
      <CardHeader className="rounded-lg rounded-b-none border-b bg-gray-50 py-4 dark:bg-background">
        <CardTitle className="text-base">Logs</CardTitle>
        <CardDescription className="text-sm text-muted-foreground">
          logs generated by this phase
        </CardDescription>
      </CardHeader>
      <CardContent className="p-0">
        <Table className="text-sm text-muted-foreground">
          <TableHeader>
            <TableRow>
              <TableHead>Time</TableHead>
              <TableHead>Level</TableHead>
              <TableHead>Message</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {logs.map((log) => (
              <TableRow key={log.id} className="text-muted-foreground">
                <TableCell width={190} className="p-[2px] pl-4 text-xs text-muted-foreground">
                  {log.timestamp.toISOString()}
                </TableCell>
                <TableCell
                  width={80}
                  className={cn(
                    'p-[3px] pl-4 text-xs font-bold uppercase',
                    (log.logLevel as LogLevel) === 'error' && 'text-destructive',
                    (log.logLevel as LogLevel) === 'info' && 'text-primary'
                  )}
                >
                  {log.logLevel}
                </TableCell>
                <TableCell className="flex-1 p-[3px] pl-4 text-sm">{log.message}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}

export default ExecutionViewer;
