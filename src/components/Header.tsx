"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const COMPRENDRE_LINKS = [
  { href: "/comprendre", label: "Qu'est-ce que la discrimination raciale ?" },
  { href: "/comprendre/travail", label: "Discrimination au travail" },
  { href: "/comprendre/services-publics", label: "Accès aux services et lieux publics" },
  { href: "/comprendre/en-ligne", label: "Discrimination en ligne" },
  { href: "/comprendre/incitation-haine", label: "Incitation à la haine raciale" },
];

const AIDE_LINKS = [
  { href: "/ou-porter-plainte", label: "Vue d'ensemble" },
  { href: "/ou-porter-plainte/cnidh", label: "CNIDH" },
  { href: "/ou-porter-plainte/inspection-travail", label: "Inspection du Travail" },
  { href: "/ou-porter-plainte/police-gendarmerie", label: "Police / Gendarmerie" },
  { href: "/ou-porter-plainte/associations", label: "Associations / ONDH" },
];

function NavGroup({
  label,
  links,
  currentPath,
}: {
  label: string;
  links: { href: string; label: string }[];
  currentPath: string;
}) {
  const active = links.some((l) => currentPath === l.href);
  return (
    <div className="relative group">
      <button
        className={`px-3 py-2 text-sm font-medium rounded-md transition-colors ${
          active ? "text-laterite" : "text-indigo hover:text-laterite"
        }`}
        aria-haspopup="true"
      >
        {label}
      </button>
      <div className="invisible opacity-0 group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100 transition-opacity absolute left-0 top-full pt-1 z-40">
        <ul className="bg-white rounded-lg shadow-lg border border-ecume-deep py-2 min-w-[280px]">
          {links.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="block px-4 py-2 text-sm text-charbon hover:bg-ecume hover:text-laterite"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default function Header() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [lastPathname, setLastPathname] = useState(pathname);

  if (pathname !== lastPathname) {
    setLastPathname(pathname);
    setMobileOpen(false);
  }

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur border-b border-ecume-deep">
      <a
        href="#contenu-principal"
        className="skip-link fixed -translate-y-full focus:translate-y-0 top-0 left-0 z-[60] bg-laterite text-white px-4 py-2 rounded-br-md transition-transform"
      >
        Aller au contenu principal
      </a>

      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="font-display text-xl font-bold text-indigo tracking-tight">
            Rariny
            <span className="hidden sm:inline text-sm font-sans font-normal text-charbon/70 ml-2">
              contre la discrimination raciale
            </span>
          </Link>

          <nav className="hidden lg:flex items-center gap-1" aria-label="Navigation principale">
            <Link
              href="/"
              className={`px-3 py-2 text-sm font-medium rounded-md ${
                pathname === "/" ? "text-laterite" : "text-indigo hover:text-laterite"
              }`}
            >
              Accueil
            </Link>
            <NavGroup label="Comprendre" links={COMPRENDRE_LINKS} currentPath={pathname} />
            <NavGroup label="Où porter plainte" links={AIDE_LINKS} currentPath={pathname} />
            <Link
              href="/observatoire"
              className={`px-3 py-2 text-sm font-medium rounded-md ${
                pathname === "/observatoire" ? "text-laterite" : "text-indigo hover:text-laterite"
              }`}
            >
              Observatoire
            </Link>
            <Link
              href="/a-propos"
              className={`px-3 py-2 text-sm font-medium rounded-md ${
                pathname === "/a-propos" ? "text-laterite" : "text-indigo hover:text-laterite"
              }`}
            >
              À propos
            </Link>
            <Link
              href="/signalement"
              className="ml-2 px-4 py-2 text-sm font-semibold rounded-md bg-laterite text-white hover:bg-laterite-dark transition-colors"
            >
              Faire un signalement
            </Link>
          </nav>

          <button
            type="button"
            className="lg:hidden p-2 -mr-2 text-indigo"
            aria-expanded={mobileOpen}
            aria-controls="mobile-menu"
            aria-label={mobileOpen ? "Fermer le menu" : "Ouvrir le menu"}
            onClick={() => setMobileOpen((v) => !v)}
          >
            {mobileOpen ? (
              <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
              </svg>
            ) : (
              <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M4 7h16M4 12h16M4 17h16" strokeLinecap="round" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <nav
          id="mobile-menu"
          className="lg:hidden border-t border-ecume-deep bg-white max-h-[calc(100vh-4rem)] overflow-y-auto"
          aria-label="Navigation mobile"
        >
          <ul className="px-4 py-3 space-y-1">
            <li>
              <Link href="/" className="block py-2.5 text-charbon font-medium">
                Accueil
              </Link>
            </li>
            <li className="pt-2">
              <p className="text-xs font-semibold uppercase tracking-wide text-charbon/50 py-1">
                Comprendre
              </p>
              <ul className="pl-2 space-y-1">
                {COMPRENDRE_LINKS.map((l) => (
                  <li key={l.href}>
                    <Link href={l.href} className="block py-2 text-sm text-charbon">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </li>
            <li className="pt-2">
              <p className="text-xs font-semibold uppercase tracking-wide text-charbon/50 py-1">
                Où porter plainte
              </p>
              <ul className="pl-2 space-y-1">
                {AIDE_LINKS.map((l) => (
                  <li key={l.href}>
                    <Link href={l.href} className="block py-2 text-sm text-charbon">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </li>
            <li className="pt-2">
              <Link href="/observatoire" className="block py-2.5 text-charbon font-medium">
                Observatoire
              </Link>
            </li>
            <li>
              <Link href="/a-propos" className="block py-2.5 text-charbon font-medium">
                À propos
              </Link>
            </li>
            <li className="pt-3 pb-2">
              <Link
                href="/signalement"
                className="block text-center px-4 py-3 rounded-md bg-laterite text-white font-semibold"
              >
                Faire un signalement
              </Link>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
}
