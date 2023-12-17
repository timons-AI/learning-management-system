"use client";
import { Menu } from "lucide-react";
import { Chapter, Course, UserProgress } from "@prisma/client";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

import { CourseSidebar } from "./course-sidebar";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { useMobileCourseSidebar } from "@/hooks/use-mobile-course-sidebar";
import { Button } from "@/components/ui/button";

interface CourseMobileSidebarProps {
  course: Course & {
    chapters: (Chapter & {
      userProgress: UserProgress[] | null;
    })[];
  };
  progressCount: number;
}

export const CourseMobileSidebar = ({
  course,
  progressCount,
}: CourseMobileSidebarProps) => {
  const pathname = usePathname();
  const [isMounted, setIsMounted] = useState(false);
  const onOpen = useMobileCourseSidebar((state) => state.onOpen);
  const onClose = useMobileCourseSidebar((state) => state.onClose);
  const isOpen = useMobileCourseSidebar((state) => state.isOpen);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    onClose();
  }, [pathname, onClose]);

  if (!isMounted) {
    return null;
  }
  return (
    <>
      <Button
        onClick={onOpen}
        className=" block md:hidden mr-2"
        variant="ghost"
        size="sm"
      >
        <Menu className=" h-4 w-4" />
      </Button>
      <Sheet open={isOpen} onOpenChange={onClose}>
        {/* <SheetTrigger className=" md:hidden pr-4 hover:opacity-75 transition">
            <Menu/>
        </SheetTrigger> */}
        <SheetContent side="left" className=" p-2 pt-10">
          <CourseSidebar course={course} progressCount={progressCount} />
        </SheetContent>
      </Sheet>
    </>
  );
};
