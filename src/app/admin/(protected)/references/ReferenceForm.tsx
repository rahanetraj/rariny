import { saveReferenceAction, deleteReferenceAction } from "@/app/admin/actions";
import type { LegalReferenceRecord } from "@/lib/content";

const TAG_OPTIONS: { value: string; label: string }[] = [
  { value: "definitions", label: "Définitions" },
  { value: "travail", label: "Au travail" },
  { value: "services", label: "Services publics" },
  { value: "en_ligne", label: "En ligne" },
  { value: "incitation_haine", label: "Incitation à la haine" },
];

export default function ReferenceForm({ reference }: { reference?: LegalReferenceRecord }) {
  return (
    <div className="space-y-5">
      <form id="reference-form" action={saveReferenceAction} className="space-y-5">
        {reference && <input type="hidden" name="id" value={reference.id} />}

      <div>
        <label htmlFor="title" className="block text-sm font-medium text-charbon mb-1.5">
          Titre
        </label>
        <input
          id="title"
          name="title"
          required
          defaultValue={reference?.title}
          className="w-full rounded-md border border-ecume-deep px-3 py-2.5 text-sm"
        />
      </div>

      <div>
        <label htmlFor="reference" className="block text-sm font-medium text-charbon mb-1.5">
          Référence légale (loi, article)
        </label>
        <input
          id="reference"
          name="reference"
          required
          defaultValue={reference?.reference}
          className="w-full rounded-md border border-ecume-deep px-3 py-2.5 text-sm font-mono"
        />
      </div>

      <div>
        <label htmlFor="summary" className="block text-sm font-medium text-charbon mb-1.5">
          Résumé
        </label>
        <textarea
          id="summary"
          name="summary"
          required
          rows={5}
          defaultValue={reference?.summary}
          className="w-full rounded-md border border-ecume-deep px-3 py-2.5 text-sm leading-relaxed"
        />
      </div>

      <fieldset>
        <legend className="block text-sm font-medium text-charbon mb-2">
          Pages où afficher cette référence
        </legend>
        <div className="flex flex-wrap gap-3">
          {TAG_OPTIONS.map((tag) => (
            <label key={tag.value} className="flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                name="tags"
                value={tag.value}
                defaultChecked={reference?.tags.includes(tag.value as never)}
                className="accent-laterite"
              />
              {tag.label}
            </label>
          ))}
        </div>
      </fieldset>

      <div>
        <label htmlFor="sortOrder" className="block text-sm font-medium text-charbon mb-1.5">
          Ordre d&apos;affichage (les plus petits nombres apparaissent en premier)
        </label>
        <input
          id="sortOrder"
          name="sortOrder"
          type="number"
          defaultValue={reference?.sortOrder ?? 0}
          className="w-32 rounded-md border border-ecume-deep px-3 py-2.5 text-sm"
        />
      </div>

        <button
          type="submit"
          className="px-6 py-2.5 rounded-md bg-laterite text-white text-sm font-semibold hover:bg-laterite-dark"
        >
          Enregistrer
        </button>
      </form>

      {reference && (
        <form action={deleteReferenceAction}>
          <input type="hidden" name="id" value={reference.id} />
          <button type="submit" className="text-sm text-laterite-dark hover:underline">
            Supprimer cette référence
          </button>
        </form>
      )}
    </div>
  );
}
