import { useEffect, useRef } from "react";
import { SectionHeader } from "./CibleSection";

const ltvCards = [
  { label: "Année 1 · Entrée", amount: "12–15k€", amountColor: "rgba(248,247,243,0.88)", barColor: "rgba(255,255,255,0.15)", missions: "Bilan carbone (scopes 1, 2, 3)\nDiagnostic RSE initial\nAteliers de sensibilisation" },
  { label: "Année 2 · Développement", amount: "25–35k€", amountColor: "#9BC5C7", barColor: "#9BC5C7", missions: "Stratégie climat + feuille de route 2030\nAccompagnement CSRD\nPlan d'action et indicateurs" },
  { label: "Année 3 · Récurrence", amount: "40–50k€", amountColor: "#FFDC5A", barColor: "#FFDC5A", missions: "Reporting annuel + mise à jour bilan\nFormation équipes + fresques\nPlan mobilité employeur" },
];

const crossSells = [
  { icon: "⚡", name: "Enoptea", desc: "Le bilan identifie les postes → Enoptea génère les économies. ROI direct pour le DAF." },
  { icon: "🤖", name: "Energiency", desc: "IA industrielle énergie/CO₂ pour les filiales manufacturières avec process complexes." },
  { icon: "🚲", name: "Plan Mobilité", desc: "Le bilan révèle les émissions scope 3 déplacements → déclenche naturellement un plan mobilité." },
  { icon: "🌱", name: "Biodiversité", desc: "Les industriels avec sites sensibles ont une double obligation. L'entrée carbone ouvre le sujet." },
];

const LtvSection = () => {
  const ref = useRef<HTMLElement>(null);
  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add("visible"); }),
      { threshold: 0.08, rootMargin: "0px 0px -40px 0px" }
    );
    ref.current?.querySelectorAll(".reveal").forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  return (
    <section id="ltv" ref={ref} style={{ background: "#003035", color: "#F8F7F3", padding: "clamp(60px,10vw,120px) clamp(20px,5vw,60px)" }}>
      <SectionHeader num="05" phase="La vision long terme"
        title={<>Le bilan carbone<br />comme cheval de Troie.</>}
        sub="Le bilan carbone n'est pas l'objectif. C'est le pied dans la porte. Un grand compte signé ne repart pas : il revient chaque année avec de nouveaux chantiers. Et chaque prospect ekodev devient un lead qualifié pour le groupe EPSA."
        dark />

      {/* LTV Grid */}
      <div className="reveal grid-3col" style={{ gap: 1, background: "rgba(255,255,255,0.06)", marginBottom: 2 }}>
        {ltvCards.map((card) => (
          <div key={card.label} style={{ background: "rgba(255,255,255,0.03)", padding: "clamp(24px,4vw,48px)", position: "relative", overflow: "hidden" }}>
            <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 3, background: card.barColor }} />
            <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, letterSpacing: "0.14em", textTransform: "uppercase", color: "rgba(248,247,243,0.65)", marginBottom: 20 }}>{card.label}</div>
            <div style={{ fontFamily: "'Fraunces', serif", fontSize: 46, fontWeight: 900, lineHeight: 1, marginBottom: 20, color: card.amountColor }}>{card.amount}</div>
            <div style={{ fontSize: 16, color: "rgba(248,247,243,0.80)", lineHeight: 1.7, fontWeight: 400, whiteSpace: "pre-line" }}>{card.missions}</div>
          </div>
        ))}
      </div>

      {/* Total bar */}
      <div className="reveal ltv-total" style={{ background: "rgba(255,220,90,0.06)", border: "1px solid rgba(255,220,90,0.15)", padding: "36px clamp(20px,5vw,60px)", display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 60 }}>
        <div>
          <div style={{ fontSize: 16, color: "rgba(248,247,243,0.88)", fontWeight: 400 }}>LTV client grand compte sur 3 ans</div>
          <div style={{ fontSize: 13, color: "rgba(248,247,243,0.45)", fontStyle: "italic", marginTop: 4 }}>vs PME one-shot : 8–12k€ et on recommence à chasser</div>
        </div>
        <div style={{ fontFamily: "'Fraunces', serif", fontSize: 60, fontWeight: 900, color: "#FFDC5A", fontStyle: "italic" }}>80–100k€</div>
      </div>

      {/* Cross-sell EPSA */}
      <div className="reveal grid-4col" style={{ gap: 1, background: "rgba(255,255,255,0.06)", marginBottom: 60 }}>
        {crossSells.map((item) => (
          <div key={item.name} style={{ background: "rgba(255,255,255,0.025)", padding: 32 }}>
            <div style={{ fontSize: 24, marginBottom: 12 }}>{item.icon}</div>
            <div style={{ fontFamily: "'Fraunces', serif", fontSize: 15, fontWeight: 700, marginBottom: 8, color: "#F8F7F3" }}>{item.name}</div>
            <div style={{ fontSize: 14, color: "rgba(248,247,243,0.80)", lineHeight: 1.55, fontWeight: 400 }}>{item.desc}</div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default LtvSection;


