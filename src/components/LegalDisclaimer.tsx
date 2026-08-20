export default function LegalDisclaimer() {
  return (
    <div className="rounded-lg border border-or/40 bg-or/10 px-4 py-3 flex gap-3 items-start">
      <svg
        aria-hidden="true"
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="#16324F"
        strokeWidth="2"
        className="shrink-0 mt-0.5"
      >
        <circle cx="12" cy="12" r="9" />
        <path d="M12 8v5M12 16h.01" strokeLinecap="round" />
      </svg>
      <p className="text-sm text-indigo leading-relaxed">
        Ces informations juridiques sont fournies à titre informatif. Elles doivent être vérifiées
        et mises à jour périodiquement auprès de sources officielles (Journal Officiel de
        Madagascar) et ne constituent pas un avis juridique.
      </p>
    </div>
  );
}
