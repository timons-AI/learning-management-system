import { Category, Course } from "@prisma/client";
import { getProgress } from "@/actions/get-progress";
import { db } from "@/lib/db";

type CourseWithProgressWithCategory =
  | Course & {
      category: Category | null;
      chapters: { id: string }[];
      progress: number | null;
    };

type GetCourses = {
  userId: string | null;
  title?: string;
  categoryId?: string;
};

export const getCourses = async ({
  userId,
  title,
  categoryId,
}: GetCourses): Promise<CourseWithProgressWithCategory[]> => {
  try {
    if (userId) {
      const courses = await db.course.findMany({
        where: {
          isPublished: true,
          title: {
            contains: title,
            // mode: "insensitive",
          },
          categoryId,
        },
        include: {
          category: true,
          chapters: {
            where: {
              isPublished: true,
            },
            select: {
              id: true,
            },
          },
          purchases: {
            where: {
              userId,
            },
          },
        },
        orderBy: {
          createdAt: "desc",
        },
      });

      const coursesWithProgress: CourseWithProgressWithCategory[] =
        await Promise.all(
          courses.map(async (course) => {
            if (course.purchases.length === 0) {
              return {
                ...course,
                progress: null,
              };
            }

            const progressPercentage = await getProgress(userId, course.id);
            return {
              ...course,
              progress: progressPercentage,
            };
          })
        );
      return coursesWithProgress;
    } else {
      const courses = await db.course.findMany({
        where: {
          isPublished: true,
          title: {
            contains: title,
            // mode: "insensitive",
          },
          categoryId,
        },
        include: {
          category: true,
          chapters: {
            where: {
              isPublished: true,
            },
            select: {
              id: true,
            },
          },
        },
        orderBy: {
          createdAt: "desc",
        },
      });
      // return progress as null if user is not logged in
      const coursesWithProgress: CourseWithProgressWithCategory[] = courses.map(
        (course) => ({
          ...course,
          progress: null,
        })
      );
      return coursesWithProgress;
    }
  } catch (error) {
    console.log("[GET_COURSES]", error);
    return [];
  }
};
