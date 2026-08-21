"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { logoutAction } from "@/app/admin/actions";
import SubmitButton from "@/components/SubmitButton";

const LINKS = [
  { href: "/admin", label: "Tableau de bord" },
  { href: "/admin/references", label: "Références juridiques" },
  { href: "/admin/institutions", label: "Institutions" },
  { href: "/admin/pages", label: "Pages" },
];

export default function AdminNav() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [lastPathname, setLastPathname] = useState(pathname);

  if (pathname !== lastPathname) {
    setLastPathname(pathname);
    setMobileOpen(false);
  }

  return (
    <header className="bg-indigo text-white">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 h-14 flex items-center justify-between">
        <Link href="/admin" className="font-display font-bold shrink-0">
          Rariny · Admin
        </Link>

        <nav className="hidden md:flex items-center gap-4 text-sm" aria-label="Navigation admin">
          {LINKS.slice(1).map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={pathname === link.href ? "text-white font-medium" : "text-ecume/80 hover:text-white"}
            >
              {link.label}
            </Link>
          ))}
          <form action={logoutAction}>
            <SubmitButton
              pendingLabel="…"
              className="text-sm text-ecume/80 hover:text-white disabled:opacity-60"
            >
              Se déconnecter
            </SubmitButton>
          </form>
        </nav>

        <button
          type="button"
          className="md:hidden p-2 -mr-2"
          aria-expanded={mobileOpen}
          aria-controls="admin-mobile-menu"
          aria-label={mobileOpen ? "Fermer le menu" : "Ouvrir le menu"}
          onClick={() => setMobileOpen((v) => !v)}
        >
          {mobileOpen ? (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
            </svg>
          ) : (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M4 7h16M4 12h16M4 17h16" strokeLinecap="round" />
            </svg>
          )}
        </button>
      </div>

      {mobileOpen && (
        <nav
          id="admin-mobile-menu"
          className="md:hidden border-t border-white/10 bg-indigo-dark"
          aria-label="Navigation admin mobile"
        >
          <ul className="px-4 py-3 space-y-1">
            {LINKS.slice(1).map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={`block py-2.5 text-sm ${
                    pathname === link.href ? "text-white font-medium" : "text-ecume/80"
                  }`}
                >
                  {link.label}
                </Link>
              </li>
            ))}
            <li className="pt-2">
              <form action={logoutAction}>
                <SubmitButton
                  pendingLabel="Déconnexion…"
                  className="w-full text-left py-2.5 text-sm text-ecume/80 disabled:opacity-60"
                >
                  Se déconnecter
                </SubmitButton>
              </form>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
}
