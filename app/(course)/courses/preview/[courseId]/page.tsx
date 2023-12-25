import { db } from "@/lib/db";
import { redirect } from "next/navigation";
import { auth } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import Link from "next/link";
export const PreviewCourse = async ({
  params,
}: {
  params: { courseId: string };
}) => {
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
    return redirect("/");
  }
  //   return redirect(`/courses/${course.id}/chapters/${course.chapters[0].id}`);
  return (
    <div>
      <h1>Preview Course</h1>
      <p>{course.title}</p>
      {userId && <p>{userId}</p>}
      <Link href={`/courses/${course.id}/chapters/${course.chapters[0].id}`}>
        <Button>Start Course</Button>
      </Link>
    </div>
  );
};

export default PreviewCourse;
