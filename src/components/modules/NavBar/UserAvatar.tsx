"use cleint";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useUser } from "@/context/UserContext";
import { logout } from "@/services/auth";
import { IJwtUser } from "@/types";

import {
  Bolt,
  BookOpen,
  CircleUserRound,
  Layers2,
  LogOut,
  Pin,
  UserPen,
} from "lucide-react";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";

function UserAvatar() {
  const { user, setIsLoading } = useUser();

  const router = useRouter();
  const pathname = usePathname();

  const handleLogout = async () => {
    await logout();
    setIsLoading(true);
    // if (protectedRoutes.some((route) => pathname.match(route))) {
    //   router.push("/");
    // }
  };
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild className="z-50">
        <Button size="icon" variant="outline" aria-label="Open account menu">
          <CircleUserRound size={16} strokeWidth={2} aria-hidden="true" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="ms-2 max-w-64">
        <DropdownMenuLabel className="flex items-center gap-3">
          <Image
            src="https://originui.com/avatar.jpg"
            alt="Avatar"
            width={32}
            height={32}
            className="shrink-0 rounded-full"
            priority
          />
          <div className="flex flex-col">
            <span className="truncate text-sm font-medium text-foreground">
              {user?.phone}
            </span>
            <div className="flex items-center gap-1">
              <span
                className={`h-3 w-3 rounded-full ${
                  user?.isDonor ? "bg-green-500" : "bg-red-500"
                }`}
              />
              <span className="text-xs">
                {user?.isDonor ? "Donor" : "Not Donor"}
              </span>
            </div>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <Bolt
              size={16}
              strokeWidth={2}
              className="opacity-60"
              aria-hidden="true"
            />
            <span>Option 1</span>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Layers2
              size={16}
              strokeWidth={2}
              className="opacity-60"
              aria-hidden="true"
            />
            <span>Option 2</span>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <BookOpen
              size={16}
              strokeWidth={2}
              className="opacity-60"
              aria-hidden="true"
            />
            <span>Option 3</span>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <Pin
              size={16}
              strokeWidth={2}
              className="opacity-60"
              aria-hidden="true"
            />
            <span>Option 4</span>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <UserPen
              size={16}
              strokeWidth={2}
              className="opacity-60"
              aria-hidden="true"
            />
            <span>Option 5</span>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          className="cursor-pointer"
          onClick={() => handleLogout()}
        >
          <LogOut
            size={16}
            strokeWidth={2}
            className="opacity-60"
            aria-hidden="true"
          />
          <span>Logout</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export { UserAvatar };
