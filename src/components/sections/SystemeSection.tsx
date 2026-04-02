import SectionWrapper from "@/components/layout/SectionWrapper";
import { flowSteps, systemCards, proofStats } from "@/lib/data";

const SystemeSection = () => (
  <section id="systeme" className="px-6 md:px-[60px] py-[100px] relative">
    <SectionWrapper num="02" eyebrowText="Le système d'acquisition" title="Un radar commercial qui tourne 24h/24">
      {/* Flow steps */}
      <div className="relative grid grid-cols-2 md:grid-cols-4 gap-0 mb-[60px]">
        <div className="hidden md:block absolute top-10 left-[10%] right-[10%] h-px bg-gradient-to-r from-transparent via-green-light to-transparent" />
        {flowSteps.map((step, i) => (
          <div key={i} className="flex flex-col items-center px-4 relative z-10 group">
            <div className="w-20 h-20 rounded-full bg-card border-2 border-border flex items-center justify-center font-heading text-2xl font-extrabold text-primary-glow mb-6 transition-all duration-300 group-hover:border-primary-glow group-hover:bg-primary-glow/10 group-hover:shadow-[0_0_30px_rgba(61,204,122,0.2)]">
              {step.num}
            </div>
            <div className="font-heading text-sm font-bold text-center mb-3 text-foreground">{step.title}</div>
            <div className="text-xs text-text-2 text-center leading-relaxed">{step.desc}</div>
          </div>
        ))}
      </div>

      {/* System cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-10">
        {systemCards.map((card, i) => (
          <div key={i} className="bg-card border border-border rounded-lg p-7 relative opacity-0 animate-fade-in" style={{ animationDelay: `${i * 100}ms` }}>
            <span className="absolute top-6 right-6 font-heading text-5xl font-extrabold text-primary-glow/[0.06] leading-none">{card.num}</span>
            <div className="text-2xl mb-4">{card.icon}</div>
            <h3 className="font-heading text-lg font-bold mb-2 text-foreground">{card.title}</h3>
            <p className="text-[13px] text-text-2 leading-relaxed mb-4">{card.desc}</p>
            <div className="flex gap-2 flex-wrap">
              {card.tools.map((tool) => (
                <span key={tool} className="px-2.5 py-1 bg-primary/10 border border-primary/20 rounded-full text-[11px] text-primary-glow font-mono">
                  {tool}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Proof bar */}
      <div className="bg-gradient-to-br from-card to-secondary border border-border rounded-lg p-10 grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-10">
        {proofStats.map((stat, i) => (
          <div key={i} className="text-center">
            <div className="font-heading text-4xl font-extrabold text-primary-glow mb-2">{stat.num}</div>
            <div className="text-xs text-text-3 leading-snug">{stat.label}</div>
          </div>
        ))}
      </div>
    </SectionWrapper>
  </section>
);

export default SystemeSection;

