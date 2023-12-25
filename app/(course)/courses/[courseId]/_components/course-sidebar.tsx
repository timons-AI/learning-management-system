import { db } from "@/lib/db";
// import { auth } from "@clerk/nextjs";
import { Chapter, Course, Purchase, UserProgress } from "@prisma/client";
import { CourseSidebarItem } from "./course-sidebar-item";
import { CourseProgress } from "@/components/course-progress";

interface CourseSidebarProps {
  purchase: Purchase | null;
  userId: string;
  course: Course & {
    chapters: (Chapter & {
      userProgress: UserProgress[] | null;
    })[];
  };
  progressCount: number;
}
export const CourseSidebar = ({
  userId,
  purchase,
  course,
  progressCount,
}: CourseSidebarProps) => {
  // const { userId } = auth();

  if (!userId) {
    return null;
  }

  return (
    <div className=" h-full border-r flex flex-col overflow-y-auto shadow-sm ">
      <div className=" p-4 flex flex-col border-b">
        <h1 className=" font-semibold">{course.title}</h1>
        {purchase && (
          <div className=" mt-3">
            <CourseProgress variant="success" value={progressCount} />
          </div>
        )}
      </div>
      <div className=" pt-3 flex flex-col w-full space-y-2">
        {course.chapters.map((chapter) => (
          <CourseSidebarItem
            key={chapter.id}
            id={chapter.id}
            label={chapter.title}
            isCompleted={!!chapter.userProgress?.[0]?.isCompleted}
            courseId={course.id}
            isLocked={!chapter.isFree && !purchase}
          />
        ))}
      </div>
    </div>
  );
};
