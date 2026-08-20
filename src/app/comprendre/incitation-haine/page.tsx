import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import ContentHeader from "@/components/ContentHeader";
import LegalDisclaimer from "@/components/LegalDisclaimer";
import LegalReferences from "@/components/LegalReferences";
import Markdown from "@/components/Markdown";
import { getContentPage } from "@/lib/content";

export const metadata: Metadata = {
  title: "Incitation à la haine raciale",
  description: "Le Code pénal malgache incrimine la propagande raciste et l'incitation à la haine raciale.",
};
export const dynamic = "force-dynamic";

export default async function IncitationHainePage() {
  const page = await getContentPage("incitation-haine");
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
            Vous êtes témoin ou victime d&apos;incitation à la haine raciale ?{" "}
            <Link href="/signalement" className="text-laterite font-semibold hover:underline">
              Générez votre document de signalement →
            </Link>
          </p>
        </div>

        <LegalReferences tag="incitation_haine" />
      </div>
    </article>
  );
}
