import { notFound } from "next/navigation";
import { getContentPage } from "@/lib/content";
import PageForm from "../PageForm";

export const metadata = { title: "Modifier une page" };
export const dynamic = "force-dynamic";

export default async function EditContentPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const page = await getContentPage(slug);
  if (!page) notFound();

  return (
    <div>
      <h1 className="font-display text-2xl font-bold text-indigo mb-6">{page.title}</h1>
      <PageForm page={page} />
    </div>
  );
}
