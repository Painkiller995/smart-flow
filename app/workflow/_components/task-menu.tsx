'use client';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { TaskRegistry } from '@/lib/workflow/task/registry';
import { TaskType } from '@/types/task';
import { GemIcon } from 'lucide-react';
import React from 'react';

const TaskMenu = () => {
  return (
    <aside className="h-full w-[340px] min-w-[340px] border-separate overflow-auto border-r-2 p-2 px-4">
      <Accordion
        type="multiple"
        className="w-full"
        defaultValue={['data-handling', 'json-data', 'integrations', 'utility']}
      >
        <AccordionItem value="data-handling">
          <AccordionTrigger className="font-bold">Data handling</AccordionTrigger>
          <AccordionContent className="flex flex-col gap-1">
            <TaskMenuButton taskType={TaskType.PROCESS_DATA_WITH_OPEN_AI} />
            <TaskMenuButton taskType={TaskType.STORE_DATA} />
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="json-data">
          <AccordionTrigger className="font-bold">JSON</AccordionTrigger>
          <AccordionContent className="flex flex-col gap-1">
            <TaskMenuButton taskType={TaskType.JSON_STORAGE_AREA} />
            <TaskMenuButton taskType={TaskType.ADD_PROPERTY_TO_JSON} />
            <TaskMenuButton taskType={TaskType.READ_PROPERTY_FROM_JSON} />
            <TaskMenuButton taskType={TaskType.MERGE_TWO_JSON} />
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="integrations">
          <AccordionTrigger className="font-bold">Integrations</AccordionTrigger>
          <AccordionContent className="flex flex-col gap-1">
            <TaskMenuButton taskType={TaskType.EXECUTE_REQUEST} />
            <TaskMenuButton taskType={TaskType.DELIVER_VIA_WEBHOOK} />
            <TaskMenuButton taskType={TaskType.SEND_EMAIL} />
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="utility">
          <AccordionTrigger className="font-bold">Utility</AccordionTrigger>
          <AccordionContent className="flex flex-col gap-1">
            <TaskMenuButton taskType={TaskType.EVALUATE_STRING} />
            <TaskMenuButton taskType={TaskType.EVALUATE_TIME} />
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="browser">
          <AccordionTrigger className="font-bold">Browser (Beta)</AccordionTrigger>
          <AccordionContent className="flex flex-col gap-1">
            <TaskMenuButton taskType={TaskType.LAUNCH_BROWSER} />
            <TaskMenuButton taskType={TaskType.PAGE_TO_HTML} />
            <TaskMenuButton taskType={TaskType.EXTRACT_TEXT_FROM_ELEMENT} />
            <TaskMenuButton taskType={TaskType.FILL_INPUT} />
            <TaskMenuButton taskType={TaskType.WAIT_FOR_ELEMENT} />
            <TaskMenuButton taskType={TaskType.CLICK_ELEMENT} />
            <TaskMenuButton taskType={TaskType.SCROLL_TO_ELEMENT} />
            <TaskMenuButton taskType={TaskType.NAVIGATE_URL} />
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </aside>
  );
};

export default TaskMenu;

function TaskMenuButton({ taskType }: { taskType: TaskType }) {
  const hideCreditIcon = process.env.NEXT_PUBLIC_DISABLE_CREDIT_UI_COMPONENTS === 'true';

  const task = TaskRegistry[taskType];

  const onDragStart = (event: React.DragEvent, type: TaskType) => {
    event.dataTransfer.setData('application/reactflow', type);
    event.dataTransfer.effectAllowed = 'move';
  };

  return (
    <Button
      variant="secondary"
      className="flex w-full items-center justify-between gap-2 border"
      draggable
      onDragStart={(event) => {
        onDragStart(event, taskType);
      }}
    >
      <div className="flex gap-2">
        <task.icon size={20} />
        {task.label}
      </div>
      {!hideCreditIcon && (
        <Badge className="flex items-center gap-2 text-muted-foreground" variant="outline">
          <GemIcon size={16} />
          {task.credits}
        </Badge>
      )}
    </Button>
  );
}
