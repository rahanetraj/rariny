import { getPgPool, getSqliteDb, usingPostgres } from "./dbConnection";
import type { DiscriminationType } from "./institutions";

export const MIN_DISPLAY_THRESHOLD = 5;

export type NewReportEntry = {
  discriminationType: DiscriminationType;
  region: string;
  context: string;
  eventMonth: number;
  eventYear: number;
};

export type CountRow = { key: string; count: number };

export type Stats = {
  totalReports: number;
  byMonth: CountRow[];
  byType: CountRow[];
  byRegion: CountRow[];
  threshold: number;
};

const CREATE_TABLE_SQL = `
CREATE TABLE IF NOT EXISTS report_entries (
  id INTEGER PRIMARY KEY {AUTOINCREMENT},
  discrimination_type TEXT NOT NULL,
  region TEXT NOT NULL,
  context TEXT NOT NULL,
  event_month INTEGER NOT NULL,
  event_year INTEGER NOT NULL,
  created_at {TIMESTAMP} DEFAULT {NOW}
)`;

let tableReadyPromise: Promise<void> | null = null;

async function ensureTable(): Promise<void> {
  if (tableReadyPromise) return tableReadyPromise;

  tableReadyPromise = (async () => {
    if (usingPostgres()) {
      const pool = await getPgPool();
      const sql = CREATE_TABLE_SQL.replace("{AUTOINCREMENT}", "GENERATED ALWAYS AS IDENTITY")
        .replace("{TIMESTAMP}", "TIMESTAMPTZ")
        .replace("{NOW}", "now()");
      await pool.query(sql);
    } else {
      const db = await getSqliteDb();
      const sql = CREATE_TABLE_SQL.replace("{AUTOINCREMENT}", "AUTOINCREMENT")
        .replace("{TIMESTAMP}", "TEXT")
        .replace("{NOW}", "(datetime('now'))");
      db.exec(sql);
    }
  })();

  return tableReadyPromise;
}

export async function insertReportEntry(entry: NewReportEntry): Promise<void> {
  await ensureTable();

  if (usingPostgres()) {
    const pool = await getPgPool();
    await pool.query(
      `INSERT INTO report_entries (discrimination_type, region, context, event_month, event_year)
       VALUES ($1, $2, $3, $4, $5)`,
      [entry.discriminationType, entry.region, entry.context, entry.eventMonth, entry.eventYear]
    );
  } else {
    const db = await getSqliteDb();
    db.prepare(
      `INSERT INTO report_entries (discrimination_type, region, context, event_month, event_year)
       VALUES (?, ?, ?, ?, ?)`
    ).run(entry.discriminationType, entry.region, entry.context, entry.eventMonth, entry.eventYear);
  }
}

export async function getStats(): Promise<Stats> {
  await ensureTable();

  if (usingPostgres()) {
    const pool = await getPgPool();

    const [total, byMonth, byType, byRegion] = await Promise.all([
      pool.query<{ count: string }>(`SELECT COUNT(*)::text as count FROM report_entries`),
      pool.query<{ key: string; count: string }>(
        `SELECT (event_year::text || '-' || lpad(event_month::text, 2, '0')) as key, COUNT(*)::text as count
         FROM report_entries GROUP BY event_year, event_month HAVING COUNT(*) >= $1 ORDER BY event_year, event_month`,
        [MIN_DISPLAY_THRESHOLD]
      ),
      pool.query<{ key: string; count: string }>(
        `SELECT discrimination_type as key, COUNT(*)::text as count FROM report_entries
         GROUP BY discrimination_type HAVING COUNT(*) >= $1 ORDER BY count DESC`,
        [MIN_DISPLAY_THRESHOLD]
      ),
      pool.query<{ key: string; count: string }>(
        `SELECT region as key, COUNT(*)::text as count FROM report_entries
         GROUP BY region HAVING COUNT(*) >= $1 ORDER BY count DESC`,
        [MIN_DISPLAY_THRESHOLD]
      ),
    ]);

    return {
      totalReports: Number(total.rows[0]?.count ?? 0),
      byMonth: byMonth.rows.map((r) => ({ key: r.key, count: Number(r.count) })),
      byType: byType.rows.map((r) => ({ key: r.key, count: Number(r.count) })),
      byRegion: byRegion.rows.map((r) => ({ key: r.key, count: Number(r.count) })),
      threshold: MIN_DISPLAY_THRESHOLD,
    };
  }

  const db = await getSqliteDb();

  const total = db.prepare(`SELECT COUNT(*) as count FROM report_entries`).get() as {
    count: number;
  };

  const byMonth = db
    .prepare(
      `SELECT (event_year || '-' || substr('0' || event_month, -2)) as key, COUNT(*) as count
       FROM report_entries GROUP BY event_year, event_month HAVING COUNT(*) >= ? ORDER BY event_year, event_month`
    )
    .all(MIN_DISPLAY_THRESHOLD) as { key: string; count: number }[];

  const byType = db
    .prepare(
      `SELECT discrimination_type as key, COUNT(*) as count FROM report_entries
       GROUP BY discrimination_type HAVING COUNT(*) >= ? ORDER BY count DESC`
    )
    .all(MIN_DISPLAY_THRESHOLD) as { key: string; count: number }[];

  const byRegion = db
    .prepare(
      `SELECT region as key, COUNT(*) as count FROM report_entries
       GROUP BY region HAVING COUNT(*) >= ? ORDER BY count DESC`
    )
    .all(MIN_DISPLAY_THRESHOLD) as { key: string; count: number }[];

  return {
    totalReports: total.count,
    byMonth,
    byType,
    byRegion,
    threshold: MIN_DISPLAY_THRESHOLD,
  };
}
