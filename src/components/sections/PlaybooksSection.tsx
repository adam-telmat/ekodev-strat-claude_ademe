import { useEffect, useRef, useState } from "react";
import { SectionHeader } from "./CibleSection";

// ── Types ────────────────────────────────────────────────────────────────────

type Canal = "email" | "call";
type Segment = "grandgroupe" | "eti" | "renouvellement";

// ── Data ─────────────────────────────────────────────────────────────────────

const segments: { id: Segment; icon: string; label: string; sub: string }[] = [
  { id: "grandgroupe", icon: "🏭", label: "Grand Groupe", sub: "Scope 3 vide" },
  { id: "eti",         icon: "🚨", label: "ETI en Retard", sub: "Urgence légale" },
  { id: "renouvellement", icon: "🔄", label: "Renouvellement 2026", sub: "Opportunité Upsell" },
];

const emails: Record<Segment, { cible: string; objet: string; corps: string }> = {
  grandgroupe: {
    cible: "Directeur RSE / Directeur Achats",
    objet: "Votre empreinte industrielle et les attentes Scope 3",
    corps: `Bonjour [Prénom],

En analysant les données publiques de l'ADEME, j'ai noté que le bilan de [Entreprise] se concentrait sur vos résultats Scope 1 et 2. Aujourd'hui, avec la pression de la CSRD, vos donneurs d'ordres exigent une visibilité totale sur votre chaîne de valeur (Scope 3). Conserver votre périmètre actuel devient un risque lors des prochains appels d'offres.

Notre cabinet ekodev décharge les industriels de cette collecte complexe pour structurer une donnée finançable. Avez-vous 15 minutes mardi pour échanger sur vos méthodes de collecte actuelles ?

Adam, ekodev Marseille`,
  },
  eti: {
    cible: "Directeur Administratif & Financier / Directeur Général",
    objet: "[Entreprise], retard sur votre obligation BEGES",
    corps: `Bonjour [Prénom],

Sauf erreur sur data.gouv, la dernière mise à jour de votre bilan carbone date de [Année]. Vous avez dépassé le cycle légal de 4 ans. C'est un point bloquant croissant pour vos partenaires financiers et vos clients B2B.

La bonne nouvelle : la remise en conformité de votre ETI est éligible au Diag Décarbon'Action (subvention Bpifrance). Chez ekodev, on s'occupe du dossier de financement et de 90% du travail opérationnel. Peut-on bloquer 15 minutes jeudi pour valider votre éligibilité ?

Adam, ekodev Marseille`,
  },
  renouvellement: {
    cible: "Directeur QSE / Directeur de Site",
    objet: "Anticipation du renouvellement carbone 2026 de [Entreprise]",
    corps: `Bonjour [Prénom],

Votre précédent bilan GES date de 2022. Vous entrez donc cette année dans votre cycle de renouvellement. Depuis 4 ans, les standards ont changé : un bilan carbone doit désormais être la base d'une stratégie de réduction énergétique.

Le groupe ekodev/EPSA vous propose de lier cette mise à jour légale à un audit de vos factures énergétiques (Enoptea) pour autofinancer votre transition. Un point de 15 minutes la semaine prochaine pour cadrer les synergies possibles vous intéresse-t-il ?

Adam, ekodev Marseille`,
  },
};

const calls: Record<Segment, { cible: string; pitch: string }> = {
  grandgroupe: {
    cible: "Directeur RSE / Directeur Achats",
    pitch: `Bonjour [Prénom], Adam d'ekodev. Je vous appelle suite à l'analyse de votre bilan réglementaire public.

Ce qui m'a interpellé, c'est le contraste entre vos émissions industrielles et l'absence publique de votre Scope 3. Beaucoup de sites ont du mal à modéliser cette chaîne de valeur et perdent des points fournisseurs.

Je vous appelle pour organiser un échange de 15 minutes et vous montrer comment on a structuré la donnée de groupes similaires sans surcharger vos équipes.

Mardi 10h, c'est possible ?`,
  },
  eti: {
    cible: "Directeur Administratif & Financier / Directeur Général",
    pitch: `Bonjour [Prénom], Adam d'ekodev. Je vais droit au but.

Je vois sur la base de l'État que votre bilan carbone n'a pas été renouvelé depuis [Année]. Je sais que c'est un sujet lourd à relancer pour un Directeur Administratif et Financier.

Je vous appelle pour vous informer qu'on peut financer cette mise en conformité via les subventions Bpifrance, tout en déléguant le travail à nos ingénieurs.

Vous auriez 15 minutes jeudi pour que je vous explique le montage financier ?`,
  },
  renouvellement: {
    cible: "Directeur QSE / Directeur de Site",
    pitch: `Bonjour [Prénom], Adam du groupe ekodev/EPSA. Je vous appelle simplement pour anticiper votre échéance de renouvellement carbone 2026.

L'erreur classique est de refaire la même photo qu'en 2022. Aujourd'hui, notre approche utilise cette collecte obligatoire pour identifier des économies d'énergie immédiates avec nos experts.

L'objectif est que votre bilan s'autofinance par ces optimisations.

Un échange de 15 minutes mardi pour vous détailler ça vous paraît pertinent ?`,
  },
};

// ── Highlight span ────────────────────────────────────────────────────────────
const Hl = ({ children }: { children: React.ReactNode }) => (
  <span style={{ background: "rgba(255,220,90,0.15)", color: "#FFDC5A", padding: "1px 6px", fontFamily: "'JetBrains Mono', monospace", fontSize: 12 }}>
    {children}
  </span>
);

// Remplace [Prénom], [Entreprise], [Année] par des spans jaunes
const highlight = (text: string) => {
  const parts = text.split(/(\[Prénom\]|\[Entreprise\]|\[Année\])/g);
  return parts.map((p, i) =>
    p === "[Prénom]" || p === "[Entreprise]" || p === "[Année]"
      ? <Hl key={i}>{p}</Hl>
      : <span key={i}>{p}</span>
  );
};

// ── Main component ────────────────────────────────────────────────────────────
const PlaybooksSection = () => {
  const ref = useRef<HTMLElement>(null);
  const [canal, setCanal] = useState<Canal>("email");
  const [segment, setSegment] = useState<Segment>("grandgroupe");

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add("visible"); }),
      { threshold: 0.06, rootMargin: "0px 0px -40px 0px" }
    );
    ref.current?.querySelectorAll(".reveal").forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  const emailData = emails[segment];
  const callData = calls[segment];

  const segBadgeColor: Record<Segment, string> = {
    grandgroupe: "#9BC5C7",
    eti: "#e85c6a",
    renouvellement: "#FFDC5A",
  };

  return (
    <section id="playbooks" ref={ref} style={{ padding: "clamp(60px,10vw,120px) 0", background: "#003035" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 clamp(16px,5vw,60px)" }}>

        <SectionHeader num="02b" phase="Phase 2 : Playbooks"
          dark
          title={<>Les Playbooks de Prospection<br /><em style={{ fontStyle: "italic", color: "#9BC5C7" }}>Segmentés</em></>}
          sub="Chaque signal ADEME appelle un message différent. Voici comment j'adapte l'approche email et téléphonique en fonction du profil détecté par le radar." />

        {/* ── NIVEAU 1 — Canal ──────────────────────────────────────────────── */}
        <div className="reveal" style={{ marginBottom: 40 }}>
          <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 9, letterSpacing: "0.2em", textTransform: "uppercase" as const, color: "rgba(248,247,243,0.35)", marginBottom: 16 }}>
            // SÉLECTIONNER LE CANAL
          </div>
          <div style={{ display: "flex", gap: 12 }}>
            {([
              { id: "email" as Canal, icon: "📧", label: "Séquence Cold Email" },
              { id: "call"  as Canal, icon: "📞", label: "Script Cold Call" },
            ]).map(({ id, icon, label }) => (
              <button key={id} onClick={() => setCanal(id)} style={{
                padding: "16px 32px", fontSize: 14,
                fontFamily: "'Instrument Sans', sans-serif", fontWeight: 600,
                border: canal === id ? "2px solid #FFDC5A" : "2px solid rgba(255,255,255,0.12)",
                background: canal === id ? "rgba(255,220,90,0.1)" : "transparent",
                color: canal === id ? "#FFDC5A" : "rgba(248,247,243,0.85)",
                cursor: "pointer", transition: "all 0.2s",
                display: "flex", alignItems: "center", gap: 10,
              }}>
                <span style={{ fontSize: 18 }}>{icon}</span>
                {label}
              </button>
            ))}
          </div>
        </div>

        {/* ── NIVEAU 2 — Segment ────────────────────────────────────────────── */}
        <div className="reveal" style={{ marginBottom: 48 }}>
          <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 9, letterSpacing: "0.2em", textTransform: "uppercase" as const, color: "rgba(248,247,243,0.35)", marginBottom: 16 }}>
            // SÉLECTIONNER LA CIBLE
          </div>
          <div style={{ display: "flex", gap: 0, border: "1px solid rgba(255,255,255,0.1)", width: "fit-content" }}>
            {segments.map(({ id, icon, label, sub }) => (
              <button key={id} onClick={() => setSegment(id)} style={{
                padding: "14px 28px", fontSize: 13,
                fontFamily: "'Instrument Sans', sans-serif",
                border: "none",
                borderRight: id !== "renouvellement" ? "1px solid rgba(255,255,255,0.1)" : "none",
                background: segment === id ? "rgba(255,255,255,0.07)" : "transparent",
                cursor: "pointer", transition: "all 0.2s",
                display: "flex", flexDirection: "column" as const, alignItems: "flex-start", gap: 4,
                borderBottom: segment === id ? `2px solid ${segBadgeColor[id]}` : "2px solid transparent",
              }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <span style={{ fontSize: 14 }}>{icon}</span>
                  <span style={{ fontWeight: 600, color: segment === id ? "#F8F7F3" : "rgba(248,247,243,0.5)" }}>{label}</span>
                </div>
                <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 9, letterSpacing: "0.1em", textTransform: "uppercase" as const, color: segment === id ? segBadgeColor[id] : "rgba(248,247,243,0.25)" }}>{sub}</span>
              </button>
            ))}
          </div>
        </div>

        {/* ── CONTENU — Email ───────────────────────────────────────────────── */}
        {canal === "email" && (
          <div>
            {/* Badge cible */}
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 28 }}>
              <div style={{ width: 3, height: 36, background: segBadgeColor[segment] }} />
              <div>
                <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 9, letterSpacing: "0.15em", textTransform: "uppercase" as const, color: "rgba(248,247,243,0.4)", marginBottom: 4 }}>INTERLOCUTEUR CIBLE</div>
                <div style={{ fontWeight: 600, fontSize: 14, color: segBadgeColor[segment] }}>{emailData.cible}</div>
              </div>
            </div>

            {/* Email mock */}
            <div style={{ background: "rgba(0,0,0,0.3)", border: "1px solid rgba(255,255,255,0.08)", overflow: "hidden" }}>
              {/* Toolbar */}
              <div style={{ background: "rgba(255,255,255,0.04)", padding: "13px 24px", display: "flex", alignItems: "center", gap: 16, borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
                <div style={{ display: "flex", gap: 6 }}>
                  {["#ff5f57", "#ffbd2e", "#28c840"].map(c => <span key={c} style={{ width: 10, height: 10, borderRadius: "50%", background: c, display: "inline-block" }} />)}
                </div>
                <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: "rgba(248,247,243,0.75)" }}>
                  Objet : <strong style={{ color: "#FFDC5A" }}>{emailData.objet}</strong>
                </span>
                <div style={{ marginLeft: "auto", fontFamily: "'JetBrains Mono', monospace", fontSize: 9, color: "rgba(155,197,199,0.5)", letterSpacing: "0.1em" }}>DÉLIVRABILITÉ 98%</div>
              </div>

              {/* Body */}
              <div style={{ padding: "36px 48px", fontSize: 15, lineHeight: 2, fontWeight: 400 }}>
                {emailData.corps.split("\n\n").map((para, i) => (
                  <p key={i} style={{ margin: "0 0 20px", color: "#F8F7F3", fontSize: 15, fontWeight: 400, lineHeight: 2 }}>{highlight(para)}</p>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ── CONTENU — Call ────────────────────────────────────────────────── */}
        {canal === "call" && (
          <div>
            {/* Badge cible */}
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 28 }}>
              <div style={{ width: 3, height: 36, background: segBadgeColor[segment] }} />
              <div>
                <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 9, letterSpacing: "0.15em", textTransform: "uppercase" as const, color: "rgba(248,247,243,0.4)", marginBottom: 4 }}>INTERLOCUTEUR CIBLE</div>
                <div style={{ fontWeight: 600, fontSize: 14, color: segBadgeColor[segment] }}>{callData.cible}</div>
              </div>
            </div>

            {/* Call script terminal */}
            <div style={{ background: "rgba(0,0,0,0.35)", border: "1px solid rgba(255,255,255,0.08)", overflow: "hidden" }}>
              {/* Terminal bar */}
              <div style={{ background: "#1a1a1a", padding: "10px 20px", display: "flex", alignItems: "center", gap: 12, borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
                <div style={{ display: "flex", gap: 6 }}>
                  {["#ff5f57", "#ffbd2e", "#28c840"].map(c => <span key={c} style={{ width: 9, height: 9, borderRadius: "50%", background: c, display: "inline-block" }} />)}
                </div>
                <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, color: "rgba(248,247,243,0.4)" }}>
                  cold-call.sh — pitch 30 secondes
                </span>
                <div style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: 6 }}>
                  <span style={{ width: 7, height: 7, borderRadius: "50%", background: "#e85c6a", display: "inline-block", animation: "pulse 1.5s infinite" }} />
                  <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 9, color: "rgba(248,247,243,0.35)", letterSpacing: "0.1em" }}>REC</span>
                </div>
              </div>

              {/* Pitch */}
              <div style={{ padding: "36px 48px" }}>
                <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, color: "rgba(155,197,199,0.6)", letterSpacing: "0.12em", marginBottom: 20 }}>
                  $ ./pitch --target={segment} --duration=30s
                </div>
                {callData.pitch.split("\n\n").map((para, i) => (
                  <div key={i} style={{
                    fontSize: 15, color: "rgba(248,247,243,0.85)", lineHeight: 1.8,
                    fontWeight: 400, marginBottom: 20, fontStyle: "italic",
                    paddingLeft: 20,
                    borderLeft: `3px solid ${i === 0 ? segBadgeColor[segment] : "rgba(255,255,255,0.08)"}`,
                  }}>
                    {highlight(para)}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

      </div>
    </section>
  );
};

export default PlaybooksSection;
