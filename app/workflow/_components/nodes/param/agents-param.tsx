'use client';

import { useQuery } from '@tanstack/react-query';
import { useId } from 'react';

import { GetAgentsForUser } from '@/actions/agents/get-agents-for-user';
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

const AgentsParam = ({ param, value, updateNodeParamValue }: ParamProps) => {
  const id = useId();

  const query = useQuery({
    queryKey: ['agents-for-user'],
    queryFn: GetAgentsForUser,
    refetchInterval: 10000,
  });

  return (
    <div className="flex w-full flex-col gap-1">
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
            <SelectLabel>Agents</SelectLabel>
            {query.data?.map((agent) => {
              return (
                <SelectItem key={agent.id} value={agent.id}>
                  {agent.name}
                </SelectItem>
              );
            })}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
};

export default AgentsParam;
