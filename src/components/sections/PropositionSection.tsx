import SectionWrapper from "@/components/layout/SectionWrapper";
import StatementBlock from "@/components/ui/StatementBlock";
import { discoveryQuestions, proposalSteps, vsTable } from "@/lib/data";

const markIcon: Record<string, { icon: string; cls: string }> = {
  check: { icon: "✓", cls: "text-primary-glow" },
  cross: { icon: "✗", cls: "text-destructive opacity-60" },
  half: { icon: "~", cls: "text-gold" },
  neutral: { icon: "", cls: "" },
};

const PropositionSection = () => (
  <section id="proposition" className="px-6 md:px-[60px] py-[100px] relative">
    <SectionWrapper num="04" eyebrowText="Construire la proposition" title={<>Questions découverte<br />& proposition commerciale</>}>
      {/* Discovery questions */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-10">
        {discoveryQuestions.map((cat, i) => (
          <div key={i} className="bg-card border border-border rounded-lg p-5 opacity-0 animate-fade-in" style={{ animationDelay: `${i * 80}ms` }}>
            <div className="font-mono text-[10px] tracking-[0.12em] uppercase text-primary-glow mb-3">{cat.category}</div>
            <ul className="flex flex-col gap-2">
              {cat.items.map((item, j) => (
                <li key={j} className="text-xs text-text-2 pl-4 relative leading-snug">
                  <span className="absolute left-0 text-green text-[10px] top-0.5">→</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Proposal steps */}
      <div className="flex items-center gap-4 mt-[60px] mb-6">
        <div className="w-8 h-px bg-primary-glow" />
        <span className="font-mono text-[11px] text-text-3 tracking-[0.15em] uppercase">Structure de la proposition</span>
      </div>

      <div className="flex gap-0 mb-10 overflow-x-auto">
        {proposalSteps.map((step, i) => (
          <div
            key={i}
            className={`flex-1 min-w-[140px] p-6 bg-card border border-border border-r-0 last:border-r text-center transition-colors hover:bg-surface ${
              i === 0 ? "rounded-l-lg" : ""
            } ${i === proposalSteps.length - 1 ? "rounded-r-lg" : ""}`}
          >
            <div className="font-mono text-2xl text-green mb-2.5">{step.num}</div>
            <div className="text-xs text-text-2 leading-snug">{step.title}</div>
          </div>
        ))}
      </div>

      {/* VS table */}
      <div className="flex items-center gap-4 mt-[60px] mb-6">
        <div className="w-8 h-px bg-primary-glow" />
        <span className="font-mono text-[11px] text-text-3 tracking-[0.15em] uppercase">ekodev vs SaaS — le vrai comparatif</span>
      </div>

      <div className="mb-8">
        <StatementBlock>
          <p>
            <strong>Un SaaS vous donne un chiffre. ekodev vous donne une stratégie.</strong> Un logiciel est utile quand le périmètre est simple et les équipes disponibles. Dès qu'il faut cadrer un périmètre complexe, embarquer plusieurs directions, traiter le scope 3 terrain et transformer le bilan en feuille de route — l'accompagnement conseil crée 10x plus de valeur.
          </p>
        </StatementBlock>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr>
              {vsTable.headers.map((h, i) => (
                <th
                  key={i}
                  className={`p-4 text-left font-heading text-sm font-bold border-b-2 ${
                    i === vsTable.headers.length - 1
                      ? "bg-primary/10 text-primary-glow border-b-primary-glow"
                      : i === 0
                        ? "border-b-border"
                        : "text-text-3 border-b-border"
                  }`}
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {vsTable.rows.map((row, ri) => (
              <tr key={ri} className="hover:bg-primary/[0.06] transition-colors">
                <td className="px-4 py-3.5 text-xs text-text-2 font-mono border-b border-border/40">{row.criterion}</td>
                {row.values.map((val, vi) => {
                  const mark = row.marks[vi];
                  const isEkodev = vi === row.values.length - 1;
                  const m = markIcon[mark];
                  return (
                    <td
                      key={vi}
                      className={`px-4 py-3.5 text-[13px] border-b border-border/40 ${
                        isEkodev ? "bg-primary/[0.05] text-foreground" : "text-text-3"
                      }`}
                    >
                      {m.icon && <span className={`${m.cls} font-bold mr-1.5`}>{m.icon}</span>}
                      {val}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </SectionWrapper>
  </section>
);

export default PropositionSection;
