import type { Metadata } from "next";
import { IBM_Plex_Sans, IBM_Plex_Mono, Sora } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import MobileReportCta from "@/components/MobileReportCta";
import { getAideNavLinks, getComprendreNavLinks } from "@/lib/nav";

const sora = Sora({
  variable: "--font-sora",
  subsets: ["latin"],
  weight: ["600", "700", "800"],
});

const plexSans = IBM_Plex_Sans({
  variable: "--font-plex-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

const plexMono = IBM_Plex_Mono({
  variable: "--font-plex-mono",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  title: {
    default: "Rariny — Contre la discrimination raciale à Madagascar",
    template: "%s · Rariny",
  },
  description:
    "Comprendre le cadre légal malgache sur la discrimination raciale, générer un document de signalement, et savoir où s'adresser à Madagascar.",
};

export default async function RootLayout({ children }: LayoutProps<"/">) {
  const [comprendreLinks, aideLinks] = await Promise.all([getComprendreNavLinks(), getAideNavLinks()]);

  return (
    <html
      lang="fr"
      className={`${sora.variable} ${plexSans.variable} ${plexMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-ecume text-charbon">
        <Header comprendreLinks={comprendreLinks} aideLinks={aideLinks} />
        <main id="contenu-principal" className="flex-1 pb-20 lg:pb-0">
          {children}
        </main>
        <Footer />
        <MobileReportCta />
      </body>
    </html>
  );
}
