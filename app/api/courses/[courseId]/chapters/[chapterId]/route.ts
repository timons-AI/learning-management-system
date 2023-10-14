import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function PATCH(
    req: Request,
    { params } : { params: { courseId: string; chapterId: string } }
) {
    try {
        const { userId} = auth();
        const { courseId } = params;
        const {isPublished, ...values }  = await req.json();

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

        const chapter = await db.chapter.update({
            where: {
                id: params.chapterId,
                courseId: courseId,
            },
            data: {
                ...values,
            },
            }
        );

        // TODO: handle video uplaod


        return NextResponse.json(chapter);

        
    } catch (error) {
        console.log("[COURSE_CHAPTER_ID]", error);
        return new NextResponse("Internal Error", { status: 500 });
        
    }
}