import Link from "next/link";
import { getContentPages } from "@/lib/content";

export const metadata = { title: "Pages Comprendre" };
export const dynamic = "force-dynamic";

export default async function AdminPagesPage() {
  const pages = await getContentPages();

  return (
    <div>
      <h1 className="font-display text-2xl font-bold text-indigo mb-6">Pages « Comprendre »</h1>
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
