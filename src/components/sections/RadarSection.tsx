import { useEffect, useRef, useState } from "react";

// ── Prospect data (exact CSV data) ───────────────────────────────────────────

type Row = {
  org: string;
  sector: string;
  dept: string;
  region: string;
  taille: string;
  lastBilan: string;
  historique: string;
  nbBilans: number;
  scope1: string;
  scope2: string;
  scope3: string;
  total: string;
  planTransition: string;
  signal: string;
  interlocuteur: string;
  angle: string;
  siren: string;
  naf: string;
  level: number;
  urgency: string;
};

const etiProspects: Row[] = [
  { org: "SNEF Telecom", sector: "Travaux d'installation électrique dans tous locaux", dept: "Bouches-du-Rhône", region: "Provence-Alpes-Côte d'Azur", taille: "Entre 500 et 999", lastBilan: "2020", historique: "[2020]", nbBilans: 1, scope1: "5 121 574", scope2: "53 303", scope3: "0", total: "5 174 877", planTransition: "Non", signal: "Bilan 2020 — échéance échue (cycle 4 ans). Scope 3 non renseigné (5,17 MtCO2e déclarés S1+S2).", interlocuteur: "Directeur Régional / Directeur QSE", angle: "Reprendre la démarche climat : sécuriser la mise à jour réglementaire, intégrer le scope 3 manquant et structurer une première trajectoire de décarbonation avec ekodev.", siren: "879 916 799", naf: "4321A", level: 1, urgency: "Retard légal" },
  { org: "SALOMON SAS", sector: "Fabrication d'articles de sport", dept: "Haute-Savoie", region: "Auvergne-Rhône-Alpes", taille: "Entre 500 et 999", lastBilan: "2022", historique: "[2022]", nbBilans: 1, scope1: "2 096", scope2: "3 197", scope3: "2 391 828", total: "2 397 121", planTransition: "Oui", signal: "Bilan 2022 — renouvellement à programmer pour 2026 (cycle 4 ans).", interlocuteur: "Directeur de Site / Directeur QSE-HSE", angle: "Accompagner la mise à jour du bilan 2022 en 2026. Opportunité d'approfondir le plan de transition existant et de consolider la stratégie climat globale.", siren: "325 820 751", naf: "3230Z", level: 2, urgency: "Échéance 2026" },
  { org: "VICAT", sector: "Fabrication de ciment", dept: "Isère", region: "Auvergne-Rhône-Alpes", taille: "Entre 500 et 999", lastBilan: "2022", historique: "[2022]", nbBilans: 1, scope1: "2 045 201", scope2: "14 631", scope3: "255 288", total: "2 315 120", planTransition: "Non", signal: "Bilan 2022 — renouvellement 2026. Aucun plan de transition formel identifié sur la base publique.", interlocuteur: "Directeur de Site / Directeur QSE-HSE", angle: "Cadrer la mise à jour 2026. Forte valeur ajoutée ekodev possible sur la création de la feuille de route climat (actuellement manquante en données publiques).", siren: "57 505 539", naf: "2351Z", level: 2, urgency: "Échéance 2026" },
  { org: "AUTOROUTE ESTEREL CÔTE AZUR PROVENCE ALP", sector: "Services auxiliaires des transports terrestres", dept: "Alpes-Maritimes", region: "Provence-Alpes-Côte d'Azur", taille: "Entre 500 et 999", lastBilan: "2022", historique: "[2015, 2019, 2022]", nbBilans: 3, scope1: "2 917", scope2: "1 029", scope3: "2 186 197", total: "2 190 144", planTransition: "Oui", signal: "Bilan 2022 — renouvellement 2026. Historique robuste (3 bilans).", interlocuteur: "Directeur Operations / Responsable RSE", angle: "Capitaliser sur leur maturité pour la mise à jour 2026 : proposer de passer d'une simple comptabilité à une véritable stratégie bas-carbone intégrée.", siren: "562 041 525", naf: "5221Z", level: 2, urgency: "Échéance 2026" },
  { org: "Pfeiffer Vacuum SAS", sector: "Fabrication d'autres pompes et compresseurs", dept: "Haute-Savoie", region: "Auvergne-Rhône-Alpes", taille: "Entre 500 et 999", lastBilan: "2022", historique: "[2018, 2022]", nbBilans: 2, scope1: "454", scope2: "858", scope3: "1 438 297", total: "1 439 609", planTransition: "Oui", signal: "Bilan 2022 — renouvellement 2026. Historique suivi (2 bilans).", interlocuteur: "Directeur de Site / Directeur QSE-HSE", angle: "Sécuriser la mise à jour 2026 et challenger l'approche actuelle sur le plan d'action de réduction (scope 3 majeur à piloter).", siren: "85 980 357", naf: "2813Z", level: 2, urgency: "Échéance 2026" },
  { org: "Pôle Pétrochimique de Berre", sector: "Fabrication de matières plastiques de base", dept: "Bouches-du-Rhône", region: "Provence-Alpes-Côte d'Azur", taille: "Entre 500 et 999", lastBilan: "2021", historique: "[2016, 2021]", nbBilans: 2, scope1: "1 149 166", scope2: "23 699", scope3: "0", total: "1 172 865", planTransition: "Oui", signal: "Bilan 2021 — échéance théorique 2025 dépassée. Scope 3 non renseigné (1,17 MtCO2e déclarés S1+S2).", interlocuteur: "Directeur de Site / Directeur QSE-HSE", angle: "Proposer une mise à jour du dernier bilan en intégrant un travail de fond sur le scope 3 et la trajectoire de décarbonation (site très émissif, fort besoin de conseil).", siren: "394 400 121", naf: "2016Z", level: 1, urgency: "5 ans retard" },
  { org: "GERFLOR", sector: "Fabrication d'éléments en matières plastiques pour la construction", dept: "Rhône", region: "Auvergne-Rhône-Alpes", taille: "Entre 2 000 et 4 999", lastBilan: "2022", historique: "[2019, 2021, 2022]", nbBilans: 3, scope1: "48 057", scope2: "43 185", scope3: "910 926", total: "1 002 168", planTransition: "Oui", signal: "Bilan 2022 — renouvellement 2026. Entreprise très régulière (3 bilans).", interlocuteur: "Directeur de Site / Directeur QSE-HSE", angle: "Assurer la continuité en 2026. Opportunité d'upsell sur des missions d'optimisation énergétique ou de stratégie RSE plus large.", siren: "726 580 152", naf: "2223Z", level: 2, urgency: "Échéance 2026" },
  { org: "KEM ONE", sector: "Fabrication de matières plastiques de base", dept: "Rhône", region: "Auvergne-Rhône-Alpes", taille: "Entre 1 000 et 1 999", lastBilan: "2018", historique: "[2018]", nbBilans: 1, scope1: "357 900", scope2: "189 244", scope3: "0", total: "547 144", planTransition: "Oui", signal: "Bilan 2018 — retard potentiel de mise à jour (cycles 4 ans). Scope 3 non renseigné.", interlocuteur: "Directeur de Site / Directeur QSE-HSE", angle: "Positionner ekodev pour reprendre et remettre à niveau une démarche BEGES vieillissante. L'absence de scope 3 ouvre un très beau chantier d'accompagnement.", siren: "538 695 040", naf: "2016Z", level: 1, urgency: "Retard légal" },
  { org: "COMPAGNIE DU PONANT", sector: "Transports maritimes et côtiers de passagers", dept: "Bouches-du-Rhône", region: "Provence-Alpes-Côte d'Azur", taille: "Entre 500 et 999", lastBilan: "2022", historique: "[2022]", nbBilans: 1, scope1: "197 997", scope2: "89", scope3: "196 619", total: "394 705", planTransition: "Oui", signal: "Bilan 2022 — renouvellement à programmer pour 2026.", interlocuteur: "Directeur Operations / Responsable RSE", angle: "Renouvellement 2026. L'image marque luxe/RSE est stratégique : l'approche sur-mesure d'ekodev correspond parfaitement aux attentes d'excellence de ce type d'acteur.", siren: "344 497 011", naf: "5010Z", level: 2, urgency: "Échéance 2026" },
  { org: "LABORATOIRES M&L", sector: "Fabrication de parfums et de produits pour la toilette", dept: "Alpes-de-Haute-Provence", region: "Provence-Alpes-Côte d'Azur", taille: "Entre 1 000 et 1 999", lastBilan: "2022", historique: "[2014, 2022]", nbBilans: 2, scope1: "1 624", scope2: "54", scope3: "285 647", total: "287 325", planTransition: "Non", signal: "Bilan 2022 — renouvellement 2026. Aucun plan de transition formel identifié publiquement.", interlocuteur: "Directeur de Site / Directeur QSE-HSE", angle: "Cadrer la mise à jour 2026 en proposant de structurer le plan de transition. Industrie cosmétique très exposée aux attentes des donneurs d'ordres sur le scope 3.", siren: "305 823 296", naf: "2042Z", level: 2, urgency: "Échéance 2026" },
];

const gcProspects: Row[] = [
  { org: "CMA CGM MARSEILLE", sector: "Transports maritimes et côtiers de fret", dept: "Bouches-du-Rhône", region: "Provence-Alpes-Côte d'Azur", taille: "Plus de 10 000", lastBilan: "2022", historique: "[2022]", nbBilans: 1, scope1: "25 823 006", scope2: "244 590", scope3: "13 224 546", total: "39 292 142", planTransition: "Oui", signal: "Bilan 2022 — renouvellement 2026. Empreinte massive (39 MtCO2e).", interlocuteur: "Directeur Operations / Responsable RSE", angle: "Renouvellement 2026. Profil grand compte complexe nécessitant une ingénierie de données pointue et une vision stratégique (parfaite démonstration du savoir-faire ekodev).", siren: "562 024 422", naf: "5020Z", level: 2, urgency: "Échéance 2026" },
  { org: "SOMFY ACTIVITES SA", sector: "Fabrication de moteurs, génératrices et transformateurs électriques", dept: "Haute-Savoie", region: "Auvergne-Rhône-Alpes", taille: "Entre 5 000 et 9 999", lastBilan: "2022", historique: "[2022]", nbBilans: 1, scope1: "7 654", scope2: "9 074", scope3: "1 158 389", total: "1 175 117", planTransition: "Oui", signal: "Bilan 2022 — renouvellement 2026.", interlocuteur: "Directeur de Site / Directeur QSE-HSE", angle: "Accompagner la mise à jour 2026. Le scope 3 est déjà identifié (1,15 MtCO2e) : opportunité de l'affiner et d'animer la chaîne de fournisseurs.", siren: "303 970 230", naf: "2711Z", level: 2, urgency: "Échéance 2026" },
  { org: "BIOMERIEUX SA", sector: "Fabrication d'autres produits chimiques n.c.a.", dept: "Rhône", region: "Auvergne-Rhône-Alpes", taille: "Plus de 10 000", lastBilan: "2020", historique: "[2011, 2012, 2013, 2014, 2015, 2020]", nbBilans: 6, scope1: "29 184", scope2: "36 552", scope3: "843 241", total: "908 977", planTransition: "Oui", signal: "Bilan 2020 — échéance théorique 2024. Historique très solide (6 bilans) mais interruption récente.", interlocuteur: "Directeur de Site / Directeur QSE-HSE", angle: "Relancer la dynamique reporting : actualiser le BEGES et aligner la démarche avec les nouvelles exigences de la CSRD.", siren: "673 620 399", naf: "2059Z", level: 1, urgency: "Retard légal" },
  { org: "MANUFACTURE MICHELIN (Site Puy-de-Dôme)", sector: "Fabrication et rechapage de pneumatiques", dept: "Puy-de-Dôme", region: "Auvergne-Rhône-Alpes", taille: "Plus de 10 000", lastBilan: "2018", historique: "[2018]", nbBilans: 1, scope1: "127 830", scope2: "2 198", scope3: "0", total: "130 028", planTransition: "Oui", signal: "Bilan 2018 — retard potentiel de mise à jour. Scope 3 non renseigné.", interlocuteur: "Directeur de Site / Directeur QSE-HSE", angle: "Reprendre la démarche à la base sur le site local. La structuration du scope 3 et la relance du BEGES sont un excellent point d'entrée industriel.", siren: "855 200 507", naf: "2211Z", level: 1, urgency: "Retard légal" },
  { org: "STMicroelectronics", sector: "Fabrication de composants électroniques", dept: "Isère", region: "Auvergne-Rhône-Alpes", taille: "Entre 5 000 et 9 999", lastBilan: "2022", historique: "[2022]", nbBilans: 1, scope1: "52 808", scope2: "19 418", scope3: "0", total: "72 226", planTransition: "Oui", signal: "Bilan 2022 — renouvellement 2026. Scope 3 non renseigné (72 ktCO2e déclarés S1+S2).", interlocuteur: "Directeur de Site / Directeur QSE-HSE", angle: "Préparer l'échéance 2026 en intégrant le scope 3 manquant. Forte attente groupe sur la donnée extra-financière à anticiper avec ekodev.", siren: "341 459 386", naf: "2611Z", level: 2, urgency: "Scope 3 = 0" },
  { org: "RENAULT TRUCKS", sector: "Construction de véhicules automobiles", dept: "Rhône", region: "Auvergne-Rhône-Alpes", taille: "Plus de 10 000", lastBilan: "2022", historique: "[2018, 2022]", nbBilans: 2, scope1: "27 054", scope2: "3 531", scope3: "0", total: "30 585", planTransition: "Oui", signal: "Bilan 2022 — renouvellement 2026. Scope 3 non renseigné.", interlocuteur: "Directeur de Site / Directeur QSE-HSE", angle: "Renouvellement 2026 à anticiper. Élargir le périmètre actuel en intégrant l'analyse de la chaîne de valeur (scope 3) pour consolider leur feuille de route.", siren: "954 506 077", naf: "2910Z", level: 2, urgency: "Scope 3 = 0" },
  { org: "AIRBUS HELICOPTERS ★", sector: "Construction aéronautique et spatiale", dept: "Bouches-du-Rhône", region: "Provence-Alpes-Côte d'Azur", taille: "Entre 5 000 et 9 999", lastBilan: "2020", historique: "[2017, 2020]", nbBilans: 2, scope1: "14 203", scope2: "5 507", scope3: "0", total: "19 710", planTransition: "Non", signal: "Bilan 2020 — échéance théorique 2024. Scope 3 non renseigné. Aucun plan de transition public identifié.", interlocuteur: "Directeur Régional / Directeur QSE", angle: "Remettre le reporting à jour et restructurer la démarche globale (scope 3 + définition d'une trajectoire climat claire).", siren: "352 383 715", naf: "3030Z", level: 1, urgency: "Retard + scope 3=0" },
  { org: "V.MANE FILS", sector: "Fabrication d'huiles essentielles", dept: "Alpes-Maritimes", region: "Provence-Alpes-Côte d'Azur", taille: "Entre 5 000 et 9 999", lastBilan: "2018", historique: "[2018]", nbBilans: 1, scope1: "9 732", scope2: "1 219", scope3: "0", total: "10 952", planTransition: "Oui", signal: "Bilan 2018 — retard potentiel de mise à jour. Scope 3 non renseigné.", interlocuteur: "Directeur de Site / Directeur QSE-HSE", angle: "Relance du dossier climat. Le manque de données récentes et l'absence de scope 3 offrent un excellent terrain pour une mission complète de conseil.", siren: "415 550 284", naf: "2053Z", level: 1, urgency: "Retard légal" },
];

// ── Sub-components ────────────────────────────────────────────────────────────

const Badge = ({ label, level }: { label: string; level: number }) => (
  <span style={{
    display: "inline-block", padding: "3px 9px",
    fontSize: 9, fontFamily: "'JetBrains Mono', monospace", letterSpacing: "0.1em",
    textTransform: "uppercase" as const, borderRadius: 2,
    ...(level === 1
      ? { background: "rgba(220,53,69,0.12)", color: "#e85c6a", border: "1px solid rgba(220,53,69,0.3)" }
      : { background: "rgba(255,220,90,0.12)", color: "#FFDC5A", border: "1px solid rgba(255,220,90,0.35)" }),
  }}>{label}</span>
);

const mono9: React.CSSProperties = { fontFamily: "'JetBrains Mono', monospace", fontSize: 9, letterSpacing: "0.12em", textTransform: "uppercase" };
const cell: React.CSSProperties = { padding: "14px 16px", borderBottom: "1px solid rgba(255,255,255,0.05)", verticalAlign: "top" };

const headers = [
  "Organisation", "Département / Région", "Taille", "Historique bilans",
  "Scope 1 tCO₂e", "Scope 2 tCO₂e", "Scope 3 tCO₂e", "Total tCO₂e",
  "Plan transition", "Signal légal", "Interlocuteur cible", "Angle commercial", "SIREN", "NAF",
];

const Table = ({ data }: { data: Row[] }) => (
  <div style={{ overflowX: "auto" as const }}>
    <table style={{ width: "100%", borderCollapse: "collapse", minWidth: 1400 }}>
      <thead>
        <tr>
          {headers.map(h => (
            <th key={h} style={{
              ...mono9, color: "rgba(155,197,199,0.6)",
              padding: "12px 16px", textAlign: "left" as const,
              borderBottom: "1px solid rgba(255,255,255,0.08)",
              background: "rgba(0,0,0,0.2)",
              whiteSpace: "nowrap" as const,
            }}>
              {h}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((p) => (
          <tr key={p.org + p.siren}
            onMouseEnter={(e) => (e.currentTarget as HTMLTableRowElement).querySelectorAll("td").forEach(td => (td as HTMLElement).style.background = "rgba(255,220,90,0.04)")}
            onMouseLeave={(e) => (e.currentTarget as HTMLTableRowElement).querySelectorAll("td").forEach(td => (td as HTMLElement).style.background = "")}
          >
            {/* Organisation + secteur */}
            <td style={{ ...cell, minWidth: 200 }}>
              <div style={{ fontWeight: 700, color: "#FFFFFF", fontSize: 13, marginBottom: 3, lineHeight: 1.3 }}>{p.org}</div>
              <div style={{ fontSize: 11, color: "#9BC5C7", lineHeight: 1.4 }}>{p.sector}</div>
              <div style={{ marginTop: 6 }}><Badge label={p.urgency} level={p.level} /></div>
            </td>
            {/* Dept / Region */}
            <td style={{ ...cell, minWidth: 160 }}>
              <div style={{ fontSize: 12, color: "#FFFFFF", fontWeight: 600 }}>{p.dept}</div>
              <div style={{ fontSize: 11, color: "rgba(248,247,243,0.65)", marginTop: 2 }}>{p.region}</div>
            </td>
            {/* Taille */}
            <td style={{ ...cell, minWidth: 140 }}>
              <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, color: "rgba(248,247,243,0.85)", fontWeight: 500 }}>{p.taille}</span>
            </td>
            {/* Historique */}
            <td style={{ ...cell, minWidth: 160 }}>
              <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, color: "rgba(248,247,243,0.85)", marginBottom: 4 }}>{p.historique}</div>
              <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 9, color: "#9BC5C7" }}>{p.nbBilans} bilan{p.nbBilans > 1 ? "s" : ""} publié{p.nbBilans > 1 ? "s" : ""}</div>
            </td>
            {/* Scope 1 */}
            <td style={{ ...cell, minWidth: 110, textAlign: "right" as const }}>
              <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: "#F8F7F3", fontWeight: 500 }}>{p.scope1}</span>
            </td>
            {/* Scope 2 */}
            <td style={{ ...cell, minWidth: 110, textAlign: "right" as const }}>
              <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: "#F8F7F3", fontWeight: 500 }}>{p.scope2}</span>
            </td>
            {/* Scope 3 */}
            <td style={{ ...cell, minWidth: 110, textAlign: "right" as const }}>
              <span style={{
                fontFamily: "'JetBrains Mono', monospace", fontSize: 11,
                color: p.scope3 === "0" ? "#ff6b7a" : "#F8F7F3",
                fontWeight: 700,
              }}>
                {p.scope3 === "0" ? "⚠ 0" : p.scope3}
              </span>
            </td>
            {/* Total */}
            <td style={{ ...cell, minWidth: 120, textAlign: "right" as const }}>
              <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 12, color: "#FFDC5A", fontWeight: 700 }}>{p.total}</span>
            </td>
            {/* Plan transition */}
            <td style={{ ...cell, minWidth: 80, textAlign: "center" as const }}>
              <span style={{
                fontFamily: "'JetBrains Mono', monospace", fontSize: 9,
                padding: "3px 8px",
                borderRadius: 2,
                fontWeight: 700,
                ...(p.planTransition === "Oui"
                  ? { background: "rgba(155,197,199,0.18)", color: "#9BC5C7", border: "1px solid rgba(155,197,199,0.4)" }
                  : { background: "rgba(255,107,122,0.15)", color: "#ff6b7a", border: "1px solid rgba(255,107,122,0.4)" }),
              }}>
                {p.planTransition}
              </span>
            </td>
            {/* Signal légal */}
            <td style={{ ...cell, minWidth: 220, fontSize: 12, color: "#F8F7F3", lineHeight: 1.55, fontWeight: 400 }}>{p.signal}</td>
            {/* Interlocuteur */}
            <td style={{ ...cell, minWidth: 180 }}>
              <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, color: "#FFDC5A", letterSpacing: "0.05em", fontWeight: 600 }}>{p.interlocuteur}</span>
            </td>
            {/* Angle commercial */}
            <td style={{ ...cell, minWidth: 280, fontSize: 12, color: "#F8F7F3", lineHeight: 1.65, fontStyle: "italic", fontWeight: 400 }}>{p.angle}</td>
            {/* SIREN */}
            <td style={{ ...cell, minWidth: 110 }}>
              <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, color: "rgba(248,247,243,0.55)" }}>{p.siren}</span>
            </td>
            {/* NAF */}
            <td style={{ ...cell, minWidth: 60 }}>
              <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, color: "rgba(248,247,243,0.55)" }}>{p.naf}</span>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

// ── Pillar icons (inline SVG) ─────────────────────────────────────────────────

const IconApi = () => (
  <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
    <circle cx="14" cy="14" r="13" stroke="#FFDC5A" strokeWidth="1.5" />
    <path d="M8 14h12M14 8v12" stroke="#FFDC5A" strokeWidth="1.5" strokeLinecap="round" />
    <circle cx="14" cy="14" r="3" fill="#FFDC5A" />
  </svg>
);

const IconAlgo = () => (
  <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
    <rect x="4" y="4" width="8" height="8" rx="1.5" stroke="#FFDC5A" strokeWidth="1.5" />
    <rect x="16" y="4" width="8" height="8" rx="1.5" stroke="#FFDC5A" strokeWidth="1.5" />
    <rect x="4" y="16" width="8" height="8" rx="1.5" stroke="#FFDC5A" strokeWidth="1.5" />
    <path d="M20 12v4m0 4v4M12 8h4" stroke="#FFDC5A" strokeWidth="1.5" strokeLinecap="round" />
    <circle cx="20" cy="20" r="2.5" fill="#FFDC5A" />
  </svg>
);

const IconEnrich = () => (
  <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
    <circle cx="10" cy="10" r="4.5" stroke="#FFDC5A" strokeWidth="1.5" />
    <circle cx="20" cy="18" r="4.5" stroke="#9BC5C7" strokeWidth="1.5" />
    <path d="M14 10h6M10 14v4" stroke="#FFDC5A" strokeWidth="1.5" strokeLinecap="round" strokeDasharray="2 2" />
  </svg>
);

// ── Main component ────────────────────────────────────────────────────────────

const RadarSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const tableRef = useRef<HTMLDivElement>(null);
  const [tab, setTab] = useState<"eti" | "gc">("eti");

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add("visible"); }),
      { threshold: 0.06, rootMargin: "0px 0px -40px 0px" }
    );
    sectionRef.current?.querySelectorAll(".reveal").forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  const scrollToTable = (t: "eti" | "gc") => {
    setTab(t);
    setTimeout(() => tableRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }), 80);
  };

  const pillars = [
    {
      icon: <IconApi />,
      tag: "Pilier 01",
      title: "Accès Temps Réel",
      sub: "API data.gouv",
      text: "Utilisation du protocole MCP (Model Context Protocol) pour connecter directement l'IA Claude à la base de données gouvernementale. Mise à jour automatique des bilans GES publiés chaque quinzaine.",
    },
    {
      icon: <IconAlgo />,
      tag: "Pilier 02",
      title: "Détection des Failles",
      sub: "L'Algorithme Réglementaire",
      text: "L'IA croise les dates de publication avec l'obligation de renouvellement (cycle de 4 ans) et scanne les incohérences — ex : Scope 3 non renseigné pour les industries lourdes.",
    },
    {
      icon: <IconEnrich />,
      tag: "Pilier 03",
      title: "Mapping Groupes & Décideurs",
      sub: "Enrichissement B2B",
      text: "Nettoyage des SIREN via Pharow pour lier le nom de l'usine (ex : Pôle de Berre) à la maison mère (LyondellBasell). Identification directe des Directeurs Administratifs & Financiers et Directeurs QSE sur LinkedIn.",
    },
  ];

  const signals = [
    {
      color: "#e85c6a",
      dot: "rgba(220,53,69,0.2)",
      label: "Retardataires",
      badge: "Retard légal",
      desc: "Entreprises dont le dernier BEGES date de 2018 ou 2020. Un besoin urgent d'accompagnement — et une exposition légale immédiate.",
    },
    {
      color: "#FFDC5A",
      dot: "rgba(255,220,90,0.15)",
      label: "Renouvellements 2026",
      badge: "Échéance cette année",
      desc: "Les bilans de 2022 arrivent à échéance maintenant. Une fenêtre de vente précise et prévisible, avant que l'urgence prenne le dessus.",
    },
    {
      color: "#9BC5C7",
      dot: "rgba(155,197,199,0.15)",
      label: "Passoires CSRD",
      badge: "Upsell stratégique",
      desc: "ETI ayant déclaré des millions de tonnes en Scope 1/2 avec un Scope 3 à zéro. Une opportunité parfaite de positionnement premium.",
    },
  ];

  return (
    <section
      id="radar"
      ref={sectionRef}
      style={{
        background: "#001f23",
        padding: "120px 0",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Noise texture overlay */}
      <div style={{
        position: "absolute", inset: 0, pointerEvents: "none",
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.04'/%3E%3C/svg%3E")`,
        opacity: 0.6,
      }} />

      {/* Grid lines decorative */}
      <div style={{
        position: "absolute", inset: 0, pointerEvents: "none",
        backgroundImage: "linear-gradient(rgba(155,197,199,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(155,197,199,0.03) 1px, transparent 1px)",
        backgroundSize: "60px 60px",
      }} />

      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 60px", position: "relative" }}>

        {/* ── HEADER ─────────────────────────────────────────────────────────── */}
        <div className="reveal" style={{ marginBottom: 80 }}>
          <div style={{
            fontFamily: "'JetBrains Mono', monospace", fontSize: 11,
            letterSpacing: "0.22em", textTransform: "uppercase" as const,
            color: "rgba(255,220,90,0.65)", marginBottom: 24,
          }}>
            // INGÉNIERIE DATA &amp; INTELLIGENCE ARTIFICIELLE
          </div>

          <h2 style={{
            fontFamily: "'Fraunces', serif",
            fontSize: "clamp(36px, 4vw, 58px)",
            fontWeight: 900, lineHeight: 1.05, letterSpacing: "-0.02em",
            color: "#F8F7F3", marginBottom: 28, maxWidth: 780,
          }}>
            Phase 1 — Transformer l'Open Data<br />
            <em style={{ fontStyle: "italic", color: "#9BC5C7" }}>en Pipeline Commercial Automatisé.</em>
          </h2>

          <p style={{
            fontSize: 17, color: "rgba(248,247,243,0.72)", lineHeight: 1.75,
            maxWidth: 680, fontWeight: 400,
          }}>
            La base publique des bilans GES de l'ADEME (data.gouv.fr) contient plus de 10 000 enregistrements.
            À l'état brut, c'est inexploitable. J'ai construit un écosystème technologique qui connecte cette base
            à l'IA pour en extraire des <strong style={{ color: "#FFDC5A", fontWeight: 600 }}>signaux d'achat immédiats</strong>.
          </p>
        </div>

        {/* ── 3 PILLARS ──────────────────────────────────────────────────────── */}
        <div className="reveal" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 24, marginBottom: 72 }}>
          {pillars.map((p, i) => (
            <div key={i} style={{
              background: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(255,255,255,0.08)",
              padding: "36px 32px",
              position: "relative",
              transition: "border-color 0.25s",
            }}
              onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.borderColor = "rgba(255,220,90,0.3)")}
              onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.08)")}
            >
              {/* Top accent line */}
              <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 2, background: "linear-gradient(90deg, #FFDC5A, transparent)" }} />

              <div style={{ marginBottom: 20 }}>{p.icon}</div>

              <div style={{
                fontFamily: "'JetBrains Mono', monospace", fontSize: 9,
                letterSpacing: "0.18em", textTransform: "uppercase" as const,
                color: "rgba(155,197,199,0.6)", marginBottom: 10,
              }}>{p.tag}</div>

              <div style={{ fontWeight: 700, fontSize: 17, color: "#F8F7F3", marginBottom: 4, lineHeight: 1.2 }}>{p.title}</div>
              <div style={{
                fontFamily: "'JetBrains Mono', monospace", fontSize: 10,
                color: "#FFDC5A", marginBottom: 16, letterSpacing: "0.05em",
              }}>{p.sub}</div>

              <p style={{ fontSize: 14, color: "rgba(248,247,243,0.7)", lineHeight: 1.7, margin: 0, fontWeight: 400 }}>{p.text}</p>
            </div>
          ))}
        </div>

        {/* ── SIGNALS ────────────────────────────────────────────────────────── */}
        <div className="reveal" style={{ marginBottom: 72 }}>
          <div style={{ marginBottom: 36 }}>
            <div style={{
              fontFamily: "'JetBrains Mono', monospace", fontSize: 10,
              letterSpacing: "0.2em", textTransform: "uppercase" as const,
              color: "rgba(248,247,243,0.4)", marginBottom: 12,
            }}>// OUTPUT DU SYSTÈME</div>
            <h3 style={{
              fontFamily: "'Fraunces', serif", fontSize: "clamp(26px, 3vw, 36px)",
              fontWeight: 800, color: "#F8F7F3", margin: 0, lineHeight: 1.1,
            }}>
              Ce que le système produit{" "}
              <span style={{ color: "#FFDC5A", fontStyle: "italic" }}>chaque quinzaine :</span>
            </h3>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20 }}>
            {signals.map((s, i) => (
              <div key={i} style={{
                background: s.dot,
                border: `1px solid ${s.color}30`,
                padding: "32px 28px",
                position: "relative",
                transition: "transform 0.2s",
              }}
                onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.transform = "translateY(-3px)")}
                onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.transform = "translateY(0)")}
              >
                <div style={{ display: "flex", alignItems: "flex-start", gap: 14, marginBottom: 16 }}>
                  <div style={{
                    width: 8, height: 8, borderRadius: "50%",
                    background: s.color, flexShrink: 0, marginTop: 6,
                    boxShadow: `0 0 10px ${s.color}80`,
                  }} />
                  <div>
                    <div style={{
                      fontFamily: "'JetBrains Mono', monospace", fontSize: 8,
                      letterSpacing: "0.18em", textTransform: "uppercase" as const,
                      color: s.color, marginBottom: 6,
                    }}>{s.badge}</div>
                    <div style={{ fontWeight: 700, fontSize: 18, color: "#F8F7F3", lineHeight: 1.2 }}>
                      {s.label}
                    </div>
                  </div>
                </div>
                <p style={{ fontSize: 14, color: "rgba(248,247,243,0.7)", lineHeight: 1.7, margin: 0, fontWeight: 400 }}>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* ── CTA BUTTONS ────────────────────────────────────────────────────── */}
        <div className="reveal" style={{ display: "flex", gap: 16, marginBottom: 80, flexWrap: "wrap" as const }}>
          <div style={{
            fontFamily: "'JetBrains Mono', monospace", fontSize: 10,
            letterSpacing: "0.15em", textTransform: "uppercase" as const,
            color: "rgba(248,247,243,0.35)", alignSelf: "center", marginRight: 8,
          }}>
            // PREUVES TERRAIN →
          </div>
          {[
            { label: "Échantillon Top 10 ETI — PACA / AURA", t: "eti" as const },
            { label: "Échantillon Top 10 Grands Groupes — PACA / AURA", t: "gc" as const },
          ].map(({ label, t }) => (
            <button
              key={t}
              onClick={() => scrollToTable(t)}
              style={{
                padding: "13px 24px",
                fontSize: 12, fontFamily: "'JetBrains Mono', monospace",
                letterSpacing: "0.06em",
                background: "transparent",
                border: "1px solid rgba(255,220,90,0.35)",
                color: "#FFDC5A",
                cursor: "pointer",
                transition: "all 0.2s",
                display: "flex", alignItems: "center", gap: 8,
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.background = "rgba(255,220,90,0.08)";
                (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,220,90,0.7)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.background = "transparent";
                (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,220,90,0.35)";
              }}
            >
              <span style={{ fontSize: 14 }}>📄</span>
              {label}
            </button>
          ))}
        </div>

      </div>

      {/* ── DATA TABLE — pleine largeur hors conteneur ──────────────────────── */}
      <div className="reveal" ref={tableRef} style={{ padding: "0 24px" }}>
        <div style={{
          background: "rgba(0,0,0,0.2)",
          border: "1px solid rgba(255,255,255,0.07)",
          overflow: "hidden",
        }}>
          {/* Table header bar */}
          <div style={{
            display: "flex", alignItems: "center", justifyContent: "space-between",
            padding: "20px 28px",
            borderBottom: "1px solid rgba(255,255,255,0.07)",
            background: "rgba(0,0,0,0.15)",
          }}>
            <div style={{ display: "flex", gap: 0 }}>
              {(["eti", "gc"] as const).map((t) => (
                <button key={t} onClick={() => setTab(t)} style={{
                  padding: "10px 22px", fontSize: 10, letterSpacing: "0.12em",
                  textTransform: "uppercase" as const,
                  border: "none", background: "none", cursor: "pointer",
                  fontFamily: "'JetBrains Mono', monospace",
                  borderBottom: tab === t ? "2px solid #FFDC5A" : "2px solid transparent",
                  color: tab === t ? "#FFDC5A" : "rgba(248,247,243,0.45)",
                  transition: "all 0.2s",
                }}>
                  {t === "eti" ? "ETI Qualifiées" : "Grands Comptes"}
                </button>
              ))}
            </div>
            <div style={{
              fontFamily: "'JetBrains Mono', monospace", fontSize: 9,
              color: "rgba(155,197,199,0.4)", letterSpacing: "0.1em",
            }}>
              SOURCE : ADEME / data.gouv.fr — PIPELINE PACA
            </div>
          </div>

          {tab === "eti" ? <Table data={etiProspects} /> : <Table data={gcProspects} />}
        </div>
      </div>

    </section>
  );
};

export default RadarSection;
