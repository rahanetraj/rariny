import Link from "next/link";
import { getLegalReferences } from "@/lib/content";

export const metadata = { title: "Références juridiques" };
export const dynamic = "force-dynamic";

export default async function AdminReferencesPage() {
  const references = await getLegalReferences();

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="font-display text-2xl font-bold text-indigo">Références juridiques</h1>
        <Link
          href="/admin/references/new"
          className="px-4 py-2 rounded-md bg-laterite text-white text-sm font-semibold hover:bg-laterite-dark"
        >
          + Nouvelle référence
        </Link>
      </div>

      <div className="space-y-3">
        {references.map((ref) => (
          <Link
            key={ref.id}
            href={`/admin/references/${ref.id}`}
            className="block rounded-lg border border-ecume-deep bg-white p-4 hover:shadow-md transition-shadow"
          >
            <p className="font-semibold text-charbon">{ref.title}</p>
            <p className="text-xs text-charbon/60 font-mono mt-1">{ref.reference}</p>
            <p className="text-xs text-ravinala mt-1">{ref.tags.join(", ")}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
