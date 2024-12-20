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
    <ReactFlowProvider>
      <div className="flex h-full w-full flex-col overflow-hidden">
        <TopBar title="Workflow Editor" subtitle={workflow.name} workflowId={workflow.id} />
        <section className="flex h-full overflow-auto">
          <TaskMenu />
          <FlowEditor workflow={workflow} />
        </section>
      </div>
    </ReactFlowProvider>
  );
};

export default Editor;
