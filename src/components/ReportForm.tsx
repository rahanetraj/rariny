"use client";

import { useState } from "react";
import Link from "next/link";
import {
  DISCRIMINATION_TYPE_LABELS,
  recommendedInstitutions,
  type DiscriminationType,
} from "@/lib/institutions";
import type { InstitutionRecord } from "@/lib/content";
import { CONTEXT_OPTIONS, MONTH_OPTIONS, yearOptions, type ContextValue } from "@/lib/formOptions";
import { REGION_OPTIONS } from "@/lib/regions";
import { generateReportPdf } from "@/lib/pdf";
import WovenDivider from "@/components/WovenDivider";

const DISCRIMINATION_TYPES = Object.entries(DISCRIMINATION_TYPE_LABELS) as [
  DiscriminationType,
  string,
][];

type FormState = {
  discriminationType: DiscriminationType | "";
  region: string;
  eventMonth: number | "";
  eventYear: number | "";
  context: ContextValue | "";
  description: string;
  contactName: string;
  contactPhone: string;
  contactEmail: string;
};

const EMPTY_STATE: FormState = {
  discriminationType: "",
  region: "",
  eventMonth: "",
  eventYear: "",
  context: "",
  description: "",
  contactName: "",
  contactPhone: "",
  contactEmail: "",
};

export default function ReportForm({ institutions }: { institutions: InstitutionRecord[] }) {
  const [form, setForm] = useState<FormState>(EMPTY_STATE);
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({});
  const [submittedType, setSubmittedType] = useState<DiscriminationType | null>(null);
  const [statsWarning, setStatsWarning] = useState(false);

  function update<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  function validate(): boolean {
    const next: Partial<Record<keyof FormState, string>> = {};
    if (!form.discriminationType) next.discriminationType = "Choisissez un type de discrimination.";
    if (!form.region) next.region = "Choisissez une région.";
    if (!form.eventMonth) next.eventMonth = "Choisissez un mois.";
    if (!form.eventYear) next.eventYear = "Choisissez une année.";
    if (!form.context) next.context = "Choisissez un contexte.";
    if (!form.description.trim() || form.description.trim().length < 20)
      next.description = "Décrivez les faits en au moins 20 caractères.";
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validate()) return;

    const data = {
      discriminationType: form.discriminationType as DiscriminationType,
      region: form.region,
      eventMonth: form.eventMonth as number,
      eventYear: form.eventYear as number,
      context: form.context as ContextValue,
      description: form.description.trim(),
      contactName: form.contactName.trim() || undefined,
      contactPhone: form.contactPhone.trim() || undefined,
      contactEmail: form.contactEmail.trim() || undefined,
    };

    generateReportPdf(data, institutions);

    try {
      const res = await fetch("/api/reports", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          discriminationType: data.discriminationType,
          region: data.region,
          context: data.context,
          eventMonth: data.eventMonth,
          eventYear: data.eventYear,
        }),
      });
      if (!res.ok) setStatsWarning(true);
    } catch {
      setStatsWarning(true);
    }

    setSubmittedType(data.discriminationType);
  }

  if (submittedType) {
    return (
      <Confirmation
        type={submittedType}
        institutions={institutions}
        statsWarning={statsWarning}
        onReset={() => {
          setForm(EMPTY_STATE);
          setErrors({});
          setSubmittedType(null);
          setStatsWarning(false);
        }}
      />
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="mt-8 space-y-10">
      <fieldset>
        <legend className="font-display text-base font-bold text-indigo mb-3">
          1. Type de discrimination <span className="text-laterite">*</span>
        </legend>
        <div className="grid gap-2.5 sm:grid-cols-2">
          {DISCRIMINATION_TYPES.map(([value, label]) => (
            <label
              key={value}
              className={`flex items-start gap-2.5 rounded-lg border p-3.5 cursor-pointer transition-colors ${
                form.discriminationType === value
                  ? "border-laterite bg-laterite/5"
                  : "border-ecume-deep bg-white hover:border-indigo/40"
              }`}
            >
              <input
                type="radio"
                name="discriminationType"
                value={value}
                checked={form.discriminationType === value}
                onChange={() => update("discriminationType", value)}
                className="mt-0.5 accent-laterite"
              />
              <span className="text-sm text-charbon">{label}</span>
            </label>
          ))}
        </div>
        {errors.discriminationType && <FieldError message={errors.discriminationType} />}
      </fieldset>

      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <label htmlFor="region" className="block font-display text-base font-bold text-indigo mb-2">
            2. Région <span className="text-laterite">*</span>
          </label>
          <select
            id="region"
            className="w-full rounded-md border border-ecume-deep bg-white px-3 py-2.5 text-sm text-charbon"
            value={form.region}
            onChange={(e) => update("region", e.target.value)}
          >
            <option value="">Sélectionner…</option>
            {REGION_OPTIONS.map((r) => (
              <option key={r} value={r}>
                {r}
              </option>
            ))}
          </select>
          {errors.region && <FieldError message={errors.region} />}
        </div>

        <div>
          <span className="block font-display text-base font-bold text-indigo mb-2">
            3. Période des faits <span className="text-laterite">*</span>
          </span>
          <div className="flex gap-2">
            <select
              aria-label="Mois des faits"
              className="w-1/2 rounded-md border border-ecume-deep bg-white px-3 py-2.5 text-sm text-charbon"
              value={form.eventMonth}
              onChange={(e) => update("eventMonth", e.target.value ? Number(e.target.value) : "")}
            >
              <option value="">Mois</option>
              {MONTH_OPTIONS.map((m) => (
                <option key={m.value} value={m.value}>
                  {m.label}
                </option>
              ))}
            </select>
            <select
              aria-label="Année des faits"
              className="w-1/2 rounded-md border border-ecume-deep bg-white px-3 py-2.5 text-sm text-charbon"
              value={form.eventYear}
              onChange={(e) => update("eventYear", e.target.value ? Number(e.target.value) : "")}
            >
              <option value="">Année</option>
              {yearOptions().map((y) => (
                <option key={y} value={y}>
                  {y}
                </option>
              ))}
            </select>
          </div>
          {(errors.eventMonth || errors.eventYear) && (
            <FieldError message={errors.eventMonth ?? errors.eventYear!} />
          )}
        </div>
      </div>

      <fieldset>
        <legend className="font-display text-base font-bold text-indigo mb-3">
          4. Contexte <span className="text-laterite">*</span>
        </legend>
        <div className="grid gap-2.5 sm:grid-cols-2">
          {CONTEXT_OPTIONS.map((opt) => (
            <label
              key={opt.value}
              className={`flex items-start gap-2.5 rounded-lg border p-3.5 cursor-pointer transition-colors ${
                form.context === opt.value
                  ? "border-laterite bg-laterite/5"
                  : "border-ecume-deep bg-white hover:border-indigo/40"
              }`}
            >
              <input
                type="radio"
                name="context"
                value={opt.value}
                checked={form.context === opt.value}
                onChange={() => update("context", opt.value)}
                className="mt-0.5 accent-laterite"
              />
              <span className="text-sm text-charbon">{opt.label}</span>
            </label>
          ))}
        </div>
        {errors.context && <FieldError message={errors.context} />}
      </fieldset>

      <div>
        <label htmlFor="description" className="block font-display text-base font-bold text-indigo mb-2">
          5. Description des faits <span className="text-laterite">*</span>
        </label>
        <p className="text-sm text-charbon/60 mb-2">
          Ce texte n&apos;est jamais envoyé à nos serveurs : il reste sur votre appareil et
          n&apos;apparaît que dans votre PDF.
        </p>
        <textarea
          id="description"
          rows={7}
          className="w-full rounded-md border border-ecume-deep bg-white px-3 py-2.5 text-sm text-charbon leading-relaxed"
          value={form.description}
          onChange={(e) => update("description", e.target.value)}
          placeholder="Décrivez ce qui s'est passé, le plus précisément possible : contexte, propos ou faits, personnes impliquées si vous les connaissez…"
        />
        {errors.description && <FieldError message={errors.description} />}
      </div>

      <WovenDivider color="or" />

      <div>
        <h2 className="font-display text-base font-bold text-indigo mb-1">
          6. Vos coordonnées (facultatif)
        </h2>
        <p className="text-sm text-charbon/60 mb-4">
          Utilisées uniquement pour figurer sur votre PDF — jamais stockées sur nos serveurs.
        </p>
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="contactName" className="block text-sm font-medium text-charbon mb-1.5">
              Nom
            </label>
            <input
              id="contactName"
              type="text"
              className="w-full rounded-md border border-ecume-deep bg-white px-3 py-2.5 text-sm"
              value={form.contactName}
              onChange={(e) => update("contactName", e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="contactPhone" className="block text-sm font-medium text-charbon mb-1.5">
              Téléphone
            </label>
            <input
              id="contactPhone"
              type="tel"
              className="w-full rounded-md border border-ecume-deep bg-white px-3 py-2.5 text-sm"
              value={form.contactPhone}
              onChange={(e) => update("contactPhone", e.target.value)}
            />
          </div>
          <div className="sm:col-span-2">
            <label htmlFor="contactEmail" className="block text-sm font-medium text-charbon mb-1.5">
              E-mail
            </label>
            <input
              id="contactEmail"
              type="email"
              className="w-full rounded-md border border-ecume-deep bg-white px-3 py-2.5 text-sm"
              value={form.contactEmail}
              onChange={(e) => update("contactEmail", e.target.value)}
            />
          </div>
        </div>
      </div>

      <button
        type="submit"
        className="w-full sm:w-auto px-8 py-3.5 rounded-md bg-laterite text-white font-semibold hover:bg-laterite-dark transition-colors"
      >
        Générer mon document PDF
      </button>
    </form>
  );
}

function FieldError({ message }: { message: string }) {
  return (
    <p role="alert" className="mt-2 text-sm text-laterite-dark">
      {message}
    </p>
  );
}

function Confirmation({
  type,
  institutions,
  statsWarning,
  onReset,
}: {
  type: DiscriminationType;
  institutions: InstitutionRecord[];
  statsWarning: boolean;
  onReset: () => void;
}) {
  const slugs = recommendedInstitutions(type);

  return (
    <div className="mt-8">
      <div className="rounded-xl border border-ravinala/30 bg-ravinala/5 p-6">
        <p className="font-display text-lg font-bold text-ravinala mb-1">
          Votre document a été téléchargé
        </p>
        <p className="text-sm text-charbon/80 leading-relaxed">
          Le PDF récapitulatif a été généré directement sur votre appareil. Vérifiez votre dossier
          de téléchargements. Vous pouvez maintenant l&apos;apporter à l&apos;institution
          compétente.
        </p>
        {statsWarning && (
          <p className="text-xs text-charbon/50 mt-3">
            (Votre document est bien généré ; seule la mise à jour des statistiques anonymes a
            échoué — cela n&apos;affecte pas votre PDF.)
          </p>
        )}
      </div>

      <WovenDivider color="laterite" className="my-8" />

      <h2 className="font-display text-lg font-bold text-indigo mb-4">
        Institution(s) recommandée(s) pour votre situation
      </h2>
      <div className="space-y-4">
        {slugs.map((slug) => {
          const inst = institutions.find((i) => i.slug === slug);
          if (!inst) return null;
          return (
            <Link
              key={slug}
              href={`/ou-porter-plainte/${slug}`}
              className="block rounded-lg border border-ecume-deep bg-white p-5 hover:shadow-md transition-shadow"
            >
              <p className="font-display font-bold text-indigo">{inst.shortName}</p>
              {inst.address && <p className="text-sm text-charbon/70 mt-1">{inst.address}</p>}
              {inst.phone.length > 0 && (
                <p className="text-sm text-charbon/70 font-mono mt-1">{inst.phone.join(" / ")}</p>
              )}
            </Link>
          );
        })}
      </div>

      <button
        type="button"
        onClick={onReset}
        className="mt-8 px-6 py-3 rounded-md border-2 border-indigo text-indigo font-semibold hover:bg-indigo hover:text-white transition-colors"
      >
        Faire un nouveau signalement
      </button>
    </div>
  );
}
