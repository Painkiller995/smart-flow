'use client';

import DesktopSidebar from '@/components/sidebar/desktop-sidebar';
import { Separator } from '@/components/ui/separator';

function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex h-screen">
      <DesktopSidebar />
      <div className="flex h-screen w-full flex-col">
        {children}
        <Separator />
      </div>
    </div>
  );
}

export default Layout;
