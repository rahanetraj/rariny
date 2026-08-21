import Link from "next/link";
import WovenDivider from "@/components/WovenDivider";

export default function HomePage() {
  return (
    <>
      <section className="relative overflow-hidden">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-24 -top-24 w-[520px] h-[520px] opacity-[0.06]"
        >
          <svg viewBox="0 0 200 200" fill="none" stroke="#16324F" strokeWidth="1.4">
            {Array.from({ length: 9 }).map((_, i) => (
              <path
                key={i}
                d={`M100 100 L${100 + 90 * Math.cos((Math.PI / 8) * (i - 4))} ${
                  100 + 90 * Math.sin((Math.PI / 8) * (i - 4))
                }`}
              />
            ))}
            <circle cx="100" cy="100" r="90" />
            <circle cx="100" cy="100" r="60" />
          </svg>
        </div>

        <div className="mx-auto max-w-6xl px-4 sm:px-6 pt-14 pb-16 sm:pt-20 sm:pb-24 relative">
          <p className="inline-block text-xs font-semibold tracking-wide uppercase text-ravinala bg-ravinala/10 px-3 py-1 rounded-full mb-5">
            Sensibilisation &amp; orientation — Madagascar
          </p>
          <h1 className="font-display text-3xl sm:text-5xl font-bold text-indigo leading-tight max-w-2xl">
            Comprendre vos droits face à la discrimination raciale, et savoir vers qui vous
            tourner.
          </h1>
          <p className="mt-5 text-base sm:text-lg text-charbon/80 max-w-xl leading-relaxed">
            Ce site vous aide à identifier une situation de discrimination raciale, à préparer un
            document récapitulatif clair, et à trouver l&apos;institution compétente à Madagascar —
            en toute confidentialité.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/signalement"
              className="px-6 py-3.5 rounded-md bg-laterite text-white font-semibold hover:bg-laterite-dark transition-colors"
            >
              Faire un signalement
            </Link>
            <Link
              href="/comprendre"
              className="px-6 py-3.5 rounded-md border-2 border-indigo text-indigo font-semibold hover:bg-indigo hover:text-white transition-colors"
            >
              Comprendre mes droits
            </Link>
          </div>

          <p className="mt-6 text-sm text-charbon/60 max-w-xl">
            Aucun compte à créer. Ce site ne dépose pas de plainte officielle en votre nom —{" "}
            <Link href="/a-propos" className="underline hover:text-laterite">
              en savoir plus
            </Link>
            .
          </p>
        </div>
      </section>

      <WovenDivider color="laterite" />

      <section className="mx-auto max-w-6xl px-4 sm:px-6 py-14 sm:py-16">
        <h2 className="font-display text-2xl sm:text-3xl font-bold text-indigo mb-3">
          Comment ça marche
        </h2>
        <p className="text-charbon/70 max-w-2xl mb-10">
          Trois étapes simples, sans engagement, à votre rythme.
        </p>
        <div className="grid gap-6 sm:grid-cols-3">
          <StepCard
            number="1"
            title="Comprendre"
            description="Identifiez ce que dit la loi malgache selon votre situation : travail, services publics, en ligne, incitation à la haine."
            href="/comprendre"
            color="ravinala"
          />
          <StepCard
            number="2"
            title="Signaler"
            description="Remplissez un formulaire simple. Un document PDF récapitulatif est généré directement sur votre appareil, prêt à être imprimé ou envoyé."
            href="/signalement"
            color="laterite"
          />
          <StepCard
            number="3"
            title="S'orienter"
            description="Le document indique l'institution compétente selon votre cas — CNIDH, Inspection du Travail, Police/Gendarmerie ou associations."
            href="/ou-porter-plainte"
            color="or"
          />
        </div>
      </section>

      <WovenDivider color="ravinala" />

      <section className="bg-white">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 py-14 sm:py-16">
          <h2 className="font-display text-2xl sm:text-3xl font-bold text-indigo mb-3">
            Ce que ce site n&apos;est pas
          </h2>
          <div className="mt-4 grid gap-4 sm:grid-cols-2 max-w-3xl">
            <div className="rounded-lg border border-ecume-deep bg-ecume p-5">
              <p className="text-sm font-semibold text-indigo mb-1">Pas un dépôt de plainte</p>
              <p className="text-sm text-charbon/75 leading-relaxed">
                Le PDF généré est un support que vous apportez vous-même à l&apos;institution
                compétente. Rien n&apos;est transmis automatiquement en votre nom.
              </p>
            </div>
            <div className="rounded-lg border border-ecume-deep bg-ecume p-5">
              <p className="text-sm font-semibold text-indigo mb-1">Pas un avis juridique</p>
              <p className="text-sm text-charbon/75 leading-relaxed">
                Les contenus juridiques sont informatifs et doivent être vérifiés auprès de
                sources officielles avant toute démarche formelle.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 sm:px-6 py-14 sm:py-16">
        <div className="flex items-baseline justify-between mb-6 flex-wrap gap-2">
          <h2 className="font-display text-2xl sm:text-3xl font-bold text-indigo">
            L&apos;Observatoire
          </h2>
          <Link href="/observatoire" className="text-sm font-semibold text-laterite hover:underline">
            Voir les statistiques →
          </Link>
        </div>
        <p className="text-charbon/70 max-w-2xl">
          Chaque signalement contribue, de façon totalement anonyme, à des statistiques publiques
          qui aident à mesurer l&apos;ampleur du phénomène à Madagascar — sans jamais exposer les
          personnes concernées.
        </p>
      </section>
    </>
  );
}

function StepCard({
  number,
  title,
  description,
  href,
  color,
}: {
  number: string;
  title: string;
  description: string;
  href: string;
  color: "ravinala" | "laterite" | "or";
}) {
  const colorClasses = {
    ravinala: "bg-ravinala/10 text-ravinala",
    laterite: "bg-laterite/10 text-laterite",
    or: "bg-or/15 text-or",
  }[color];

  return (
    <Link
      href={href}
      className="block rounded-xl border border-ecume-deep bg-white p-6 hover:shadow-md hover:-translate-y-0.5 transition-all"
    >
      <span
        className={`inline-flex items-center justify-center w-9 h-9 rounded-full font-display font-bold text-sm mb-4 ${colorClasses}`}
      >
        {number}
      </span>
      <h3 className="font-display text-lg font-bold text-indigo mb-2">{title}</h3>
      <p className="text-sm text-charbon/75 leading-relaxed">{description}</p>
    </Link>
  );
}
