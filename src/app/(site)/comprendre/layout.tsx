import SectionSubNav from "@/components/SectionSubNav";
import { getComprendreNavLinks } from "@/lib/nav";

export const dynamic = "force-dynamic";

export default async function ComprendreLayout({ children }: { children: React.ReactNode }) {
  const links = await getComprendreNavLinks();

  return (
    <>
      <SectionSubNav links={links} />
      {children}
    </>
  );
}
