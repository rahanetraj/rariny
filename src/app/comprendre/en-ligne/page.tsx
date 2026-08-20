import type { Metadata } from "next";
import ContentHeader from "@/components/ContentHeader";
import LegalDisclaimer from "@/components/LegalDisclaimer";
import LegalReferences from "@/components/LegalReferences";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Discrimination en ligne et sur les réseaux sociaux",
  description: "La loi malgache sur la cybercriminalité sanctionne les injures et diffamations discriminatoires en ligne.",
};

export default function EnLignePage() {
  return (
    <article>
      <ContentHeader
        eyebrow="Comprendre"
        title="Discrimination en ligne / réseaux sociaux"
        lede="Les injures et diffamations à caractère raciste commises en ligne sont pénalement sanctionnées, avec des peines aggravées."
      />

      <div className="mx-auto max-w-3xl px-4 sm:px-6 pb-16">
        <div className="mt-6">
          <LegalDisclaimer />
        </div>

        <div className="prose-content mt-8 space-y-5 text-[15px] leading-relaxed text-charbon/90">
          <p>
            La loi n°2014-006 du 17 juillet 2014 sur la lutte contre la cybercriminalité,
            modifiée par la loi n°2016-031, sanctionne spécifiquement les injures et diffamations
            commises en ligne à raison de l&apos;origine, de l&apos;appartenance (ou non) à une
            ethnie, une nation, une race ou une religion. Ces peines sont aggravées par rapport à
            une injure « ordinaire ».
          </p>
          <p>
            Le Code de la communication médiatisée (loi n°2016-029) complète ce dispositif en
            réprimant l&apos;utilisation des médias — y compris numériques — pour inciter à la
            haine, à la xénophobie ou à la discrimination.
          </p>

          <h2 className="font-display text-lg font-bold text-indigo pt-2">
            Avant de signaler : conservez les preuves
          </h2>
          <ul className="list-disc pl-5 space-y-2">
            <li>Faites des captures d&apos;écran datées du contenu (message, commentaire, publication).</li>
            <li>Notez le nom de compte ou pseudonyme de l&apos;auteur, et l&apos;URL si possible.</li>
            <li>Évitez de supprimer vos échanges avec l&apos;auteur, ils peuvent servir de preuve.</li>
          </ul>

          <h2 className="font-display text-lg font-bold text-indigo pt-2">
            Qui est compétent ?
          </h2>
          <p>
            La <strong>Police Nationale</strong> (division de lutte contre la cybercriminalité) et
            la <strong>Gendarmerie</strong> sont compétentes pour ces infractions pénales. La CNIDH
            reste également mobilisable pour la dimension « atteinte aux droits humains ».
          </p>

          <div className="rounded-lg border border-ecume-deep bg-white p-5 not-prose">
            <p className="text-sm text-charbon/80">
              Vous avez été visé·e en ligne ?{" "}
              <Link href="/signalement" className="text-laterite font-semibold hover:underline">
                Générez votre document de signalement →
              </Link>
            </p>
          </div>
        </div>

        <LegalReferences tag="en_ligne" />
      </div>
    </article>
  );
}
