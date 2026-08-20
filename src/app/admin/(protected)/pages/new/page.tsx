import PageForm from "../PageForm";

export const metadata = { title: "Nouvelle page Comprendre" };

export default async function NewContentPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const { error } = await searchParams;

  return (
    <div>
      <h1 className="font-display text-2xl font-bold text-indigo mb-6">Nouvelle page « Comprendre »</h1>
      <PageForm error={error ? decodeURIComponent(error) : undefined} />
    </div>
  );
}
