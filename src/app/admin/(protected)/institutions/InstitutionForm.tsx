import { saveInstitutionAction, createInstitutionAction, deleteInstitutionAction } from "@/app/admin/actions";
import type { InstitutionRecord } from "@/lib/content";

export default function InstitutionForm({
  institution,
  error,
}: {
  institution?: InstitutionRecord;
  error?: string;
}) {
  const isNew = !institution;

  return (
    <div className="space-y-5">
      <form action={isNew ? createInstitutionAction : saveInstitutionAction} className="space-y-5">
        {error && (
          <p role="alert" className="text-sm text-laterite-dark bg-laterite/10 rounded-md px-3 py-2">
            {error}
          </p>
        )}

        <div>
          <label htmlFor="slug" className="block text-sm font-medium text-charbon mb-1.5">
            Adresse (slug) — apparaîtra sur /ou-porter-plainte/&lt;adresse&gt;
          </label>
          <input
            id="slug"
            name="slug"
            required
            readOnly={!isNew}
            defaultValue={institution?.slug}
            placeholder="ex. mediateur-regional"
            className={`w-full rounded-md border border-ecume-deep px-3 py-2.5 text-sm font-mono ${
              !isNew ? "bg-ecume text-charbon/60" : ""
            }`}
          />
        </div>

        <Field label="Nom complet" name="name" defaultValue={institution?.name} />
        <Field label="Nom court" name="shortName" defaultValue={institution?.shortName} />
        <TextAreaField label="Mission" name="mission" defaultValue={institution?.mission} />
        <TextAreaField label="Compétence" name="competence" defaultValue={institution?.competence} />
        <TextAreaField label="Adresse" name="address" defaultValue={institution?.address ?? ""} rows={3} />
        <Field
          label="Téléphone(s) — séparés par une virgule"
          name="phone"
          defaultValue={institution?.phone.join(", ")}
        />
        <Field label="Site web" name="website" defaultValue={institution?.website ?? ""} />
        <Field label="Horaires" name="hours" defaultValue={institution?.hours ?? ""} />
        <TextAreaField label="Note" name="note" defaultValue={institution?.note ?? ""} rows={3} />

        <button
          type="submit"
          className="px-6 py-2.5 rounded-md bg-laterite text-white text-sm font-semibold hover:bg-laterite-dark"
        >
          Enregistrer
        </button>
      </form>

      {!isNew && (
        <form action={deleteInstitutionAction}>
          <input type="hidden" name="slug" value={institution.slug} />
          <button type="submit" className="text-sm text-laterite-dark hover:underline">
            Supprimer cette institution
          </button>
        </form>
      )}
    </div>
  );
}

function Field({ label, name, defaultValue }: { label: string; name: string; defaultValue?: string }) {
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
  defaultValue?: string;
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
