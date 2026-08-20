import type { Metadata } from "next";
import ContentHeader from "@/components/ContentHeader";
import LegalDisclaimer from "@/components/LegalDisclaimer";
import LegalReferences from "@/components/LegalReferences";

export const metadata: Metadata = {
  title: "Qu'est-ce que la discrimination raciale ?",
  description: "Définitions simples de la discrimination raciale et cadre légal malgache.",
};

export default function ComprendrePage() {
  return (
    <article>
      <ContentHeader
        eyebrow="Comprendre"
        title="Qu'est-ce que la discrimination raciale ?"
        lede="Avant d'agir, il est utile de savoir précisément de quoi on parle — et ce que la loi malgache en dit."
      />

      <div className="mx-auto max-w-3xl px-4 sm:px-6 pb-16">
        <div className="mt-6">
          <LegalDisclaimer />
        </div>

        <div className="prose-content mt-8 space-y-5 text-[15px] leading-relaxed text-charbon/90">
          <p>
            La <strong>discrimination raciale</strong> désigne le fait de traiter une personne ou
            un groupe de personnes de façon défavorable en raison de leur origine réelle ou
            supposée, de leur couleur de peau, de leur ethnie, de leur ascendance ou de leur
            nationalité — dans l&apos;accès à un droit, un service, un emploi ou un espace public.
          </p>
          <p>
            Elle peut être <strong>directe</strong> (un refus explicite fondé sur l&apos;origine
            d&apos;une personne) ou <strong>indirecte</strong> (une règle en apparence neutre qui
            désavantage en pratique un groupe en particulier). Elle peut aussi prendre la forme de
            propos, d&apos;insultes ou de contenus incitant à la haine envers un groupe racial ou
            ethnique.
          </p>
          <p>
            À Madagascar, le principe d&apos;égalité est inscrit dans la Constitution elle-même :
            tous les individus sont égaux en droit, sans distinction fondée notamment sur
            l&apos;origine ou la race. Ce principe se décline ensuite dans plusieurs textes selon
            le contexte — travail, services publics, communication en ligne — que vous pouvez
            explorer dans les pages suivantes de cette section.
          </p>

          <h2 className="font-display text-lg font-bold text-indigo pt-2">
            Reconnaître une situation de discrimination raciale
          </h2>
          <ul className="list-disc pl-5 space-y-2">
            <li>Un refus d&apos;embauche, de logement ou de service motivé par votre origine.</li>
            <li>Des propos, injures ou moqueries répétées visant votre origine ou votre couleur de peau.</li>
            <li>Un traitement différent et défavorable dans un lieu public (commerce, transport, administration).</li>
            <li>Des contenus en ligne qui vous ciblent ou incitent à la haine contre un groupe racial ou ethnique.</li>
          </ul>

          <p>
            Si vous reconnaissez votre situation dans l&apos;une de ces descriptions, vous pouvez{" "}
            explorer la page correspondant à votre contexte, puis{" "}
            <a href="/signalement" className="text-laterite font-medium hover:underline">
              générer un document de signalement
            </a>{" "}
            à apporter à l&apos;institution compétente.
          </p>
        </div>

        <LegalReferences tag="definitions" />
      </div>
    </article>
  );
}
