"use client";

import BreadcrumbHeader from "@/components/breadcrumb-header";
import DesktopSidebar from "@/components/sidebar/desktop-sidebar";
import MobileSidebar from "@/components/sidebar/mobile-sidebar";
import { ThemeModeToggle } from "@/components/theme-mode-toggle";
import { Separator } from "@/components/ui/separator";
import { SignedIn, UserButton } from "@clerk/nextjs";

function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex h-screen">
      <DesktopSidebar />
      <div className="flex flex-col flex-1 min-h-screen">
        <header className="flex items-center justify-between px-6 py-4 h-[50px] container">
          <MobileSidebar />
          <BreadcrumbHeader />
          <div className="flex items-center gap-2">
            <ThemeModeToggle />
            <SignedIn>
              <UserButton></UserButton>
            </SignedIn>
          </div>
        </header>
        <Separator />
        <div className="overflow-auto">
          <div className="flex-1 container py-4 text-accent-foreground">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Layout;
