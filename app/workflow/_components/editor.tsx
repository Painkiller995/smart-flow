import { FlowValidationContextProvider } from '@/components/context/flow-validation-context';
import { WorkflowStatus } from '@/types/workflow';
import { Workflow } from '@prisma/client';
import { ReactFlowProvider } from '@xyflow/react';
import FlowEditor from './flow-editor';
import TaskMenu from './task-menu';
import TopBar from './top-bar/top-bar';

interface EditorProps {
  workflow: Workflow;
}
const Editor = ({ workflow }: EditorProps) => {
  return (
    <FlowValidationContextProvider>
      <ReactFlowProvider>
        <div className="flex h-full w-full flex-col overflow-hidden">
          <TopBar
            title="Workflow Editor"
            subtitle={workflow.name}
            workflowId={workflow.id}
            isPublished={workflow.status === WorkflowStatus.PUBLISHED}
          />
          <section className="flex h-full overflow-auto">
            <TaskMenu />
            <FlowEditor workflow={workflow} />
          </section>
        </div>
      </ReactFlowProvider>
    </FlowValidationContextProvider>
  );
};

export default Editor;
