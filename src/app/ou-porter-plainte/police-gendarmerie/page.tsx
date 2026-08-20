import type { Metadata } from "next";
import InstitutionDetail from "@/components/InstitutionDetail";

export const metadata: Metadata = { title: "Police / Gendarmerie" };

export default function Page() {
  return <InstitutionDetail slug="police-gendarmerie" />;
}
