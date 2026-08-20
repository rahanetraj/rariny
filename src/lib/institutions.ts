export type InstitutionSlug =
  | "cnidh"
  | "inspection-travail"
  | "police-gendarmerie"
  | "associations";

export type DiscriminationType =
  | "emploi"
  | "services"
  | "en_ligne"
  | "incitation_haine"
  | "autre";

export const DISCRIMINATION_TYPE_LABELS: Record<DiscriminationType, string> = {
  emploi: "Discrimination dans l'emploi / au travail",
  services: "Discrimination dans l'accès aux services ou lieux publics",
  en_ligne: "Discrimination en ligne / sur les réseaux sociaux",
  incitation_haine: "Incitation à la haine raciale",
  autre: "Autre situation",
};

export function recommendedInstitutions(type: DiscriminationType): InstitutionSlug[] {
  switch (type) {
    case "emploi":
      return ["inspection-travail", "cnidh"];
    case "en_ligne":
      return ["police-gendarmerie", "cnidh"];
    case "incitation_haine":
      return ["police-gendarmerie", "cnidh"];
    case "services":
    case "autre":
    default:
      return ["cnidh", "associations"];
  }
}
