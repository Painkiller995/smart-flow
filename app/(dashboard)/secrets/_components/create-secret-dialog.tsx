'use client';

import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogTrigger } from '@/components/ui/dialog';

import { Loader2, ShieldEllipsis } from 'lucide-react';
import { useCallback, useState } from 'react';
import { useForm } from 'react-hook-form';

import { CreateSecret } from '@/actions/secrets/create-secret';
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
import { createSecretSchema, createSecretSchemaType } from '@/schema/secret';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';
import CustomDialogHeader from '../../workflows/_components/custom-dialog-header';

interface CreateSecretDialogProps {
  triggerText?: string;
}

const CreateSecretDialog = ({ triggerText }: CreateSecretDialogProps) => {
  const [open, setOpen] = useState(false);

  const form = useForm<createSecretSchemaType>({
    resolver: zodResolver(createSecretSchema),
    defaultValues: {
      name: '',
      value: '',
    },
  });

  const { mutate, isPending } = useMutation({
    mutationFn: CreateSecret,
    onSuccess: () => {
      toast.success('Secret created', { id: 'create-secret' });
    },
    onError: () => {
      toast.error('Failed to create the secret', { id: 'create-secret' });
    },
  });

  const onSubmit = useCallback(
    (values: createSecretSchemaType) => {
      toast.loading('Creating new secret...', { id: 'create-secret' });
      mutate(values);
      form.reset();
      setOpen(!open);
    },
    [form, mutate, open]
  );

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>{triggerText ?? 'Create secret'}</Button>
      </DialogTrigger>
      <DialogContent className="px-2">
        <CustomDialogHeader title="Create secret" icon={ShieldEllipsis} />
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
                      identify the secret
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="value"
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

export default CreateSecretDialog;
