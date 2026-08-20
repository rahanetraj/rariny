import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import ContentHeader from "@/components/ContentHeader";
import LegalDisclaimer from "@/components/LegalDisclaimer";
import LegalReferences from "@/components/LegalReferences";
import Markdown from "@/components/Markdown";
import { getContentPage } from "@/lib/content";

export const metadata: Metadata = {
  title: "Discrimination au travail",
  description: "Ce que dit le Code du Travail malgache sur la discrimination raciale à l'emploi.",
};
export const dynamic = "force-dynamic";

export default async function TravailPage() {
  const page = await getContentPage("travail");
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

        <div className="mt-6 rounded-lg border border-ecume-deep bg-white p-5">
          <p className="text-sm text-charbon/80">
            Vous vivez une situation de discrimination au travail ?{" "}
            <Link href="/signalement" className="text-laterite font-semibold hover:underline">
              Générez votre document de signalement →
            </Link>
          </p>
        </div>

        <LegalReferences tag="travail" />
      </div>
    </article>
  );
}
