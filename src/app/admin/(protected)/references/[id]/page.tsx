import { notFound } from "next/navigation";
import { getContentPages, getLegalReference } from "@/lib/content";
import ReferenceForm from "../ReferenceForm";

export const metadata = { title: "Modifier une référence juridique" };
export const dynamic = "force-dynamic";

export default async function EditReferencePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const [reference, pages] = await Promise.all([getLegalReference(id), getContentPages()]);
  if (!reference) notFound();
  const pageOptions = pages.map((p) => ({ value: p.slug, label: p.title }));

  return (
    <div>
      <h1 className="font-display text-2xl font-bold text-indigo mb-6">Modifier la référence</h1>
      <ReferenceForm reference={reference} pageOptions={pageOptions} />
    </div>
  );
}
