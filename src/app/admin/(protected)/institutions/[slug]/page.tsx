import { notFound } from "next/navigation";
import { getInstitution } from "@/lib/content";
import { saveInstitutionAction } from "@/app/admin/actions";
import type { InstitutionSlug } from "@/lib/institutions";

export const metadata = { title: "Modifier une institution" };
export const dynamic = "force-dynamic";

export default async function EditInstitutionPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const institution = await getInstitution(slug as InstitutionSlug);
  if (!institution) notFound();

  return (
    <div>
      <h1 className="font-display text-2xl font-bold text-indigo mb-6">{institution.shortName}</h1>

      <form action={saveInstitutionAction} className="space-y-5">
        <input type="hidden" name="slug" value={institution.slug} />

        <Field label="Nom complet" name="name" defaultValue={institution.name} />
        <Field label="Nom court" name="shortName" defaultValue={institution.shortName} />
        <TextAreaField label="Mission" name="mission" defaultValue={institution.mission} />
        <TextAreaField label="Compétence" name="competence" defaultValue={institution.competence} />
        <TextAreaField label="Adresse" name="address" defaultValue={institution.address ?? ""} rows={3} />
        <Field
          label="Téléphone(s) — séparés par une virgule"
          name="phone"
          defaultValue={institution.phone.join(", ")}
        />
        <Field label="Site web" name="website" defaultValue={institution.website ?? ""} />
        <Field label="Horaires" name="hours" defaultValue={institution.hours ?? ""} />
        <TextAreaField label="Note" name="note" defaultValue={institution.note ?? ""} rows={3} />

        <button
          type="submit"
          className="px-6 py-2.5 rounded-md bg-laterite text-white text-sm font-semibold hover:bg-laterite-dark"
        >
          Enregistrer
        </button>
      </form>
    </div>
  );
}

function Field({ label, name, defaultValue }: { label: string; name: string; defaultValue: string }) {
  return (
    <div>
      <label htmlFor={name} className="block text-sm font-medium text-charbon mb-1.5">
        {label}
      </label>
      <input
        id={name}
        name={name}
        defaultValue={defaultValue}
        className="w-full rounded-md border border-ecume-deep px-3 py-2.5 text-sm"
      />
    </div>
  );
}

function TextAreaField({
  label,
  name,
  defaultValue,
  rows = 4,
}: {
  label: string;
  name: string;
  defaultValue: string;
  rows?: number;
}) {
  return (
    <div>
      <label htmlFor={name} className="block text-sm font-medium text-charbon mb-1.5">
        {label}
      </label>
      <textarea
        id={name}
        name={name}
        rows={rows}
        defaultValue={defaultValue}
        className="w-full rounded-md border border-ecume-deep px-3 py-2.5 text-sm leading-relaxed"
      />
    </div>
  );
}
