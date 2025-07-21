"use client";

import {
  IconCreditCard,
  IconDotsVertical,
  IconLogout,
  IconNotification,
  IconUserCircle,
} from "@tabler/icons-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { useUser } from "@/context/UserContext";
import { Button } from "@/components/ui/button";
import { logout } from "@/services/auth";
import { protectedRoutes } from "@/constants";
import { usePathname, useRouter } from "next/navigation";

export function NavUser() {
  const { user, refreshUser } = useUser();

  const router = useRouter();
  const pathname = usePathname();

  const handleLogout = async () => {
    await logout();
    await refreshUser();
    if (protectedRoutes.some((route) => pathname.match(route))) {
      router.push("/");
    }
  };

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <SidebarMenuButton
          size="lg"
          className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
        >
          <Avatar className="h-8 w-8 rounded-lg">
            <AvatarImage
              src="https://i.postimg.cc/xTvwshPT/boy1.png"
              alt={user?.phone}
            />
            <AvatarFallback className="rounded-lg">CN</AvatarFallback>
          </Avatar>
          <div>
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
        </SidebarMenuButton>
      </SidebarMenuItem>
      <Button className="mt-2 cursor-pointer" onClick={handleLogout}>
        <IconLogout />
        Log out
      </Button>
    </SidebarMenu>
  );
}
