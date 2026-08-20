import type { Metadata } from "next";
import ContentHeader from "@/components/ContentHeader";
import LegalDisclaimer from "@/components/LegalDisclaimer";
import LegalReferences from "@/components/LegalReferences";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Discrimination dans l'accès aux services et lieux publics",
  description: "Vos droits face à une discrimination raciale dans un lieu public ou un service.",
};

export default function ServicesPublicsPage() {
  return (
    <article>
      <ContentHeader
        eyebrow="Comprendre"
        title="Accès aux services et lieux publics"
        lede="Commerces, transports, administrations, établissements scolaires : chacun a droit à un traitement égal, sans distinction d'origine."
      />

      <div className="mx-auto max-w-3xl px-4 sm:px-6 pb-16">
        <div className="mt-6">
          <LegalDisclaimer />
        </div>

        <div className="prose-content mt-8 space-y-5 text-[15px] leading-relaxed text-charbon/90">
          <p>
            La Constitution malgache garantit à chacun un accès égal à l&apos;éducation et à la
            vie culturelle, sans distinction d&apos;origine ou de race (articles 24 à 26). Ce
            principe s&apos;étend, dans son esprit, à l&apos;ensemble des services ouverts au
            public : commerces, restaurants, transports, administrations, établissements de
            santé ou d&apos;enseignement.
          </p>
          <p>
            Concrètement, un refus de vente, d&apos;entrée ou de service, un traitement différent
            et défavorable, ou des propos humiliants fondés sur votre origine dans l&apos;un de
            ces contextes peuvent constituer une discrimination raciale.
          </p>

          <h2 className="font-display text-lg font-bold text-indigo pt-2">
            Qui est compétent ?
          </h2>
          <p>
            La <strong>CNIDH</strong> (Commission Nationale Indépendante des Droits de
            l&apos;Homme) est l&apos;interlocuteur de référence pour ce type de situation. Selon
            la gravité des faits, une plainte pénale peut également être envisagée.
          </p>

          <div className="rounded-lg border border-ecume-deep bg-white p-5 not-prose">
            <p className="text-sm text-charbon/80">
              Vous avez vécu une telle situation ?{" "}
              <Link href="/signalement" className="text-laterite font-semibold hover:underline">
                Générez votre document de signalement →
              </Link>
            </p>
          </div>
        </div>

        <LegalReferences tag="services" />
      </div>
    </article>
  );
}
