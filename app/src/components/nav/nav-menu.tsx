import * as React from "react";
import { ModeToggle } from "./mode-toggle";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { MainNav } from "./main-nav";

export function NavMenu() {
  return (
    <div className="hidden flex-col md:flex">
      <div className="border-b">
        <div className="flex h-16 items-center px-4">
          <MainNav />
          <div className="ml-auto flex items-center space-x-4">
            <ModeToggle />
            <Avatar>
              <AvatarImage src="https://github.com/AlexKyriacou.png" />
              <AvatarFallback>Fill In</AvatarFallback>
            </Avatar>
          </div>
        </div>
      </div>
    </div>
  );
}
