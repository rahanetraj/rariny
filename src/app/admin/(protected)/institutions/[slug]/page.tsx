import { notFound } from "next/navigation";
import { getInstitution } from "@/lib/content";
import InstitutionForm from "../InstitutionForm";

export const metadata = { title: "Modifier une institution" };
export const dynamic = "force-dynamic";

export default async function EditInstitutionPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const institution = await getInstitution(slug);
  if (!institution) notFound();

  return (
    <div>
      <h1 className="font-display text-2xl font-bold text-indigo mb-6">{institution.shortName}</h1>
      <InstitutionForm institution={institution} />
    </div>
  );
}
