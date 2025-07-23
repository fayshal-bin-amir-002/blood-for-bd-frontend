import {
  HeartHandshake,
  House,
  Images,
  LayoutDashboard,
  Newspaper,
  ScrollText,
  UsersRound,
} from "lucide-react";

export const dashboardSidebarLinks = {
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
      title: "Testimonial",
      url: "/dashboard/testimonial",
      icon: ScrollText,
    },
  ],
};
