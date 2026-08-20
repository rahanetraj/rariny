import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import ContentHeader from "@/components/ContentHeader";
import LegalDisclaimer from "@/components/LegalDisclaimer";
import LegalReferences from "@/components/LegalReferences";
import Markdown from "@/components/Markdown";
import { getContentPage } from "@/lib/content";

export const metadata: Metadata = {
  title: "Discrimination dans l'accès aux services et lieux publics",
  description: "Vos droits face à une discrimination raciale dans un lieu public ou un service.",
};
export const dynamic = "force-dynamic";

export default async function ServicesPublicsPage() {
  const page = await getContentPage("services-publics");
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
            Vous avez vécu une telle situation ?{" "}
            <Link href="/signalement" className="text-laterite font-semibold hover:underline">
              Générez votre document de signalement →
            </Link>
          </p>
        </div>

        <LegalReferences tag="services" />
      </div>
    </article>
  );
}
