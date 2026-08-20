import InstitutionForm from "../InstitutionForm";

export const metadata = { title: "Nouvelle institution" };

export default async function NewInstitutionPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const { error } = await searchParams;

  return (
    <div>
      <h1 className="font-display text-2xl font-bold text-indigo mb-6">Nouvelle institution</h1>
      <InstitutionForm error={error ? decodeURIComponent(error) : undefined} />
    </div>
  );
}
