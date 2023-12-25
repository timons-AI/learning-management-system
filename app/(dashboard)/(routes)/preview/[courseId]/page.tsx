import { db } from "@/lib/db";
import { redirect } from "next/navigation";
import { auth } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Book, Loader2, Lock } from "lucide-react";
import { IconBadge } from "@/components/icon-badge";

import { getPreview } from "@/actions/get-preview";
import { VideoPlayer } from "@/app/(course)/courses/[courseId]/chapters/[chapterId]/_components/video-player";
import { PreviewVideoPlayer } from "./_components/video-player";
import { Progress } from "@/components/ui/progress";
import { getProgress } from "@/actions/get-progress";
import { CourseProgress } from "@/components/course-progress";

const PreviewCourse = async ({ params }: { params: { courseId: string } }) => {
  const { userId } = auth();

  const course = await db.course.findUnique({
    where: {
      id: params.courseId,
    },
    include: {
      chapters: {
        where: {
          isPublished: true,
        },
        orderBy: {
          position: "asc",
        },
      },
    },
  });
  if (!course) {
    return redirect("/browse");
  }
  const {
    chapter,
    // course,
    muxData,
    attachments,
    nextChapter,
    userProgress,
    purchase,
  } = await getPreview({
    userId,
    chapterId: course.chapters[0].id,
    courseId: params.courseId,
  });

  if (!chapter || !course) {
    return redirect("/browse");
  }

  const progressCount = userId && (await getProgress(userId, course.id));

  const isLocked = !chapter.isFree && !purchase;

  return (
    <div className=" p-4 space-x-4 flex w-full">
      <div className="col-span-2 md:col-span-1 flex flex-col w-[60%] space-y-4">
        <PreviewVideoPlayer
          title={chapter.title}
          playbackId={muxData?.playbackId!}
          isLocked={isLocked}
        />

        <div className=" p-3 border rounded-md">
          <h1 className="text-xll font-semibold mb-4">{course.title}</h1>
          <p className="mb-4 text-sm text-muted-foreground">
            {course.description}
          </p>
          <div className=" w-fit flex gap-2 text-sm">
            <IconBadge icon={Book} size="sm" /> {course.chapters.length}{" "}
            Chapters
          </div>

          {progressCount && (
            <div className=" m-2">
              <CourseProgress variant="default" value={progressCount} />
            </div>
          )}
        </div>
      </div>

      <div className="  flex-grow flex flex-col gap-4 md:col-span-2">
        <div className="border rounded-md p-4 w-full flex flex-col gap-2  items-center h-[40%]  justify-center ">
          {progressCount ? (
            <div className=" flex flex-col items-center justify-center space-y-2">
              <h1>Continue from where you stopped</h1>
              <p className="text-sm text-muted-foreground">
                You have completed {progressCount}% of this course.
              </p>
              <Link
                // className=" w-full"
                href={`/courses/${course.id}/chapters/${chapter.id}`}
              >
                <Button variant="default">Continue Learning </Button>
              </Link>
            </div>
          ) : (
            <div className=" flex flex-col items-center justify-center space-y-2">
              <h1>Enroll Now and Start learning</h1>
              <p className="text-sm text-muted-foreground">
                Get access to all the courses
              </p>
              <Link href={`/courses/${course.id}/chapters/${chapter.id}`}>
                <Button>Enroll Now </Button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PreviewCourse;
