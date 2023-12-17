import { NavbarRoutes } from "@/components/navbar-routes";
import { Chapter, Course, Purchase, UserProgress } from "@prisma/client";
import { CourseMobileSidebar } from "./course-mobile-sidebar";

interface CourseNavbarProps {
  userId: string;
  purchase: Purchase | null;
  course: Course & {
    chapters: (Chapter & {
      userProgress: UserProgress[] | null;
    })[];
  };
  progressCount: number;
}
export const CourseNavbar = ({
  course,
  progressCount,
  userId,
  purchase,
}: CourseNavbarProps) => {
  return (
    <div className=" p-4 border-b h-full flex items-center bg-white shadow-sm">
      <CourseMobileSidebar
        userId={userId}
        purchase={purchase}
        course={course}
        progressCount={progressCount}
      />
      <NavbarRoutes />
    </div>
  );
};
