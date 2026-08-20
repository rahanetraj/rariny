import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import Link from "next/link";
import { ADMIN_SESSION_COOKIE, isSessionValid } from "@/lib/adminAuth";
import { logoutAction } from "@/app/admin/actions";

export default async function ProtectedAdminLayout({ children }: { children: React.ReactNode }) {
  const store = await cookies();
  if (!isSessionValid(store.get(ADMIN_SESSION_COOKIE)?.value)) {
    redirect("/admin/login");
  }

  return (
    <div className="min-h-screen bg-ecume">
      <header className="bg-indigo text-white">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 h-14 flex items-center justify-between">
          <nav className="flex items-center gap-4 text-sm">
            <Link href="/admin" className="font-display font-bold">
              Rariny · Admin
            </Link>
            <Link href="/admin/references" className="text-ecume/80 hover:text-white">
              Références juridiques
            </Link>
            <Link href="/admin/institutions" className="text-ecume/80 hover:text-white">
              Institutions
            </Link>
            <Link href="/admin/pages" className="text-ecume/80 hover:text-white">
              Pages
            </Link>
          </nav>
          <form action={logoutAction}>
            <button type="submit" className="text-sm text-ecume/80 hover:text-white">
              Se déconnecter
            </button>
          </form>
        </div>
      </header>
      <main className="mx-auto max-w-4xl px-4 sm:px-6 py-10">{children}</main>
    </div>
  );
}
