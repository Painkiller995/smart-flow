'use client';

import { GemIcon } from 'lucide-react';
import React from 'react';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import { TaskRegistry } from '@/lib/workflow/task/registry';
import { TaskType } from '@/types/task';

const TaskMenu = () => {
  return (
    <aside className="h-full w-[340px] min-w-[340px] border-separate overflow-auto border-r-2 p-2 px-4">
      <Accordion
        type="multiple"
        className="w-full"
        defaultValue={['data', 'data-handling', 'json-data', 'integrations', 'utility']}
      >
        <AccordionItem value="data">
          <AccordionTrigger className="text-xl text-secondary-foreground/50 transition-colors duration-300 ease-in-out hover:text-secondary-foreground hover:no-underline">
            Data
          </AccordionTrigger>
          <AccordionContent className="flex flex-col gap-1">
            <TaskMenuButton taskType={TaskType.WEBHOOK_PAYLOAD} />
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="data-handling">
          <AccordionTrigger className="text-xl text-secondary-foreground/50 transition-colors duration-300 ease-in-out hover:text-secondary-foreground hover:no-underline">
            Data handling
          </AccordionTrigger>
          <AccordionContent className="flex flex-col gap-1">
            <TaskMenuButton taskType={TaskType.PROCESS_DATA_WITH_OPEN_AI} />
            <TaskMenuButton taskType={TaskType.STORE_DATA} />
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="json-data">
          <AccordionTrigger className="text-xl text-secondary-foreground/50 transition-colors duration-300 ease-in-out hover:text-secondary-foreground hover:no-underline">
            JSON
          </AccordionTrigger>
          <AccordionContent className="flex flex-col gap-1">
            <TaskMenuButton taskType={TaskType.JSON_STORAGE_AREA} />
            <TaskMenuButton taskType={TaskType.ADD_PROPERTY_TO_JSON} />
            <TaskMenuButton taskType={TaskType.READ_PROPERTY_FROM_JSON} />
            <TaskMenuButton taskType={TaskType.MERGE_TWO_JSON} />
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="integrations">
          <AccordionTrigger className="text-xl text-secondary-foreground/50 transition-colors duration-300 ease-in-out hover:text-secondary-foreground hover:no-underline">
            Integrations
          </AccordionTrigger>
          <AccordionContent className="flex flex-col gap-1">
            <TaskMenuButton taskType={TaskType.EXECUTE_REQUEST} />
            <TaskMenuButton taskType={TaskType.DELIVER_VIA_WEBHOOK} />
            <TaskMenuButton taskType={TaskType.SEND_EMAIL} />
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="utility">
          <AccordionTrigger className="text-xl text-secondary-foreground/50 transition-colors duration-300 ease-in-out hover:text-secondary-foreground hover:no-underline">
            Utility
          </AccordionTrigger>
          <AccordionContent className="flex flex-col gap-1">
            <TaskMenuButton taskType={TaskType.EVALUATE_STRING} />
            <TaskMenuButton taskType={TaskType.EVALUATE_TIME} />
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
      variant="outline"
      className="flex w-full items-center justify-between gap-2 border border-transparent"
      draggable
      onDragStart={(event) => {
        onDragStart(event, taskType);
      }}
    >
      <div className="flex items-center gap-2">
        <task.icon size={20} />
        {task.label}
      </div>
      {!hideCreditIcon && (
        <div className="flex items-center gap-2 text-muted-foreground">
          <GemIcon size={16} />
          {task.credits}
        </div>
      )}
    </Button>
  );
}
