import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { ADMIN_SESSION_COOKIE, isSessionValid } from "@/lib/adminAuth";
import AdminNav from "@/components/AdminNav";

export default async function ProtectedAdminLayout({ children }: { children: React.ReactNode }) {
  const store = await cookies();
  if (!isSessionValid(store.get(ADMIN_SESSION_COOKIE)?.value)) {
    redirect("/admin/login");
  }

  return (
    <div className="min-h-screen bg-ecume">
      <AdminNav />
      <main className="mx-auto max-w-4xl px-4 sm:px-6 py-8 sm:py-10">{children}</main>
    </div>
  );
}
