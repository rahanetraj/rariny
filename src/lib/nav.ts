import { getContentPages, getInstitutions, INDEX_PAGE_SLUG } from "./content";

export type NavLink = { href: string; label: string };

export async function getComprendreNavLinks(): Promise<NavLink[]> {
  const pages = await getContentPages();
  const index = pages.find((p) => p.slug === INDEX_PAGE_SLUG);
  const rest = pages
    .filter((p) => p.slug !== INDEX_PAGE_SLUG)
    .sort((a, b) => a.title.localeCompare(b.title, "fr"));

  return [
    ...(index ? [{ href: "/comprendre", label: "Définitions" }] : []),
    ...rest.map((p) => ({ href: `/comprendre/${p.slug}`, label: p.title })),
  ];
}

export async function getAideNavLinks(): Promise<NavLink[]> {
  const institutions = await getInstitutions();
  const sorted = [...institutions].sort((a, b) => a.shortName.localeCompare(b.shortName, "fr"));

  return [
    { href: "/ou-porter-plainte", label: "Vue d'ensemble" },
    ...sorted.map((inst) => ({ href: `/ou-porter-plainte/${inst.slug}`, label: inst.shortName })),
  ];
}
