'use client';

import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogTrigger } from '@/components/ui/dialog';

import { BotIcon, FilePlusIcon, Loader2, PencilIcon } from 'lucide-react';
import { useCallback, useState } from 'react';
import { useForm } from 'react-hook-form';

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

import { CreateOrUpdateAgent } from '@/actions/agents/create-or-update-agent';
import { GetAgentsForUser } from '@/actions/agents/get-agents-for-user';
import { createAgentSchema, createAgentSchemaType } from '@/schema/agent';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';
import CustomDialogHeader from '../../workflows/_components/custom-dialog-header';

type Agent = Awaited<ReturnType<typeof GetAgentsForUser>>[0];

interface CreateAgentDialogProps {
  agent?: Agent;
  triggerText?: string;
}

const CreateAgentDialog = ({ agent, triggerText }: CreateAgentDialogProps) => {
  const [open, setOpen] = useState(false);

  const form = useForm<createAgentSchemaType>({
    resolver: zodResolver(createAgentSchema),
    defaultValues: {
      id: agent && agent.id,
      name: agent ? agent.name : '',
      description: agent ? agent.description : '',
      model: agent ? agent.model : '',
      temperature: agent ? agent.temperature : 1,
    },
  });

  const { mutate, isPending } = useMutation({
    mutationFn: CreateOrUpdateAgent,
    onSuccess: () => {
      toast.success(`Agent ${agent ? 'updated' : 'created'} successfully`, {
        id: 'create-agent',
      });
    },
    onError: () => {
      toast.error(`Failed to ${agent ? 'update' : 'create'} the agent`, {
        id: 'create-agent',
      });
    },
  });

  const onSubmit = useCallback(
    (values: createAgentSchemaType) => {
      toast.loading('Creating or updating agent...', { id: 'create-agent' });
      mutate(values);
      form.reset();
      setOpen(!open);
    },
    [form, mutate, open]
  );

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant={'outline'}>
          {agent ? <PencilIcon /> : <FilePlusIcon />}
          {triggerText ?? 'Create agent'}
        </Button>
      </DialogTrigger>
      <DialogContent className="px-2">
        <CustomDialogHeader title={triggerText ?? 'Create agent'} icon={BotIcon} />
        <div className="p-6">
          <Form {...form}>
            <form className="w-full space-y-8" onSubmit={form.handleSubmit(onSubmit)}>
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center gap-1">
                      Name:<p className="text-xs text-primary">(required)</p>
                    </FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormDescription>
                      Choose a descriptive and unique name, <br /> This name will be used to
                      identify the agent
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center gap-1">
                      Value:
                      <p className="text-xs text-primary">(required)</p>
                    </FormLabel>
                    <FormControl>
                      <Textarea className="resize-none" {...field} />
                    </FormControl>
                    <FormDescription>Provide description</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="model"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center gap-1">
                      Model:<p className="text-xs text-primary">(required)</p>
                    </FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormDescription>
                      Choose a descriptive and unique name, <br /> This name will be used to
                      identify the agent
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="temperature"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center gap-1">
                      Value:
                      <p className="text-xs text-primary">(required)</p>
                    </FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type="number"
                        className="[&::-webkit-inner-spin-button]:appearance-none"
                        onKeyDown={(e) => {
                          if (e.key === '-' || e.key === 'e') {
                            e.preventDefault();
                          }
                        }}
                      />
                    </FormControl>
                    <FormDescription>Provide description</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full" disabled={isPending}>
                {!isPending && 'Proceed'}
                {isPending && <Loader2 className="animate-spin" />}
              </Button>
            </form>
          </Form>
        </div>
        <DialogDescription>Write something here</DialogDescription>
      </DialogContent>
    </Dialog>
  );
};

export default CreateAgentDialog;
