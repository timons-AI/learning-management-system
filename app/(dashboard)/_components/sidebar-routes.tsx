"use client";

import { useAuth } from "@clerk/nextjs";
import { BarChart, Compass, Layout, List } from "lucide-react";
import { usePathname } from "next/navigation";

import { SidebarItem } from "./sidebar-item";

const guestRoutes = [
  // {
  //   icon: Layout,
  //   label: "Dashboard",
  //   href: "/dashboard",
  // },
  {
    icon: Compass,
    label: "Browse",
    href: "/browse",
  },
];

const studentRoutes = [
  {
    icon: Layout,
    label: "Dashboard",
    href: "/dashboard",
  },
  {
    icon: Compass,
    label: "Browse",
    href: "/browse",
  },
];

const teacherRoutes = [
  {
    icon: List,
    label: "Courses",
    href: "/teacher/courses",
  },
  {
    icon: BarChart,
    label: "Analytics",
    href: "/teacher/analytics",
  },
];

export const SidebarRoutes = () => {
  const { userId } = useAuth();

  const pathname = usePathname();

  const isTeacherPage = pathname?.includes("/teacher");

  const loggedInRoutes = isTeacherPage ? teacherRoutes : studentRoutes;

  // if user is not logged in, show guest routes
  const routes = userId ? loggedInRoutes : guestRoutes;

  return (
    <div className="flex flex-col w-full space-y-2">
      {routes.map((route) => (
        <SidebarItem
          key={route.href}
          icon={route.icon}
          label={route.label}
          href={route.href}
        />
      ))}
    </div>
  );
};
