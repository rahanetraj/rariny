export const CONTEXT_OPTIONS = [
  { value: "employeur", label: "Employeur (cadre professionnel)" },
  { value: "institution", label: "Institution publique (administration, école, hôpital…)" },
  { value: "particulier", label: "Particulier (cadre privé)" },
  { value: "inconnu", label: "Auteur inconnu ou non identifié" },
] as const;

export type ContextValue = (typeof CONTEXT_OPTIONS)[number]["value"];

export const MONTH_OPTIONS = [
  { value: 1, label: "Janvier" },
  { value: 2, label: "Février" },
  { value: 3, label: "Mars" },
  { value: 4, label: "Avril" },
  { value: 5, label: "Mai" },
  { value: 6, label: "Juin" },
  { value: 7, label: "Juillet" },
  { value: 8, label: "Août" },
  { value: 9, label: "Septembre" },
  { value: 10, label: "Octobre" },
  { value: 11, label: "Novembre" },
  { value: 12, label: "Décembre" },
] as const;

export function yearOptions(): number[] {
  const currentYear = new Date().getFullYear();
  const years: number[] = [];
  for (let y = currentYear; y >= currentYear - 10; y--) years.push(y);
  return years;
}
