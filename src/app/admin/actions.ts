"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import {
  ADMIN_SESSION_COOKIE,
  SESSION_MAX_AGE_SECONDS,
  checkAdminPassword,
  createSessionCookieValue,
  isSessionValid,
} from "@/lib/adminAuth";
import {
  deleteLegalReference,
  saveContentPage,
  saveInstitution,
  saveLegalReference,
  type ContentPageSlug,
  type ContentTag,
} from "@/lib/content";
import type { InstitutionSlug } from "@/lib/institutions";

async function requireAdmin(): Promise<void> {
  const store = await cookies();
  const value = store.get(ADMIN_SESSION_COOKIE)?.value;
  if (!isSessionValid(value)) {
    redirect("/admin/login");
  }
}

export async function loginAction(formData: FormData): Promise<void> {
  const password = String(formData.get("password") ?? "");

  if (!checkAdminPassword(password)) {
    redirect("/admin/login?error=1");
  }

  const store = await cookies();
  store.set(ADMIN_SESSION_COOKIE, createSessionCookieValue(), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: SESSION_MAX_AGE_SECONDS,
  });
  redirect("/admin");
}

export async function logoutAction(): Promise<void> {
  const store = await cookies();
  store.delete(ADMIN_SESSION_COOKIE);
  redirect("/admin/login");
}

export async function saveReferenceAction(formData: FormData): Promise<void> {
  await requireAdmin();

  const id = String(formData.get("id") ?? "") || undefined;
  const title = String(formData.get("title") ?? "").trim();
  const reference = String(formData.get("reference") ?? "").trim();
  const summary = String(formData.get("summary") ?? "").trim();
  const tags = formData.getAll("tags").map(String) as ContentTag[];
  const sortOrder = Number(formData.get("sortOrder") ?? 0) || 0;

  await saveLegalReference({ id, title, reference, summary, tags, sortOrder });
  redirect("/admin/references");
}

export async function deleteReferenceAction(formData: FormData): Promise<void> {
  await requireAdmin();
  const id = String(formData.get("id") ?? "");
  await deleteLegalReference(id);
  redirect("/admin/references");
}

export async function saveInstitutionAction(formData: FormData): Promise<void> {
  await requireAdmin();

  const slug = String(formData.get("slug") ?? "") as InstitutionSlug;
  const name = String(formData.get("name") ?? "").trim();
  const shortName = String(formData.get("shortName") ?? "").trim();
  const mission = String(formData.get("mission") ?? "").trim();
  const competence = String(formData.get("competence") ?? "").trim();
  const address = String(formData.get("address") ?? "").trim() || null;
  const phone = String(formData.get("phone") ?? "")
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);
  const website = String(formData.get("website") ?? "").trim() || null;
  const hours = String(formData.get("hours") ?? "").trim() || null;
  const note = String(formData.get("note") ?? "").trim() || null;

  await saveInstitution({ slug, name, shortName, mission, competence, address, phone, website, hours, note });
  redirect("/admin/institutions");
}

export async function saveContentPageAction(formData: FormData): Promise<void> {
  await requireAdmin();

  const slug = String(formData.get("slug") ?? "") as ContentPageSlug;
  const eyebrow = String(formData.get("eyebrow") ?? "").trim();
  const title = String(formData.get("title") ?? "").trim();
  const lede = String(formData.get("lede") ?? "").trim();
  const bodyMarkdown = String(formData.get("bodyMarkdown") ?? "");

  await saveContentPage({ slug, eyebrow, title, lede, bodyMarkdown });
  redirect("/admin/pages");
}
