export type InstitutionSlug =
  | "cnidh"
  | "inspection-travail"
  | "police-gendarmerie"
  | "associations";

export type Institution = {
  slug: InstitutionSlug;
  name: string;
  shortName: string;
  mission: string;
  competence: string;
  address?: string;
  phone?: string[];
  email?: string;
  website?: string;
  hours?: string;
  note?: string;
};

export const INSTITUTIONS: Record<InstitutionSlug, Institution> = {
  cnidh: {
    slug: "cnidh",
    name: "Commission Nationale Indépendante des Droits de l'Homme",
    shortName: "CNIDH",
    mission:
      "Institution nationale indépendante chargée de la promotion et de la protection des droits humains à Madagascar, instituée par la loi n°2014-007 du 22 juillet 2014.",
    competence:
      "Compétente pour recevoir toute plainte, dénonciation ou auto-saisine relative à une atteinte aux droits humains, y compris la discrimination raciale — c'est l'interlocuteur de référence par défaut, quel que soit le contexte (emploi, services publics, vie quotidienne).",
    address: "Nouvel Immeuble SEIMAD, 67 Ha Sud et 18 Rue Rainitovo, Antsahavola, 101 Antananarivo",
    hours: "Du lundi au vendredi, 9h à 16h",
    website: "https://www.cnidh-madagascar.org",
    note: "Trois modes de saisine possibles : plainte, dénonciation, ou auto-saisine de la Commission. Voir la page « Nous contacter » du site officiel pour les coordonnées à jour.",
  },
  "inspection-travail": {
    slug: "inspection-travail",
    name: "Inspection du Travail — Ministère du Travail, de l'Emploi, de la Fonction Publique et des Lois Sociales",
    shortName: "Inspection du Travail",
    mission:
      "Service chargé de veiller au respect du Code du Travail malgache, y compris les dispositions de non-discrimination à l'embauche, en cours d'emploi et à l'égard de la rémunération (Conventions OIT n°100 et n°111 ratifiées par Madagascar).",
    competence:
      "Compétente pour toute discrimination raciale subie dans un contexte professionnel : embauche, conditions de travail, rémunération, licenciement.",
    address:
      "Direction de l'Inspection du Travail, Porte 26, Antsahavola, Antananarivo (siège) — chaque région dispose d'une Direction Régionale du Travail, à privilégier si vous n'êtes pas dans la capitale.",
    phone: ["+261 20 22 235 40", "+261 20 22 338 56"],
    website: "https://www.mtefpls.gov.mg",
    note: "Renseignez-vous auprès de la Direction Régionale du Travail de votre région pour un accompagnement de proximité.",
  },
  "police-gendarmerie": {
    slug: "police-gendarmerie",
    name: "Police Nationale / Gendarmerie Nationale — brigades de lutte contre la cybercriminalité",
    shortName: "Police / Gendarmerie",
    mission:
      "Forces de l'ordre compétentes pour les infractions pénales, y compris les injures et diffamations à caractère discriminatoire commises en ligne (loi n°2014-006 sur la cybercriminalité, modifiée par la loi n°2016-031).",
    competence:
      "Compétentes pour toute discrimination raciale relevant du pénal : incitation à la haine raciale, injure ou diffamation raciste en ligne ou hors ligne, menaces.",
    address:
      "Antananarivo : division de lutte contre la cybercriminalité de la Police Nationale (quartier Ampefiloha) ; brigade de recherches de la Gendarmerie (caserne de Ratsimandrava, Andrefanambohijanahary). En région : commissariat de police ou brigade de gendarmerie le plus proche.",
    phone: ["117 (Police, numéro d'urgence national)", "119 (Gendarmerie, numéro d'urgence national)"],
    note: "Pour les faits en ligne, conservez des captures d'écran datées avant de vous déplacer — elles appuient votre dossier.",
  },
  associations: {
    slug: "associations",
    name: "Associations de défense des droits humains et Observatoire National des Droits de l'Homme",
    shortName: "Associations / ONDH",
    mission:
      "Organisations de la société civile malgache qui accompagnent, orientent et parfois assistent juridiquement les victimes de discrimination, en complément des institutions publiques.",
    competence:
      "Utile pour un accompagnement humain, une écoute, ou une orientation vers un avocat — en particulier si vous hésitez encore à saisir une institution officielle.",
    note: "La liste précise des associations actives varie dans le temps ; rapprochez-vous de la CNIDH ou d'un centre d'accès au droit local pour une orientation à jour vers une association compétente dans votre région.",
  },
};

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
