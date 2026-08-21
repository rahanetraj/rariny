import type { Metadata } from "next";
import InstitutionDetail from "@/components/InstitutionDetail";
import { getInstitution } from "@/lib/content";

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const institution = await getInstitution(slug);
  return { title: institution?.shortName ?? "Institution" };
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  return <InstitutionDetail slug={slug} />;
}
