import type { Metadata } from "next";
import InstitutionDetail from "@/components/InstitutionDetail";

export const metadata: Metadata = { title: "Police / Gendarmerie" };
export const dynamic = "force-dynamic";

export default function Page() {
  return <InstitutionDetail slug="police-gendarmerie" />;
}
