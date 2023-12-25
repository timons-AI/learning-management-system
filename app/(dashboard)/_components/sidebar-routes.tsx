"use client";

import { useAuth } from "@clerk/nextjs";
import { BarChart, Compass, Layout, List, Video } from "lucide-react";
import { usePathname } from "next/navigation";
import { use, useEffect, useState } from "react";
import { usePreviewStore } from "@/hooks/use-preview";

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
  // const [isPreviewRoute, setIsPreviewRoute] = useState(false); // Set the isPreviewRoute value to false by default

  const onOpen = usePreviewStore((state) => state.onOpen);
  const onClose = usePreviewStore((state) => state.onClose);
  const isPreview = usePreviewStore((state) => state.isPreview);

  useEffect(() => {
    // check if the pathname includes /preview
    if (pathname?.includes("/preview")) {
      onOpen();
      // if it doesn't, set isPreviewRoute to false
    } else {
      onClose();
    }

    // setIsPreviewRoute(isPreview);
  }, [pathname, isPreview, onOpen, onClose]);

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
      {isPreview && ( // Conditionally render the preview routes only when isPreviewRoute is true
        <>
          <SidebarItem icon={Layout} label="Preview " href="/preview" />
        </>
      )}
    </div>
  );
};
