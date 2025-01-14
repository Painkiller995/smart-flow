'use client';
import { useEffect, useId, useState } from 'react';

import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { ParamProps } from '@/types/app-node';

const BooleanParam = ({ param, value, disabled, updateNodeParamValue }: ParamProps) => {
  const [internalValue, setInternalValue] = useState(value || 'false');
  const id = useId();

  useEffect(() => {
    setInternalValue(value || 'false');
  }, [value]);

  const handleToggle = () => {
    const newValue = internalValue === 'true' ? 'false' : 'true';
    updateNodeParamValue(newValue);
  };

  return (
    <div className="flex w-full items-center gap-2 p-1">
      <Label htmlFor={id} className="flex text-xs">
        {param.name}
        {param.require && <p className="px-2 text-red-400">*</p>}
      </Label>
      <Switch
        id={id}
        checked={internalValue === 'true'}
        onClick={handleToggle}
        disabled={disabled}
      />
      {param.helperText && <p className="px-2 text-muted-foreground">{param.helperText}</p>}
    </div>
  );
};

export default BooleanParam;
