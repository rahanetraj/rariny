import type { Metadata } from "next";
import ContentHeader from "@/components/ContentHeader";
import LegalDisclaimer from "@/components/LegalDisclaimer";
import LegalReferences from "@/components/LegalReferences";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Incitation à la haine raciale",
  description: "Le Code pénal malgache incrimine la propagande raciste et l'incitation à la haine raciale.",
};

export default function IncitationHainePage() {
  return (
    <article>
      <ContentHeader
        eyebrow="Comprendre"
        title="Incitation à la haine raciale"
        lede="Diffuser des propos ou des contenus qui appellent à la haine ou à la violence envers un groupe racial est une infraction pénale à Madagascar."
      />

      <div className="mx-auto max-w-3xl px-4 sm:px-6 pb-16">
        <div className="mt-6">
          <LegalDisclaimer />
        </div>

        <div className="prose-content mt-8 space-y-5 text-[15px] leading-relaxed text-charbon/90">
          <p>
            Le Code pénal malgache incrimine la propagande raciste et l&apos;incitation à la haine
            raciale, qu&apos;elle vise un individu ou un groupe. Cette infraction est distincte de
            la simple injure : elle suppose un appel — explicite ou implicite — à la haine, à la
            discrimination ou à la violence envers des personnes en raison de leur origine, de
            leur race ou de leur appartenance ethnique.
          </p>
          <p>
            Lorsque cette incitation passe par un média (radio, télévision, presse, plateforme
            numérique), le Code de la communication médiatisée (loi n°2016-029) s&apos;applique
            également, en renvoyant aux peines prévues par le Code pénal.
          </p>
          <p>
            Lorsqu&apos;elle est commise en ligne, la loi sur la cybercriminalité (loi
            n°2014-006, modifiée par la loi n°2016-031) prévoit des peines spécifiques et
            aggravées.
          </p>

          <h2 className="font-display text-lg font-bold text-indigo pt-2">
            Qui est compétent ?
          </h2>
          <p>
            Il s&apos;agit d&apos;une infraction pénale : la <strong>Police</strong> ou la{" "}
            <strong>Gendarmerie</strong> sont compétentes pour recevoir une plainte. La{" "}
            <strong>CNIDH</strong> peut également être saisie pour la dimension atteinte aux
            droits humains, en complément.
          </p>

          <div className="rounded-lg border border-ecume-deep bg-white p-5 not-prose">
            <p className="text-sm text-charbon/80">
              Vous êtes témoin ou victime d&apos;incitation à la haine raciale ?{" "}
              <Link href="/signalement" className="text-laterite font-semibold hover:underline">
                Générez votre document de signalement →
              </Link>
            </p>
          </div>
        </div>

        <LegalReferences tag="incitation_haine" />
      </div>
    </article>
  );
}
