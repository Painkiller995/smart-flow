import { Separator } from '@radix-ui/react-dropdown-menu';
import { LucideIcon } from 'lucide-react';

import { DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { cn } from '@/lib/utils';

interface CustomDialogHeaderProps {
  title?: string;
  subTitle?: string;
  icon?: LucideIcon;
  titleClassName?: string;
  subTitleClassName?: string;
  iconClassName?: string;
}

const CustomDialogHeader = (props: CustomDialogHeaderProps) => {
  return (
    <DialogHeader className="py-6">
      <DialogTitle asChild>
        <div className="mb-2 flex flex-col items-center gap-2">
          {props.icon && (
            <props.icon
              size={30}
              className={cn('stroke-primary', props.iconClassName)}
            ></props.icon>
          )}
          {props.title && (
            <p className={cn('text-xl text-primary', props.titleClassName)}>{props.title}</p>
          )}
          {props.subTitle && (
            <p className={cn('text-sm text-muted-foreground', props.subTitleClassName)}>
              {props.subTitle}
            </p>
          )}
        </div>
      </DialogTitle>
      <Separator />
    </DialogHeader>
  );
};

export default CustomDialogHeader;
