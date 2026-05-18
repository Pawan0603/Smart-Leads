import { NextRequest, NextResponse } from "next/server";

import { connectDB } from "@/lib/db";
import { getAuthUser } from "@/lib/auth";
import { Lead } from "@/models/Lead";
import { SortOrder } from "mongoose";

export async function POST(req: NextRequest) {
  try {
    await connectDB();

    const authUser = await getAuthUser();

    const body = await req.json();

    const { name, email, source, status } = body;

    if (!name || !email || !source) {
      return NextResponse.json(
        {
          success: false,
          message: "Name, email and source are required",
        },
        { status: 400 }
      );
    }

    const lead = await Lead.create({
      name,
      email,
      source,
      status,
      createdBy: authUser.userId,
    });

    return NextResponse.json(
      {
        success: true,
        message: "Lead created successfully",
        data: lead,
      },
      { status: 201 }
    );
  } catch (error) {
    console.log(error);

    return NextResponse.json(
      {
        success: false,
        message: "Internal server error",
      },
      { status: 500 }
    );
  }
}


export async function GET(req: NextRequest) {
  try {
    await connectDB();

    await getAuthUser();

    const searchParams = req.nextUrl.searchParams;

    const page = Number(searchParams.get("page")) || 1;
    const limit = 10;

    const search = searchParams.get("search") || "";
    const status = searchParams.get("status");
    const source = searchParams.get("source");
    const sort = searchParams.get("sort") || "latest";

    const query: any = {};

    if (status) {
      query.status = status;
    }

    if (source) {
      query.source = source;
    }

    if (search) {
      query.$or = [
        {
          name: {
            $regex: search,
            $options: "i",
          },
        },
        {
          email: {
            $regex: search,
            $options: "i",
          },
        },
      ];
    }

    const sortOption: { createdAt: SortOrder } =
      sort === "oldest"
        ? { createdAt: 1 }
        : { createdAt: -1 };

    const total = await Lead.countDocuments(query);

    const leads = await Lead.find(query)
      .populate("createdBy", "name email role")
      .sort(sortOption)
      .skip((page - 1) * limit)
      .limit(limit);

    return NextResponse.json(
      {
        success: true,
        data: leads,

        pagination: {
          total,
          page,
          limit,
          totalPages: Math.ceil(total / limit),
        },
      },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);

    return NextResponse.json(
      {
        success: false,
        error: "Internal server error",
      },
      { status: 500 }
    );
  }
}