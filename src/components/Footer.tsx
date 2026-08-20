import Link from "next/link";
import WovenDivider from "./WovenDivider";

export default function Footer() {
  return (
    <footer className="mt-auto bg-indigo text-ecume">
      <WovenDivider color="or" />
      <div className="mx-auto max-w-6xl px-4 sm:px-6 py-10 grid gap-8 sm:grid-cols-3">
        <div>
          <p className="font-display text-lg font-bold text-white mb-2">Rariny</p>
          <p className="text-sm text-ecume/80 leading-relaxed">
            Site de sensibilisation et d&apos;orientation contre la discrimination raciale à
            Madagascar. Aucun compte, aucun dépôt de plainte officiel — une aide pour comprendre
            et agir.
          </p>
        </div>
        <div>
          <p className="text-sm font-semibold text-white mb-2">Navigation</p>
          <ul className="space-y-1.5 text-sm text-ecume/80">
            <li>
              <Link href="/comprendre" className="hover:text-white">
                Comprendre la discrimination raciale
              </Link>
            </li>
            <li>
              <Link href="/signalement" className="hover:text-white">
                Faire un signalement
              </Link>
            </li>
            <li>
              <Link href="/ou-porter-plainte" className="hover:text-white">
                Où porter plainte
              </Link>
            </li>
            <li>
              <Link href="/observatoire" className="hover:text-white">
                Observatoire
              </Link>
            </li>
            <li>
              <Link href="/a-propos" className="hover:text-white">
                À propos
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <p className="text-sm font-semibold text-white mb-2">Avertissement</p>
          <p className="text-sm text-ecume/80 leading-relaxed">
            Les informations juridiques de ce site sont fournies à titre informatif. Elles doivent
            être vérifiées auprès de sources officielles (Journal Officiel de Madagascar) et ne
            constituent pas un avis juridique.
          </p>
        </div>
      </div>
      <div className="border-t border-white/10">
        <p className="mx-auto max-w-6xl px-4 sm:px-6 py-4 text-xs text-ecume/60">
          © {new Date().getFullYear()} Rariny — site indépendant, sans lien officiel avec une
          institution de l&apos;État malgache.
        </p>
      </div>
    </footer>
  );
}
