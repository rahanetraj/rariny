import type { Metadata } from "next";
import ContentHeader from "@/components/ContentHeader";
import LegalDisclaimer from "@/components/LegalDisclaimer";
import LegalReferences from "@/components/LegalReferences";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Discrimination au travail",
  description: "Ce que dit le Code du Travail malgache sur la discrimination raciale à l'emploi.",
};

export default function TravailPage() {
  return (
    <article>
      <ContentHeader
        eyebrow="Comprendre"
        title="Discrimination au travail"
        lede="À l'embauche, en poste ou lors d'un licenciement : le Code du Travail malgache protège contre la discrimination fondée sur l'origine ou la race."
      />

      <div className="mx-auto max-w-3xl px-4 sm:px-6 pb-16">
        <div className="mt-6">
          <LegalDisclaimer />
        </div>

        <div className="prose-content mt-8 space-y-5 text-[15px] leading-relaxed text-charbon/90">
          <p>
            Le Code du Travail malgache interdit explicitement toute discrimination fondée sur la
            race, la couleur, l&apos;ascendance ou l&apos;origine nationale. Cette protection
            couvre l&apos;ensemble du parcours professionnel :
          </p>
          <ul className="list-disc pl-5 space-y-2">
            <li>L&apos;accès à l&apos;emploi (annonce, entretien, sélection).</li>
            <li>La rémunération, à travail égal.</li>
            <li>Les conditions de travail et les possibilités d&apos;évolution.</li>
            <li>Les sanctions disciplinaires et le licenciement.</li>
          </ul>
          <p>
            Madagascar a par ailleurs ratifié deux conventions fondamentales de l&apos;Organisation
            Internationale du Travail (OIT) qui renforcent ce cadre : la Convention n°100 sur
            l&apos;égalité de rémunération, et la Convention n°111 sur la discrimination en
            matière d&apos;emploi et de profession.
          </p>

          <h2 className="font-display text-lg font-bold text-indigo pt-2">
            Qui est compétent ?
          </h2>
          <p>
            L&apos;<strong>Inspection du Travail</strong> est l&apos;autorité chargée de constater
            et de traiter les manquements au Code du Travail, y compris les situations de
            discrimination raciale en contexte professionnel. Chaque région dispose d&apos;une
            Direction Régionale du Travail.
          </p>

          <div className="rounded-lg border border-ecume-deep bg-white p-5 not-prose">
            <p className="text-sm text-charbon/80">
              Vous vivez une situation de discrimination au travail ?{" "}
              <Link href="/signalement" className="text-laterite font-semibold hover:underline">
                Générez votre document de signalement →
              </Link>
            </p>
          </div>
        </div>

        <LegalReferences tag="travail" />
      </div>
    </article>
  );
}
