'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { routes } from '@/config/routes';
import Logo from '../logo';
import TooltipWrapper from '../tooltip-wrapper';
import { buttonVariants } from '../ui/button';

const DesktopSidebar = () => {
  const pathname = usePathname();
  const activeRoute =
    routes.find((route) => route.href.length > 0 && pathname.includes(route.href)) || routes[0];

  return (
    <div className="relative hidden h-screen max-w-[80px] border-separate overflow-hidden border-r-2 bg-primary/5 text-muted-foreground dark:bg-secondary/30 dark:text-foreground md:block">
      <div className="flex border-separate flex-col items-center justify-between gap-2 border-b-[1px] p-4">
        <Logo hideText iconSize={25} />
      </div>

      <div className="flex h-5/6 flex-col justify-between">
        <div className="flex flex-col justify-start gap-2 p-2">
          {routes.map((route) => (
            <TooltipWrapper key={route.href} content={route.label} side="right">
              <Link
                href={`/${route.href}`}
                className={buttonVariants({
                  variant:
                    activeRoute && activeRoute.href === route.href
                      ? 'sidebarActiveItem'
                      : 'sidebarItem',
                })}
              >
                <route.icon
                  style={{
                    height: '25px',
                    width: '25px',
                  }}
                  size={25}
                />
              </Link>
            </TooltipWrapper>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DesktopSidebar;
