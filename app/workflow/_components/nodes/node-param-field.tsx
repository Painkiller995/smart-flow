import { AppNode } from '@/types/app-node';
import { TaskParam, TaskParamType } from '@/types/task';
import { useReactFlow } from '@xyflow/react';
import { useCallback } from 'react';
import AgentsParam from './param/agents-param';
import BrowserInstanceParam from './param/browser-instance-param';
import CredentialsParam from './param/credentials-param';
import JsonEncryptedPropertyParam from './param/json-encrypted-property-param';
import SelectParam from './param/select-param';
import StringParam from './param/string-param';

interface NodeParamFieldProps {
  nodeId: string;
  param: TaskParam;
  disabled: boolean;
}

const NodeParamField = ({ nodeId, param, disabled }: NodeParamFieldProps) => {
  const { updateNodeData, getNode } = useReactFlow();

  const node = getNode(nodeId) as AppNode;

  const value = node?.data.inputs?.[param.name];

  const updateNodeParamValue = useCallback(
    (newValue: string) => {
      updateNodeData(nodeId, {
        inputs: {
          ...node?.data.inputs,
          [param.name]: newValue,
        },
      });
    },
    [nodeId, updateNodeData, param.name, node?.data.inputs]
  );

  switch (param.type) {
    case TaskParamType.STRING:
      return (
        <StringParam
          param={param}
          value={value}
          disabled={disabled}
          updateNodeParamValue={updateNodeParamValue}
        />
      );
    case TaskParamType.SELECT:
      return (
        <SelectParam
          param={param}
          value={value}
          disabled={disabled}
          updateNodeParamValue={updateNodeParamValue}
        />
      );
    case TaskParamType.CREDENTIAL:
      return (
        <CredentialsParam
          param={param}
          value={value}
          disabled={disabled}
          updateNodeParamValue={updateNodeParamValue}
        />
      );
    case TaskParamType.JSON_ENCRYPTED_PROPERTY:
      return (
        <JsonEncryptedPropertyParam
          param={param}
          value={value}
          disabled={disabled}
          updateNodeParamValue={updateNodeParamValue}
        />
      );
    case TaskParamType.AGENT:
      return (
        <AgentsParam
          param={param}
          value={value}
          disabled={disabled}
          updateNodeParamValue={updateNodeParamValue}
        />
      );
    case TaskParamType.BROWSER_INSTANCE:
      return (
        <BrowserInstanceParam param={param} value="" updateNodeParamValue={updateNodeParamValue} />
      );
    default:
      return (
        <div className="w-full">
          <p className="text-xs text-muted-foreground">Not implemented</p>
        </div>
      );
  }
};

export default NodeParamField;
