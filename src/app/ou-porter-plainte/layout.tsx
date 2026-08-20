import SectionSubNav from "@/components/SectionSubNav";

const LINKS = [
  { href: "/ou-porter-plainte", label: "Vue d'ensemble" },
  { href: "/ou-porter-plainte/cnidh", label: "CNIDH" },
  { href: "/ou-porter-plainte/inspection-travail", label: "Inspection du Travail" },
  { href: "/ou-porter-plainte/police-gendarmerie", label: "Police / Gendarmerie" },
  { href: "/ou-porter-plainte/associations", label: "Associations / ONDH" },
];

export default function OuPorterPlainteLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <SectionSubNav links={LINKS} />
      {children}
    </>
  );
}
