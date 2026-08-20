import { NextResponse } from "next/server";
import { z } from "zod";
import { insertReportEntry } from "@/lib/db";
import { REGION_OPTIONS } from "@/lib/regions";
import { CONTEXT_OPTIONS } from "@/lib/formOptions";

export const runtime = "nodejs";

const DISCRIMINATION_TYPES = ["emploi", "services", "en_ligne", "incitation_haine", "autre"] as const;
const CONTEXT_VALUES = CONTEXT_OPTIONS.map((o) => o.value) as [string, ...string[]];
const REGION_VALUES = REGION_OPTIONS as unknown as [string, ...string[]];

const currentYear = new Date().getFullYear();

const reportSchema = z.object({
  discriminationType: z.enum(DISCRIMINATION_TYPES),
  region: z.enum(REGION_VALUES),
  context: z.enum(CONTEXT_VALUES),
  eventMonth: z.number().int().min(1).max(12),
  eventYear: z.number().int().min(currentYear - 10).max(currentYear),
});

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Corps de requête invalide." }, { status: 400 });
  }

  const parsed = reportSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Données invalides." }, { status: 400 });
  }

  try {
    await insertReportEntry(parsed.data);
  } catch (error) {
    console.error("Failed to record report stats", error);
    return NextResponse.json(
      { error: "Impossible d'enregistrer la statistique pour le moment." },
      { status: 500 }
    );
  }

  return NextResponse.json({ ok: true }, { status: 201 });
}
