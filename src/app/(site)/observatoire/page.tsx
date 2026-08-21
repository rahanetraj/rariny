import type { Metadata } from "next";
import ContentHeader from "@/components/ContentHeader";
import { getStats } from "@/lib/db";
import { MonthlyChart, RegionChart, TypeChart } from "@/components/ObservatoireCharts";
import WovenDivider from "@/components/WovenDivider";

export const metadata: Metadata = {
  title: "Observatoire",
  description: "Statistiques anonymisées et agrégées des signalements de discrimination raciale à Madagascar.",
};

export const dynamic = "force-dynamic";

export default async function ObservatoirePage() {
  const stats = await getStats();

  return (
    <article>
      <ContentHeader
        eyebrow="Observatoire"
        title="Statistiques anonymisées"
        lede="Chaque signalement contribue, de façon totalement anonyme, à mesurer l'ampleur de la discrimination raciale signalée à Madagascar."
      />

      <div className="mx-auto max-w-4xl px-4 sm:px-6 pb-16">
        <div className="mt-6 rounded-lg border border-or/40 bg-or/10 px-4 py-3">
          <p className="text-sm text-indigo leading-relaxed">
            Pour protéger l&apos;anonymat des personnes concernées, une catégorie n&apos;est
            affichée que si elle regroupe au moins <strong>{stats.threshold}</strong> signalements.
            Certaines répartitions peuvent donc rester incomplètes.
          </p>
        </div>

        <div className="mt-8 rounded-xl border border-ecume-deep bg-white p-6 flex items-baseline gap-3">
          <p className="font-mono text-4xl font-bold text-indigo">{stats.totalReports}</p>
          <p className="text-sm text-charbon/70">signalement{stats.totalReports > 1 ? "s" : ""} enregistré{stats.totalReports > 1 ? "s" : ""} au total (toutes catégories confondues)</p>
        </div>

        <WovenDivider color="ravinala" className="my-10" />

        <ChartSection title="Signalements par mois" data={stats.byMonth}>
          <MonthlyChart data={stats.byMonth} />
        </ChartSection>

        <ChartSection title="Répartition par type de discrimination" data={stats.byType}>
          <TypeChart data={stats.byType} />
        </ChartSection>

        <ChartSection title="Répartition par région" data={stats.byRegion}>
          <RegionChart data={stats.byRegion} />
        </ChartSection>
      </div>
    </article>
  );
}

function ChartSection({
  title,
  data,
  children,
}: {
  title: string;
  data: { key: string; count: number }[];
  children: React.ReactNode;
}) {
  return (
    <section className="mb-12">
      <h2 className="font-display text-lg font-bold text-indigo mb-4">{title}</h2>
      {data.length === 0 ? (
        <div className="rounded-xl border border-dashed border-ecume-deep bg-white p-8 text-center">
          <p className="text-sm text-charbon/60">
            Pas encore assez de données pour afficher cette statistique en toute confidentialité.
          </p>
        </div>
      ) : (
        <div className="rounded-xl border border-ecume-deep bg-white p-5">{children}</div>
      )}
    </section>
  );
}
