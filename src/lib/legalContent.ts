export type LegalReference = {
  id: string;
  title: string;
  reference: string;
  summary: string;
  tags: Array<"definitions" | "travail" | "services" | "en_ligne" | "incitation_haine">;
};

export const LEGAL_REFERENCES: LegalReference[] = [
  {
    id: "constitution-art8",
    title: "Principe d'égalité et de non-discrimination",
    reference: "Constitution de la République de Madagascar, article 8",
    summary:
      "« Tous les individus sont égaux en droit et jouissent des mêmes libertés fondamentales protégées par la loi, sans discrimination fondée sur le sexe, le degré d'instruction, la fortune, l'origine, la race, la croyance religieuse ou l'opinion. » C'est le socle constitutionnel de toute démarche contre la discrimination raciale à Madagascar.",
    tags: ["definitions"],
  },
  {
    id: "constitution-art24-26",
    title: "Non-discrimination dans l'éducation, la culture et l'emploi",
    reference: "Constitution de la République de Madagascar, articles 24 à 26",
    summary:
      "Ces articles consacrent le droit à l'éducation, à la participation à la vie culturelle et à l'accès à l'emploi, sans distinction fondée sur l'origine ou la race — ils prolongent l'article 8 dans des domaines concrets de la vie quotidienne.",
    tags: ["definitions", "services", "travail"],
  },
  {
    id: "code-penal-propagande",
    title: "Répression de la propagande raciste et de l'incitation à la haine",
    reference: "Code pénal malgache",
    summary:
      "Le Code pénal incrimine la propagande raciste et l'incitation à la haine raciale. Les peines exactes (amende, emprisonnement) dépendent de la qualification retenue par le parquet au moment des faits — un point à faire confirmer auprès d'un professionnel du droit ou du Journal Officiel en vigueur.",
    tags: ["definitions", "incitation_haine"],
  },
  {
    id: "code-communication-2016",
    title: "Répression des actes discriminatoires dans la communication médiatisée",
    reference:
      "Loi n°2016-029 du 24 août 2016 portant Code de la communication médiatisée (texte en vigueur, qui a abrogé la loi n°90-031 du 21 décembre 1990 sur la communication citée dans les versions plus anciennes de ce type de document)",
    summary:
      "Le cadre légal malgache sur la communication réprime l'utilisation des médias pour inciter à la haine à raison du sexe, de la religion ou de l'appartenance à une population, ainsi que la xénophobie et la discrimination — en renvoyant aux peines prévues par le Code pénal. Attention : la loi de 1990 souvent citée à ce sujet a été abrogée en 2016, c'est donc la loi n°2016-029 qui s'applique aujourd'hui.",
    tags: ["definitions", "en_ligne", "incitation_haine"],
  },
  {
    id: "code-travail-oit",
    title: "Non-discrimination au travail et Conventions OIT",
    reference:
      "Code du Travail malgache, article 5 (interdiction de la discrimination fondée sur la race, la couleur, l'ascendance ou l'origine nationale) ; Conventions de l'OIT n°100 (égalité de rémunération, ratifiée le 10 août 1962) et n°111 (discrimination en matière d'emploi et de profession, ratifiée le 11 août 1961)",
    summary:
      "Le Code du Travail interdit explicitement la discrimination raciale à l'embauche, en cours d'emploi et dans la rémunération. Madagascar a ratifié les deux conventions fondamentales de l'OIT sur ce sujet. L'Inspection du Travail est l'autorité compétente pour instruire ces situations.",
    tags: ["travail"],
  },
  {
    id: "cybercriminalite",
    title: "Injures et diffamations discriminatoires en ligne",
    reference:
      "Loi n°2014-006 du 17 juillet 2014 sur la lutte contre la cybercriminalité, modifiée par la loi n°2016-031 du 15 juillet 2016",
    summary:
      "Une injure ou diffamation commise en ligne à raison du sexe, du handicap, de l'origine, de l'appartenance (ou non) à une ethnie, une nation, une race ou une religion est punie d'un emprisonnement de deux à dix ans et d'une amende de 2 000 000 à 100 000 000 d'ariary, ou de l'une de ces deux peines seulement — une aggravation nette par rapport aux injures « ordinaires ». Les montants exacts doivent être vérifiés dans le texte consolidé en vigueur au moment des faits.",
    tags: ["en_ligne", "incitation_haine"],
  },
  {
    id: "cnidh-loi",
    title: "Institution de la CNIDH",
    reference:
      "Loi n°2014-007 du 22 juillet 2014, modifiée par la loi n°2018-028, portant création de la Commission Nationale Indépendante des Droits de l'Homme (CNIDH)",
    summary:
      "Cette loi crée la CNIDH, institution nationale indépendante de promotion et de protection des droits humains, conforme aux Principes de Paris. Opérationnelle depuis octobre 2016, elle peut être saisie par plainte, dénonciation, ou s'autosaisir.",
    tags: ["definitions"],
  },
];

export function referencesForTag(tag: LegalReference["tags"][number]): LegalReference[] {
  return LEGAL_REFERENCES.filter((ref) => ref.tags.includes(tag));
}
