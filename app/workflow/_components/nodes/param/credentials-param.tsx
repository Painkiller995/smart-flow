'use client';

import { GetCredentialsForUser } from '@/actions/credentials/get-credentials-for-user';
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

const CredentialsParam = ({ param, value, updateNodeParamValue }: ParamProps) => {
  const id = useId();

  const query = useQuery({
    queryKey: ['credentials-for-user'],
    queryFn: GetCredentialsForUser,
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
            <SelectLabel>Credentials</SelectLabel>
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
    </p>
  );
};

export default CredentialsParam;
