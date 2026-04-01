import Papa from "papaparse";
import type { Prospect } from "./radarTypes";

function fmtNum(v: unknown): number {
  const n = parseFloat(String(v).replace(",", "."));
  return isNaN(n) ? 0 : n;
}

function fmtInt(v: unknown): number {
  const n = parseInt(String(v), 10);
  return isNaN(n) ? 0 : n;
}

function parseRows(rows: Record<string, string>[], segment: "ETI" | "GG"): Prospect[] {
  return rows
    .filter((r) => r["Organisation"] && r["Organisation"].trim() !== "")
    .map((r) => ({
      organisation: r["Organisation"]?.trim() ?? "",
      secteur: r["Secteur"]?.trim() ?? "",
      departement: r["Departement"]?.trim() ?? "",
      region: r["Region"]?.trim() ?? "",
      taille: r["Taille (salaries)"]?.trim() ?? "",
      anneeBilan: fmtInt(r["Annee dernier bilan"]),
      historique: r["Historique bilans"]?.trim() ?? "",
      nbBilans: fmtInt(r["Nb bilans publies"]),
      scope1: fmtNum(r["Scope 1 tCO2e"]),
      scope2: fmtNum(r["Scope 2 tCO2e"]),
      scope3: fmtNum(r["Scope 3 tCO2e"]),
      totalEmissions: fmtNum(r["Total emissions tCO2e"]),
      planTransition: (r["Plan transition"]?.trim() === "Oui" ? "Oui" : "Non") as "Oui" | "Non",
      score: (fmtInt(r["Score priorite"]) || 1) as 1 | 2 | 3,
      signalLegal: r["Signal legal"]?.trim() ?? "",
      interlocuteur: r["Interlocuteur cible"]?.trim() ?? "",
      angleCommercial: r["Angle commercial"]?.trim() ?? "",
      siren: r["SIREN"]?.trim() ?? "",
      codeNaf: r["Code NAF"]?.trim() ?? "",
      segment,
    }));
}

async function fetchCsv(path: string, segment: "ETI" | "GG"): Promise<Prospect[]> {
  const res = await fetch(path);
  const text = await res.text();
  const parsed = Papa.parse<Record<string, string>>(text, {
    header: true,
    delimiter: ";",
    skipEmptyLines: true,
  });
  return parseRows(parsed.data, segment);
}

export async function loadAllProspects(): Promise<Prospect[]> {
  const [eti, gg] = await Promise.all([
    fetchCsv("/data/eti.csv", "ETI"),
    fetchCsv("/data/gg.csv", "GG"),
  ]);
  return [...eti, ...gg].sort((a, b) => a.score - b.score || b.totalEmissions - a.totalEmissions);
}

// ── Email generator ────────────────────────────────────────────────────────────

function getPersonaIntro(interlocuteur: string): string {
  const i = interlocuteur.toLowerCase();
  if (i.includes("site") || i.includes("qse") || i.includes("hse"))
    return "En tant que responsable des opérations terrain, vous savez mieux que quiconque ce que représente la pression réglementaire au quotidien.";
  if (i.includes("operations") || i.includes("rse"))
    return "En tant que pilier de la démarche RSE de votre site, vous portez un sujet qui monte en puissance partout dans la région.";
  if (i.includes("regional") || i.includes("daf") || i.includes("financier"))
    return "Votre double regard sur les aspects financiers et opérationnels en fait le décideur naturel sur ce type de sujet.";
  return "Vous pilotez des enjeux qui placent directement votre site au cœur des nouvelles obligations de reporting climatique.";
}

function getSignalPhrase(p: Prospect): string {
  const anRetard = 2026 - p.anneeBilan;
  if (anRetard >= 4 && p.anneeBilan > 0)
    return `Votre dernier bilan BEGES date de ${p.anneeBilan} — soit ${anRetard} ans sans mise à jour. En 2026, c'est un risque légal concret.`;
  if (p.scope3 === 0 && (p.scope1 + p.scope2) > 1000)
    return `Votre bilan déclare ${Math.round(p.scope1 + p.scope2).toLocaleString("fr-FR")} tCO₂e en Scope 1+2 mais zéro en Scope 3 — une lacune que la CSRD ne tolérera plus.`;
  if (p.planTransition === "Non")
    return `Aucun plan de transition n'est publié à ce jour sur la base ADEME. C'est l'angle qu'on peut structurer ensemble.`;
  return `Votre bilan ${p.anneeBilan} arrive à son cycle de renouvellement en 2026 — le bon moment pour franchir un cap.`;
}

export function buildEmail(p: Prospect): { subject: string; body: string } {
  const subject = `${p.organisation} — bilan carbone 2026, on anticipe ensemble ?`;
  const personaIntro = getPersonaIntro(p.interlocuteur);
  const signalPhrase = getSignalPhrase(p);

  const body = `Bonjour,

${personaIntro}

${signalPhrase}

Chez ekodev (groupe EPSA, B Corp certifié), on accompagne les ${
    p.segment === "GG" ? "grands comptes industriels" : "ETI régionales"
  } en PACA et Auvergne-Rhône-Alpes dans la réalisation de leur bilan carbone — de la collecte des données à la stratégie de décarbonation, en 8 semaines.

Ce qui nous différencie : nos clients économisent en moyenne 15 à 20% sur leurs coûts énergétiques grâce aux synergies avec Enoptea (groupe EPSA). Et BpiFrance finance jusqu'à 6 000€ via le Diag Décarbon'Action.

Ça vaut un échange de 20 minutes sur Teams ?

Adam Telmat — Business Developer, ekodev Marseille`;

  return { subject, body };
}

// ── CSV export ─────────────────────────────────────────────────────────────────

export function exportToCsv(prospects: Prospect[]): void {
  const headers = [
    "Organisation", "Segment", "Secteur", "Département", "Région", "Taille",
    "Année bilan", "Nb bilans", "Scope 1", "Scope 2", "Scope 3", "Total tCO2e",
    "Plan transition", "Score", "Signal légal", "Interlocuteur cible", "Angle commercial", "SIREN",
  ];

  const rows = prospects.map((p) => [
    p.organisation, p.segment, p.secteur, p.departement, p.region, p.taille,
    p.anneeBilan, p.nbBilans, p.scope1, p.scope2, p.scope3, p.totalEmissions,
    p.planTransition, p.score, `"${p.signalLegal}"`, p.interlocuteur, `"${p.angleCommercial}"`, p.siren,
  ]);

  const csv = [headers.join(";"), ...rows.map((r) => r.join(";"))].join("\n");
  const blob = new Blob(["\uFEFF" + csv], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `ekodev_prospects_${new Date().toISOString().slice(0, 10)}.csv`;
  a.click();
  URL.revokeObjectURL(url);
}

// ── Formatting helpers ─────────────────────────────────────────────────────────

export function fmtEmissions(v: number): string {
  if (v >= 1_000_000) return `${(v / 1_000_000).toFixed(1)} Mt`;
  if (v >= 1_000) return `${Math.round(v / 1_000)} kt`;
  return `${Math.round(v)} t`;
}
