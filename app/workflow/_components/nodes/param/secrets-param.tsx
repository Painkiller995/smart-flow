'use client';

import { GetSecretsForUser } from '@/actions/secrets/get-secrets-for-user';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { ParamProps } from '@/types/app-node';
import { useQuery } from '@tanstack/react-query';
import { useId } from 'react';

const SecretsParam = ({ param, value, updateNodeParamValue }: ParamProps) => {
  const id = useId();

  const query = useQuery({
    queryKey: ['secrets-for-user'],
    queryFn: GetSecretsForUser,
    refetchInterval: 10000,
  });

  return (
    <p className="flex w-full flex-col gap-1">
      <Label htmlFor={id} className="flex text-xs">
        {param.name}
        {param.require && <span className="px-2 text-red-400">*</span>}
      </Label>
      <Select defaultValue={value} onValueChange={(value) => updateNodeParamValue(value)}>
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
    </p>
  );
};

export default SecretsParam;
