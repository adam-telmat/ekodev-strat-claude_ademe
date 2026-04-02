import { useEffect, useRef } from "react";

/* ekodev palette: #003035 ink, #FFDC5A yellow, #9BC5C7 teal */

const icpCards = [
  { icon: "🏭", name: "Industrie & Chimie (Grands Comptes)", desc: "Bassin de Fos-sur-Mer / Vallée de la Chimie. Cible prioritaire car l'empreinte Scope 1 & 2 y est massive, rendant le bilan complexe. La modélisation du Scope 3 nécessite une véritable ingénierie de données.", signal: "→ EXEMPLE : LYONDELLBASELL (BERRE), SCOPE 3 NON RENSEIGNÉ." },
  { icon: "🏗️", name: "BTP & Infrastructures (Filiales Régionales)", desc: "Cible : filiales régionales des majors (Vinci, Eiffage, Colas, Fayat). L'enjeu n'est pas le bilan global du groupe, mais l'autonomie de la filiale locale pour répondre aux appels d'offres publics de la région PACA.", signal: "→ EXEMPLE : FAYAT BÂTIMENT SUD, ÉCHÉANCE DE RENOUVELLEMENT." },
  { icon: "✈️", name: "Aéronautique & Défense (Sites industriels)", desc: "Région à forte densité aéronautique. Enjeux croisés de souveraineté et de décarbonation. Le bilan carbone y est un pré-requis absolu pour maintenir les certifications fournisseurs de rang 1.", signal: "→ EXEMPLE : AIRBUS HELICOPTERS, BESOIN DE STRUCTURATION GLOBALE." },
  { icon: "🚢", name: "Logistique & Transports (ETI)", desc: "Marseille et son port génèrent un Scope 3 (fret/aval) colossal pour les entreprises du territoire. C'est l'opportunité idéale d'utiliser le Bilan GES comme levier pour vendre ensuite un Plan de Mobilité Durable.", signal: "→ EXEMPLE : CMA CGM MARSEILLE, RENOUVELLEMENT 2026." },
  { icon: "🧴", name: "Santé & Laboratoires (ETI / PME structurées)", desc: "Secteur très exposé aux attentes RSE des donneurs d'ordres. Le bilan carbone est souvent perçu comme un outil d'image de marque et de recrutement, ouvrant la porte vers une stratégie climat complète.", signal: "→ EXEMPLE : LABORATOIRES M&L, AUCUN PLAN DE TRANSITION PUBLIC." },
  { icon: "💡", name: "Synergies Groupe (Upsell Énergie)", desc: "Le Bilan Carbone n'est que la première étape. Sur ces cibles très émissives, l'identification des postes clés permet un relais immédiat vers Enoptea et Energiency (Groupe EPSA) pour l'optimisation des factures.", signal: "→ LTV MAXIMISÉE : DU CONSEIL CLIMAT AU ROI ÉNERGÉTIQUE." },
];

const SectionHeader = ({ num, phase, title, sub, dark = false }: {
  num: string; phase: string; title: React.ReactNode; sub: string; dark?: boolean;
}) => (
  <div className="reveal" style={{ display: "grid", gridTemplateColumns: "100px 1fr", gap: 40, alignItems: "start", marginBottom: 80 }}>
    <div style={{ fontFamily: "'Fraunces', serif", fontSize: 72, fontWeight: 900, color: dark ? "rgba(255,255,255,0.06)" : "rgba(0,48,53,0.07)", lineHeight: 1, fontStyle: "italic" }}>
      {num}
    </div>
    <div>
      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 14 }}>
        <span style={{ display: "inline-block", width: 20, height: 2, background: "#FFDC5A" }} />
        <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, letterSpacing: "0.2em", textTransform: "uppercase", color: dark ? "rgba(255,220,90,0.8)" : "#003035", opacity: dark ? 1 : 0.6 }}>
          {phase}
        </span>
      </div>
      <h2 style={{ fontFamily: "'Fraunces', serif", fontSize: "clamp(30px, 3.5vw, 48px)", fontWeight: 700, lineHeight: 1.1, letterSpacing: "-0.02em", color: dark ? "#F8F7F3" : "#003035", marginBottom: 16 }}>
        {title}
      </h2>
      <p style={{ fontSize: 16, color: dark ? "rgba(248,247,243,0.75)" : "rgba(0,48,53,0.75)", lineHeight: 1.75, maxWidth: 580, fontWeight: 400 }}>
        {sub}
      </p>
    </div>
  </div>
);

export { SectionHeader };

const CibleSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add("visible"); }),
      { threshold: 0.08, rootMargin: "0px 0px -40px 0px" }
    );
    sectionRef.current?.querySelectorAll(".reveal").forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  return (
    <section id="ciblage" ref={sectionRef} style={{ padding: "120px 60px", background: "#F8F7F3" }}>
      <SectionHeader num="01" phase="Phase 1" title={<>Identification &amp;<br />Ciblage Asymétrique</>}
        sub="La vérité du terrain, c'est qu'on ne vend pas un bilan carbone complexe à une PME isolée. Pour maximiser la Life-Time Value (LTV) et le potentiel de conseil d'ekodev, l'Ideal Customer Profile (ICP) en région Sud se concentre sur deux cibles : les ETI indépendantes et les grands sites industriels / filiales de groupes. C'est là que la pression réglementaire (CSRD) et la complexité du Scope 3 exigent un véritable accompagnement humain, et pas juste un outil SaaS." />

      {/* ICP Grid — gap 1px border style */}
      <div className="reveal" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 1, background: "rgba(0,48,53,0.12)", marginBottom: 60 }}>
        {icpCards.map((card) => (
          <div key={card.name} style={{ background: "#F8F7F3", padding: 40, transition: "background 0.2s", cursor: "default" }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLDivElement).style.background = "#EDE9E0"; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLDivElement).style.background = "#F8F7F3"; }}>
            <div style={{ fontSize: 26, marginBottom: 20 }}>{card.icon}</div>
            <div style={{ fontFamily: "'Fraunces', serif", fontSize: 19, fontWeight: 700, marginBottom: 10, color: "#003035" }}>{card.name}</div>
            <p style={{ fontSize: 15, color: "rgba(0,48,53,0.75)", lineHeight: 1.65, marginBottom: 16, fontWeight: 400 }}>{card.desc}</p>
            <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, color: "#003035", letterSpacing: "0.1em", textTransform: "uppercase", opacity: 0.7 }}>
              {card.signal}
            </div>
          </div>
        ))}
      </div>

      {/* Sponsors box */}
      <div className="reveal" style={{ background: "#003035", padding: 56, marginBottom: 40, position: "relative", overflow: "hidden" }}>
        {/* Yellow accent top bar */}
        <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 3, background: "#FFDC5A" }} />
        <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, letterSpacing: "0.15em", textTransform: "uppercase", color: "rgba(255,220,90,0.7)", marginBottom: 32 }}>
          Les deux sponsors à activer
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 48 }}>
          {[
            { title: "Sponsor Économique", role: "Directeur Administratif & Financier / Directeur Général", desc: "Il détient le budget. Il ne s'intéresse pas à la méthodologie carbone, il s'intéresse au risque et à la valorisation. L'objectif est de lui prouver que ne pas faire ce bilan, ou mal le faire, coûtera plus cher à l'entreprise : perte d'appels d'offres, inefficacités énergétiques, anticipation CSRD.", angle: "SÉCURISATION DU CA + ROI (via Enoptea / Energiency) + ANTICIPATION CSRD" },
            { title: "Sponsor Métier & Opérationnel", role: "Directeur RSE / Directeur QSE-HSE / Directeur de Site", desc: "C'est notre véritable allié et prescripteur interne. Il sait qu'il doit faire ce bilan, mais il est terrifié par la charge de travail (collecte de la donnée Scope 3). L'objectif est de le rassurer sur l'accompagnement humain d'ekodev et la décharge opérationnelle qu'on apporte.", angle: "MÉTHODOLOGIE CADRÉE + DÉCHARGE MENTALE + CRÉATION DE LA FEUILLE DE ROUTE" },
          ].map((s) => (
            <div key={s.title}>
              <div style={{ fontFamily: "'Fraunces', serif", fontSize: 20, fontWeight: 700, marginBottom: 6, color: "#F8F7F3" }}>{s.title}</div>
              <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 9, color: "#FFDC5A", letterSpacing: "0.1em", marginBottom: 12, textTransform: "uppercase" }}>{s.role}</div>
              <p style={{ fontSize: 15, color: "rgba(248,247,243,0.72)", lineHeight: 1.65, fontWeight: 400, marginBottom: 14 }}>{s.desc}</p>
              <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, color: "rgba(255,220,90,0.6)", letterSpacing: "0.08em", textTransform: "uppercase" }}>{s.angle}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CibleSection;

