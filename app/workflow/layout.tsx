'use client';

import { Separator } from '@/components/ui/separator';

function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex h-screen">
      <div className="flex h-screen w-full flex-col">
        {children}
        <Separator />
      </div>
    </div>
  );
}

export default Layout;
