import fs from "node:fs";
import path from "node:path";

export function usingPostgres(): boolean {
  return Boolean(process.env.DATABASE_URL);
}

let pgPoolPromise: Promise<import("pg").Pool> | null = null;

export function getPgPool(): Promise<import("pg").Pool> {
  if (!pgPoolPromise) {
    pgPoolPromise = import("pg").then(({ Pool }) => {
      return new Pool({
        connectionString: process.env.DATABASE_URL,
        ssl: { rejectUnauthorized: false },
      });
    });
  }
  return pgPoolPromise;
}

let sqliteDbPromise: Promise<import("better-sqlite3").Database> | null = null;

export function getSqliteDb(): Promise<import("better-sqlite3").Database> {
  if (!sqliteDbPromise) {
    sqliteDbPromise = import("better-sqlite3").then(({ default: Database }) => {
      const filePath = path.join(process.cwd(), ".data", "local.db");
      fs.mkdirSync(path.dirname(filePath), { recursive: true });
      return new Database(filePath);
    });
  }
  return sqliteDbPromise;
}
