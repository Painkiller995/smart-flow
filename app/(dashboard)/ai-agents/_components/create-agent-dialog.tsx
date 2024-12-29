'use client';

import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogTrigger } from '@/components/ui/dialog';

import { BotIcon, Loader2 } from 'lucide-react';
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

import { CreateAgent } from '@/actions/agents/create-agent';
import { createAgentSchema, createAgentSchemaType } from '@/schema/agent';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';
import CustomDialogHeader from '../../workflows/_components/custom-dialog-header';

interface CreateAgentDialogProps {
  triggerText?: string;
}

const CreateAgentDialog = ({ triggerText }: CreateAgentDialogProps) => {
  const [open, setOpen] = useState(false);

  const form = useForm<createAgentSchemaType>({
    resolver: zodResolver(createAgentSchema),
    defaultValues: {
      name: '',
      description: '',
      model: '',
      temperature: 1,
    },
  });

  const { mutate, isPending } = useMutation({
    mutationFn: CreateAgent,
    onSuccess: () => {
      toast.success('Agent created', { id: 'create-agent' });
    },
    onError: () => {
      toast.error('Failed to create the agent', { id: 'create-agent' });
    },
  });

  const onSubmit = useCallback(
    (values: createAgentSchemaType) => {
      toast.loading('Creating new agent...', { id: 'create-agent' });
      mutate(values);
      form.reset();
      setOpen(!open);
    },
    [form, mutate, open]
  );

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>{triggerText ?? 'Create agent'}</Button>
      </DialogTrigger>
      <DialogContent className="px-2">
        <CustomDialogHeader title="Create agent" icon={BotIcon} />
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
                      <Input {...field} />
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
