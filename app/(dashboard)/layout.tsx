'use client';

import { SignedIn, UserButton } from '@clerk/nextjs';

import BreadcrumbHeader from '@/components/breadcrumb-header';
import DesktopSidebar from '@/components/sidebar/desktop-sidebar';
import MobileSidebar from '@/components/sidebar/mobile-sidebar';
import { ThemeModeToggle } from '@/components/theme-mode-toggle';
import { Separator } from '@/components/ui/separator';
import UserAvailableBadge from '@/components/user-available-badge';

function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex h-screen">
      <DesktopSidebar />
      <div className="flex min-h-screen flex-1 flex-col">
        <header className="container flex h-[50px] items-center justify-between px-6 py-4">
          <MobileSidebar />
          <BreadcrumbHeader />
          <div className="flex items-center gap-2">
            <UserAvailableBadge />
            <ThemeModeToggle />
            <SignedIn>
              <UserButton></UserButton>
            </SignedIn>
          </div>
        </header>
        <Separator />
        <div className="overflow-auto">
          <div className="container flex-1 py-4 text-accent-foreground">{children}</div>
        </div>
      </div>
    </div>
  );
}

export default Layout;
