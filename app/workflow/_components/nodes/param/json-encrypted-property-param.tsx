'use client';

import { GetCredentialsForUser } from '@/actions/credentials/get-credentials-for-user';
import TooltipWrapper from '@/components/tooltip-wrapper';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { ParamProps } from '@/types/app-node';
import { useQuery } from '@tanstack/react-query';
import { useId, useState } from 'react';
import { toast } from 'sonner';

interface ValueObject {
  propertyValueName?: string;
  propertyValueId?: string;
}

const JsonEncryptedPropertyParam = ({ param, value, updateNodeParamValue }: ParamProps) => {
  const id = useId();

  const safeParse = (jsonString: string, fallback: ValueObject): ValueObject => {
    try {
      return JSON.parse(jsonString);
    } catch {
      return fallback;
    }
  };

  const initialParsedValue = safeParse(value, { propertyValueName: '', propertyValueId: '' });

  const [parsedValue, setParsedValue] = useState<ValueObject>(initialParsedValue);

  const query = useQuery({
    queryKey: ['credentials-for-user'],
    queryFn: GetCredentialsForUser,
    refetchInterval: 10000,
  });

  const handleInputOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;
    setParsedValue((prev) => ({ ...prev, propertyValueName: newValue }));
  };

  const handleOnValueChange = (selectedValue: string) => {
    setParsedValue((prev) => ({ ...prev, propertyValueId: selectedValue }));
  };

  const onSetClick = () => {
    updateNodeParamValue(JSON.stringify(parsedValue));
  };

  return (
    <span className="flex w-full flex-col gap-1">
      <Label htmlFor={id} className="flex text-xs">
        {param.name}
        {param.require && <span className="px-2 text-red-400">*</span>}
      </Label>
      <div className="flex gap-2">
        <Input value={parsedValue.propertyValueName} onChange={handleInputOnChange} />
        <Select defaultValue={parsedValue.propertyValueId} onValueChange={handleOnValueChange}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select an option" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {query.data?.map((credential) => {
                return (
                  <SelectItem key={credential.id} value={credential.id}>
                    {credential.name}
                  </SelectItem>
                );
              })}
            </SelectGroup>
          </SelectContent>
        </Select>
        <TooltipWrapper content="Make sure to select the correct secret before clicking set selecting wrong one will cause to send the key to a wrong service or request">
          <Button
            variant={'destructive'}
            onClick={() => {
              toast.info('Saving selected value');
              onSetClick();
            }}
            disabled={query.isPending}
          >
            Set
          </Button>
        </TooltipWrapper>
      </div>
    </span>
  );
};

export default JsonEncryptedPropertyParam;
