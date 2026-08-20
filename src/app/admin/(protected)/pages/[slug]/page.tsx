import { notFound } from "next/navigation";
import Link from "next/link";
import { getContentPage, CONTENT_PAGE_SLUGS, type ContentPageSlug } from "@/lib/content";
import { saveContentPageAction } from "@/app/admin/actions";

export const metadata = { title: "Modifier une page" };
export const dynamic = "force-dynamic";

const PUBLIC_PATH: Record<ContentPageSlug, string> = {
  definitions: "/comprendre",
  travail: "/comprendre/travail",
  "services-publics": "/comprendre/services-publics",
  "en-ligne": "/comprendre/en-ligne",
  "incitation-haine": "/comprendre/incitation-haine",
};

export default async function EditContentPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  if (!CONTENT_PAGE_SLUGS.includes(slug as ContentPageSlug)) notFound();

  const page = await getContentPage(slug as ContentPageSlug);
  if (!page) notFound();

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="font-display text-2xl font-bold text-indigo">{page.title}</h1>
        <Link
          href={PUBLIC_PATH[page.slug]}
          target="_blank"
          className="text-sm text-laterite font-medium hover:underline"
        >
          Voir la page publique →
        </Link>
      </div>

      <form action={saveContentPageAction} className="space-y-5">
        <input type="hidden" name="slug" value={page.slug} />

        <div>
          <label htmlFor="eyebrow" className="block text-sm font-medium text-charbon mb-1.5">
            Étiquette (au-dessus du titre)
          </label>
          <input
            id="eyebrow"
            name="eyebrow"
            defaultValue={page.eyebrow}
            className="w-full rounded-md border border-ecume-deep px-3 py-2.5 text-sm"
          />
        </div>

        <div>
          <label htmlFor="title" className="block text-sm font-medium text-charbon mb-1.5">
            Titre
          </label>
          <input
            id="title"
            name="title"
            defaultValue={page.title}
            className="w-full rounded-md border border-ecume-deep px-3 py-2.5 text-sm"
          />
        </div>

        <div>
          <label htmlFor="lede" className="block text-sm font-medium text-charbon mb-1.5">
            Chapô (phrase d&apos;introduction)
          </label>
          <textarea
            id="lede"
            name="lede"
            rows={2}
            defaultValue={page.lede}
            className="w-full rounded-md border border-ecume-deep px-3 py-2.5 text-sm leading-relaxed"
          />
        </div>

        <div>
          <label htmlFor="bodyMarkdown" className="block text-sm font-medium text-charbon mb-1.5">
            Corps du texte (Markdown — <code className="font-mono">## Titre</code>,{" "}
            <code className="font-mono">**gras**</code>, <code className="font-mono">- liste</code>)
          </label>
          <textarea
            id="bodyMarkdown"
            name="bodyMarkdown"
            rows={20}
            defaultValue={page.bodyMarkdown}
            className="w-full rounded-md border border-ecume-deep px-3 py-2.5 text-sm font-mono leading-relaxed"
          />
        </div>

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
