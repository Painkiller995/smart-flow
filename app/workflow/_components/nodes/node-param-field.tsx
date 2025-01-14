import { useReactFlow } from '@xyflow/react';
import { useCallback } from 'react';

import { AppNode } from '@/types/app-node';
import { TaskParam, TaskParamType } from '@/types/task';
import AgentsParam from './param/agents-param';
import BooleanParam from './param/boolean-param';
import BrowserInstanceParam from './param/browser-instance-param';
import EncryptedPropertiesParam from './param/encrypted-properties-param';
import ParametersParam from './param/parameters-param';
import SecretsParam from './param/secrets-param';
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
        <SecretsParam
          param={param}
          value={value}
          disabled={disabled}
          updateNodeParamValue={updateNodeParamValue}
        />
      );
    case TaskParamType.PARAMETERS:
      return (
        <ParametersParam
          param={param}
          value={value}
          disabled={disabled}
          updateNodeParamValue={updateNodeParamValue}
        />
      );
    case TaskParamType.ENCRYPTED_PROPERTIES:
      return (
        <EncryptedPropertiesParam
          param={param}
          value={value}
          disabled={disabled}
          updateNodeParamValue={updateNodeParamValue}
        />
      );
    case TaskParamType.BOOLEAN:
      return (
        <BooleanParam
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
