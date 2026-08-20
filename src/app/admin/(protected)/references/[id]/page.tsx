import { notFound } from "next/navigation";
import { getLegalReference } from "@/lib/content";
import ReferenceForm from "../ReferenceForm";

export const metadata = { title: "Modifier une référence juridique" };
export const dynamic = "force-dynamic";

export default async function EditReferencePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const reference = await getLegalReference(id);
  if (!reference) notFound();

  return (
    <div>
      <h1 className="font-display text-2xl font-bold text-indigo mb-6">Modifier la référence</h1>
      <ReferenceForm reference={reference} />
    </div>
  );
}
