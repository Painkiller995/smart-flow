import { Separator } from '@radix-ui/react-dropdown-menu';
import { LucideIcon } from 'lucide-react';

import { DrawerHeader, DrawerTitle } from '@/components/ui/drawer';
import { cn } from '@/lib/utils';

interface CustomDrawerHeaderProps {
  title?: string;
  subTitle?: string;
  icon?: LucideIcon;
  titleClassName?: string;
  subTitleClassName?: string;
  iconClassName?: string;
}

const CustomDrawerHeader = (props: CustomDrawerHeaderProps) => {
  return (
    <DrawerHeader className="py-6">
      <DrawerTitle asChild>
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
      </DrawerTitle>
      <Separator />
    </DrawerHeader>
  );
};

export default CustomDrawerHeader;
