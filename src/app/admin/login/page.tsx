import Link from "next/link";
import { loginAction } from "@/app/admin/actions";
import SubmitButton from "@/components/SubmitButton";

export const metadata = { title: "Connexion admin" };

export default async function AdminLoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const { error } = await searchParams;

  return (
    <div className="min-h-screen flex items-center justify-center bg-ecume px-4">
      <div className="w-full max-w-sm">
        <Link
          href="/"
          className="block font-display text-xl font-bold text-indigo text-center mb-1 hover:text-laterite"
        >
          Rariny
        </Link>
        <p className="text-sm text-charbon/60 text-center mb-8">Panneau d&apos;administration</p>

        <form action={loginAction} className="bg-white rounded-xl border border-ecume-deep p-6 space-y-4">
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-charbon mb-1.5">
              Mot de passe
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              autoFocus
              className="w-full rounded-md border border-ecume-deep px-3 py-2.5 text-sm"
            />
          </div>

          {error && (
            <p role="alert" className="text-sm text-laterite-dark">
              Mot de passe incorrect.
            </p>
          )}

          <SubmitButton
            pendingLabel="Connexion…"
            className="w-full px-4 py-2.5 rounded-md bg-laterite text-white font-semibold hover:bg-laterite-dark transition-colors disabled:opacity-60"
          >
            Se connecter
          </SubmitButton>
        </form>

        <Link href="/" className="block text-center text-sm text-charbon/60 hover:text-laterite mt-4">
          ← Retour au site
        </Link>
      </div>
    </div>
  );
}
