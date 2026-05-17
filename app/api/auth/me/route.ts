import { NextResponse } from "next/server";

import { connectDB } from "@/lib/db";
import { getAuthUser } from "@/lib/auth";
import { User } from "@/models/User";

export async function GET() {
  try {
    await connectDB();

    const authUser = await getAuthUser();

    const user = await User.findById(authUser.userId).select(
      "-password"
    );

    if (!user) {
      return NextResponse.json(
        {
          success: false,
          message: "User not found",
        },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        data: user,
      },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);

    return NextResponse.json(
      {
        success: false,
        message: "Unauthorized",
      },
      { status: 401 }
    );
  }
}