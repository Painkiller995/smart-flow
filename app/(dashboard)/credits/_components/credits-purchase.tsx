'use client';
import { useMutation } from '@tanstack/react-query';
import { CreditCard, GemIcon } from 'lucide-react';
import { useState } from 'react';

import { PurchaseCredits } from '@/actions/credits/purchase-credits';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { CreditsPack, PackId } from '@/types/credits';

const CreditsPurchase = () => {
  const [selectedPack, setSelectedPack] = useState(PackId.MEDIUM);

  const mutation = useMutation({
    mutationFn: PurchaseCredits,
    onSuccess: () => {
      //   toast.success('Secret created', { id: 'create-secret' });
    },
    onError: () => {
      //  toast.error('Failed to create the secret', { id: 'create-secret' });
    },
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-2xl font-bold">
          <GemIcon className="h-6 w-6 text-primary" />
          Purchase Credits
        </CardTitle>
        <CardDescription>Select the number of credits you want to purchase</CardDescription>
      </CardHeader>
      <CardContent>
        <RadioGroup
          value={selectedPack}
          onValueChange={(value) => setSelectedPack(value as PackId)}
        >
          {CreditsPack.map((pack) => {
            return (
              <div
                key={pack.id}
                className="flex items-center space-x-3 rounded-lg bg-secondary/50 p-3 hover:bg-secondary"
                onClick={() => setSelectedPack(pack.id as PackId)}
              >
                <RadioGroupItem id={pack.id} value={pack.id} />
                <Label className="flex w-full cursor-pointer justify-between">
                  <span className="font-medium">
                    {pack.name} - {pack.label}
                  </span>
                  <span className="font-bold text-primary">${(pack.price / 100).toFixed(2)}</span>
                </Label>
              </div>
            );
          })}
        </RadioGroup>
      </CardContent>
      <CardFooter>
        <Button
          className="w-full"
          disabled={mutation.isPending}
          onClick={() => {
            mutation.mutate(selectedPack);
          }}
        >
          <CreditCard className="mr-2 h-5 w-5" /> Purchase credits
        </Button>
      </CardFooter>
    </Card>
  );
};

export default CreditsPurchase;
