export type InstitutionSlug = string;

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

/**
 * Slugs des institutions "historiques" suggérées automatiquement selon le type de
 * discrimination signalé. Les institutions créées ultérieurement depuis l'admin
 * apparaissent dans l'annuaire « Où porter plainte » mais ne sont pas recommandées
 * automatiquement ici (cette association n'est pas éditable depuis l'admin).
 */
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
