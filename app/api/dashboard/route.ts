import { NextResponse } from "next/server";

import { connectDB } from "@/lib/db";
import { getAuthUser } from "@/lib/auth";
import { Lead, LeadSource, LeadStatus } from "@/models/Lead";

export async function GET() {
  try {
    await connectDB();

    await getAuthUser();

    // Total Leads
    const totalLeads = await Lead.countDocuments();

    // Status Counts
    const newLeads = await Lead.countDocuments({
      status: LeadStatus.NEW,
    });

    const contactedLeads = await Lead.countDocuments({
      status: LeadStatus.CONTACTED,
    });

    const qualifiedLeads = await Lead.countDocuments({
      status: LeadStatus.QUALIFIED,
    });

    const lostLeads = await Lead.countDocuments({
      status: LeadStatus.LOST,
    });

    // Source Analytics
    const websiteLeads = await Lead.countDocuments({
      source: LeadSource.WEBSITE,
    });

    const instagramLeads = await Lead.countDocuments({
      source: LeadSource.INSTAGRAM,
    });

    const referralLeads = await Lead.countDocuments({
      source: LeadSource.REFERRAL,
    });

    // Recent Leads
    const recentLeads = await Lead.find()
      .sort({ createdAt: -1 })
      .limit(5)
      .select("name email status");

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

          recentLeads,
        },
      },
      { status: 200 }
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