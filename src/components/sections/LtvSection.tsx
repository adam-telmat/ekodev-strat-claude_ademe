import SectionWrapper from "@/components/layout/SectionWrapper";
import StatementBlock from "@/components/ui/StatementBlock";
import IcpCard from "@/components/ui/IcpCard";
import { ltvYears, crossSellCards, nextSteps } from "@/lib/data";

const yearColors: Record<number, { bar: string; amount: string }> = {
  1: { bar: "bg-text-3", amount: "text-text-2" },
  2: { bar: "bg-gold", amount: "text-gold" },
  3: { bar: "bg-primary-glow", amount: "text-primary-glow" },
};

const LtvSection = () => (
  <section id="ltv" className="px-6 md:px-[60px] py-[100px] relative">
    <SectionWrapper num="05" eyebrowText="Vision long terme" title={<>Le bilan carbone<br />comme cheval de Troie</>}>
      <StatementBlock>
        <p>
          Le bilan carbone n'est pas l'objectif. C'est <strong>le pied dans la porte</strong>. Un client grand compte signé ne repart pas — il revient chaque année avec de nouveaux chantiers. La vraie métrique n'est pas le ticket d'entrée. C'est la <strong>LTV sur 3 ans.</strong>
        </p>
      </StatementBlock>

      {/* LTV grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-10 mb-10">
        {ltvYears.map((y, i) => {
          const colors = yearColors[y.year];
          return (
            <div key={i} className="bg-card border border-border rounded-lg p-7 relative overflow-hidden opacity-0 animate-fade-in" style={{ animationDelay: `${i * 150}ms` }}>
              <div className={`absolute bottom-0 left-0 right-0 h-[3px] ${colors.bar}`} />
              <div className="font-mono text-[10px] tracking-[0.12em] uppercase text-text-3 mb-3">{y.label}</div>
              <div className={`font-heading text-4xl font-extrabold mb-2 ${colors.amount}`}>{y.amount}</div>
              <div className="text-xs text-text-3 leading-relaxed whitespace-pre-line">{y.missions}</div>
            </div>
          );
        })}
      </div>

      {/* LTV total */}
      <div className="bg-gradient-to-br from-primary/15 to-primary/[0.05] border border-primary/30 rounded-lg p-8 flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
        <div>
          <div className="text-base text-text-2">LTV client grand compte — 3 ans</div>
          <div className="text-sm text-text-3 italic">vs PME one-shot : 8–12k€ et on recommence à chasser</div>
        </div>
        <div className="font-heading text-5xl font-extrabold text-primary-glow">80–100k€</div>
      </div>

      {/* Cross-sell */}
      <div className="flex items-center gap-4 mb-6">
        <div className="w-8 h-px bg-primary-glow" />
        <span className="font-mono text-[11px] text-text-3 tracking-[0.15em] uppercase">Cross-sell naturel — synergies EPSA</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-10">
        {crossSellCards.map((card, i) => (
          <div key={i} className="opacity-0 animate-fade-in" style={{ animationDelay: `${i * 100}ms` }}>
            <IcpCard icon={card.icon} title={card.title} desc={card.desc} priority={0} badge={card.badge} />
          </div>
        ))}
      </div>

      {/* Next steps */}
      <div className="flex items-center gap-4 mt-[60px] mb-6">
        <div className="w-8 h-px bg-primary-glow" />
        <span className="font-mono text-[11px] text-text-3 tracking-[0.15em] uppercase">Après l'envoi de la proposition</span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        {nextSteps.map((step, i) => (
          <div key={i} className="bg-card border border-border rounded-lg p-6 text-center opacity-0 animate-fade-in" style={{ animationDelay: `${i * 100}ms` }}>
            <div className="font-mono text-[10px] text-primary-glow tracking-[0.12em] uppercase mb-2">{step.day}</div>
            <div className="text-2xl mb-2">{step.icon}</div>
            <div className="font-heading text-sm font-bold text-foreground mb-1.5">{step.title}</div>
            <div className="text-xs text-text-3 leading-snug">{step.desc}</div>
          </div>
        ))}
      </div>
    </SectionWrapper>
  </section>
);

export default LtvSection;
