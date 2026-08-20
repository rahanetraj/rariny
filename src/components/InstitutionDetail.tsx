import Link from "next/link";
import { INSTITUTIONS, type InstitutionSlug } from "@/lib/institutions";
import ContentHeader from "@/components/ContentHeader";

export default function InstitutionDetail({ slug }: { slug: InstitutionSlug }) {
  const institution = INSTITUTIONS[slug];

  return (
    <article>
      <ContentHeader eyebrow="Où porter plainte" title={institution.name} lede={institution.mission} />

      <div className="mx-auto max-w-3xl px-4 sm:px-6 pb-16">
        <div className="mt-6 rounded-xl border border-ecume-deep bg-white p-6">
          <h2 className="font-display text-sm font-bold uppercase tracking-wide text-ravinala mb-2">
            Compétence
          </h2>
          <p className="text-sm text-charbon/85 leading-relaxed">{institution.competence}</p>
        </div>

        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          {institution.address && (
            <InfoBlock label="Adresse">
              <p className="text-sm text-charbon/85 leading-relaxed">{institution.address}</p>
            </InfoBlock>
          )}
          {institution.hours && (
            <InfoBlock label="Horaires">
              <p className="text-sm text-charbon/85 leading-relaxed">{institution.hours}</p>
            </InfoBlock>
          )}
          {institution.phone && institution.phone.length > 0 && (
            <InfoBlock label="Téléphone">
              <ul className="text-sm text-charbon/85 space-y-1">
                {institution.phone.map((p) => (
                  <li key={p} className="font-mono">
                    {p}
                  </li>
                ))}
              </ul>
            </InfoBlock>
          )}
          {institution.website && (
            <InfoBlock label="Site web">
              <a
                href={institution.website}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-laterite font-medium hover:underline break-all"
              >
                {institution.website}
              </a>
            </InfoBlock>
          )}
        </div>

        {institution.note && (
          <p className="mt-6 text-sm text-charbon/60 italic leading-relaxed">{institution.note}</p>
        )}

        <div className="mt-8 rounded-lg border border-ecume-deep bg-ecume p-5">
          <p className="text-sm text-charbon/80">
            Préparez votre dossier avant de vous déplacer :{" "}
            <Link href="/signalement" className="text-laterite font-semibold hover:underline">
              générez votre document de signalement →
            </Link>
          </p>
        </div>
      </div>
    </article>
  );
}

function InfoBlock({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="rounded-lg border border-ecume-deep bg-white p-4">
      <p className="text-xs font-semibold uppercase tracking-wide text-indigo mb-1.5">{label}</p>
      {children}
    </div>
  );
}
