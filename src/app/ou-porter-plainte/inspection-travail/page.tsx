import type { Metadata } from "next";
import InstitutionDetail from "@/components/InstitutionDetail";

export const metadata: Metadata = { title: "Inspection du Travail" };

export default function Page() {
  return <InstitutionDetail slug="inspection-travail" />;
}
