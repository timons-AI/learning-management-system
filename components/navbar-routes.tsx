"use client";
import { UserButton, useAuth } from "@clerk/nextjs";
import { usePathname } from "next/navigation";
import { Button } from "./ui/button";
import { LogOut } from "lucide-react";
import Link from "next/link";
import { SearchInput } from "./search-input";
import { isTeacher } from "@/lib/teacher";
import { Logo } from "@/app/(dashboard)/_components/logo";
export const NavbarRoutes = () => {
  const pathname = usePathname();

  const isTeacherPage = pathname?.startsWith("/teacher");
  const isPlayerPage = pathname?.includes("/courses");
  const isSearchPage = pathname === "/browse";
  const { userId } = useAuth();

  return (
    <div className=" flex items-center  justify-between w-full">
      <div className="p-6 flex">
        <Logo />
      </div>
      {isSearchPage && (
        <div className=" hidden md:block">
          <SearchInput />
        </div>
      )}
      <div className=" flex gap-x-2 ">
        {isTeacherPage || isPlayerPage ? (
          <Link href="/">
            <Button size="sm" variant="ghost">
              <LogOut className=" h-4 w-4 mr-2" />
              Exit
            </Button>
          </Link>
        ) : isTeacher(userId) ? (
          <Link href="/teacher/courses">
            <Button size="sm" variant="ghost">
              Teacher Mode
            </Button>
          </Link>
        ) : null}
        {!userId && (
          <Link href="/login">
            <Button size="sm" variant="outline">
              Login / Sign Up
            </Button>
          </Link>
        )}
        <UserButton afterSignOutUrl="/" />
      </div>
    </div>
  );
};
