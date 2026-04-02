import { useEffect, useRef, useState } from "react";
import { SectionHeader } from "./CibleSection";

// ── Data ─────────────────────────────────────────────────────────────────────

const seqSteps = [
  { day: "J0", channel: "Détection", icon: "◎", color: "#9BC5C7", action: "Signal ADEME identifié", detail: "Bilan en retard ou Scope 3 vide — prospect qualifié automatiquement." },
  { day: "J1", channel: "LinkedIn", icon: "in", color: "#0A66C2", action: "Visite profil ciblé", detail: "Directeur QSE ou Directeur Administratif & Financier. Pas de pitch. Juste de la familiarité." },
  { day: "J3", channel: "Cold Email", icon: "✉", color: "#FFDC5A", action: "Email ultra-personnalisé", detail: "Basé sur la donnée ADEME brute. 5 lignes. Délivrabilité 98% (SPF, DKIM, DMARC configurés)." },
  { day: "J7", channel: "Relance", icon: "↻", color: "#FFDC5A", action: "Angle ROI énergétique", detail: "Relance email — Financement Bpifrance Diag Décarbon'Action mis en avant." },
  { day: "J10", channel: "Téléphone", icon: "☎", color: "#e85c6a", action: "Call de qualification", detail: "5 à 7 minutes. Script ADEME. Objectif unique : décrocher un rendez-vous de 20 minutes." },
];

const callBeats = [
  { timing: "0–15 sec", label: "Accroche Asymétrique", text: "Bonjour [Prénom], Adam Telmat du cabinet ekodev. Je vous appelle car j'ai analysé les données publiques de votre dernier BEGES de [Année]." },
  { timing: "15–40 sec", label: "Le Point de Douleur", text: "Je vois que vous avez une forte empreinte industrielle, mais que votre Scope 3 n'est pas encore structuré — alors que la pression de la CSRD et de vos donneurs d'ordres s'accélère. Beaucoup perdent un temps considérable sur la collecte de données au lieu de se concentrer sur le plan d'action." },
  { timing: "40–60 sec", label: "Proposition de Valeur", text: "Chez ekodev, notre métier c'est de cadrer votre périmètre, d'embarquer vos équipes, et de transformer cette contrainte réglementaire en une vraie feuille de route climat opérationnelle." },
  { timing: "60–80 sec", label: "L'Appel à l'Action", text: "L'objectif de mon appel n'est pas de vous vendre une mission aujourd'hui. C'est de prendre 20 minutes pour comprendre où vous en êtes dans la préparation de votre prochaine échéance. Vous êtes disponible mardi à 10h ou jeudi à 14h ?" },
];

const objections = [
  {
    q: "On regarde déjà Greenly ou Sami, c'est moins cher.",
    a: "Ces outils SaaS sont excellents pour mesurer. Mais un outil ne décide pas à votre place. Dès qu'il faut cadrer un périmètre complexe multi-sites, traiter le Scope 3 auprès de vos fournisseurs, et animer des ateliers de conduite du changement, c'est l'accompagnement humain d'ekodev qui crée la bascule entre un bon reporting et une vraie transition. Un SaaS vous donne un chiffre. ekodev vous donne une stratégie.",
  },
  {
    q: "On n'a pas le temps / pas les données.",
    a: "C'est justement la valeur d'un cabinet. On ne vous demande pas d'être prêts. Notre méthodologie consiste précisément à auditer ce que vous avez, structurer la collecte, et faire le travail d'ingénierie à votre place. Votre équipe donne 2 à 3 journées sur 8 semaines. On prend en charge 90% du travail.",
  },
  {
    q: "Pas de budget cette année.",
    a: "Ne pas anticiper vous coûtera plus cher : perte de points dans les appels d'offres B2B, inefficacités énergétiques non détectées, exposition réglementaire croissante. De plus, nos missions peuvent s'inscrire dans le dispositif Diag Décarbon'Action Bpifrance — jusqu'à 6 000€ de subvention. Coût net réel : entre 2 000 et 9 000€.",
  },
  {
    q: "On n'est pas concernés par la CSRD.",
    a: "Même hors obligation directe, vos clients grands comptes vont vous demander vos données carbone pour leur propre reporting. Les banques et assureurs conditionnent leurs financements à un bilan ESG. Sur les appels d'offres publics, c'est un critère croissant. Anticiper aujourd'hui c'est garder vos marchés demain.",
  },
];

// ── Highlight span ────────────────────────────────────────────────────────────
const Hl = ({ children }: { children: React.ReactNode }) => (
  <span style={{ background: "rgba(255,220,90,0.15)", color: "#FFDC5A", padding: "1px 6px", fontFamily: "'JetBrains Mono', monospace", fontSize: 12 }}>
    {children}
  </span>
);

// ── Main component ────────────────────────────────────────────────────────────
const ProspectionSection = () => {
  const ref = useRef<HTMLElement>(null);
  const [openSet, setOpenSet] = useState<Set<number>>(new Set());
  const [activeStep, setActiveStep] = useState<number | null>(null);

  const toggle = (i: number) => {
    setOpenSet(prev => {
      const next = new Set(prev);
      next.has(i) ? next.delete(i) : next.add(i);
      return next;
    });
  };

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add("visible"); }),
      { threshold: 0.06, rootMargin: "0px 0px -40px 0px" }
    );
    ref.current?.querySelectorAll(".reveal").forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  const proofItems = [
    {
      src: "/ekodev-agent-ia-final.png",
      url: "app.gojiberry.ai — ekodev agent IA — ICP Configuration",
      tag: "// AGENT IA — CIBLAGE AUTOMATISÉ PACA",
      title: "Agent IA Gojiberry",
      desc: "Configuration de l'agent avec les intitulés de poste exacts (Directeur QSE, Directeur RSE, Directeur Général), les 8 secteurs industriels ciblés en région Sud, et le mode High Precision activé. Seuls les prospects à fort potentiel sortent du filtre.",
    },
    {
      src: "/ekodev-sequence-multicanal-v2.png",
      url: "app.lemlist.com — Séquence multicanale ekodev PACA",
      tag: "// SÉQUENCE — DÉCLENCHÉE SUR SIGNAL ADEME",
      title: "Séquence Multicanale",
      desc: "LinkedIn + Email + Appel avec branchement conditionnel : si l'invitation est acceptée, la branche LinkedIn s'active ; sinon, la relance email prend le relai. Toute interaction humaine détectée arrête la séquence instantanément.",
    },
  ];

  return (
    <section id="engagement" ref={ref} style={{ padding: "120px 0", background: "#F8F7F3", overflow: "hidden" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 60px" }}>

        <SectionHeader num="02" phase="Phase 2"
          title={<>Séquence d'Engagement<br />&amp; Conversion</>}
          sub="Une approche multicanale séquencée — du signal d'intention au rendez-vous qualifié. Automatisée via Lemlist et Gojiberry. Délivrabilité configurée : SPF, DKIM, DMARC." />

        {/* ── TIMELINE ───────────────────────────────────────────────────────── */}
        <div className="reveal" style={{ marginBottom: 72 }}>
          <div style={{
            fontFamily: "'JetBrains Mono', monospace", fontSize: 10,
            letterSpacing: "0.18em", textTransform: "uppercase" as const,
            color: "rgba(0,48,53,0.45)", marginBottom: 32,
          }}>// SÉQUENCE MULTICANALE — 10 JOURS</div>

          {/* Steps row */}
          <div style={{ position: "relative" }}>
            {/* Connecting line */}
            <div style={{
              position: "absolute", top: 28, left: "5%", right: "5%", height: 1,
              background: "linear-gradient(90deg, rgba(0,48,53,0.08), rgba(0,48,53,0.15) 50%, rgba(0,48,53,0.08))",
              zIndex: 0,
            }} />

            <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: 16, position: "relative", zIndex: 1 }}>
              {seqSteps.map((step, i) => (
                <div key={step.day}
                  onClick={() => setActiveStep(activeStep === i ? null : i)}
                  style={{ display: "flex", flexDirection: "column", alignItems: "center", cursor: "pointer" }}
                >
                  {/* Circle */}
                  <div style={{
                    width: 56, height: 56, borderRadius: "50%",
                    background: activeStep === i ? "#003035" : "#F8F7F3",
                    border: `2px solid ${activeStep === i ? "#003035" : "rgba(0,48,53,0.15)"}`,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    marginBottom: 14, transition: "all 0.25s",
                    boxShadow: activeStep === i ? "0 4px 20px rgba(0,48,53,0.25)" : "none",
                  }}>
                    <span style={{
                      fontFamily: "'JetBrains Mono', monospace", fontSize: 13,
                      color: activeStep === i ? step.color : "rgba(0,48,53,0.5)",
                      fontWeight: 700, lineHeight: 1,
                    }}>{step.icon}</span>
                  </div>

                  {/* Day badge */}
                  <div style={{
                    fontFamily: "'JetBrains Mono', monospace", fontSize: 9,
                    letterSpacing: "0.15em", textTransform: "uppercase" as const,
                    color: activeStep === i ? "#003035" : "rgba(0,48,53,0.4)",
                    marginBottom: 6, fontWeight: activeStep === i ? 700 : 400,
                  }}>{step.day}</div>

                  {/* Channel */}
                  <div style={{
                    fontFamily: "'JetBrains Mono', monospace", fontSize: 10,
                    color: activeStep === i ? step.color : "rgba(0,48,53,0.5)",
                    marginBottom: 8, fontWeight: 600, letterSpacing: "0.05em",
                  }}>{step.channel}</div>

                  {/* Action */}
                  <div style={{
                    fontSize: 12, textAlign: "center" as const,
                    color: "rgba(0,48,53,0.7)", lineHeight: 1.45, fontWeight: 500,
                  }}>{step.action}</div>
                </div>
              ))}
            </div>

            {/* Detail panel */}
            {activeStep !== null && (
              <div style={{
                marginTop: 28,
                background: "#003035",
                padding: "24px 32px",
                position: "relative",
                animation: "fadeIn 0.2s ease",
              }}>
                <div style={{ position: "absolute", top: 0, left: `calc(${activeStep * 20 + 10}% - 10px)`, width: 0, height: 0, borderLeft: "10px solid transparent", borderRight: "10px solid transparent", borderBottom: "10px solid #003035" }} />
                <div style={{ display: "flex", alignItems: "baseline", gap: 16 }}>
                  <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, color: seqSteps[activeStep].color, letterSpacing: "0.15em", textTransform: "uppercase" as const }}>{seqSteps[activeStep].day} — {seqSteps[activeStep].channel}</span>
                </div>
                <div style={{ fontSize: 15, color: "rgba(248,247,243,0.85)", lineHeight: 1.7, marginTop: 8, fontWeight: 400 }}>{seqSteps[activeStep].detail}</div>
              </div>
            )}
          </div>
        </div>

      </div>{/* fin maxWidth 1200 — timeline */}

      {/* ── PROOF SCREENSHOTS — pleine largeur ──────────────────────────────── */}
      <div className="reveal" style={{ marginBottom: 72 }}>
        {/* Titre dans le conteneur centré */}
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 60px 32px" }}>
          <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, letterSpacing: "0.18em", textTransform: "uppercase" as const, color: "rgba(0,48,53,0.45)", marginBottom: 12 }}>// PREUVES TERRAIN</div>
          <h3 style={{ fontFamily: "'Fraunces', serif", fontSize: 24, fontWeight: 800, color: "#003035", margin: 0 }}>Le système en action</h3>
        </div>

        {/* Screenshots pleine page, un par un */}
        <div style={{ display: "flex", flexDirection: "column" as const, gap: 48 }}>
          {proofItems.map(({ src, tag, title, desc }, idx) => (
            <div key={src}>
              <img src={src} alt={title} style={{ width: idx === 0 ? "70%" : "22%", display: "block", height: "auto", margin: "0 auto" }} />
              {/* Caption sous */}
              <div style={{ maxWidth: 1200, margin: "0 auto", padding: "20px 60px 0" }}>
                <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 9, letterSpacing: "0.15em", textTransform: "uppercase" as const, color: "rgba(0,48,53,0.4)", marginBottom: 8 }}>{tag}</div>
                <div style={{ fontWeight: 700, fontSize: 16, color: "#003035", marginBottom: 8 }}>{title}</div>
                <p style={{ fontSize: 14, color: "rgba(0,48,53,0.72)", lineHeight: 1.7, margin: 0, fontWeight: 400 }}>{desc}</p>
              </div>
            </div>
          ))}
        </div>

      </div>{/* fin screenshots */}

      {/* reste dans conteneur centré */}
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 60px" }}>

        {/* ── HUMAN TAKEOVER CALLOUT ─────────────────────────────────────────── */}
        <div className="reveal" style={{ marginBottom: 72 }}>
          <div style={{
            display: "grid", gridTemplateColumns: "auto 1fr",
            gap: 32, alignItems: "start",
            background: "#003035", padding: "40px 48px", position: "relative", overflow: "hidden",
          }}>
            <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 3, background: "#FFDC5A" }} />
            <div style={{ position: "absolute", right: -10, top: -20, fontFamily: "'Fraunces', serif", fontSize: 120, fontWeight: 900, color: "rgba(255,255,255,0.03)", lineHeight: 1, pointerEvents: "none", userSelect: "none" as const }}>HUMAIN</div>

            {/* Icon */}
            <div style={{ width: 52, height: 52, background: "rgba(255,220,90,0.12)", border: "1px solid rgba(255,220,90,0.25)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
              <span style={{ fontSize: 22 }}>⚡</span>
            </div>

            <div>
              <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 9, letterSpacing: "0.2em", textTransform: "uppercase" as const, color: "rgba(255,220,90,0.65)", marginBottom: 10 }}>
                // RÈGLE D'OR — AUTOMATION &amp; HUMAIN
              </div>
              <div style={{ fontFamily: "'Fraunces', serif", fontSize: 22, fontWeight: 700, color: "#F8F7F3", marginBottom: 16, lineHeight: 1.2 }}>
                La machine génère l'attention. L'humain ferme.
              </div>
              <p style={{ fontSize: 15, color: "rgba(248,247,243,0.78)", lineHeight: 1.75, margin: "0 0 20px", fontWeight: 400, maxWidth: 700 }}>
                Dans la vraie vente B2B, l'automatisation ne sert pas à closer, elle sert à générer des signaux. Techniquement, la séquence (Lemlist/Gojiberry) est programmée pour ne s'arrêter automatiquement qu'à une seule condition : une réponse directe du prospect. En parallèle, je monitore en temps réel les signaux faibles — ouvertures multiples de l'email, clics sur un lien, acceptation de l'invitation LinkedIn.
              </p>
              <p style={{ fontSize: 15, color: "rgba(248,247,243,0.78)", lineHeight: 1.75, margin: 0, fontWeight: 400, maxWidth: 700 }}>
                Si je détecte qu'un Directeur Administratif et Financier ou un Directeur QSE interagit fortement avec le contenu sans répondre, je prends l'initiative de pauser manuellement sa séquence et je déclenche un appel à chaud au moment exact où ekodev est sur son écran. <strong style={{ color: "#FFDC5A", fontWeight: 600 }}>L'outil qualifie l'attention, l'humain gère la relation.</strong>
              </p>
            </div>
          </div>
        </div>

        {/* ── COLD EMAIL ─────────────────────────────────────────────────────── */}
        <div className="reveal" style={{ background: "#003035", color: "#F8F7F3", marginBottom: 40, overflow: "hidden" }}>
          <div style={{ background: "rgba(255,255,255,0.05)", padding: "13px 24px", display: "flex", alignItems: "center", gap: 16, borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
            <div style={{ display: "flex", gap: 6 }}>
              {["#ff5f57", "#ffbd2e", "#28c840"].map(c => <span key={c} style={{ width: 10, height: 10, borderRadius: "50%", background: c, display: "inline-block" }} />)}
            </div>
            <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: "rgba(248,247,243,0.55)" }}>
              Objet : <strong style={{ color: "rgba(255,220,90,0.8)" }}>[Entreprise]</strong> — Votre BEGES <strong style={{ color: "rgba(255,220,90,0.8)" }}>[Année]</strong> arrive à échéance en 2026
            </span>
            <div style={{ marginLeft: "auto", fontFamily: "'JetBrains Mono', monospace", fontSize: 9, color: "rgba(155,197,199,0.5)", letterSpacing: "0.1em" }}>DÉLIVRABILITÉ 98%</div>
          </div>
          <div style={{ padding: "40px 48px", fontSize: 15, lineHeight: 2, color: "rgba(248,247,243,0.8)", fontWeight: 400 }}>
            Bonjour <Hl>[Prénom]</Hl>,
            <br /><br />
            En analysant les données publiques de l'ADEME, j'ai vu que le dernier bilan GES de <Hl>[Entreprise]</Hl> date de <Hl>[Année]</Hl>. Avec le cycle réglementaire de 4 ans, votre prochaine échéance approche — et les nouvelles exigences de la CSRD renforcent considérablement les attentes sur le Scope 3, qui n'apparaît pas encore dans votre déclaration publique.
            <br /><br />
            Chez ekodev (groupe EPSA, B Corp certifié), on accompagne les filiales industrielles de la région Sud sur exactement ce type de mise à jour — en intégrant le Scope 3, en structurant une trajectoire de décarbonation, et en activant les synergies énergie du groupe EPSA pour transformer ce coût en levier d'optimisation.
            <br /><br />
            Ça vaut un échange de 20 minutes pour cadrer votre contexte ?
            <br /><br />
            <span style={{ color: "#F8F7F3", fontWeight: 600 }}>Adam Telmat</span> — ekodev Marseille
          </div>
        </div>

        {/* ── CALL SCRIPT ────────────────────────────────────────────────────── */}
        <div className="reveal" style={{ border: "1px solid rgba(0,48,53,0.1)", overflow: "hidden", marginBottom: 40 }}>
          <div style={{ background: "#003035", padding: "15px 28px", display: "flex", alignItems: "center", gap: 12 }}>
            <span style={{ display: "inline-block", width: 8, height: 8, borderRadius: "50%", background: "#e85c6a", animation: "pulse 1.5s infinite" }} />
            <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, color: "rgba(248,247,243,0.7)", letterSpacing: "0.12em", textTransform: "uppercase" as const }}>
              Script téléphonique — 80 secondes chrono — Objectif : rendez-vous de 20 minutes
            </span>
          </div>
          <div style={{ padding: "8px 0" }}>
            {callBeats.map((beat, i) => (
              <div key={i} style={{
                display: "grid", gridTemplateColumns: "110px 1fr",
                borderBottom: i < callBeats.length - 1 ? "1px solid rgba(0,48,53,0.07)" : "none",
              }}>
                {/* Timing sidebar */}
                <div style={{
                  background: "rgba(0,48,53,0.04)", padding: "24px 16px",
                  borderRight: "1px solid rgba(0,48,53,0.07)",
                  display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "flex-start", gap: 6,
                }}>
                  <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 12, color: "#FFDC5A", fontWeight: 700, background: "#003035", padding: "3px 10px", whiteSpace: "nowrap" as const }}>{beat.timing}</div>
                  <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 8, color: "rgba(0,48,53,0.45)", letterSpacing: "0.1em", textTransform: "uppercase" as const, textAlign: "center" as const, lineHeight: 1.4 }}>{beat.label}</div>
                </div>
                {/* Text */}
                <div style={{ padding: "24px 32px", fontSize: 14, color: "rgba(0,48,53,0.8)", lineHeight: 1.75, fontStyle: "italic", fontWeight: 400 }}>
                  "{beat.text}"
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── OBJECTIONS ─────────────────────────────────────────────────────── */}
        <div className="reveal">
          <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 20 }}>
            <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, letterSpacing: "0.15em", textTransform: "uppercase" as const, color: "rgba(0,48,53,0.55)" }}>
              // KILL-SHEET — Gestion des objections
            </div>
            <div style={{ height: 1, flex: 1, background: "rgba(0,48,53,0.1)" }} />
            <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 9, color: "rgba(0,48,53,0.35)", letterSpacing: "0.1em" }}>
              {openSet.size}/{objections.length} ouverte{openSet.size > 1 ? "s" : ""}
            </div>
          </div>
          <div style={{ border: "1px solid rgba(0,48,53,0.1)", marginBottom: 40 }}>
            {objections.map((obj, i) => (
              <div key={i} style={{ borderBottom: i < objections.length - 1 ? "1px solid rgba(0,48,53,0.08)" : "none" }}>
                <button
                  onClick={() => toggle(i)}
                  style={{
                    width: "100%", padding: "22px 32px",
                    display: "flex", justifyContent: "space-between", alignItems: "center",
                    background: openSet.has(i) ? "rgba(0,48,53,0.03)" : "none",
                    border: "none", cursor: "pointer", textAlign: "left" as const, transition: "background 0.2s",
                  }}
                  onMouseEnter={(e) => ((e.currentTarget as HTMLButtonElement).style.background = "rgba(0,48,53,0.03)")}
                  onMouseLeave={(e) => ((e.currentTarget as HTMLButtonElement).style.background = openSet.has(i) ? "rgba(0,48,53,0.03)" : "none")}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                    <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 9, color: "rgba(0,48,53,0.35)", letterSpacing: "0.1em", flexShrink: 0 }}>OBJ.0{i + 1}</span>
                    <span style={{ fontSize: 14, color: "#C0392B", fontStyle: "italic", fontWeight: 500 }}>{obj.q}</span>
                  </div>
                  <span style={{
                    fontFamily: "'JetBrains Mono', monospace", fontSize: 18,
                    color: openSet.has(i) ? "#003035" : "rgba(0,48,53,0.3)",
                    transition: "transform 0.25s", flexShrink: 0, marginLeft: 20,
                    transform: openSet.has(i) ? "rotate(45deg)" : "none",
                    display: "inline-block",
                  }}>+</span>
                </button>
                {openSet.has(i) && (
                  <div style={{
                    padding: "4px 32px 26px 80px",
                    fontSize: 14, color: "rgba(0,48,53,0.82)", lineHeight: 1.8,
                    fontWeight: 400, borderTop: "1px solid rgba(0,48,53,0.06)",
                    background: "rgba(0,48,53,0.015)",
                  }}>
                    {obj.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};

export default ProspectionSection;
