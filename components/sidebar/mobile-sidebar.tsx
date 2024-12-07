"use client";

import React, { useState } from "react";
import Logo from "../logo";
import { routes } from "@/config/routes";
import Link from "next/link";
import { Button, buttonVariants } from "../ui/button";
import { usePathname } from "next/navigation";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { MenuIcon } from "lucide-react";

const MobileSidebar = () => {
  const [isOpen, setOpen] = useState(false);
  const pathname = usePathname();
  const activeRoute = routes.find((route) => pathname.includes(route.href));

  return (
    <div className="block border-separate bg-background md:hidden">
      <nav className="container flex items-center justify-between px-8">
        <Sheet open={isOpen} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon">
              <MenuIcon />
            </Button>
          </SheetTrigger>
          <SheetContent
            side="left"
            className="w-[400px] sm:w-[540px] space-y-4"
          >
            <div className="flex border-b-[1px] border-separate p-4">
              <Logo />
            </div>
            <div className="flex flex-col p-2">
              {routes.map((route) => (
                <Link
                  key={route.href}
                  href={route.href}
                  className={buttonVariants({
                    variant:
                      activeRoute && activeRoute.href === route.href
                        ? "sidebarActiveItem"
                        : "sidebarItem",
                  })}
                >
                  <route.icon size={20} /> {route.label}
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
