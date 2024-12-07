"use client";

import BreadcrumbHeader from "@/components/breadcrumb-header";
import Logo from "@/components/logo";
import DesktopSidebar from "@/components/sidebar/desktop-sidebar";
import MobileSidebar from "@/components/sidebar/mobile-sidebar";
import { ThemeModeToggle } from "@/components/theme-mode-toggle";
import { Separator } from "@/components/ui/separator";

function layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex flex-col items-center justify-center h-screen gap-4">
      <Logo />
      {children}
    </div>
  );
}

export default layout;
