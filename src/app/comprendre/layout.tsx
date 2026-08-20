import SectionSubNav from "@/components/SectionSubNav";

const LINKS = [
  { href: "/comprendre", label: "Définitions" },
  { href: "/comprendre/travail", label: "Au travail" },
  { href: "/comprendre/services-publics", label: "Services publics" },
  { href: "/comprendre/en-ligne", label: "En ligne" },
  { href: "/comprendre/incitation-haine", label: "Incitation à la haine" },
];

export default function ComprendreLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <SectionSubNav links={LINKS} />
      {children}
    </>
  );
}
