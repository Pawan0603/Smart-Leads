import { NextRequest, NextResponse } from "next/server";

import { connectDB } from "@/lib/db";

import { getAuthUser } from "@/lib/auth";

import { Lead } from "@/models/Lead";

import "@/models/User";

export async function DELETE(
  req: NextRequest,
  context: {
    params: Promise<{
      id: string;
    }>;
  }
) {
  try {
    await connectDB();

    const authUser = await getAuthUser();

    const { id } = await context.params;

    const lead = await Lead.findById(id);

    if (!lead) {
      return NextResponse.json(
        {
          success: false,
          message: "Lead not found",
        },
        { status: 404 }
      );
    }

    // ==========================
    // AUTHORIZATION CHECK
    // ==========================

    const isAdmin =
      authUser.role === "Admin";

    const isOwner =
      lead.createdBy.toString() ===
      authUser.userId;

    if (!isAdmin && !isOwner) {
      return NextResponse.json(
        {
          success: false,
          message:
            "You are not authorized to delete this lead",
        },
        { status: 403 }
      );
    }

    await Lead.findByIdAndDelete(id);

    return NextResponse.json(
      {
        success: true,
        message: "Lead deleted successfully",
      },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);

    return NextResponse.json(
      {
        success: false,
        message:
          error instanceof Error
            ? error.message
            : "Internal server error",
      },
      { status: 500 }
    );
  }
}