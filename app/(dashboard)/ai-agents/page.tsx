import { formatDistanceToNow } from 'date-fns';
import { BotIcon, BrainIcon } from 'lucide-react';
import { Suspense } from 'react';

import { GetAgentsForUser } from '@/actions/agents/get-agents-for-user';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Card } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import CreateAgentDialog from './_components/create-agent-dialog';
import DeleteAgentDialog from './_components/delete-agent-dialog';

const AiAgentsPage = () => {
  return (
    <div className="flex h-full flex-1 flex-col">
      <div className="flex justify-between">
        <div className="flex flex-col">
          <h1 className="text-3xl font-bold">AI Agents</h1>
          <p className="text-muted-foreground">Manage your AI agents</p>
        </div>
        <CreateAgentDialog />
      </div>
      <div className="h-full space-y-8 py-6">
        <Alert>
          <BrainIcon className="h-4 w-4 stroke-primary" />
          <AlertTitle className="text-primary">AI agents</AlertTitle>
          <AlertDescription>
            Transform your custom AI agents into specialized experts, tailored to respond precisely
            to your needs.
          </AlertDescription>
        </Alert>
        <Suspense fallback={<Skeleton className="h-[300px] w-full" />}>
          <UserAgents />
        </Suspense>
      </div>
    </div>
  );
};

async function UserAgents() {
  const agents = await GetAgentsForUser();

  if (!agents) {
    return <div>Something went wrong</div>;
  }

  if (agents.length === 0) {
    return (
      <Card className="w-full p-4">
        <div className="flex flex-col items-center justify-center gap-4">
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-accent">
            <BotIcon size={40} className="stroke-primary" />
          </div>
          <div className="flex flex-col gap-1 text-center">
            <p className="text-bold">No agents created yet</p>
            <p className="text-sm text-muted-foreground">
              Click the button below to create your first agent
            </p>
          </div>
          <CreateAgentDialog triggerText="Create your first agent" />
        </div>
      </Card>
    );
  }

  return (
    <div className="flex flex-wrap gap-2">
      {agents.map((agent) => {
        const createdAt = formatDistanceToNow(agent.createdAt, { addSuffix: true });
        return (
          <Card key={agent.id} className="flex w-full justify-between p-4">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10">
                <BotIcon size={18} className="stroke-primary" />
              </div>
              <div>
                <p className="font-bold">{agent.name}</p>
                <p className="text-xs text-muted-foreground">{createdAt}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <CreateAgentDialog triggerText="Modify Agent" agent={agent} />
              <DeleteAgentDialog agentName={agent.name} />
            </div>
          </Card>
        );
      })}
    </div>
  );
}

export default AiAgentsPage;
