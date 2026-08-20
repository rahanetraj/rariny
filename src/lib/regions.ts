export const MADAGASCAR_REGIONS = [
  "Alaotra-Mangoro",
  "Amoron'i Mania",
  "Analamanga",
  "Analanjirofo",
  "Androy",
  "Anosy",
  "Atsimo-Andrefana",
  "Atsimo-Atsinanana",
  "Atsinanana",
  "Betsiboka",
  "Boeny",
  "Bongolava",
  "Diana",
  "Fitovinany",
  "Haute Matsiatra",
  "Ihorombe",
  "Itasy",
  "Melaky",
  "Menabe",
  "Sava",
  "Sofia",
  "Vakinankaratra",
  "Vatovavy",
] as const;

export const OTHER_REGION_OPTIONS = ["Diaspora / étranger", "Je préfère ne pas préciser"] as const;

export const REGION_OPTIONS = [...MADAGASCAR_REGIONS, ...OTHER_REGION_OPTIONS] as const;

export type Region = (typeof REGION_OPTIONS)[number];
