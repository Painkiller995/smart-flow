"use client";

import Logo from "@/components/logo";
import { Separator } from "@/components/ui/separator";

function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex flex-col w-full h-screen">
      {children}
      <Separator />
      <footer className="flex items-center justify-between p-2">
        <Logo iconSize={16} fontSize="text-xl" />
      </footer>
    </div>
  );
}

export default Layout;
