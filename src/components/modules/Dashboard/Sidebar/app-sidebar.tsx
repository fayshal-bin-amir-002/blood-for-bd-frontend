"use client";

import * as React from "react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { NavMain } from "./nav-main";
import { NavUser } from "./nav-user";
import Link from "next/link";
import {
  HeartHandshake,
  HeartPulse,
  House,
  Images,
  LayoutDashboard,
  Newspaper,
  UsersRound,
} from "lucide-react";

const data = {
  navMain: [
    {
      title: "Home",
      url: "/",
      icon: House,
    },
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: LayoutDashboard,
    },
    {
      title: "User",
      url: "/dashboard/user",
      icon: UsersRound,
    },
    {
      title: "Donor",
      url: "/dashboard/donor",
      icon: HeartHandshake,
    },
    {
      title: "Blog",
      url: "/dashboard/blog",
      icon: Newspaper,
    },
    {
      title: "Gallery",
      url: "/dashboard/gallery",
      icon: Images,
    },
    {
      title: "Donation",
      url: "/dashboard/donation",
      icon: HeartPulse,
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:!p-1.5"
            >
              <Link href="/">
                <span className="text-xl font-semibold">Blood For BD</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
    </Sidebar>
  );
}
