import { createHmac, timingSafeEqual } from "node:crypto";

export const ADMIN_SESSION_COOKIE = "admin_session";
const SESSION_DURATION_MS = 12 * 60 * 60 * 1000; // 12h

function getSecret(): string {
  const secret = process.env.ADMIN_PASSWORD;
  if (!secret) {
    throw new Error(
      "ADMIN_PASSWORD n'est pas défini. Ajoutez cette variable d'environnement pour activer le panneau d'administration."
    );
  }
  return secret;
}

function sign(payload: string): string {
  return createHmac("sha256", getSecret()).update(payload).digest("hex");
}

function safeEqual(a: string, b: string): boolean {
  const bufA = Buffer.from(a);
  const bufB = Buffer.from(b);
  if (bufA.length !== bufB.length) return false;
  return timingSafeEqual(bufA, bufB);
}

export function checkAdminPassword(submitted: string): boolean {
  try {
    return safeEqual(submitted, getSecret());
  } catch {
    return false;
  }
}

export function createSessionCookieValue(): string {
  const expiry = String(Date.now() + SESSION_DURATION_MS);
  return `${expiry}.${sign(expiry)}`;
}

export function isSessionValid(cookieValue: string | undefined): boolean {
  if (!cookieValue) return false;
  const [expiry, signature] = cookieValue.split(".");
  if (!expiry || !signature) return false;
  if (Number(expiry) < Date.now()) return false;
  try {
    return safeEqual(signature, sign(expiry));
  } catch {
    return false;
  }
}

export const SESSION_MAX_AGE_SECONDS = SESSION_DURATION_MS / 1000;
