'use client';

import TooltipWrapper from '@/components/tooltip-wrapper';
import { Button } from '@/components/ui/button';
import { ChevronLeftIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';

import ExecuteButton from './execute-button';
import NavigationTabs from './navigation-tabs';
import PublishButton from './publish-button';
import SaveButton from './save-button';
import UnpublishButton from './unpublish-button';

interface TopBarProps {
  title: string;
  subtitle?: string;
  workflowId: string;
  hideButtons?: boolean;
  isPublished?: boolean;
}
const TopBar = ({
  title,
  subtitle,
  workflowId,
  hideButtons = false,
  isPublished = false,
}: TopBarProps) => {
  const router = useRouter();

  return (
    <header className="sticky top-0 z-10 flex h-[60px] w-full border-separate justify-between border-b-2 bg-background p-2">
      <div className="flex flex-1 gap-1">
        <TooltipWrapper content="Back">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => {
              router.back();
            }}
          >
            <ChevronLeftIcon size={20} />
          </Button>
        </TooltipWrapper>
        <div>
          <p className="truncate text-ellipsis font-bold">{title}</p>
          {subtitle && (
            <p className="truncate text-ellipsis text-xs text-muted-foreground">{subtitle}</p>
          )}
        </div>
      </div>
      <NavigationTabs workflowId={workflowId} />
      <div className="flex flex-1 justify-end gap-1">
        {!hideButtons && (
          <>
            <ExecuteButton workflowId={workflowId} />
            {isPublished && <UnpublishButton workflowId={workflowId} />}
            {!isPublished && (
              <>
                <SaveButton workflowId={workflowId} />
                <PublishButton workflowId={workflowId} />
              </>
            )}
          </>
        )}
      </div>
    </header>
  );
};

export default TopBar;
