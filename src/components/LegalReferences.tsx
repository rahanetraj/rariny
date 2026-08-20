import { referencesForTag, type LegalReference } from "@/lib/legalContent";

export default function LegalReferences({ tag }: { tag: LegalReference["tags"][number] }) {
  const refs = referencesForTag(tag);
  if (refs.length === 0) return null;

  return (
    <div className="mt-10 rounded-xl border border-ecume-deep bg-ecume p-5 sm:p-6">
      <h3 className="font-display text-sm font-bold uppercase tracking-wide text-indigo mb-4">
        Cadre légal cité
      </h3>
      <ul className="space-y-4">
        {refs.map((ref) => (
          <li key={ref.id} className="border-l-2 border-or pl-4">
            <p className="text-sm font-semibold text-charbon">{ref.title}</p>
            <p className="font-mono text-xs text-laterite-dark mt-0.5">{ref.reference}</p>
            <p className="text-sm text-charbon/75 mt-1.5 leading-relaxed">{ref.summary}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
