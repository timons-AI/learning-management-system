// import Stripe from "stripe";
import { currentUser } from "@clerk/nextjs";
import { NextResponse } from "next/server";

import { db } from "@/lib/db";
// import { stripe } from "@/lib/stripe";

export async function POST(
  req: Request,
  { params }: { params: { courseId: string } }
) {
  try {
    const { username, token } = await req.json();
    const user = await currentUser();

    if (!user || !user.id || !user.emailAddresses?.[0]?.emailAddress) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const course = await db.course.findUnique({
      where: {
        id: params.courseId,
        isPublished: true,
      },
    });

    const purchase = await db.purchase.findUnique({
      where: {
        userId_courseId: {
          userId: user.id,
          courseId: params.courseId,
        },
      },
    });

    if (purchase) {
      return new NextResponse("Already purchased", { status: 400 });
    }

    if (!course) {
      return new NextResponse("Not found", { status: 404 });
    }
    // console.log("[COURSE_ID_CHECKOUT]", course);
    // ckeck if the token is valid

    const tokenCheck = await db.token.findUnique({
      where: {
        token: token,
        tokenCustomer: username,
      },
    });
    if (!tokenCheck) {
      // console.log("[COURSE_ID_CHECKOUT] the token is invalid");
      return new NextResponse("Invalid token", { status: 400 });
    }

    console.log("[COURSE_ID_CHECKOUT]", tokenCheck);
    // update the token table to add the user id
    await db.token.update({
      where: {
        token: token,
        tokenCustomer: username,
      },
      data: {
        userId: user.id,
      },
    });

    // update the purchase table to add the user id
    await db.purchase.create({
      data: {
        userId: user.id,
        courseId: params.courseId,
      },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.log("[COURSE_ID_CHECKOUT]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
