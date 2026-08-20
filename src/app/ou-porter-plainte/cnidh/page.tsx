import type { Metadata } from "next";
import InstitutionDetail from "@/components/InstitutionDetail";

export const metadata: Metadata = { title: "CNIDH" };
export const dynamic = "force-dynamic";

export default function Page() {
  return <InstitutionDetail slug="cnidh" />;
}
