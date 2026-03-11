import { NextResponse } from "next/server";
import { db } from "@/features/jobs/services/db";

export async function GET() {
  try {
    const apps = await db.jobApplication.findMany({
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json(apps);
  } catch (error) {
    console.error("GET /api/jobs error:", error);
    return NextResponse.json({ error: "Failed to fetch jobs" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    // Simple validation
    if (!body.company || !body.role) {
      return NextResponse.json({ error: "Company and Role are required" }, { status: 400 });
    }

    // Clean up numeric ID if it exists (for fresh creation)
    const { id, createdAt, updatedAt, ...data } = body;

    const app = await db.jobApplication.create({
      data: {
        ...data,
      },
    });
    return NextResponse.json(app);
  } catch (error) {
    console.error("POST /api/jobs error:", error);
    return NextResponse.json({ error: "Failed to create job" }, { status: 500 });
  }
}
