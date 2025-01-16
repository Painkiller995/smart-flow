'use client';

import { Check, Copy } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { Label } from './ui/label';

interface ReadonlyInputWithCopyProps {
  className?: string;
  label?: string;
  value: string;
}

export function ReadonlyInputWithCopy({ className, label, value }: ReadonlyInputWithCopyProps) {
  const [isCopied, setIsCopied] = useState(false);

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(value);
      setIsCopied(true);
      toast.info('Copied to clipboard!', { id: value });
      setTimeout(() => setIsCopied(false), 1000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  return (
    <div className={cn('flex flex-col space-y-2', className)}>
      {label && <Label htmlFor="readonly-input">{label}</Label>}
      <div className="flex">
        <Input
          id="readonly-input"
          type="text"
          value={value}
          readOnly
          className="flex-grow rounded-r-none text-muted-foreground focus-visible:ring-transparent"
        />
        <Button
          type="button"
          variant="outline"
          className="rounded-l-none border-l-0"
          onClick={copyToClipboard}
          aria-label="Copy to clipboard"
        >
          {isCopied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
        </Button>
      </div>
    </div>
  );
}
