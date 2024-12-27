'use client';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import { TaskRegistry } from '@/lib/workflow/task/registry';
import { TaskType } from '@/types/task';
import React from 'react';

const TaskMenu = () => {
  return (
    <aside className="h-full w-[340px] min-w-[340px] border-separate overflow-auto border-r-2 p-2 px-4">
      <Accordion
        type="multiple"
        className="w-full"
        defaultValue={['data-handling', 'browser', 'result']}
      >
        <AccordionItem value="data-handling">
          <AccordionTrigger className="font-bold">Data handling</AccordionTrigger>
          <AccordionContent className="flex flex-col gap-1">
            <TaskMenuButton taskType={TaskType.EXTRACT_DATA_WITH_AI} />
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
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="result">
          <AccordionTrigger className="font-bold">Result delivery</AccordionTrigger>
          <AccordionContent className="flex flex-col gap-1">
            <TaskMenuButton taskType={TaskType.DELIVER_VIA_WEBHOOK} />
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </aside>
  );
};

export default TaskMenu;

function TaskMenuButton({ taskType }: { taskType: TaskType }) {
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
    </Button>
  );
}
