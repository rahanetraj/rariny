import { NextResponse } from "next/server";
import { getStats } from "@/lib/db";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const stats = await getStats();
    return NextResponse.json(stats);
  } catch (error) {
    console.error("Failed to load stats", error);
    return NextResponse.json({ error: "Impossible de charger les statistiques." }, { status: 500 });
  }
}
