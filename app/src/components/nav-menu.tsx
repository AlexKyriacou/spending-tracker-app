"use client";
import { usePathname } from "next/navigation";
import * as React from "react";

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { ModeToggle } from "./mode-toggle";
import Link from "next/link";

const currentPageNavLinkStyle = "font-extrabold";

export function NavMenu() {
  const pathname = usePathname();
  return (
    <div className="w-full">
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            <Link
              href="/expense/create"
              legacyBehavior
              passHref>
              <NavigationMenuLink
                className={
                  pathname === "/expense/create"
                    ? [
                        currentPageNavLinkStyle,
                        navigationMenuTriggerStyle(),
                      ].join(" ")
                    : navigationMenuTriggerStyle()
                }>
                Expenses
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <Link
              href="/link"
              legacyBehavior
              passHref>
              <NavigationMenuLink
                className={
                  pathname === "/link"
                    ? [
                        currentPageNavLinkStyle,
                        navigationMenuTriggerStyle(),
                      ].join(" ")
                    : navigationMenuTriggerStyle()
                }>
                Categories
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <ModeToggle />
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  );
}
