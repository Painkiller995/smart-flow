'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { Layers2Icon, Loader2 } from 'lucide-react';
import { useCallback, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

import { CreateWorkflow } from '@/actions/workflows/create-workflow';
import { Button } from '@/components/ui/button';
import { Drawer, DrawerContent, DrawerTrigger } from '@/components/ui/drawer';
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
import { createWorkflowSchema, createWorkflowSchemaType } from '@/schema/workflow';
import CustomDrawerHeader from './custom-drawer-header';

interface CreateWorkflowDrawerProps {
  triggerText?: string;
}

const CreateWorkflowDrawer = ({ triggerText }: CreateWorkflowDrawerProps) => {
  const [open, setOpen] = useState(false);

  const form = useForm<createWorkflowSchemaType>({
    resolver: zodResolver(createWorkflowSchema),
    defaultValues: {
      name: '',
      description: '',
    },
  });

  const { mutate, isPending } = useMutation({
    mutationFn: CreateWorkflow,
  });

  const onSubmit = useCallback(
    (values: createWorkflowSchemaType) => {
      toast.info('Creating new workflow...', { id: 'create-workflow' });
      mutate(values);
    },
    [mutate]
  );

  return (
    <Drawer
      open={open}
      onOpenChange={(open) => {
        form.reset();
        setOpen(open);
      }}
    >
      <DrawerTrigger asChild>
        <Button>{triggerText ?? 'Create workflow'}</Button>
      </DrawerTrigger>
      <DrawerContent className="px-2">
        <CustomDrawerHeader
          title="Create New Workflow"
          subTitle="Begin designing and automating your workflow"
          icon={Layers2Icon}
        />
        <div className="p-6">
          <Form {...form}>
            <form className="w-full space-y-8" onSubmit={form.handleSubmit(onSubmit)}>
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center gap-1">
                      Workflow Name:<p className="text-xs text-primary">(required)</p>
                    </FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormDescription>
                      Please choose a distinct and descriptive name for the workflow.
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
                      Description:
                      <p className="text-xs text-muted-foreground">(optional)</p>
                    </FormLabel>
                    <FormControl>
                      <Textarea className="resize-none" {...field} />
                    </FormControl>
                    <FormDescription>
                      Provide a brief description outlining the purpose of the workflow.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full" disabled={isPending}>
                {!isPending && 'Create Workflow'}
                {isPending && <Loader2 className="animate-spin" />}
              </Button>
            </form>
          </Form>
        </div>
      </DrawerContent>
    </Drawer>
  );
};

export default CreateWorkflowDrawer;
