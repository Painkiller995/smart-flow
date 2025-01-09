'use client';

import { routes } from '@/config/routes';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Logo from '../logo';
import { buttonVariants } from '../ui/button';
import UserAvailableBadge from '../user-available-badge';

const DesktopSidebar = () => {
  const pathname = usePathname();
  const activeRoute =
    routes.find((route) => route.href.length > 0 && pathname.includes(route.href)) || routes[0];

  return (
    <div className="relative hidden h-screen w-full min-w-[280px] max-w-[280px] border-separate overflow-hidden border-r-2 bg-primary/5 text-muted-foreground dark:bg-secondary/30 dark:text-foreground md:block">
      <div className="flex border-separate items-center justify-center gap-2 border-b-[1px] p-4">
        <Logo />
      </div>
      <div className="p-2">
        <UserAvailableBadge />
      </div>
      <div className="flex flex-col justify-start gap-2 p-2">
        {routes.map((route) => (
          <Link
            key={route.href}
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
            {route.label}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default DesktopSidebar;
