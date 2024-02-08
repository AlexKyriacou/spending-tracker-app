"use client";
import { usePathname } from "next/navigation";
import * as React from "react";

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
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
            href="/transaction/create"
            legacyBehavior
            passHref>
            <NavigationMenuLink
              className={getNavLinkClassName("/transaction/create")}>
              Transactions
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <Link
            href="/category/create"
            legacyBehavior
            passHref>
            <NavigationMenuLink className={getNavLinkClassName("/category/create")}>
              Categories
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}
