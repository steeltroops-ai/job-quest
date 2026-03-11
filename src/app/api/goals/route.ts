import { NextResponse } from "next/server";
import { db } from "@/features/jobs/services/db";

export async function GET() {
  try {
    let goal = await db.goal.findFirst();
    if (!goal) {
      goal = await db.goal.create({ data: { count: 5 } });
    }
    return NextResponse.json(goal);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch goal" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const { count } = await req.json();
    let goal = await db.goal.findFirst();
    
    if (goal) {
      goal = await db.goal.update({
        where: { id: goal.id },
        data: { count },
      });
    } else {
      goal = await db.goal.create({ data: { count } });
    }
    
    return NextResponse.json(goal);
  } catch (error) {
    return NextResponse.json({ error: "Failed to save goal" }, { status: 500 });
  }
}
