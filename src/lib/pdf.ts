import { jsPDF } from "jspdf";
import { DISCRIMINATION_TYPE_LABELS, INSTITUTIONS, recommendedInstitutions } from "@/lib/institutions";
import type { DiscriminationType } from "@/lib/institutions";
import { CONTEXT_OPTIONS } from "@/lib/formOptions";
import { MONTH_OPTIONS } from "@/lib/formOptions";

export type ReportPdfData = {
  discriminationType: DiscriminationType;
  region: string;
  eventMonth: number;
  eventYear: number;
  context: string;
  description: string;
  contactName?: string;
  contactPhone?: string;
  contactEmail?: string;
};

const INDIGO: [number, number, number] = [22, 50, 79];
const LATERITE: [number, number, number] = [193, 80, 46];
const CHARBON: [number, number, number] = [43, 43, 40];
const GRAY: [number, number, number] = [110, 110, 105];

const PAGE_WIDTH = 595.28; // A4 pt
const PAGE_HEIGHT = 841.89;
const MARGIN = 56;
const CONTENT_WIDTH = PAGE_WIDTH - MARGIN * 2;

function contextLabel(value: string): string {
  return CONTEXT_OPTIONS.find((o) => o.value === value)?.label ?? value;
}

function monthLabel(month: number): string {
  return MONTH_OPTIONS.find((o) => o.value === month)?.label ?? String(month);
}

export function generateReportPdf(data: ReportPdfData): void {
  const doc = new jsPDF({ unit: "pt", format: "a4" });
  let y = MARGIN;

  const ensureSpace = (needed: number) => {
    if (y + needed > PAGE_HEIGHT - MARGIN) {
      doc.addPage();
      y = MARGIN;
    }
  };

  const wovenDivider = (color: [number, number, number]) => {
    ensureSpace(14);
    doc.setDrawColor(...color);
    doc.setLineWidth(1.2);
    const step = 12;
    let x = MARGIN;
    while (x < MARGIN + CONTENT_WIDTH) {
      doc.line(x, y + 8, x + step / 2, y);
      doc.line(x + step / 2, y, x + step, y + 8);
      x += step;
    }
    y += 22;
  };

  // Header
  doc.setFont("helvetica", "bold");
  doc.setFontSize(17);
  doc.setTextColor(...INDIGO);
  doc.text("Récapitulatif de signalement", MARGIN, y);
  y += 20;

  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);
  doc.setTextColor(...GRAY);
  const generatedAt = new Date().toLocaleString("fr-FR", {
    dateStyle: "long",
    timeStyle: "short",
  });
  doc.text(`Document généré le ${generatedAt}`, MARGIN, y);
  y += 18;

  wovenDivider(LATERITE);

  // Disclaimer box
  doc.setFillColor(242, 245, 241);
  const disclaimerText =
    "Ce document est un récapitulatif que vous générez vous-même. Il n'a pas été transmis à une institution : c'est à vous de l'apporter ou de l'envoyer à l'organisme compétent. Ce site ne dépose aucune plainte officielle en votre nom.";
  doc.setFont("helvetica", "italic");
  doc.setFontSize(10);
  const disclaimerLines = doc.splitTextToSize(disclaimerText, CONTENT_WIDTH - 24);
  const boxHeight = disclaimerLines.length * 13 + 16;
  ensureSpace(boxHeight);
  doc.roundedRect(MARGIN, y, CONTENT_WIDTH, boxHeight, 4, 4, "F");
  doc.setTextColor(...CHARBON);
  doc.text(disclaimerLines, MARGIN + 12, y + 16);
  y += boxHeight + 20;

  const field = (label: string, value: string) => {
    ensureSpace(34);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(10);
    doc.setTextColor(...INDIGO);
    doc.text(label.toUpperCase(), MARGIN, y);
    y += 14;
    doc.setFont("helvetica", "normal");
    doc.setFontSize(11.5);
    doc.setTextColor(...CHARBON);
    const lines = doc.splitTextToSize(value || "—", CONTENT_WIDTH);
    ensureSpace(lines.length * 14);
    doc.text(lines, MARGIN, y);
    y += lines.length * 14 + 12;
  };

  field("Type de discrimination", DISCRIMINATION_TYPE_LABELS[data.discriminationType]);
  field("Région", data.region);
  field("Période des faits", `${monthLabel(data.eventMonth)} ${data.eventYear}`);
  field("Contexte", contextLabel(data.context));
  field("Description des faits", data.description);

  if (data.contactName || data.contactPhone || data.contactEmail) {
    wovenDivider(INDIGO);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(12);
    doc.setTextColor(...INDIGO);
    ensureSpace(20);
    doc.text("Vos coordonnées (facultatif)", MARGIN, y);
    y += 18;
    if (data.contactName) field("Nom", data.contactName);
    if (data.contactPhone) field("Téléphone", data.contactPhone);
    if (data.contactEmail) field("E-mail", data.contactEmail);
  }

  wovenDivider(LATERITE);

  // Recommended institutions
  doc.setFont("helvetica", "bold");
  doc.setFontSize(13);
  doc.setTextColor(...INDIGO);
  ensureSpace(22);
  doc.text("Où apporter ce document", MARGIN, y);
  y += 20;

  const slugs = recommendedInstitutions(data.discriminationType);
  for (const slug of slugs) {
    const institution = INSTITUTIONS[slug];
    ensureSpace(30);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(11);
    doc.setTextColor(...LATERITE);
    doc.text(institution.shortName, MARGIN, y);
    y += 14;

    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);
    doc.setTextColor(...CHARBON);
    const details: string[] = [];
    if (institution.address) details.push(`Adresse : ${institution.address}`);
    if (institution.phone?.length) details.push(`Téléphone : ${institution.phone.join(" / ")}`);
    if (institution.website) details.push(`Site : ${institution.website}`);
    const detailLines = doc.splitTextToSize(details.join("\n"), CONTENT_WIDTH);
    ensureSpace(detailLines.length * 13);
    doc.text(detailLines, MARGIN, y);
    y += detailLines.length * 13 + 14;
  }

  // Footer disclaimer on last page
  ensureSpace(40);
  doc.setFont("helvetica", "italic");
  doc.setFontSize(8.5);
  doc.setTextColor(...GRAY);
  const footerText =
    "Les informations juridiques présentées sur ce site sont fournies à titre informatif, doivent être vérifiées auprès de sources officielles (Journal Officiel de Madagascar) et ne constituent pas un avis juridique.";
  const footerLines = doc.splitTextToSize(footerText, CONTENT_WIDTH);
  doc.text(footerLines, MARGIN, y);

  const fileName = `signalement-discrimination-${data.eventYear}-${String(data.eventMonth).padStart(2, "0")}.pdf`;
  doc.save(fileName);
}
