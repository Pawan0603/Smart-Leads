import { NextResponse } from "next/server";

import { connectDB } from "@/lib/db";

import { getAuthUser } from "@/lib/auth";

import { authorizeRoles } from "@/lib/roles";

import {
  Lead,
  LeadStatus,
  LeadSource,
} from "@/models/Lead";

import { User } from "@/models/User";

export async function GET() {
  try {
    await connectDB();

    const authUser = await getAuthUser();

    // Admin Only Access
    authorizeRoles(authUser.role, ["Admin"]);

    // =========================
    // LEADS STATS
    // =========================

    const totalLeads =
      await Lead.countDocuments();

    const newLeads =
      await Lead.countDocuments({
        status: LeadStatus.NEW,
      });

    const contactedLeads =
      await Lead.countDocuments({
        status: LeadStatus.CONTACTED,
      });

    const qualifiedLeads =
      await Lead.countDocuments({
        status: LeadStatus.QUALIFIED,
      });

    const lostLeads =
      await Lead.countDocuments({
        status: LeadStatus.LOST,
      });

    // =========================
    // SOURCE ANALYTICS
    // =========================

    const websiteLeads =
      await Lead.countDocuments({
        source: LeadSource.WEBSITE,
      });

    const instagramLeads =
      await Lead.countDocuments({
        source: LeadSource.INSTAGRAM,
      });

    const referralLeads =
      await Lead.countDocuments({
        source: LeadSource.REFERRAL,
      });

    // =========================
    // USERS
    // =========================

    const users = await User.find()
      .select("-password")
      .sort({ createdAt: -1 });

    return NextResponse.json(
      {
        success: true,

        data: {
          stats: {
            totalLeads,
            newLeads,
            contactedLeads,
            qualifiedLeads,
            lostLeads,
          },

          sources: {
            website: websiteLeads,
            instagram: instagramLeads,
            referral: referralLeads,
          },

          users,
        },
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