import type { Metadata } from "next";
import ContentHeader from "@/components/ContentHeader";
import LegalDisclaimer from "@/components/LegalDisclaimer";
import WovenDivider from "@/components/WovenDivider";

export const metadata: Metadata = {
  title: "À propos",
  description: "La mission de Rariny et les limites importantes à connaître avant de l'utiliser.",
};

export default function AProposPage() {
  return (
    <article>
      <ContentHeader
        eyebrow="À propos"
        title="La mission de ce site"
        lede="Rariny existe pour aider chacun à comprendre ses droits et à s'orienter — pas pour se substituer à la justice ou aux institutions compétentes."
      />

      <div className="mx-auto max-w-3xl px-4 sm:px-6 pb-16">
        <div className="mt-6 rounded-xl border-2 border-laterite bg-laterite/5 p-6">
          <p className="font-display font-bold text-laterite-dark mb-2">
            Ceci n&apos;est pas un dépôt de plainte officiel
          </p>
          <p className="text-sm text-charbon/85 leading-relaxed">
            Rariny ne transmet aucune plainte à une institution en votre nom. Le document PDF
            généré depuis la page « Faire un signalement » est un support que{" "}
            <strong>vous</strong> apportez ou envoyez vous-même à l&apos;organisme compétent. Le
            site n&apos;a aucune existence juridique officielle et n&apos;est rattaché à aucune
            institution de l&apos;État malgache.
          </p>
        </div>

        <div className="prose-content mt-10 space-y-5 text-[15px] leading-relaxed text-charbon/90">
          <h2 className="font-display text-lg font-bold text-indigo">Pourquoi ce site existe</h2>
          <p>
            De nombreuses personnes confrontées à une discrimination raciale à Madagascar ne
            savent pas vers quelle institution se tourner, ni comment structurer les faits vécus
            pour être entendues. Rariny propose un point de départ simple : comprendre le cadre
            légal, formuler clairement une situation vécue, et identifier l&apos;interlocuteur
            compétent.
          </p>

          <h2 className="font-display text-lg font-bold text-indigo pt-2">
            Comment vos données sont traitées
          </h2>
          <ul className="list-disc pl-5 space-y-2">
            <li>
              Le formulaire de signalement n&apos;exige aucun compte, aucune connexion, aucun
              identifiant.
            </li>
            <li>
              La description des faits et vos coordonnées éventuelles ne quittent jamais votre
              appareil : elles servent uniquement à générer votre PDF, localement, dans votre
              navigateur.
            </li>
            <li>
              Seules des informations non identifiantes (type de discrimination, région, mois et
              année, contexte) sont transmises à nos statistiques agrégées — jamais votre
              description ni vos coordonnées.
            </li>
            <li>
              L&apos;Observatoire n&apos;affiche une statistique que si elle regroupe au moins 5
              signalements, afin d&apos;éviter toute ré-identification.
            </li>
          </ul>

          <h2 className="font-display text-lg font-bold text-indigo pt-2">
            Les limites de ce site
          </h2>
          <p>
            Rariny est un outil d&apos;information et d&apos;orientation, pas un service
            juridique. Les contenus juridiques présentés ont été vérifiés au moment de leur
            rédaction, mais la loi évolue : vérifiez toujours les textes en vigueur auprès du
            Journal Officiel de Madagascar ou d&apos;un professionnel du droit avant toute
            démarche formelle.
          </p>
        </div>

        <WovenDivider color="or" className="my-10" />

        <LegalDisclaimer />
      </div>
    </article>
  );
}
