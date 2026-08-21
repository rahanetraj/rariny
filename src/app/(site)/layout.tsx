import Header from "@/components/Header";
import Footer from "@/components/Footer";
import MobileReportCta from "@/components/MobileReportCta";
import { getAideNavLinks, getComprendreNavLinks } from "@/lib/nav";

export default async function SiteLayout({ children }: { children: React.ReactNode }) {
  const [comprendreLinks, aideLinks] = await Promise.all([getComprendreNavLinks(), getAideNavLinks()]);

  return (
    <>
      <Header comprendreLinks={comprendreLinks} aideLinks={aideLinks} />
      <main id="contenu-principal" className="flex-1 pb-20 lg:pb-0">
        {children}
      </main>
      <Footer />
      <MobileReportCta />
    </>
  );
}
