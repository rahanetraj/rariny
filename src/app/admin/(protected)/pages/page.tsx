import Link from "next/link";
import { getContentPages } from "@/lib/content";

export const metadata = { title: "Pages Comprendre" };
export const dynamic = "force-dynamic";

export default async function AdminPagesPage() {
  const pages = await getContentPages();

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="font-display text-2xl font-bold text-indigo">Pages « Comprendre »</h1>
        <Link
          href="/admin/pages/new"
          className="px-4 py-2 rounded-md bg-laterite text-white text-sm font-semibold hover:bg-laterite-dark"
        >
          + Nouvelle page
        </Link>
      </div>
      <div className="space-y-3">
        {pages.map((page) => (
          <Link
            key={page.slug}
            href={`/admin/pages/${page.slug}`}
            className="block rounded-lg border border-ecume-deep bg-white p-4 hover:shadow-md transition-shadow"
          >
            <p className="font-semibold text-charbon">{page.title}</p>
            <p className="text-xs text-charbon/60 mt-1">{page.lede}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
