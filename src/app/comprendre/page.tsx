import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ContentHeader from "@/components/ContentHeader";
import LegalDisclaimer from "@/components/LegalDisclaimer";
import LegalReferences from "@/components/LegalReferences";
import Markdown from "@/components/Markdown";
import { getContentPage } from "@/lib/content";

export const metadata: Metadata = {
  title: "Qu'est-ce que la discrimination raciale ?",
  description: "Définitions simples de la discrimination raciale et cadre légal malgache.",
};
export const dynamic = "force-dynamic";

export default async function ComprendrePage() {
  const page = await getContentPage("definitions");
  if (!page) notFound();

  return (
    <article>
      <ContentHeader eyebrow={page.eyebrow} title={page.title} lede={page.lede} />

      <div className="mx-auto max-w-3xl px-4 sm:px-6 pb-16">
        <div className="mt-6">
          <LegalDisclaimer />
        </div>

        <div className="mt-8">
          <Markdown>{page.bodyMarkdown}</Markdown>
        </div>

        <p className="mt-5 text-[15px] leading-relaxed text-charbon/90">
          Si vous reconnaissez votre situation dans l&apos;une de ces descriptions, vous pouvez{" "}
          <a href="/signalement" className="text-laterite font-medium hover:underline">
            générer un document de signalement
          </a>{" "}
          à apporter à l&apos;institution compétente.
        </p>

        <LegalReferences tag="definitions" />
      </div>
    </article>
  );
}
