import { useEffect, useRef, useState } from "react";
import { SectionHeader } from "./CibleSection";

const frameworkCards = [
  { num: "01", title: "Périmètre & Complexité", questions: [
    "Combien d'entités juridiques et de sites de production sont concernés ?",
    "Quelle est la part de votre activité à l'international (supply chain) versus France ?",
    "Quels sont les postes d'émissions que vous pressentez comme critiques sur votre Scope 3 — achats, fret maritime, fin de vie des produits ?",
  ]},
  { num: "02", title: "Gouvernance & Maturité Data", questions: [
    "Qui est le propriétaire historique de la donnée RSE en interne — Achats, Ressources Humaines, Finance ?",
    "Disposez-vous d'un ERP récent ou d'un SIRH pour extraire facilement les flux physiques et monétaires ?",
    "Qui portera le projet au Comité de Direction pour valider la future feuille de route climat ?",
  ]},
  { num: "03", title: "Enjeux Business", questions: [
    "Quel est le déclencheur profond aujourd'hui : conformité pure, pression d'un donneur d'ordre majeur, ou stratégie d'optimisation énergétique ?",
    "Avez-vous une deadline réglementaire ou une réponse à appel d'offres qui conditionne notre rétroplanning ?",
    "Le groupe (maison mère) vous a-t-il fixé des objectifs SBTi ou de réduction carbone à consolider ?",
  ]},
  { num: "04", title: "Budget & Financement", questions: [
    "Avez-vous un budget alloué sur ce trimestre ou êtes-vous en phase de cadrage budgétaire pour l'année prochaine ?",
    "Êtes-vous familiers avec le Diag Décarbon'Action Bpifrance, qui permet de subventionner l'accompagnement d'ekodev jusqu'à 6 000€ ?",
    "Pour ce cycle, cherchez-vous simplement une conformité légale ou souhaitez-vous investir dans un vrai plan de transformation ?",
  ]},
];

const proposalSteps = [
  { n: "01", title: "Synthèse exécutive & reformulation des enjeux" },
  { n: "02", title: "Périmètre & méthodologie (S1, S2, S3)" },
  { n: "03", title: "Gouvernance du projet (rôles ekodev vs client)" },
  { n: "04", title: "Livrables, planning & jalons (8 semaines)" },
  { n: "05", title: "Budget & financement BpiFrance" },
  { n: "06", title: "Pourquoi ekodev" },
  { n: "07", title: "Vision 3 ans — LTV & cross-sell EPSA ★" },
];

const vsRows = [
  {
    criterion: "Modèle économique",
    greenly: "SaaS pur (licence) + options payantes",
    sami: "SaaS + services intégrés (modèle hybride)",
    hellocarbo: "SaaS pur (carbone) + coach (selon forfait)",
    ekodev: "Mission de conseil complète (diagnostic → déploiement)",
    insight: "La différence fondamentale : les éditeurs SaaS monétisent l'accès à une plateforme technologique, souvent complétée par des forfaits d'assistance. ekodev déploie un modèle de conseil : nous garantissons l'exécution et le résultat d'un projet de transformation de A à Z, sans facturation liée au seul usage d'un outil.",
  },
  {
    criterion: "Accompagnement humain perçu",
    greenly: "Customer success (usage) + forfaits d'heures d'experts en option (5-20h)",
    sami: "Consultants RSE intégrés + formations (Sami Academy)",
    hellocarbo: "Coach dédié uniquement dans l'offre Premium",
    ekodev: "Consultant climat senior dédié tout au long du projet",
    insight: "Les solutions logicielles intègrent un support utilisateur réactif, idéal pour des équipes autonomes. L'approche d'ekodev est différente : un consultant RSE senior est dédié au projet du premier jour jusqu'à la restitution. Il n'assiste pas le client, il absorbe la charge de gestion de projet et anime les parties prenantes.",
  },
  {
    criterion: "Qualité Scope 3",
    greenly: "Automatisé via intégrations (data-driven / comptable)",
    sami: "Robuste (Base étendue > 230k facteurs d'émission)",
    hellocarbo: "Couverture conforme standards (GHG Protocol / ABC)",
    ekodev: "Collecte terrain & engagement direct des fournisseurs",
    insight: "Les SaaS excellent dans l'automatisation via des ratios financiers branchés sur les données comptables (rapide pour un premier screening). Face aux exigences strictes d'audit, ekodev privilégie la collecte de données physiques (facteurs d'émission réels) directement auprès de votre chaîne de valeur et de vos fournisseurs.",
  },
  {
    criterion: "Stratégie de décarbonation",
    greenly: "Scenarii de trajectoires + simulations via l'outil",
    sami: "Pilotage carbone + construction de plans d'action",
    hellocarbo: "Trajectoires + simulations d'impact",
    ekodev: "Feuille de route sur mesure 2030 (stratégie climat)",
    insight: "Mesurer ne suffit pas, il faut transformer. Là où les plateformes proposent de la formation en ligne et des bibliothèques d'actions (bonne première étape d'acculturation), ekodev déploie ses experts physiquement pour animer des Fresques (Climat, Biodiversité) et des ateliers de co-construction avec vos collaborateurs.",
  },
  {
    criterion: "Conduite du changement",
    greenly: "Webinaires, contenus et workshops ponctuels",
    sami: "Plateforme de formation & montée en compétence",
    hellocarbo: "Ateliers ponctuels, fresques",
    ekodev: "Programme complet : fresques, ateliers, animation terrain",
    insight: "La formation en ligne est une excellente première étape d'acculturation. Cependant, pour ancrer une stratégie climat dans les opérations, ekodev intervient physiquement : animation de Fresques (Climat, Biodiversité), ateliers d'intelligence collective, et structuration d'une démarche RSE globale au-delà du seul prisme carbone.",
  },
  {
    criterion: "RSE globale",
    greenly: "Climat + modules ESG / CSRD (pas de social holistique)",
    sami: "Carbone + Hub ESG complet & Taxonomie",
    hellocarbo: "Climat (focus Carbone uniquement)",
    ekodev: "RSE globale : Climat + Mobilité + Biodiversité + Société à mission",
    insight: "Certains outils se concentrent sur le seul prisme carbone, d'autres développent des modules ESG intéressants. ekodev intervient sur l'intégralité du spectre du développement durable : au-delà de la trajectoire carbone, nous structurons votre politique de mobilité, vos enjeux biodiversité, et votre démarche vers le statut d'Entreprise à Mission.",
  },
  {
    criterion: "Synergie Coût / Énergie",
    greenly: "Analyse de coûts intégrée (sans optimisation directe)",
    sami: "X",
    hellocarbo: "X",
    ekodev: "Synergie intégrée avec Enoptea + Energiency (Optimisation ROI)",
    insight: "Un abonnement logiciel reste une dépense réglementaire. La force de frappe unique d'ekodev réside dans son appartenance au groupe EPSA. Les données récoltées sont directement exploitées par nos filiales (Enoptea, Energiency) pour optimiser vos contrats énergétiques. La démarche RSE s'autofinance par les économies générées.",
  },
  {
    criterion: "Financement Bpifrance (Diag Décarbon'Action)",
    greenly: "Dépend d'experts externes habilités (non garanti pour tous)",
    sami: "Habilité via consultants spécialisés internes",
    hellocarbo: "Via réseau de partenaires agréés",
    ekodev: "Habilité en direct (Coeur de métier / Accréditation agence)",
    insight: "Les dispositifs de subvention publique (jusqu'à 6 000€) exigent un niveau de conseil que l'outil seul ne peut valider. Si les SaaS s'appuient sur un réseau d'indépendants partenaires, ekodev, acteur historique, est directement habilité par Bpifrance pour instruire et délivrer ces missions réglementées.",
  },
  {
    criterion: "Auditable CSRD",
    greenly: "Conforme ESRS/GHG (Audit externe à réaliser par un tiers)",
    sami: "Conforme CSRD/SBTi/Taxonomie (Audit par tiers)",
    hellocarbo: "Carbone certifié, périmètre prêt pour audit (scope carbone)",
    ekodev: "Reporting extra-financier complet préparé pour audit tiers",
    insight: "Avec l'entrée en vigueur de la CSRD, les SaaS fournissent les exports requis, ce qui est techniquement indispensable. Cependant, la charge de la preuve incombe au client. ekodev consolide la donnée extra-financière et vous accompagne physiquement dans la défense de votre méthodologie face aux vérificateurs tiers (commissaires aux comptes).",
  },
];

const PropositionSection = () => {
  const cadreRef = useRef<HTMLElement>(null);
  const closingRef = useRef<HTMLElement>(null);
  const [openRow, setOpenRow] = useState<number | null>(null);

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add("visible"); }),
      { threshold: 0.08, rootMargin: "0px 0px -40px 0px" }
    );
    cadreRef.current?.querySelectorAll(".reveal").forEach((el) => obs.observe(el));
    closingRef.current?.querySelectorAll(".reveal").forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  return (
    <>
      {/* PHASE 3 */}
      <section id="cadrage" ref={cadreRef} style={{ background: "#EDE9E0", padding: "120px 60px" }}>
        <SectionHeader num="03" phase="Phase 3 — Découverte & Qualification" title={<>Le Rendez-Vous<br /><em style={{ fontStyle: "italic", color: "#9BC5C7" }}>de Qualification</em></>}
          sub="Le premier rendez-vous n'est jamais une présentation catalogue d'ekodev. C'est une phase de découverte active où les questions posées doivent prouver au prospect que l'on comprend la complexité de son métier mieux que lui." />

        <div className="reveal" style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 1, background: "rgba(0,48,53,0.12)", marginBottom: 60 }}>
          {frameworkCards.map((card) => (
            <div key={card.num} style={{ background: "#F8F7F3", padding: 48 }}>
              <div style={{ fontFamily: "'Fraunces', serif", fontSize: 52, fontWeight: 900, color: "rgba(0,48,53,0.08)", lineHeight: 1, marginBottom: 18, fontStyle: "italic" }}>{card.num}</div>
              <div style={{ fontFamily: "'Fraunces', serif", fontSize: 22, fontWeight: 700, marginBottom: 16, color: "#003035" }}>{card.title}</div>
              <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 10 }}>
                {card.questions.map((q, qi) => (
                  <li key={qi} style={{ fontSize: 15, color: "rgba(0,48,53,0.75)", paddingLeft: 20, position: "relative", lineHeight: 1.55, fontWeight: 400 }}>
                    <span style={{ position: "absolute", left: 0, color: "#003035", fontSize: 11, top: 2, opacity: 0.5 }}>→</span>{q}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* PHASE 4 */}
      <section id="closing" ref={closingRef} style={{ padding: "120px 60px", background: "#F8F7F3" }}>
        <SectionHeader num="04" phase="Phase 4" title={<>Proposition de Valeur<br />&amp; Closing</>}
          sub="La proposition commerciale n'est jamais envoyée seule. Elle est toujours soutenue en réunion. L'objectif est de lire avec le client, traiter les objections budgétaires en direct, et valider les prochaines étapes décisionnelles avec le DAF." />

        {/* Proposal flow */}
        <div className="reveal" style={{ display: "flex", marginBottom: 60, overflowX: "auto" }}>
          {proposalSteps.map((step, i) => (
            <div key={step.n} style={{ flex: 1, minWidth: 130, padding: "28px 18px", borderRight: "1px solid rgba(0,48,53,0.1)", borderTop: "1px solid rgba(0,48,53,0.1)", borderBottom: "1px solid rgba(0,48,53,0.1)", borderLeft: i === 0 ? "1px solid rgba(0,48,53,0.1)" : "none", textAlign: "center", background: "#F8F7F3", transition: "background 0.2s" }}
              onMouseEnter={(e) => ((e.currentTarget as HTMLDivElement).style.background = "#EDE9E0")}
              onMouseLeave={(e) => ((e.currentTarget as HTMLDivElement).style.background = "#F8F7F3")}>
              <div style={{ fontFamily: "'Fraunces', serif", fontSize: 28, fontWeight: 900, color: "rgba(0,48,53,0.1)", fontStyle: "italic", marginBottom: 10 }}>{step.n}</div>
              <div style={{ fontSize: 11, color: "rgba(0,48,53,0.72)", lineHeight: 1.45 }}>{step.title}</div>
              {/* Yellow dot on last step */}
              {step.n === "07" && <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#FFDC5A", margin: "10px auto 0" }} />}
            </div>
          ))}
        </div>

        {/* Comparatif interactif */}
        <div className="reveal" style={{ marginBottom: 24 }}>
          <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 9, letterSpacing: "0.2em", textTransform: "uppercase" as const, color: "rgba(0,48,53,0.4)", marginBottom: 10 }}>// BLOC 2</div>
          <h3 style={{ fontFamily: "'Fraunces', serif", fontSize: 28, fontWeight: 800, color: "#003035", margin: "0 0 8px" }}>
            Le Comparatif <em style={{ fontStyle: "italic", color: "#9BC5C7" }}>ekodev vs SaaS</em>
          </h3>
          <p style={{ fontSize: 14, color: "rgba(0,48,53,0.65)", margin: 0, fontWeight: 400 }}>Chaque ligne révèle pourquoi le critère est décisif dans le cycle de vente.</p>
        </div>

        <div className="reveal" style={{ marginBottom: 60, border: "1px solid rgba(0,48,53,0.15)", overflowX: "auto" }}>
          {/* En-tête — 6 colonnes */}
          <div style={{ display: "grid", gridTemplateColumns: "14% 11% 11% 11% 20% 33%", background: "#003035", minWidth: 900 }}>
            {[
              { label: "Critère", accent: false },
              { label: "Greenly", accent: false },
              { label: "Sami", accent: false },
              { label: "Hellocarbo", accent: false },
              { label: "ekodev (EPSA) ★", accent: true },
              { label: "Pourquoi c'est décisif", accent: false },
            ].map(({ label, accent }, i) => (
              <div key={i} style={{
                padding: "16px 20px",
                fontFamily: "'JetBrains Mono', monospace", fontSize: 11, letterSpacing: "0.08em",
                fontWeight: accent ? 700 : 600,
                color: accent ? "#FFDC5A" : "rgba(248,247,243,0.75)",
                borderLeft: i > 0 ? `${accent ? 3 : 1}px solid ${accent ? "#FFDC5A" : "rgba(255,255,255,0.1)"}` : "none",
                textTransform: "uppercase" as const,
              }}>{label}</div>
            ))}
          </div>

          {/* Lignes */}
          {vsRows.map((row, i) => (
            <div key={i} style={{
              display: "grid", gridTemplateColumns: "14% 11% 11% 11% 20% 33%",
              background: i % 2 === 0 ? "#ffffff" : "#F8F7F3",
              borderTop: "1px solid rgba(0,48,53,0.1)",
              minWidth: 900,
            }}>
              {/* Critère */}
              <div style={{ padding: "20px 20px" }}>
                <span style={{ fontSize: 15, fontWeight: 800, color: "#003035", lineHeight: 1.35, display: "block" }}>{row.criterion}</span>
              </div>
              {/* SaaS */}
              {[row.greenly, row.sami, row.hellocarbo].map((val, j) => (
                <div key={j} style={{
                  padding: "20px 16px", fontSize: 14,
                  color: val === "X" ? "#B03A2E" : "#003035",
                  fontWeight: val === "X" ? 800 : 500,
                  lineHeight: 1.5, borderLeft: "1px solid rgba(0,48,53,0.1)",
                  opacity: val === "X" ? 1 : 0.78,
                }}>{val}</div>
              ))}
              {/* ekodev */}
              <div style={{ padding: "20px 20px", borderLeft: "3px solid #FFDC5A", background: "rgba(255,220,90,0.1)" }}>
                <span style={{ fontSize: 14, color: "#003035", fontWeight: 800, lineHeight: 1.45 }}>
                  <span style={{ color: "#2E8B57", marginRight: 6, fontWeight: 900 }}>✓</span>{row.ekodev}
                </span>
              </div>
              {/* Explication — colonne dédiée */}
              <div style={{ padding: "20px 20px", borderLeft: "1px solid rgba(0,48,53,0.1)", background: i % 2 === 0 ? "#F2EFE8" : "#EDE9E0" }}>
                <p style={{ fontSize: 13, color: "#003035", lineHeight: 1.7, margin: 0, fontWeight: 400, fontStyle: "italic", opacity: 0.88 }}>{row.insight}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Conclusion de l'arbitrage */}
        <div className="reveal" style={{ marginBottom: 60, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 2, background: "rgba(0,48,53,0.1)" }}>
          <div style={{ background: "#003035", padding: "44px 48px" }}>
            <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, letterSpacing: "0.18em", textTransform: "uppercase" as const, color: "#FFDC5A", marginBottom: 18 }}>// L'arbitrage stratégique</div>
            <h4 style={{ fontFamily: "'Fraunces', serif", fontSize: 22, fontWeight: 800, color: "#F8F7F3", margin: "0 0 20px", lineHeight: 1.3 }}>
              Quand choisir un SaaS,<br /><em style={{ color: "#9BC5C7" }}>quand choisir ekodev ?</em>
            </h4>
            <p style={{ fontSize: 15, color: "rgba(248,247,243,0.82)", lineHeight: 1.72, margin: 0, fontWeight: 400 }}>
              Un SaaS est pertinent pour une PME autonome, avec une équipe RSE déjà structurée, qui cherche un outil de reporting annuel et un tableau de bord de suivi. C'est un excellent premier pas.
            </p>
          </div>
          <div style={{ background: "#FFDC5A", padding: "44px 48px" }}>
            <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, letterSpacing: "0.18em", textTransform: "uppercase" as const, color: "rgba(0,48,53,0.6)", marginBottom: 18 }}>// Le cas ekodev</div>
            <h4 style={{ fontFamily: "'Fraunces', serif", fontSize: 22, fontWeight: 800, color: "#003035", margin: "0 0 20px", lineHeight: 1.3 }}>
              ETI, Grands Comptes,<br />dossiers multi-sites complexes.
            </h4>
            <p style={{ fontSize: 15, color: "rgba(0,48,53,0.85)", lineHeight: 1.72, margin: 0, fontWeight: 500 }}>
              Dès qu'il s'agit d'un périmètre multi-sites, d'un Scope 3 industriel à structurer, d'une échéance CSRD à défendre ou d'une synergie énergétique à activer via le groupe EPSA, l'accompagnement humain d'ekodev n'est plus une option : c'est la condition du succès.
            </p>
          </div>
        </div>

      </section>

    </>
  );
};

export default PropositionSection;

