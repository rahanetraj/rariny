import ReferenceForm from "../ReferenceForm";
import { getContentPages } from "@/lib/content";

export const metadata = { title: "Nouvelle référence juridique" };
export const dynamic = "force-dynamic";

export default async function NewReferencePage() {
  const pages = await getContentPages();
  const pageOptions = pages.map((p) => ({ value: p.slug, label: p.title }));

  return (
    <div>
      <h1 className="font-display text-2xl font-bold text-indigo mb-6">Nouvelle référence juridique</h1>
      <ReferenceForm pageOptions={pageOptions} />
    </div>
  );
}
