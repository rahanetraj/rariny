"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export type SubNavLink = { href: string; label: string };

export default function SectionSubNav({ links }: { links: SubNavLink[] }) {
  const pathname = usePathname();

  return (
    <nav aria-label="Sous-navigation" className="border-b border-ecume-deep bg-white">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <ul className="flex gap-1 overflow-x-auto no-scrollbar py-2 -mb-px">
          {links.map((link) => {
            const active = pathname === link.href;
            return (
              <li key={link.href} className="shrink-0">
                <Link
                  href={link.href}
                  aria-current={active ? "page" : undefined}
                  className={`block px-3.5 py-2 text-sm font-medium rounded-md whitespace-nowrap transition-colors ${
                    active
                      ? "bg-indigo text-white"
                      : "text-charbon/75 hover:bg-ecume hover:text-indigo"
                  }`}
                >
                  {link.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
}
