'use client';

import { Sheet, SheetContent, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { routes } from '@/config/routes';
import { cn } from '@/lib/utils';
import { MenuIcon } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import Logo from '../logo';
import { Button, buttonVariants } from '../ui/button';
import UserAvailableBadge from '../user-available-badge';

interface MobileSidebarProps {
  allowDesktop?: boolean;
}
const MobileSidebar = ({ allowDesktop }: MobileSidebarProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const activeRoute =
    routes.find((route) => route.href.length > 0 && pathname.includes(route.href)) || routes[0];

  return (
    <div className={cn('block border-separate bg-background', allowDesktop ? '' : 'md:hidden')}>
      <nav className="container flex items-center justify-between px-0">
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild>
            <SheetTitle>
              <Button variant="ghost" size="icon">
                <MenuIcon />
              </Button>
            </SheetTitle>
          </SheetTrigger>
          <SheetContent side="left" className="w-[400px] space-y-4 sm:w-[540px]">
            <Logo />

            <div className="p-2">
              <UserAvailableBadge />
            </div>

            <div className="flex flex-col gap-1">
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
                  onClick={() => setIsOpen((prev) => !prev)}
                >
                  <route.icon
                    style={{
                      height: '20px',
                      width: '20px',
                    }}
                    size={20}
                  />{' '}
                  {route.label}
                </Link>
              ))}
            </div>
          </SheetContent>
        </Sheet>
      </nav>
    </div>
  );
};

export default MobileSidebar;
