import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import ComprendrePageContent from "@/components/ComprendrePageContent";
import { getContentPage, INDEX_PAGE_SLUG } from "@/lib/content";

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const page = await getContentPage(slug);
  return { title: page?.title ?? "Comprendre" };
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  if (slug === INDEX_PAGE_SLUG) redirect("/comprendre");

  const page = await getContentPage(slug);
  if (!page) notFound();

  return <ComprendrePageContent page={page} />;
}
