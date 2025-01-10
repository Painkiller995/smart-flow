'use client';

import { DownloadInvoice } from '@/actions/credits/download-invoice';
import { Button } from '@/components/ui/button';
import { useMutation } from '@tanstack/react-query';
import { Loader2Icon } from 'lucide-react';
import { toast } from 'sonner';

const InvoiceButton = ({ id }: { id: string }) => {
  const mutation = useMutation({
    mutationFn: DownloadInvoice,
    onSuccess: (data) => {
      toast.success('Your invoice downloaded successfully', { id: 'download-invoice' });
      window.location.href = data as string;
    },
    onError: () => {
      toast.error('Failed to download the invoice', { id: 'download-invoice' });
    },
  });

  return (
    <Button
      className="gap-2 text-xs text-muted-foreground"
      variant="ghost"
      size="sm"
      disabled={mutation.isPending}
      onClick={() => {
        toast.loading('Downloading invoice', { id: 'download-invoice' });
        mutation.mutate(id);
      }}
    >
      Invoice
      {mutation.isPending && <Loader2Icon className="h-4 w-4 animate-spin" />}
    </Button>
  );
};

export default InvoiceButton;
