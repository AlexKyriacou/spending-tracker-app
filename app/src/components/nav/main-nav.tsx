"use client";
import { usePathname } from "next/navigation";
import * as React from "react";
import { cn } from "@/lib/utils";
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
    return cn(
      navigationMenuTriggerStyle(),
      pathname === linkPath ? "text-foreground" : "text-foreground/60"
    );
  };

  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <Link
            href="/transaction"
            legacyBehavior
            passHref>
            <NavigationMenuLink className={getNavLinkClassName("/transaction")}>
              Transactions
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <Link
            href="/category/create"
            legacyBehavior
            passHref>
            <NavigationMenuLink
              className={getNavLinkClassName("/category/create")}>
              Categories
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}
