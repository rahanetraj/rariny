import Link from "next/link";
import { getLegalReferences, getContentPages } from "@/lib/content";
import { getInstitutions } from "@/lib/content";

export const metadata = { title: "Tableau de bord" };
export const dynamic = "force-dynamic";

export default async function AdminDashboardPage() {
  const [references, institutions, pages] = await Promise.all([
    getLegalReferences(),
    getInstitutions(),
    getContentPages(),
  ]);

  return (
    <div>
      <h1 className="font-display text-2xl font-bold text-indigo mb-6">Tableau de bord</h1>
      <div className="grid gap-4 sm:grid-cols-3">
        <Link
          href="/admin/references"
          className="block rounded-xl border border-ecume-deep bg-white p-5 hover:shadow-md transition-shadow"
        >
          <p className="font-mono text-3xl font-bold text-indigo">{references.length}</p>
          <p className="text-sm text-charbon/70 mt-1">références juridiques</p>
        </Link>
        <Link
          href="/admin/institutions"
          className="block rounded-xl border border-ecume-deep bg-white p-5 hover:shadow-md transition-shadow"
        >
          <p className="font-mono text-3xl font-bold text-indigo">{institutions.length}</p>
          <p className="text-sm text-charbon/70 mt-1">institutions</p>
        </Link>
        <Link
          href="/admin/pages"
          className="block rounded-xl border border-ecume-deep bg-white p-5 hover:shadow-md transition-shadow"
        >
          <p className="font-mono text-3xl font-bold text-indigo">{pages.length}</p>
          <p className="text-sm text-charbon/70 mt-1">pages « Comprendre »</p>
        </Link>
      </div>
    </div>
  );
}
