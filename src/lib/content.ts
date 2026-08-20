import { randomUUID } from "node:crypto";
import { getPgPool, getSqliteDb, usingPostgres } from "./dbConnection";
import type { InstitutionSlug } from "./institutions";

export type ContentTag = "definitions" | "travail" | "services" | "en_ligne" | "incitation_haine";

export type LegalReferenceRecord = {
  id: string;
  title: string;
  reference: string;
  summary: string;
  tags: ContentTag[];
  sortOrder: number;
};

export type InstitutionRecord = {
  slug: InstitutionSlug;
  name: string;
  shortName: string;
  mission: string;
  competence: string;
  address: string | null;
  phone: string[];
  website: string | null;
  hours: string | null;
  note: string | null;
};

export type ContentPageSlug =
  | "definitions"
  | "travail"
  | "services-publics"
  | "en-ligne"
  | "incitation-haine";

export type ContentPageRecord = {
  slug: ContentPageSlug;
  eyebrow: string;
  title: string;
  lede: string;
  bodyMarkdown: string;
};

const CREATE_TABLES_SQL = `
CREATE TABLE IF NOT EXISTS legal_references (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  reference TEXT NOT NULL,
  summary TEXT NOT NULL,
  tags TEXT NOT NULL,
  sort_order INTEGER NOT NULL DEFAULT 0
);
CREATE TABLE IF NOT EXISTS institutions (
  slug TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  short_name TEXT NOT NULL,
  mission TEXT NOT NULL,
  competence TEXT NOT NULL,
  address TEXT,
  phone TEXT,
  website TEXT,
  hours TEXT,
  note TEXT
);
CREATE TABLE IF NOT EXISTS content_pages (
  slug TEXT PRIMARY KEY,
  eyebrow TEXT NOT NULL,
  title TEXT NOT NULL,
  lede TEXT NOT NULL,
  body_markdown TEXT NOT NULL
);
`;

// --- Seed data: the site's original content, used only to populate empty tables. ---

const SEED_LEGAL_REFERENCES: Omit<LegalReferenceRecord, "id">[] = [
  {
    title: "Principe d'égalité et de non-discrimination",
    reference: "Constitution de la République de Madagascar, article 8",
    summary:
      "« Tous les individus sont égaux en droit et jouissent des mêmes libertés fondamentales protégées par la loi, sans discrimination fondée sur le sexe, le degré d'instruction, la fortune, l'origine, la race, la croyance religieuse ou l'opinion. » C'est le socle constitutionnel de toute démarche contre la discrimination raciale à Madagascar.",
    tags: ["definitions"],
    sortOrder: 0,
  },
  {
    title: "Non-discrimination dans l'éducation, la culture et l'emploi",
    reference: "Constitution de la République de Madagascar, articles 24 à 26",
    summary:
      "Ces articles consacrent le droit à l'éducation, à la participation à la vie culturelle et à l'accès à l'emploi, sans distinction fondée sur l'origine ou la race — ils prolongent l'article 8 dans des domaines concrets de la vie quotidienne.",
    tags: ["definitions", "services", "travail"],
    sortOrder: 1,
  },
  {
    title: "Répression de la propagande raciste et de l'incitation à la haine",
    reference: "Code pénal malgache",
    summary:
      "Le Code pénal incrimine la propagande raciste et l'incitation à la haine raciale. Les peines exactes (amende, emprisonnement) dépendent de la qualification retenue par le parquet au moment des faits — un point à faire confirmer auprès d'un professionnel du droit ou du Journal Officiel en vigueur.",
    tags: ["definitions", "incitation_haine"],
    sortOrder: 2,
  },
  {
    title: "Répression des actes discriminatoires dans la communication médiatisée",
    reference:
      "Loi n°2016-029 du 24 août 2016 portant Code de la communication médiatisée (texte en vigueur, qui a abrogé la loi n°90-031 du 21 décembre 1990 sur la communication citée dans les versions plus anciennes de ce type de document)",
    summary:
      "Le cadre légal malgache sur la communication réprime l'utilisation des médias pour inciter à la haine à raison du sexe, de la religion ou de l'appartenance à une population, ainsi que la xénophobie et la discrimination — en renvoyant aux peines prévues par le Code pénal. Attention : la loi de 1990 souvent citée à ce sujet a été abrogée en 2016, c'est donc la loi n°2016-029 qui s'applique aujourd'hui.",
    tags: ["definitions", "en_ligne", "incitation_haine"],
    sortOrder: 3,
  },
  {
    title: "Non-discrimination au travail et Conventions OIT",
    reference:
      "Code du Travail malgache, article 5 (interdiction de la discrimination fondée sur la race, la couleur, l'ascendance ou l'origine nationale) ; Conventions de l'OIT n°100 (égalité de rémunération, ratifiée le 10 août 1962) et n°111 (discrimination en matière d'emploi et de profession, ratifiée le 11 août 1961)",
    summary:
      "Le Code du Travail interdit explicitement la discrimination raciale à l'embauche, en cours d'emploi et dans la rémunération. Madagascar a ratifié les deux conventions fondamentales de l'OIT sur ce sujet. L'Inspection du Travail est l'autorité compétente pour instruire ces situations.",
    tags: ["travail"],
    sortOrder: 4,
  },
  {
    title: "Injures et diffamations discriminatoires en ligne",
    reference:
      "Loi n°2014-006 du 17 juillet 2014 sur la lutte contre la cybercriminalité, modifiée par la loi n°2016-031 du 15 juillet 2016",
    summary:
      "Une injure ou diffamation commise en ligne à raison du sexe, du handicap, de l'origine, de l'appartenance (ou non) à une ethnie, une nation, une race ou une religion est punie d'un emprisonnement de deux à dix ans et d'une amende de 2 000 000 à 100 000 000 d'ariary, ou de l'une de ces deux peines seulement — une aggravation nette par rapport aux injures « ordinaires ». Les montants exacts doivent être vérifiés dans le texte consolidé en vigueur au moment des faits.",
    tags: ["en_ligne", "incitation_haine"],
    sortOrder: 5,
  },
  {
    title: "Institution de la CNIDH",
    reference:
      "Loi n°2014-007 du 22 juillet 2014, modifiée par la loi n°2018-028, portant création de la Commission Nationale Indépendante des Droits de l'Homme (CNIDH)",
    summary:
      "Cette loi crée la CNIDH, institution nationale indépendante de promotion et de protection des droits humains, conforme aux Principes de Paris. Opérationnelle depuis octobre 2016, elle peut être saisie par plainte, dénonciation, ou s'autosaisir.",
    tags: ["definitions"],
    sortOrder: 6,
  },
];

const SEED_INSTITUTIONS: InstitutionRecord[] = [
  {
    slug: "cnidh",
    name: "Commission Nationale Indépendante des Droits de l'Homme",
    shortName: "CNIDH",
    mission:
      "Institution nationale indépendante chargée de la promotion et de la protection des droits humains à Madagascar, instituée par la loi n°2014-007 du 22 juillet 2014.",
    competence:
      "Compétente pour recevoir toute plainte, dénonciation ou auto-saisine relative à une atteinte aux droits humains, y compris la discrimination raciale — c'est l'interlocuteur de référence par défaut, quel que soit le contexte (emploi, services publics, vie quotidienne).",
    address: "Nouvel Immeuble SEIMAD, 67 Ha Sud et 18 Rue Rainitovo, Antsahavola, 101 Antananarivo",
    phone: [],
    website: "https://www.cnidh-madagascar.org",
    hours: "Du lundi au vendredi, 9h à 16h",
    note: "Trois modes de saisine possibles : plainte, dénonciation, ou auto-saisine de la Commission. Voir la page « Nous contacter » du site officiel pour les coordonnées à jour.",
  },
  {
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
    hours: null,
    note: "Renseignez-vous auprès de la Direction Régionale du Travail de votre région pour un accompagnement de proximité.",
  },
  {
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
    website: null,
    hours: null,
    note: "Pour les faits en ligne, conservez des captures d'écran datées avant de vous déplacer — elles appuient votre dossier.",
  },
  {
    slug: "associations",
    name: "Associations de défense des droits humains et Observatoire National des Droits de l'Homme",
    shortName: "Associations / ONDH",
    mission:
      "Organisations de la société civile malgache qui accompagnent, orientent et parfois assistent juridiquement les victimes de discrimination, en complément des institutions publiques.",
    competence:
      "Utile pour un accompagnement humain, une écoute, ou une orientation vers un avocat — en particulier si vous hésitez encore à saisir une institution officielle.",
    address: null,
    phone: [],
    website: null,
    hours: null,
    note: "La liste précise des associations actives varie dans le temps ; rapprochez-vous de la CNIDH ou d'un centre d'accès au droit local pour une orientation à jour vers une association compétente dans votre région.",
  },
];

const SEED_CONTENT_PAGES: ContentPageRecord[] = [
  {
    slug: "definitions",
    eyebrow: "Comprendre",
    title: "Qu'est-ce que la discrimination raciale ?",
    lede: "Avant d'agir, il est utile de savoir précisément de quoi on parle — et ce que la loi malgache en dit.",
    bodyMarkdown: `La **discrimination raciale** désigne le fait de traiter une personne ou un groupe de personnes de façon défavorable en raison de leur origine réelle ou supposée, de leur couleur de peau, de leur ethnie, de leur ascendance ou de leur nationalité — dans l'accès à un droit, un service, un emploi ou un espace public.

Elle peut être **directe** (un refus explicite fondé sur l'origine d'une personne) ou **indirecte** (une règle en apparence neutre qui désavantage en pratique un groupe en particulier). Elle peut aussi prendre la forme de propos, d'insultes ou de contenus incitant à la haine envers un groupe racial ou ethnique.

À Madagascar, le principe d'égalité est inscrit dans la Constitution elle-même : tous les individus sont égaux en droit, sans distinction fondée notamment sur l'origine ou la race. Ce principe se décline ensuite dans plusieurs textes selon le contexte — travail, services publics, communication en ligne — que vous pouvez explorer dans les pages suivantes de cette section.

## Reconnaître une situation de discrimination raciale

- Un refus d'embauche, de logement ou de service motivé par votre origine.
- Des propos, injures ou moqueries répétées visant votre origine ou votre couleur de peau.
- Un traitement différent et défavorable dans un lieu public (commerce, transport, administration).
- Des contenus en ligne qui vous ciblent ou incitent à la haine contre un groupe racial ou ethnique.

Si vous reconnaissez votre situation dans l'une de ces descriptions, vous pouvez explorer la page correspondant à votre contexte, puis générer un document de signalement à apporter à l'institution compétente.`,
  },
  {
    slug: "travail",
    eyebrow: "Comprendre",
    title: "Discrimination au travail",
    lede: "À l'embauche, en poste ou lors d'un licenciement : le Code du Travail malgache protège contre la discrimination fondée sur l'origine ou la race.",
    bodyMarkdown: `Le Code du Travail malgache interdit explicitement toute discrimination fondée sur la race, la couleur, l'ascendance ou l'origine nationale. Cette protection couvre l'ensemble du parcours professionnel :

- L'accès à l'emploi (annonce, entretien, sélection).
- La rémunération, à travail égal.
- Les conditions de travail et les possibilités d'évolution.
- Les sanctions disciplinaires et le licenciement.

Madagascar a par ailleurs ratifié deux conventions fondamentales de l'Organisation Internationale du Travail (OIT) qui renforcent ce cadre : la Convention n°100 sur l'égalité de rémunération, et la Convention n°111 sur la discrimination en matière d'emploi et de profession.

## Qui est compétent ?

L'**Inspection du Travail** est l'autorité chargée de constater et de traiter les manquements au Code du Travail, y compris les situations de discrimination raciale en contexte professionnel. Chaque région dispose d'une Direction Régionale du Travail.`,
  },
  {
    slug: "services-publics",
    eyebrow: "Comprendre",
    title: "Accès aux services et lieux publics",
    lede: "Commerces, transports, administrations, établissements scolaires : chacun a droit à un traitement égal, sans distinction d'origine.",
    bodyMarkdown: `La Constitution malgache garantit à chacun un accès égal à l'éducation et à la vie culturelle, sans distinction d'origine ou de race (articles 24 à 26). Ce principe s'étend, dans son esprit, à l'ensemble des services ouverts au public : commerces, restaurants, transports, administrations, établissements de santé ou d'enseignement.

Concrètement, un refus de vente, d'entrée ou de service, un traitement différent et défavorable, ou des propos humiliants fondés sur votre origine dans l'un de ces contextes peuvent constituer une discrimination raciale.

## Qui est compétent ?

La **CNIDH** (Commission Nationale Indépendante des Droits de l'Homme) est l'interlocuteur de référence pour ce type de situation. Selon la gravité des faits, une plainte pénale peut également être envisagée.`,
  },
  {
    slug: "en-ligne",
    eyebrow: "Comprendre",
    title: "Discrimination en ligne / réseaux sociaux",
    lede: "Les injures et diffamations à caractère raciste commises en ligne sont pénalement sanctionnées, avec des peines aggravées.",
    bodyMarkdown: `La loi n°2014-006 du 17 juillet 2014 sur la lutte contre la cybercriminalité, modifiée par la loi n°2016-031, sanctionne spécifiquement les injures et diffamations commises en ligne à raison de l'origine, de l'appartenance (ou non) à une ethnie, une nation, une race ou une religion. Ces peines sont aggravées par rapport à une injure « ordinaire ».

Le Code de la communication médiatisée (loi n°2016-029) complète ce dispositif en réprimant l'utilisation des médias — y compris numériques — pour inciter à la haine, à la xénophobie ou à la discrimination.

## Avant de signaler : conservez les preuves

- Faites des captures d'écran datées du contenu (message, commentaire, publication).
- Notez le nom de compte ou pseudonyme de l'auteur, et l'URL si possible.
- Évitez de supprimer vos échanges avec l'auteur, ils peuvent servir de preuve.

## Qui est compétent ?

La **Police Nationale** (division de lutte contre la cybercriminalité) et la **Gendarmerie** sont compétentes pour ces infractions pénales. La CNIDH reste également mobilisable pour la dimension « atteinte aux droits humains ».`,
  },
  {
    slug: "incitation-haine",
    eyebrow: "Comprendre",
    title: "Incitation à la haine raciale",
    lede: "Diffuser des propos ou des contenus qui appellent à la haine ou à la violence envers un groupe racial est une infraction pénale à Madagascar.",
    bodyMarkdown: `Le Code pénal malgache incrimine la propagande raciste et l'incitation à la haine raciale, qu'elle vise un individu ou un groupe. Cette infraction est distincte de la simple injure : elle suppose un appel — explicite ou implicite — à la haine, à la discrimination ou à la violence envers des personnes en raison de leur origine, de leur race ou de leur appartenance ethnique.

Lorsque cette incitation passe par un média (radio, télévision, presse, plateforme numérique), le Code de la communication médiatisée (loi n°2016-029) s'applique également, en renvoyant aux peines prévues par le Code pénal.

Lorsqu'elle est commise en ligne, la loi sur la cybercriminalité (loi n°2014-006, modifiée par la loi n°2016-031) prévoit des peines spécifiques et aggravées.

## Qui est compétent ?

Il s'agit d'une infraction pénale : la **Police** ou la **Gendarmerie** sont compétentes pour recevoir une plainte. La **CNIDH** peut également être saisie pour la dimension atteinte aux droits humains, en complément.`,
  },
];

let tablesReadyPromise: Promise<void> | null = null;

async function ensureTables(): Promise<void> {
  if (tablesReadyPromise) return tablesReadyPromise;

  tablesReadyPromise = (async () => {
    if (usingPostgres()) {
      const pool = await getPgPool();
      await pool.query(CREATE_TABLES_SQL);
    } else {
      const db = await getSqliteDb();
      db.exec(CREATE_TABLES_SQL);
    }
    await seedIfEmpty();
  })();

  return tablesReadyPromise;
}

async function seedIfEmpty(): Promise<void> {
  if (usingPostgres()) {
    const pool = await getPgPool();
    const { rows } = await pool.query<{ count: string }>(`SELECT COUNT(*)::text as count FROM legal_references`);
    if (Number(rows[0]?.count ?? 0) === 0) {
      for (const ref of SEED_LEGAL_REFERENCES) {
        await pool.query(
          `INSERT INTO legal_references (id, title, reference, summary, tags, sort_order) VALUES ($1,$2,$3,$4,$5,$6)`,
          [randomUUID(), ref.title, ref.reference, ref.summary, ref.tags.join(","), ref.sortOrder]
        );
      }
    }
    const { rows: instRows } = await pool.query<{ count: string }>(`SELECT COUNT(*)::text as count FROM institutions`);
    if (Number(instRows[0]?.count ?? 0) === 0) {
      for (const inst of SEED_INSTITUTIONS) {
        await pool.query(
          `INSERT INTO institutions (slug, name, short_name, mission, competence, address, phone, website, hours, note)
           VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10)`,
          [
            inst.slug,
            inst.name,
            inst.shortName,
            inst.mission,
            inst.competence,
            inst.address,
            inst.phone.join(","),
            inst.website,
            inst.hours,
            inst.note,
          ]
        );
      }
    }
    const { rows: pageRows } = await pool.query<{ count: string }>(`SELECT COUNT(*)::text as count FROM content_pages`);
    if (Number(pageRows[0]?.count ?? 0) === 0) {
      for (const page of SEED_CONTENT_PAGES) {
        await pool.query(
          `INSERT INTO content_pages (slug, eyebrow, title, lede, body_markdown) VALUES ($1,$2,$3,$4,$5)`,
          [page.slug, page.eyebrow, page.title, page.lede, page.bodyMarkdown]
        );
      }
    }
    return;
  }

  const db = await getSqliteDb();
  const refCount = (db.prepare(`SELECT COUNT(*) as count FROM legal_references`).get() as { count: number }).count;
  if (refCount === 0) {
    const insert = db.prepare(
      `INSERT INTO legal_references (id, title, reference, summary, tags, sort_order) VALUES (?,?,?,?,?,?)`
    );
    for (const ref of SEED_LEGAL_REFERENCES) {
      insert.run(randomUUID(), ref.title, ref.reference, ref.summary, ref.tags.join(","), ref.sortOrder);
    }
  }
  const instCount = (db.prepare(`SELECT COUNT(*) as count FROM institutions`).get() as { count: number }).count;
  if (instCount === 0) {
    const insert = db.prepare(
      `INSERT INTO institutions (slug, name, short_name, mission, competence, address, phone, website, hours, note)
       VALUES (?,?,?,?,?,?,?,?,?,?)`
    );
    for (const inst of SEED_INSTITUTIONS) {
      insert.run(
        inst.slug,
        inst.name,
        inst.shortName,
        inst.mission,
        inst.competence,
        inst.address,
        inst.phone.join(","),
        inst.website,
        inst.hours,
        inst.note
      );
    }
  }
  const pageCount = (db.prepare(`SELECT COUNT(*) as count FROM content_pages`).get() as { count: number }).count;
  if (pageCount === 0) {
    const insert = db.prepare(
      `INSERT INTO content_pages (slug, eyebrow, title, lede, body_markdown) VALUES (?,?,?,?,?)`
    );
    for (const page of SEED_CONTENT_PAGES) {
      insert.run(page.slug, page.eyebrow, page.title, page.lede, page.bodyMarkdown);
    }
  }
}

function rowToLegalReference(row: {
  id: string;
  title: string;
  reference: string;
  summary: string;
  tags: string;
  sort_order: number;
}): LegalReferenceRecord {
  return {
    id: row.id,
    title: row.title,
    reference: row.reference,
    summary: row.summary,
    tags: row.tags.split(",").filter(Boolean) as ContentTag[],
    sortOrder: row.sort_order,
  };
}

function rowToInstitution(row: {
  slug: string;
  name: string;
  short_name: string;
  mission: string;
  competence: string;
  address: string | null;
  phone: string | null;
  website: string | null;
  hours: string | null;
  note: string | null;
}): InstitutionRecord {
  return {
    slug: row.slug as InstitutionSlug,
    name: row.name,
    shortName: row.short_name,
    mission: row.mission,
    competence: row.competence,
    address: row.address,
    phone: row.phone ? row.phone.split(",").filter(Boolean) : [],
    website: row.website,
    hours: row.hours,
    note: row.note,
  };
}

function rowToContentPage(row: {
  slug: string;
  eyebrow: string;
  title: string;
  lede: string;
  body_markdown: string;
}): ContentPageRecord {
  return {
    slug: row.slug as ContentPageSlug,
    eyebrow: row.eyebrow,
    title: row.title,
    lede: row.lede,
    bodyMarkdown: row.body_markdown,
  };
}

// --- Legal references ---

export async function getLegalReferences(): Promise<LegalReferenceRecord[]> {
  await ensureTables();
  if (usingPostgres()) {
    const pool = await getPgPool();
    const { rows } = await pool.query(`SELECT * FROM legal_references ORDER BY sort_order ASC`);
    return rows.map(rowToLegalReference);
  }
  const db = await getSqliteDb();
  const rows = db.prepare(`SELECT * FROM legal_references ORDER BY sort_order ASC`).all();
  return (rows as Parameters<typeof rowToLegalReference>[0][]).map(rowToLegalReference);
}

export async function getLegalReferencesByTag(tag: ContentTag): Promise<LegalReferenceRecord[]> {
  const all = await getLegalReferences();
  return all.filter((ref) => ref.tags.includes(tag));
}

export async function getLegalReference(id: string): Promise<LegalReferenceRecord | null> {
  const all = await getLegalReferences();
  return all.find((ref) => ref.id === id) ?? null;
}

export async function saveLegalReference(
  ref: Omit<LegalReferenceRecord, "id"> & { id?: string }
): Promise<string> {
  await ensureTables();
  const id = ref.id ?? randomUUID();
  const tags = ref.tags.join(",");

  if (usingPostgres()) {
    const pool = await getPgPool();
    await pool.query(
      `INSERT INTO legal_references (id, title, reference, summary, tags, sort_order)
       VALUES ($1,$2,$3,$4,$5,$6)
       ON CONFLICT (id) DO UPDATE SET title=$2, reference=$3, summary=$4, tags=$5, sort_order=$6`,
      [id, ref.title, ref.reference, ref.summary, tags, ref.sortOrder]
    );
  } else {
    const db = await getSqliteDb();
    db.prepare(
      `INSERT INTO legal_references (id, title, reference, summary, tags, sort_order)
       VALUES (?,?,?,?,?,?)
       ON CONFLICT (id) DO UPDATE SET title=excluded.title, reference=excluded.reference,
         summary=excluded.summary, tags=excluded.tags, sort_order=excluded.sort_order`
    ).run(id, ref.title, ref.reference, ref.summary, tags, ref.sortOrder);
  }
  return id;
}

export async function deleteLegalReference(id: string): Promise<void> {
  await ensureTables();
  if (usingPostgres()) {
    const pool = await getPgPool();
    await pool.query(`DELETE FROM legal_references WHERE id = $1`, [id]);
  } else {
    const db = await getSqliteDb();
    db.prepare(`DELETE FROM legal_references WHERE id = ?`).run(id);
  }
}

// --- Institutions ---

export async function getInstitutions(): Promise<InstitutionRecord[]> {
  await ensureTables();
  if (usingPostgres()) {
    const pool = await getPgPool();
    const { rows } = await pool.query(`SELECT * FROM institutions`);
    return rows.map(rowToInstitution);
  }
  const db = await getSqliteDb();
  const rows = db.prepare(`SELECT * FROM institutions`).all();
  return (rows as Parameters<typeof rowToInstitution>[0][]).map(rowToInstitution);
}

export async function getInstitution(slug: InstitutionSlug): Promise<InstitutionRecord | null> {
  const all = await getInstitutions();
  return all.find((inst) => inst.slug === slug) ?? null;
}

export async function saveInstitution(inst: InstitutionRecord): Promise<void> {
  await ensureTables();
  const phone = inst.phone.join(",");

  if (usingPostgres()) {
    const pool = await getPgPool();
    await pool.query(
      `INSERT INTO institutions (slug, name, short_name, mission, competence, address, phone, website, hours, note)
       VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10)
       ON CONFLICT (slug) DO UPDATE SET name=$2, short_name=$3, mission=$4, competence=$5,
         address=$6, phone=$7, website=$8, hours=$9, note=$10`,
      [
        inst.slug,
        inst.name,
        inst.shortName,
        inst.mission,
        inst.competence,
        inst.address,
        phone,
        inst.website,
        inst.hours,
        inst.note,
      ]
    );
  } else {
    const db = await getSqliteDb();
    db.prepare(
      `INSERT INTO institutions (slug, name, short_name, mission, competence, address, phone, website, hours, note)
       VALUES (?,?,?,?,?,?,?,?,?,?)
       ON CONFLICT (slug) DO UPDATE SET name=excluded.name, short_name=excluded.short_name,
         mission=excluded.mission, competence=excluded.competence, address=excluded.address,
         phone=excluded.phone, website=excluded.website, hours=excluded.hours, note=excluded.note`
    ).run(
      inst.slug,
      inst.name,
      inst.shortName,
      inst.mission,
      inst.competence,
      inst.address,
      phone,
      inst.website,
      inst.hours,
      inst.note
    );
  }
}

// --- Content pages ---

export async function getContentPages(): Promise<ContentPageRecord[]> {
  await ensureTables();
  if (usingPostgres()) {
    const pool = await getPgPool();
    const { rows } = await pool.query(`SELECT * FROM content_pages`);
    return rows.map(rowToContentPage);
  }
  const db = await getSqliteDb();
  const rows = db.prepare(`SELECT * FROM content_pages`).all();
  return (rows as Parameters<typeof rowToContentPage>[0][]).map(rowToContentPage);
}

export async function getContentPage(slug: ContentPageSlug): Promise<ContentPageRecord | null> {
  const all = await getContentPages();
  return all.find((page) => page.slug === slug) ?? null;
}

export async function saveContentPage(page: ContentPageRecord): Promise<void> {
  await ensureTables();

  if (usingPostgres()) {
    const pool = await getPgPool();
    await pool.query(
      `INSERT INTO content_pages (slug, eyebrow, title, lede, body_markdown)
       VALUES ($1,$2,$3,$4,$5)
       ON CONFLICT (slug) DO UPDATE SET eyebrow=$2, title=$3, lede=$4, body_markdown=$5`,
      [page.slug, page.eyebrow, page.title, page.lede, page.bodyMarkdown]
    );
  } else {
    const db = await getSqliteDb();
    db.prepare(
      `INSERT INTO content_pages (slug, eyebrow, title, lede, body_markdown)
       VALUES (?,?,?,?,?)
       ON CONFLICT (slug) DO UPDATE SET eyebrow=excluded.eyebrow, title=excluded.title,
         lede=excluded.lede, body_markdown=excluded.body_markdown`
    ).run(page.slug, page.eyebrow, page.title, page.lede, page.bodyMarkdown);
  }
}

export const CONTENT_PAGE_SLUGS: ContentPageSlug[] = [
  "definitions",
  "travail",
  "services-publics",
  "en-ligne",
  "incitation-haine",
];
