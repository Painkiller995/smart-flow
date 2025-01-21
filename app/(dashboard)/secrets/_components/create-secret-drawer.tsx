'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { Loader2, ShieldEllipsis } from 'lucide-react';
import { useCallback, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

import { CreateSecret } from '@/actions/secrets/create-secret';
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
import { createSecretSchema, createSecretSchemaType } from '@/schema/secret';
import CustomDrawerHeader from '../../workflows/_components/custom-drawer-header';

interface CreateSecretDrawerProps {
  triggerText?: string;
}

const CreateSecretDrawer = ({ triggerText }: CreateSecretDrawerProps) => {
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
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button>{triggerText ?? 'Create secret'}</Button>
      </DrawerTrigger>
      <DrawerContent className="px-2">
        <CustomDrawerHeader title="Create secret" icon={ShieldEllipsis} />
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
                      Provide a unique and descriptive name for the secret. This name will help you
                      identify it later.
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
                    <FormDescription>
                      Enter the secret token. It will be securely encrypted and stored. Note: You
                      won&apos;t be able to view this value after proceeding.
                    </FormDescription>
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
      </DrawerContent>
    </Drawer>
  );
};

export default CreateSecretDrawer;
