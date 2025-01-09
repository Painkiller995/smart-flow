'use client';

import Logo from '@/components/logo';
import { ThemeModeToggle } from '@/components/theme-mode-toggle';
import { Separator } from '@/components/ui/separator';

function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex h-screen w-full flex-col">
      <div className="flex items-center justify-between p-2">
        <Logo iconSize={25} fontSize="text-xl" />
        <ThemeModeToggle />
      </div>
      <Separator />
      <div className="container py-10">{children}</div>
    </div>
  );
}

export default Layout;
