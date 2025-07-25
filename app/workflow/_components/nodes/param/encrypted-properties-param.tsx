'use client';

import { useQuery } from '@tanstack/react-query';
import { debounce } from 'lodash';
import { CircleXIcon } from 'lucide-react';
import { useEffect, useId, useState } from 'react';

import { GetSecretsForUser } from '@/actions/secrets/get-secrets-for-user';
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
import { EncryptedValueObject } from '@/types/param';

const EncryptedPropertiesParam = ({ param, value, updateNodeParamValue }: ParamProps) => {
  const id = useId();

  const safeParse = (jsonString: string, fallback: EncryptedValueObject): EncryptedValueObject => {
    try {
      return JSON.parse(jsonString);
    } catch {
      return fallback;
    }
  };

  const initialParsedValue = safeParse(value, {});
  const [parsedValue, setParsedValue] = useState<EncryptedValueObject>(initialParsedValue);

  const query = useQuery({
    queryKey: ['secrets-for-user'],
    queryFn: GetSecretsForUser,
    refetchInterval: 10000,
  });

  const handleAddEncryptedEntry = () => {
    const newPropertyId = Date.now();
    setParsedValue((prev) => ({
      ...prev,
      [newPropertyId]: { value: '' },
    }));
  };

  const debouncedSave = debounce(() => {
    updateNodeParamValue(JSON.stringify(parsedValue));
  }, 300);

  useEffect(() => {
    debouncedSave();
    return () => debouncedSave.cancel();
  }, [debouncedSave]);

  return (
    <div className="flex w-full flex-col gap-1">
      <Label htmlFor={id} className="flex text-xs">
        {param.name}
        {param.require && <span className="px-2 text-red-400">*</span>}
      </Label>
      {Object.entries(parsedValue).map(([propertyId, { value, selectedSecretId }]) => (
        <EncryptedPropertyParam
          key={propertyId}
          propertyId={propertyId}
          keyValue={value}
          selectedSecretId={selectedSecretId}
          secrets={query.data}
          setParsedValue={setParsedValue}
        />
      ))}
      <Button
        className="items-end justify-end text-xs text-primary"
        variant="ghost"
        onClick={handleAddEncryptedEntry}
      >
        Add Secret
      </Button>
    </div>
  );
};

const EncryptedPropertyParam = ({
  propertyId,
  keyValue,
  selectedSecretId,
  secrets,
  setParsedValue,
}: {
  propertyId: string;
  keyValue: string;
  selectedSecretId?: string;
  secrets?: Awaited<ReturnType<typeof GetSecretsForUser>>;
  setParsedValue: React.Dispatch<React.SetStateAction<EncryptedValueObject>>;
}) => {
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;
    setParsedValue((prev) => ({
      ...prev,
      [propertyId]: { ...prev[propertyId], value: newValue },
    }));
  };

  const handleSelectChange = (selectedValue: string) => {
    setParsedValue((prev) => ({
      ...prev,
      [propertyId]: { ...prev[propertyId], selectedSecretId: selectedValue },
    }));
  };

  const handleRemoveEntry = (propertyId: string) => {
    setParsedValue((prev) => {
      const updatedValue = { ...prev };
      delete updatedValue[propertyId];
      return updatedValue;
    });
  };
  return (
    <div className="flex gap-2">
      <div className="flex w-full gap-1">
        <Input value={keyValue} onChange={handleInputChange} placeholder={'Key name'} />
        <Select value={selectedSecretId} onValueChange={handleSelectChange}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select an option" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {secrets?.map((secret) => (
                <SelectItem key={secret.id} value={secret.id}>
                  {secret.name}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
        <Button
          variant="destructive"
          onClick={() => {
            handleRemoveEntry(propertyId);
          }}
        >
          <CircleXIcon size={16} />
        </Button>
      </div>
    </div>
  );
};

export default EncryptedPropertiesParam;
