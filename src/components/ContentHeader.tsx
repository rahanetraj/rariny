export default function ContentHeader({
  eyebrow,
  title,
  lede,
}: {
  eyebrow: string;
  title: string;
  lede: string;
}) {
  return (
    <div className="mx-auto max-w-3xl px-4 sm:px-6 pt-10 pb-2">
      <p className="text-xs font-semibold uppercase tracking-wide text-ravinala mb-2">{eyebrow}</p>
      <h1 className="font-display text-2xl sm:text-3xl font-bold text-indigo leading-tight">
        {title}
      </h1>
      <p className="mt-3 text-base text-charbon/75 leading-relaxed">{lede}</p>
    </div>
  );
}
