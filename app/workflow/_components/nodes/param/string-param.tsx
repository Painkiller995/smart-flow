'use client';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { ParamProps } from '@/types/app-node';
import { useEffect, useId, useState } from 'react';

const StringParam = ({ param, value, disabled, updateNodeParamValue }: ParamProps) => {
  const [internalValue, setInternalValue] = useState(value || '');
  const id = useId();

  useEffect(() => {
    setInternalValue(value || '');
  }, [value]);

  let Component: any = Input;
  if (param.variant === 'textarea') {
    Component = Textarea;
  }

  return (
    <div className="w-full space-y-1 p-1">
      <Label htmlFor={id} className="flex text-xs">
        {param.name}
        {param.require && <p className="px-2 text-red-400">*</p>}
      </Label>
      <Component
        id={id}
        className="text-xs"
        value={internalValue}
        placeholder="Enter value here"
        onChange={(e: any) => setInternalValue(e.target.value)}
        onBlur={(e: any) => updateNodeParamValue(e.target.value)}
        disabled={disabled}
      />
      {param.helperText && <p className="px-2 text-muted-foreground">{param.helperText}</p>}
    </div>
  );
};

export default StringParam;
