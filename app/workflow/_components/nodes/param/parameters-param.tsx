'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ParamProps } from '@/types/app-node';
import { ParameterObject } from '@/types/param';
import { debounce } from 'lodash';
import { CircleXIcon } from 'lucide-react';
import { useEffect, useId, useState } from 'react';

const ParametersParam = ({ param, value, updateNodeParamValue }: ParamProps) => {
  const id = useId();

  const safeParse = (jsonString: string, fallback: ParameterObject): ParameterObject => {
    try {
      return JSON.parse(jsonString);
    } catch {
      return fallback;
    }
  };

  const initialParsedValue = safeParse(value, {});

  const [parsedValue, setParsedValue] = useState<ParameterObject>(initialParsedValue);

  const handleAddEncryptedEntry = () => {
    const newParameterId = Date.now();
    setParsedValue((prev) => ({
      ...prev,
      [newParameterId]: { parameterKey: '', parameterValue: '' },
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
      {Object.entries(parsedValue).map(([parameterId, { parameterKey, parameterValue }]) => (
        <ParameterParam
          key={parameterId}
          parameterId={parameterId}
          parameterKey={parameterKey}
          parameterValue={parameterValue}
          setParsedValue={setParsedValue}
        />
      ))}
      <Button
        className="items-end justify-end text-xs text-primary"
        variant="ghost"
        onClick={handleAddEncryptedEntry}
      >
        Add Parameter
      </Button>
    </div>
  );
};

const ParameterParam = ({
  parameterId,
  parameterKey,
  parameterValue,
  setParsedValue,
}: {
  parameterId: string;
  parameterKey: string;
  parameterValue?: string;
  setParsedValue: React.Dispatch<React.SetStateAction<ParameterObject>>;
}) => {
  const handleKeyInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;
    setParsedValue((prev) => ({
      ...prev,
      [parameterId]: { ...prev[parameterId], parameterKey: newValue },
    }));
  };

  const handleValueInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;
    setParsedValue((prev) => ({
      ...prev,
      [parameterId]: { ...prev[parameterId], parameterValue: newValue },
    }));
  };

  const handleRemoveEntry = (parameterId: string) => {
    setParsedValue((prev) => {
      const updatedValue = { ...prev };
      delete updatedValue[parameterId];
      return updatedValue;
    });
  };

  return (
    <div className="flex gap-2">
      <div className="flex w-full gap-1">
        <Input value={parameterKey} onChange={handleKeyInputChange} placeholder={'Key name'} />
        <Input value={parameterValue} onChange={handleValueInputChange} placeholder={'Value'} />

        <Button
          variant="destructive"
          onClick={() => {
            handleRemoveEntry(parameterId);
          }}
        >
          <CircleXIcon size={16} />
        </Button>
      </div>
    </div>
  );
};

export default ParametersParam;
