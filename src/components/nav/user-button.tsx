import * as React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { auth } from "@/lib/auth";
import { SignIn, SignOut } from "./auth-components";

export default async function UserButton() {
  const session = await auth();
  if (!session?.user) return <SignIn />;
  return (
    <Popover>
      <PopoverTrigger>
        <Avatar>
          <AvatarImage
            src={
              session.user.image ??
              "https://source.boringavatars.com/marble/120"
            }
            alt={session.user.name ?? ""}
          />
          <AvatarFallback>Fill In</AvatarFallback>
        </Avatar>
      </PopoverTrigger>
      <PopoverContent>
        <div className="flex flex-col space-y-2">
          <div>
            <span>{session.user.name}</span>
          </div>
          <div>
            <span>{session.user.email}</span>
          </div>
          <div>
            <SignOut variant="secondary" />
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
