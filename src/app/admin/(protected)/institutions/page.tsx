import Link from "next/link";
import { getInstitutions } from "@/lib/content";

export const metadata = { title: "Institutions" };
export const dynamic = "force-dynamic";

export default async function AdminInstitutionsPage() {
  const institutions = await getInstitutions();

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="font-display text-2xl font-bold text-indigo">Institutions</h1>
        <Link
          href="/admin/institutions/new"
          className="px-4 py-2 rounded-md bg-laterite text-white text-sm font-semibold hover:bg-laterite-dark"
        >
          + Nouvelle institution
        </Link>
      </div>
      <div className="space-y-3">
        {institutions.map((inst) => (
          <Link
            key={inst.slug}
            href={`/admin/institutions/${inst.slug}`}
            className="block rounded-lg border border-ecume-deep bg-white p-4 hover:shadow-md transition-shadow"
          >
            <p className="font-semibold text-charbon">{inst.shortName}</p>
            <p className="text-xs text-charbon/60 mt-1">{inst.address ?? "Aucune adresse renseignée"}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
