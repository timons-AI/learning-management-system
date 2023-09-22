"use client";
import { LayoutDashboard, Compass } from "lucide-react";
import { SidebarItem } from "./sidebar-item";
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
export const SidebarRoutes = () => {
    const routes = guestRotues;
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