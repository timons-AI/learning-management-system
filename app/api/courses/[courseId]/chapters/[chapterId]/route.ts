import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import Mux from "@mux/mux-node";

const { Video } = new Mux(
    process.env.MUX_TOKEN_ID!,
    process.env.MUX_TOKEN_SECRET!
);

export async function DELETE(
    req: Request,
    { params } : { params: { courseId: string; chapterId: string } }
) {
    try {
        const { userId} = auth();
        const { courseId } = params;

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
                id: params.chapterId,
                courseId: courseId,
            }
        });

        if(!chapter) {
            return new NextResponse("Not Found", { status: 404 });
        }

        if (chapter.videoUrl) {      

            const existingMuxData = await db.muxData.findFirst({
                where: {
                    chapterId: params.chapterId,
                }
            });

        if (existingMuxData) {
            await Video.Assets.del(existingMuxData.assetId);
            await db.muxData.delete({
                where: {
                    id: existingMuxData.id,
                }
            });
        }
        }

        const deletedChapter = await db.chapter.delete({
            where: {
                id: params.chapterId,
            },
        });

        const publishedChaptersInCourse = await db.chapter.findMany({
            where: {
                courseId: params.courseId,
                isPublished: true,
            }
        })

        if(!publishedChaptersInCourse.length) {
            await db.course.update({
                where: {
                    id: params.courseId,
                },
                data: {
                    isPublished: false,
                }
            })
        }

        return NextResponse.json(deletedChapter);


    } catch (error) {
        console.log("[COURSE_CHAPTER_ID_DELETE]", error);
        return new NextResponse("Internal Error", { status: 500 });
        
    }
}


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

        if ( values.videoUrl) {
            const existingMuxData = await db.muxData.findFirst({
                where: {
                    chapterId: params.chapterId,
                }
            });

            if (existingMuxData) {
                await Video.Assets.del(existingMuxData.assetId);
                await db.muxData.delete({
                    where: {
                        id: existingMuxData.id,
                    }
                });
            }


            const asset = await Video.Assets.create({
                input: values.videoUrl,
                playback_policy: "public",
                test: false,
            });

            await db.muxData.create({
                data: {
                    playbackId: asset.playback_ids?.[0]?.id,
                    assetId: asset.id,
                    chapterId: params.chapterId,
                }
            });

        }


        return NextResponse.json(chapter);

        
    } catch (error) {
        console.log("[COURSE_CHAPTER_ID]", error);
        return new NextResponse("Internal Error", { status: 500 });
        
    }
}