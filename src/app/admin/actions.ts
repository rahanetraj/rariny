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
  createContentPage,
  createInstitution,
  deleteContentPage,
  deleteInstitution,
  deleteLegalReference,
  saveContentPage,
  saveInstitution,
  saveLegalReference,
  type ContentPageRecord,
  type InstitutionRecord,
} from "@/lib/content";

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
  const tags = formData.getAll("tags").map(String);
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

function institutionFromFormData(formData: FormData): InstitutionRecord {
  return {
    slug: String(formData.get("slug") ?? "").trim(),
    name: String(formData.get("name") ?? "").trim(),
    shortName: String(formData.get("shortName") ?? "").trim(),
    mission: String(formData.get("mission") ?? "").trim(),
    competence: String(formData.get("competence") ?? "").trim(),
    address: String(formData.get("address") ?? "").trim() || null,
    phone: String(formData.get("phone") ?? "")
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean),
    website: String(formData.get("website") ?? "").trim() || null,
    hours: String(formData.get("hours") ?? "").trim() || null,
    note: String(formData.get("note") ?? "").trim() || null,
  };
}

export async function saveInstitutionAction(formData: FormData): Promise<void> {
  await requireAdmin();
  await saveInstitution(institutionFromFormData(formData));
  redirect("/admin/institutions");
}

export async function createInstitutionAction(formData: FormData): Promise<void> {
  await requireAdmin();
  const result = await createInstitution(institutionFromFormData(formData));
  if (!result.ok) {
    redirect(`/admin/institutions/new?error=${encodeURIComponent(result.error)}`);
  }
  redirect("/admin/institutions");
}

export async function deleteInstitutionAction(formData: FormData): Promise<void> {
  await requireAdmin();
  const slug = String(formData.get("slug") ?? "");
  await deleteInstitution(slug);
  redirect("/admin/institutions");
}

function contentPageFromFormData(formData: FormData): ContentPageRecord {
  return {
    slug: String(formData.get("slug") ?? "").trim(),
    eyebrow: String(formData.get("eyebrow") ?? "").trim(),
    title: String(formData.get("title") ?? "").trim(),
    lede: String(formData.get("lede") ?? "").trim(),
    bodyMarkdown: String(formData.get("bodyMarkdown") ?? ""),
  };
}

export async function saveContentPageAction(formData: FormData): Promise<void> {
  await requireAdmin();
  await saveContentPage(contentPageFromFormData(formData));
  redirect("/admin/pages");
}

export async function createContentPageAction(formData: FormData): Promise<void> {
  await requireAdmin();
  const result = await createContentPage(contentPageFromFormData(formData));
  if (!result.ok) {
    redirect(`/admin/pages/new?error=${encodeURIComponent(result.error)}`);
  }
  redirect("/admin/pages");
}

export async function deleteContentPageAction(formData: FormData): Promise<void> {
  await requireAdmin();
  const slug = String(formData.get("slug") ?? "");
  const result = await deleteContentPage(slug);
  if (!result.ok) {
    redirect(`/admin/pages/${slug}?error=${encodeURIComponent(result.error)}`);
  }
  redirect("/admin/pages");
}
