import type { Metadata } from "next";
import ContentHeader from "@/components/ContentHeader";
import ReportForm from "@/components/ReportForm";
import { getInstitutions } from "@/lib/content";

export const metadata: Metadata = {
  title: "Faire un signalement",
  description:
    "Générez un document récapitulatif de signalement à apporter vous-même à l'institution compétente.",
};
export const dynamic = "force-dynamic";

export default async function SignalementPage() {
  const institutions = await getInstitutions();

  return (
    <article>
      <ContentHeader
        eyebrow="Signalement"
        title="Décrivez ce que vous avez vécu"
        lede="Ce formulaire génère un document PDF sur votre appareil — rien n'est envoyé sous une forme identifiable. Ce n'est pas un dépôt de plainte officiel."
      />
      <div className="mx-auto max-w-2xl px-4 sm:px-6 pb-20">
        <ReportForm institutions={institutions} />
      </div>
    </article>
  );
}
