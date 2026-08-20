import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ComprendrePageContent from "@/components/ComprendrePageContent";
import { getContentPage, INDEX_PAGE_SLUG } from "@/lib/content";

export const metadata: Metadata = {
  title: "Qu'est-ce que la discrimination raciale ?",
  description: "Définitions simples de la discrimination raciale et cadre légal malgache.",
};
export const dynamic = "force-dynamic";

export default async function ComprendrePage() {
  const page = await getContentPage(INDEX_PAGE_SLUG);
  if (!page) notFound();

  return <ComprendrePageContent page={page} />;
}
