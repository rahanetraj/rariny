import Link from "next/link";
import ContentHeader from "@/components/ContentHeader";
import LegalDisclaimer from "@/components/LegalDisclaimer";
import LegalReferences from "@/components/LegalReferences";
import Markdown from "@/components/Markdown";
import type { ContentPageRecord } from "@/lib/content";

export default function ComprendrePageContent({ page }: { page: ContentPageRecord }) {
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
            Vous vivez une situation de ce type ?{" "}
            <Link href="/signalement" className="text-laterite font-semibold hover:underline">
              Générez votre document de signalement →
            </Link>
          </p>
        </div>

        <LegalReferences tag={page.slug} />
      </div>
    </article>
  );
}
