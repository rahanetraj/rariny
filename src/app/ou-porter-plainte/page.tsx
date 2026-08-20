import type { Metadata } from "next";
import Link from "next/link";
import ContentHeader from "@/components/ContentHeader";
import { INSTITUTIONS } from "@/lib/institutions";

export const metadata: Metadata = {
  title: "Où porter plainte",
  description: "Les institutions compétentes à Madagascar selon le type de discrimination raciale subie.",
};

export default function OuPorterPlaintePage() {
  const institutions = Object.values(INSTITUTIONS);

  return (
    <article>
      <ContentHeader
        eyebrow="Où porter plainte"
        title="Vers qui vous tourner ?"
        lede="L'institution compétente dépend du contexte de la discrimination subie. Voici les quatre principaux interlocuteurs à Madagascar."
      />

      <div className="mx-auto max-w-3xl px-4 sm:px-6 pb-16">
        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          {institutions.map((inst) => (
            <Link
              key={inst.slug}
              href={`/ou-porter-plainte/${inst.slug}`}
              className="block rounded-xl border border-ecume-deep bg-white p-5 hover:shadow-md hover:-translate-y-0.5 transition-all"
            >
              <h2 className="font-display text-base font-bold text-indigo mb-1.5">
                {inst.shortName}
              </h2>
              <p className="text-sm text-charbon/70 leading-relaxed">{inst.competence}</p>
            </Link>
          ))}
        </div>

        <div className="mt-8 rounded-lg border border-ecume-deep bg-ecume p-5">
          <p className="text-sm text-charbon/80">
            Pas sûr·e de quelle institution contacter ?{" "}
            <Link href="/signalement" className="text-laterite font-semibold hover:underline">
              Le formulaire de signalement vous l&apos;indique automatiquement →
            </Link>
          </p>
        </div>
      </div>
    </article>
  );
}
