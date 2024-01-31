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
import Link from "next/link";

const currentPageNavLinkStyle = "underline";

export function MainNav() {
  const pathname = usePathname();

  const getNavLinkClassName = (linkPath: string) => {
    return pathname === linkPath
      ? [currentPageNavLinkStyle, navigationMenuTriggerStyle()].join(" ")
      : navigationMenuTriggerStyle();
  };

  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <Link
            href="/expense/create"
            legacyBehavior
            passHref>
            <NavigationMenuLink
              className={getNavLinkClassName("/expense/create")}>
              Expenses
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <Link
            href="/link"
            legacyBehavior
            passHref>
            <NavigationMenuLink className={getNavLinkClassName("/link")}>
              Categories
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}
