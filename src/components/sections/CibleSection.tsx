import SectionWrapper from "@/components/layout/SectionWrapper";
import StatementBlock from "@/components/ui/StatementBlock";
import IcpCard from "@/components/ui/IcpCard";
import PersonaCard from "@/components/ui/PersonaCard";
import { icpCards, signals, personas } from "@/lib/data";

const tempConfig = {
  hot: { dot: "bg-primary-glow shadow-[0_0_8px_hsl(var(--green-glow))]", label: "Brûlant" },
  warm: { dot: "bg-orange", label: "Chaud" },
  cold: { dot: "bg-text-3", label: "Froid" },
};

const CibleSection = () => (
  <section id="cible" className="px-6 md:px-[60px] py-[100px] relative">
    <SectionWrapper num="01" eyebrowText="Définir la cible" title="La conviction stratégique">
      <StatementBlock>
        <p>
          Ma conviction est la suivante : viser les <strong>filiales régionales PACA de grands groupes industriels</strong> — pas les PME isolées. Le bilan carbone n'est pas l'objectif. C'est <strong>le pied dans la porte</strong> vers une relation annuelle à forte valeur. Une PME signe une fois et disparaît. Une filiale de groupe signe et revient chaque année avec de nouveaux chantiers.
        </p>
      </StatementBlock>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mt-[60px]">
        {icpCards.map((card, i) => (
          <div key={i} className="opacity-0 animate-fade-in" style={{ animationDelay: `${i * 100}ms` }}>
            <IcpCard {...card} />
          </div>
        ))}
      </div>

      <div className="flex items-center gap-4 mt-[60px] mb-4">
        <div className="w-8 h-px bg-primary-glow" />
        <span className="font-mono text-[11px] text-text-3 tracking-[0.15em] uppercase">Signaux d'achat détectés</span>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr>
              {["Signal", "Source", "Température", "Action recommandée"].map((h) => (
                <th key={h} className="font-mono text-[10px] tracking-[0.12em] uppercase text-text-3 p-3 md:px-5 md:py-3 text-left border-b border-border">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {signals.map((s, i) => (
              <tr key={i} className="hover:bg-primary/[0.04] transition-colors">
                <td className="px-3 md:px-5 py-4 text-sm text-text-2 border-b border-border/50">{s.signal}</td>
                <td className="px-3 md:px-5 py-4 text-sm text-text-2 border-b border-border/50">{s.source}</td>
                <td className="px-3 md:px-5 py-4 text-sm text-text-2 border-b border-border/50">
                  <span className={`inline-block w-2 h-2 rounded-full mr-2 ${tempConfig[s.temp].dot}`} />
                  {tempConfig[s.temp].label}
                </td>
                <td className="px-3 md:px-5 py-4 text-sm text-text-2 border-b border-border/50">{s.action}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex items-center gap-4 mt-[60px] mb-4">
        <div className="w-8 h-px bg-primary-glow" />
        <span className="font-mono text-[11px] text-text-3 tracking-[0.15em] uppercase">Interlocuteurs cibles</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {personas.map((p, i) => (
          <div key={i} className="opacity-0 animate-fade-in" style={{ animationDelay: `${i * 100}ms` }}>
            <PersonaCard {...p} />
          </div>
        ))}
      </div>
    </SectionWrapper>
  </section>
);

export default CibleSection;
