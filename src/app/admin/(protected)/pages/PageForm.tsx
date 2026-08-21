import Link from "next/link";
import { saveContentPageAction, createContentPageAction, deleteContentPageAction } from "@/app/admin/actions";
import { INDEX_PAGE_SLUG, type ContentPageRecord } from "@/lib/content";
import SubmitButton from "@/components/SubmitButton";

function publicPath(slug: string): string {
  return slug === INDEX_PAGE_SLUG ? "/comprendre" : `/comprendre/${slug}`;
}

export default function PageForm({
  page,
  error,
}: {
  page?: ContentPageRecord;
  error?: string;
}) {
  const isNew = !page;

  return (
    <div className="space-y-5">
      {!isNew && (
        <div className="flex justify-end -mt-2">
          <Link
            href={publicPath(page.slug)}
            target="_blank"
            className="text-sm text-laterite font-medium hover:underline"
          >
            Voir la page publique →
          </Link>
        </div>
      )}

      <form action={isNew ? createContentPageAction : saveContentPageAction} className="space-y-5">
        {error && (
          <p role="alert" className="text-sm text-laterite-dark bg-laterite/10 rounded-md px-3 py-2">
            {error}
          </p>
        )}

        <div>
          <label htmlFor="slug" className="block text-sm font-medium text-charbon mb-1.5">
            Adresse (slug) — apparaîtra sur /comprendre/&lt;adresse&gt;
          </label>
          <input
            id="slug"
            name="slug"
            required
            readOnly={!isNew}
            defaultValue={page?.slug}
            placeholder="ex. logement"
            className={`w-full rounded-md border border-ecume-deep px-3 py-2.5 text-sm font-mono ${
              !isNew ? "bg-ecume text-charbon/60" : ""
            }`}
          />
        </div>

        <div>
          <label htmlFor="eyebrow" className="block text-sm font-medium text-charbon mb-1.5">
            Étiquette (au-dessus du titre)
          </label>
          <input
            id="eyebrow"
            name="eyebrow"
            defaultValue={page?.eyebrow ?? "Comprendre"}
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
            defaultValue={page?.title}
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
            defaultValue={page?.lede}
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
            defaultValue={page?.bodyMarkdown}
            className="w-full rounded-md border border-ecume-deep px-3 py-2.5 text-sm font-mono leading-relaxed"
          />
        </div>

        <SubmitButton pendingLabel={isNew ? "Création…" : "Enregistrement…"}>
          Enregistrer
        </SubmitButton>
      </form>

      {!isNew && page.slug !== INDEX_PAGE_SLUG && (
        <form action={deleteContentPageAction}>
          <input type="hidden" name="slug" value={page.slug} />
          <SubmitButton
            pendingLabel="Suppression…"
            className="text-sm text-laterite-dark hover:underline disabled:opacity-60"
          >
            Supprimer cette page
          </SubmitButton>
        </form>
      )}
    </div>
  );
}
