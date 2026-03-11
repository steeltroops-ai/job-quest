import { NextResponse } from "next/server";
import { db } from "@/features/jobs/services/db";

export async function GET() {
  try {
    const tasks = await db.goalTask.findMany({
      orderBy: { createdAt: "asc" },
    });
    return NextResponse.json(tasks);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch tasks" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const task = await db.goalTask.create({
      data: {
        text: body.text,
        note: body.note,
        done: body.done || false,
        category: body.category || "Execution",
      },
    });
    return NextResponse.json(task);
  } catch (error) {
    return NextResponse.json({ error: "Failed to create task" }, { status: 500 });
  }
}
