import { GetSecretsForUser } from '@/actions/secrets/get-secrets-for-user';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Card } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { formatDistanceToNow } from 'date-fns';
import { LockKeyholeIcon, ShieldIcon, ShieldOffIcon } from 'lucide-react';
import { Suspense } from 'react';
import CreateSecretDialog from './_components/create-secret-dialog';
import DeleteSecretDialog from './_components/delete-secret-dialog';

const SecretsPage = () => {
  return (
    <div className="flex h-full flex-1 flex-col">
      <div className="flex justify-between">
        <div className="flex flex-col">
          <h1 className="text-3xl font-bold">Secrets</h1>
          <p className="text-muted-foreground">Manage your secrets</p>
        </div>
        <CreateSecretDialog />
      </div>
      <div className="h-full space-y-8 py-6">
        <Alert>
          <ShieldIcon className="h-4 w-4 stroke-primary" />
          <AlertTitle className="text-primary">Encryption</AlertTitle>
          <AlertDescription>
            All information is securely encrypted, ensuring your data remains safe.
          </AlertDescription>
        </Alert>
        <Suspense fallback={<Skeleton className="h-[300px] w-full" />}>
          <UserSecrets />
        </Suspense>
      </div>
    </div>
  );
};

async function UserSecrets() {
  const secrets = await GetSecretsForUser();

  if (!secrets) {
    return <div>Something went wrong</div>;
  }

  if (secrets.length === 0) {
    return (
      <Card className="w-full p-4">
        <div className="flex flex-col items-center justify-center gap-4">
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-accent">
            <ShieldOffIcon size={40} className="stroke-primary" />
          </div>
          <div className="flex flex-col gap-1 text-center">
            <p className="text-bold">No secrets created yet</p>
            <p className="text-sm text-muted-foreground">
              Click the button below to create your first secret
            </p>
          </div>
          <CreateSecretDialog triggerText="Create your first secret" />
        </div>
      </Card>
    );
  }

  return (
    <div className="flex flex-wrap gap-2">
      {secrets.map((secret) => {
        const createdAt = formatDistanceToNow(secret.createdAt, { addSuffix: true });
        return (
          <Card key={secret.id} className="flex w-full justify-between p-4">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10">
                <LockKeyholeIcon size={18} className="stroke-primary" />
              </div>
              <div>
                <p className="font-bold">{secret.name}</p>
                <p className="text-xs text-muted-foreground">{createdAt}</p>
              </div>
            </div>
            <DeleteSecretDialog secretName={secret.name} />
          </Card>
        );
      })}
    </div>
  );
}

export default SecretsPage;
