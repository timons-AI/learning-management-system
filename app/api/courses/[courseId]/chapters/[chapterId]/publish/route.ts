import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs";
import { db } from "@/lib/db";
export async function PATCH(
    req: Request,
    { params } : { params: { courseId: string; chapterId: string } }
){
    try {
        const { userId } = auth();
        const { courseId, chapterId } = params;
        if(!userId) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        const courseOwner = await db.course.findUnique({
            where: {
                id: courseId,
                userId: userId,
            }
        });

        if(!courseOwner) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        const chapter = await db.chapter.findUnique({
            where: {
                id: chapterId,
                courseId: courseId,
            }
        });

        if(!chapter) {
            return new NextResponse("Not Found", { status: 404 });
        }
        
        const muxData = await db.muxData.findFirst({
            where: {
                chapterId: chapterId,
            }
        });

        if(!chapter || !muxData || !chapter.title || !chapter.description || !chapter.videoUrl) {
            return new NextResponse("Not Found", { status: 404 });
        }

        const publishedChapter = await db.chapter.update({
            where: {
                id: chapterId,
            },
            data: {
                isPublished: true,
            },
        });

        return NextResponse.json(publishedChapter);

    } catch (error) {
        console.log("[CHAPTER_PUBLISH]", error);
        return new NextResponse("Internal Error", { status: 500 });
        
    }
}