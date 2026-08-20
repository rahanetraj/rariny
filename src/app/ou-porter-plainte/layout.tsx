import SectionSubNav from "@/components/SectionSubNav";
import { getAideNavLinks } from "@/lib/nav";

export const dynamic = "force-dynamic";

export default async function OuPorterPlainteLayout({ children }: { children: React.ReactNode }) {
  const links = await getAideNavLinks();

  return (
    <>
      <SectionSubNav links={links} />
      {children}
    </>
  );
}
