"use client";

import { LucideIcon } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";

import { cn } from "@/lib/utils";

interface SidebarItemProps {
  icon: LucideIcon;
  label: string;
  href: string;
}

export const SidebarItem = ({ icon: Icon, label, href }: SidebarItemProps) => {
  const pathname = usePathname();
  const router = useRouter();

  const isActive =
    (pathname === "/" && href === "/") ||
    pathname === href ||
    pathname?.startsWith(`${href}/`);

  const onClick = () => {
    router.push(href);
  };

  return (
    <button
      onClick={onClick}
      type="button"
      className={cn(
        "flex h-fit items-center gap-x-2 text-foreground text-sm font-[500] pl-6 transition-all hover:text-slate-600 hover:bg-slate-300/20 mx-3 rounded-xl",
        isActive &&
          " text-primary bg-primary/10  hover:bg-primary/10 hover:text-primary/60"
      )}
    >
      <div className="flex items-center gap-x-2 py-3">
        <Icon
          size={22}
          className={cn(" text-foreground", isActive && "text-primary/80")}
        />
        {label}
      </div>
      {/* <div
        className={cn(
          "ml-auto opacity-0 border-2 border-sky-700 h-full transition-all",
          isActive && "opacity-100"
        )}
      /> */}
    </button>
  );
};
