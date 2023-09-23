"use client";
import { LayoutDashboard, Compass, List, BarChart } from "lucide-react";
import { SidebarItem } from "./sidebar-item";
import { usePathname } from "next/navigation";
const guestRotues = [
    {
        icon: LayoutDashboard,
        label: "Dashboard",
        href: "/",
    },
    {
        icon: Compass,
        label: "Browse",
        href: "/search",
    },
    
];

const teacherRoutes = [
    {
        icon: List,
        label: "Dashboard",
        href: "/teacher/courses",
    },
    {
        icon: BarChart,
        label: "Analytics",
        href: "/teacher/analytics",
    },
];
export const SidebarRoutes = () => {
    const pathname = usePathname();
    const isTeacherPage = pathname?.includes("/teacher");
    const routes = isTeacherPage ? teacherRoutes : guestRotues;
    return (
        <div className=" flex flex-col w-full">
            {routes.map((route)=>(
                <SidebarItem
                    key={route.href}
                    icon={route.icon}
                    label={route.label}
                    href={route.href}
                 />
            ))}
        </div>
    )
}