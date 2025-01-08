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
      {children}
      <Separator />
      <footer className="flex items-center justify-between p-2">
        <Logo iconSize={16} fontSize="text-xl" />
        <ThemeModeToggle />
      </footer>
    </div>
  );
}

export default Layout;
