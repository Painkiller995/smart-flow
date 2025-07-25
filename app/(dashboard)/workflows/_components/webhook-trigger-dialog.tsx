'use client';

import { useMutation, useQuery } from '@tanstack/react-query';
import { TriangleAlertIcon, WebhookIcon } from 'lucide-react';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';

import { GetSecretsForUser } from '@/actions/secrets/get-secrets-for-user';
import { RemoveWorkflowSecret } from '@/actions/workflows/remove-workflow-secret';
import { UpdateWorkflowSecret } from '@/actions/workflows/update-workflow-secret';
import { ReadonlyInputWithCopy } from '@/components/readonly-input-with-copy';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';
import CustomDialogHeader from './custom-dialog-header';

const WebhookTriggerDialog = (props: { workflowId: string; secretId?: string }) => {
  const [webhookLink, setWebhookLink] = useState<string>('');
  const [selectedSecretId, setSelectedSecretId] = useState(props.secretId);

  const query = useQuery({
    queryKey: ['secrets-for-user'],
    queryFn: GetSecretsForUser,
    refetchInterval: 10000,
  });

  const updateSecretMutation = useMutation({
    mutationFn: UpdateWorkflowSecret,
    onSuccess: () => {
      toast.success('Webhook secret updated successfully', { id: 'webhook-trigger' });
    },
    onError: () => {
      toast.error('An error occurred while updating the secret', { id: 'webhook-trigger' });
    },
  });

  const removeSecretMutation = useMutation({
    mutationFn: RemoveWorkflowSecret,
    onSuccess: () => {
      toast.success('Webhook secret removed successfully', { id: 'webhook-trigger' });
    },
    onError: () => {
      toast.error('An error occurred while removing the secret', { id: 'webhook-trigger' });
    },
  });

  const currentSecretName = query.data?.find((secret) => secret.id === props.secretId)?.name;

  useEffect(() => {
    const hostname = process.env.NEXT_PUBLIC_APP_URL || '';
    const link = `${hostname}/api/workflows/webhook?workflowId=${props.workflowId}`;
    setWebhookLink(link);
  }, [props.workflowId]);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="link"
          size="sm"
          className={cn('h-auto p-0 text-sm text-orange-500', currentSecretName && 'text-primary')}
        >
          {currentSecretName && (
            <div className="flex items-center gap-1">
              <WebhookIcon /> {currentSecretName}
            </div>
          )}
          {!currentSecretName && (
            <div className="flex items-center gap-1">
              <TriangleAlertIcon className="h-3 w-3" /> Set Webhook Secret
            </div>
          )}
        </Button>
      </DialogTrigger>
      <DialogContent className="px-0">
        <CustomDialogHeader title="Manage Webhook Secret" icon={WebhookIcon} />
        <div className="space-y-5 p-6">
          {query.data?.length === 0 ? (
            <p className="text-sm text-muted-foreground">
              Navigate to the secrets page to generate and add a new secret token. This token will
              serve as a secure credential for authenticating your webhook requests. Ensure you
              store the token securely and use it in the{' '}
              <strong className="text-bold">Authorization</strong> header to protect your workflow
              from unauthorized access.
            </p>
          ) : (
            <>
              <p className="text-sm text-muted-foreground">
                To secure your webhook trigger, provide the webhook secret. Keep it private and only
                share it with trusted services.
              </p>
              <Select
                defaultValue={selectedSecretId}
                onValueChange={(value) => setSelectedSecretId(value)}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select an option" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Secrets</SelectLabel>
                    {query.data?.map((secret) => {
                      return (
                        <SelectItem key={secret.id} value={secret.id}>
                          {secret.name}
                        </SelectItem>
                      );
                    })}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </>
          )}

          {props.secretId && (
            <DialogClose asChild>
              <div className="px-8">
                <Button
                  variant="outline"
                  className="w-full border-destructive text-destructive hover:text-destructive"
                  disabled={removeSecretMutation.isPending || updateSecretMutation.isPending}
                  onClick={() => {
                    toast.loading('Removing secret...', { id: 'webhook-trigger' });
                    setSelectedSecretId(undefined);
                    removeSecretMutation.mutate({
                      id: props.workflowId,
                    });
                  }}
                >
                  Remove current secret
                </Button>
              </div>
            </DialogClose>
          )}
          {selectedSecretId && (
            <>
              <Separator className="my-4" />
              <div className="flex w-full flex-col space-y-1">
                <p className="text-sm text-muted-foreground">
                  Use the webhook URL below to securely trigger the workflow.
                </p>
                <p className="text-sm text-muted-foreground">
                  To authenticate your request, include the <strong> Authorization</strong> header
                  with your Bearer token. Ensure the token is kept confidential and shared only with
                  trusted parties.
                </p>
                <ReadonlyInputWithCopy className="pt-2" value={webhookLink} />
              </div>
            </>
          )}
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
              disabled={
                updateSecretMutation.isPending ||
                removeSecretMutation.isPending ||
                !selectedSecretId
              }
              onClick={() => {
                if (!selectedSecretId) {
                  toast.error('Please select secret first...', { id: 'webhook-trigger' });
                  return;
                }
                toast.loading('Saving...', { id: 'webhook-trigger' });
                updateSecretMutation.mutate({
                  id: props.workflowId,
                  secretId: selectedSecretId,
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

export default WebhookTriggerDialog;
