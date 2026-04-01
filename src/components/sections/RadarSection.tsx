import { useEffect, useState, useMemo } from "react";
import { loadAllProspects, buildEmail, exportToCsv, fmtEmissions } from "@/lib/radarData";
import type { Prospect, ScoreFilter, SegmentFilter } from "@/lib/radarTypes";
import SectionWrapper from "@/components/layout/SectionWrapper";

// ── Score badge ────────────────────────────────────────────────────────────────
const ScoreBadge = ({ score }: { score: number }) => {
  const cfg = {
    1: { label: "P1 — Urgent", cls: "bg-red-500/15 text-red-400 border-red-500/30 shadow-[0_0_12px_rgba(239,68,68,0.15)]" },
    2: { label: "P2 — Chaud", cls: "bg-orange-500/15 text-orange-400 border-orange-500/30 shadow-[0_0_12px_rgba(249,115,22,0.1)]" },
    3: { label: "P3 — Pipeline", cls: "bg-primary/15 text-primary-glow border-primary/30" },
  }[score] ?? { label: `P${score}`, cls: "" };
  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded-full font-mono text-[10px] border whitespace-nowrap ${cfg.cls}`}>
      {cfg.label}
    </span>
  );
};

// ── Plan badge ─────────────────────────────────────────────────────────────────
const PlanBadge = ({ plan }: { plan: string }) =>
  plan === "Oui" ? (
    <span className="inline-flex items-center gap-1 text-primary-glow font-mono text-[10px]">
      <span className="w-1.5 h-1.5 rounded-full bg-primary-glow inline-block" /> Oui
    </span>
  ) : (
    <span className="inline-flex items-center gap-1 text-red-400 font-mono text-[10px]">
      <span className="w-1.5 h-1.5 rounded-full bg-red-400 inline-block" /> Non
    </span>
  );

// ── Scope bar ──────────────────────────────────────────────────────────────────
const ScopeBar = ({ s1, s2, s3 }: { s1: number; s2: number; s3: number }) => {
  const total = s1 + s2 + s3 || 1;
  const pct1 = (s1 / total) * 100;
  const pct2 = (s2 / total) * 100;
  const pct3 = (s3 / total) * 100;
  return (
    <div className="flex h-1.5 rounded-full overflow-hidden w-full gap-px mt-1">
      {pct1 > 0 && <div className="bg-orange-400 rounded-sm" style={{ width: `${pct1}%` }} title={`S1: ${fmtEmissions(s1)}`} />}
      {pct2 > 0 && <div className="bg-yellow-400 rounded-sm" style={{ width: `${pct2}%` }} title={`S2: ${fmtEmissions(s2)}`} />}
      {pct3 > 0 && <div className="bg-primary-glow rounded-sm" style={{ width: `${pct3}%` }} title={`S3: ${fmtEmissions(s3)}`} />}
      {s3 === 0 && s1 + s2 > 0 && <div className="bg-red-400/60 rounded-sm flex-1" title="Scope 3 manquant" />}
    </div>
  );
};

// ── Email modal ────────────────────────────────────────────────────────────────
const EmailModal = ({ prospect, onClose }: { prospect: Prospect; onClose: () => void }) => {
  const [copied, setCopied] = useState(false);
  const email = useMemo(() => buildEmail(prospect), [prospect]);

  const handleCopy = () => {
    navigator.clipboard.writeText(`${email.subject}\n\n${email.body}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm p-4" onClick={onClose}>
      <div
        className="bg-card border border-border rounded-xl max-w-2xl w-full max-h-[90vh] overflow-auto shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-border">
          <div>
            <div className="font-mono text-[10px] text-text-3 tracking-[0.12em] uppercase mb-1">Email généré — ADEME data</div>
            <div className="font-heading font-bold text-foreground">{prospect.organisation}</div>
            <div className="text-xs text-text-3 mt-0.5">{prospect.interlocuteur}</div>
          </div>
          <button onClick={onClose} className="text-text-3 hover:text-foreground transition-colors text-xl leading-none p-2">×</button>
        </div>

        {/* Metadata strip */}
        <div className="px-5 py-3 border-b border-border flex gap-6 flex-wrap">
          <div className="flex flex-col gap-0.5">
            <span className="font-mono text-[9px] text-text-3 uppercase tracking-widest">Source BEGES</span>
            <span className="font-mono text-[11px] text-primary-glow">data.ademe.fr — Registre BEGES</span>
          </div>
          <div className="flex flex-col gap-0.5">
            <span className="font-mono text-[9px] text-text-3 uppercase tracking-widest">Dernier bilan</span>
            <span className="font-mono text-[11px] text-foreground">{prospect.anneeBilan} ({prospect.nbBilans} bilan{prospect.nbBilans > 1 ? "s" : ""})</span>
          </div>
          <div className="flex flex-col gap-0.5">
            <span className="font-mono text-[9px] text-text-3 uppercase tracking-widest">Émissions déclarées</span>
            <span className="font-mono text-[11px] text-foreground">{fmtEmissions(prospect.totalEmissions)} CO₂e</span>
          </div>
          <div className="flex flex-col gap-0.5">
            <span className="font-mono text-[9px] text-text-3 uppercase tracking-widest">Scope 3</span>
            <span className={`font-mono text-[11px] ${prospect.scope3 === 0 ? "text-red-400" : "text-foreground"}`}>
              {prospect.scope3 === 0 ? "Non renseigné ⚠" : fmtEmissions(prospect.scope3)}
            </span>
          </div>
        </div>

        {/* Signal légal */}
        <div className="px-5 py-3 border-b border-border bg-primary/[0.04]">
          <div className="font-mono text-[9px] text-text-3 uppercase tracking-widest mb-1">Signal d'achat détecté</div>
          <p className="text-xs text-text-2 leading-relaxed">{prospect.signalLegal}</p>
        </div>

        {/* Email */}
        <div className="p-5">
          <div className="font-mono text-[9px] text-text-3 uppercase tracking-widest mb-2">Objet</div>
          <div className="bg-surface border border-border rounded-lg px-4 py-3 text-sm text-foreground font-mono mb-4">
            {email.subject}
          </div>
          <div className="font-mono text-[9px] text-text-3 uppercase tracking-widest mb-2">Corps</div>
          <pre className="bg-surface border border-border rounded-lg px-4 py-4 text-[13px] text-text-2 leading-relaxed whitespace-pre-wrap font-sans">
            {email.body}
          </pre>
        </div>

        {/* Actions */}
        <div className="px-5 pb-5 flex gap-3 justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-mono text-text-3 border border-border rounded-lg hover:border-border/80 transition-colors"
          >
            Fermer
          </button>
          <button
            onClick={handleCopy}
            className="px-5 py-2 text-xs font-mono bg-primary-glow text-background rounded-lg font-bold hover:bg-[#52e68e] transition-colors"
          >
            {copied ? "✓ Copié !" : "Copier l'email"}
          </button>
        </div>
      </div>
    </div>
  );
};

// ── Mini stat card ─────────────────────────────────────────────────────────────
const StatCard = ({ label, value, sub }: { label: string; value: string | number; sub?: string }) => (
  <div className="bg-card border border-border rounded-lg p-5">
    <div className="font-mono text-[10px] text-text-3 uppercase tracking-[0.12em] mb-2">{label}</div>
    <div className="font-heading text-3xl font-extrabold text-primary-glow">{value}</div>
    {sub && <div className="text-xs text-text-3 mt-1">{sub}</div>}
  </div>
);

// ── Main section ───────────────────────────────────────────────────────────────
const RadarSection = () => {
  const [prospects, setProspects] = useState<Prospect[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [scoreFilter, setScoreFilter] = useState<ScoreFilter>("all");
  const [segmentFilter, setSegmentFilter] = useState<SegmentFilter>("all");
  const [regionFilter, setRegionFilter] = useState<RegionFilter>("all");
  const [scope3Filter, setScope3Filter] = useState(false);
  const [planFilter, setPlanFilter] = useState(false);

  const [selectedProspect, setSelectedProspect] = useState<Prospect | null>(null);
  const [expandedRow, setExpandedRow] = useState<string | null>(null);

  useEffect(() => {
    loadAllProspects()
      .then((data) => { setProspects(data); setLoading(false); })
      .catch(() => { setError("Impossible de charger les données ADEME."); setLoading(false); });
  }, []);

  const regions = useMemo(() => {
    const set = new Set(prospects.map((p) => p.region));
    return Array.from(set).sort();
  }, [prospects]);

  const filtered = useMemo(() => {
    return prospects.filter((p) => {
      if (scoreFilter !== "all" && p.score !== parseInt(scoreFilter)) return false;
      if (segmentFilter !== "all" && p.segment !== segmentFilter) return false;
      if (regionFilter !== "all" && p.region !== regionFilter) return false;
      if (scope3Filter && p.scope3 !== 0) return false;
      if (planFilter && p.planTransition !== "Non") return false;
      return true;
    });
  }, [prospects, scoreFilter, segmentFilter, regionFilter, scope3Filter, planFilter]);

  const stats = useMemo(() => ({
    total: filtered.length,
    urgent: filtered.filter((p) => p.score === 1).length,
    scope3manquant: filtered.filter((p) => p.scope3 === 0).length,
    totalEmissions: filtered.reduce((acc, p) => acc + p.totalEmissions, 0),
  }), [filtered]);

  const filterBtnClass = (active: boolean) =>
    `px-3 py-1.5 rounded-lg font-mono text-[11px] transition-all duration-200 border ${
      active
        ? "bg-primary-glow/15 text-primary-glow border-primary-glow/40"
        : "bg-transparent text-text-3 border-border hover:border-text-3"
    }`;

  const toggleBtnClass = (active: boolean) =>
    `px-3 py-1.5 rounded-lg font-mono text-[11px] transition-all duration-200 border ${
      active
        ? "bg-red-500/15 text-red-400 border-red-500/30"
        : "bg-transparent text-text-3 border-border hover:border-text-3"
    }`;

  return (
    <section id="radar" className="px-6 md:px-[60px] py-[100px] relative">
      {/* Background glow */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[radial-gradient(circle,rgba(45,156,90,0.06)_0%,transparent_70%)] pointer-events-none" />

      <SectionWrapper
        num="02.5"
        eyebrowText="Radar ADEME · Registre BEGES"
        title={<>Prospects réels<br />issus de la data publique</>}
      >
        {/* Source + methodology strip */}
        <div className="bg-card border border-primary/20 rounded-xl p-5 mb-10 flex flex-col md:flex-row gap-5 md:items-center">
          <div className="flex-1">
            <div className="font-mono text-[10px] text-primary-glow tracking-[0.15em] uppercase mb-2">Source · data.ademe.fr</div>
            <p className="text-sm text-text-2 leading-relaxed">
              Ces prospects sont extraits du <strong className="text-foreground">registre BEGES de l'ADEME</strong> — la base officielle où les entreprises déclarent leur bilan GES. Chaque ligne est une entreprise réelle, avec ses émissions déclarées, son historique, et son exposition légale 2026.
            </p>
          </div>
          <div className="md:w-px md:self-stretch bg-border" />
          <div className="md:w-72 flex-shrink-0">
            <div className="font-mono text-[10px] text-text-3 tracking-[0.12em] uppercase mb-2">Règles de scoring</div>
            <ul className="flex flex-col gap-1">
              {[
                { color: "bg-red-400", text: "P1 — Bilan ≥4 ans sans renouvellement" },
                { color: "bg-red-400", text: "P1 — Scope 3=0 malgré S1+S2 élevés" },
                { color: "bg-orange-400", text: "P2 — Bilan 2023, aucun plan publié" },
                { color: "bg-primary-glow", text: "P3 — Bilan récent, upsell stratégie" },
              ].map((rule, i) => (
                <li key={i} className="flex items-center gap-2 text-[11px] text-text-3">
                  <span className={`w-2 h-2 rounded-full flex-shrink-0 ${rule.color}`} />
                  {rule.text}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <StatCard label="Prospects filtrés" value={stats.total} sub="sur 20 en base" />
          <StatCard label="Urgents (P1)" value={stats.urgent} sub="risque légal immédiat" />
          <StatCard label="Scope 3 manquant" value={stats.scope3manquant} sub="non conforme CSRD" />
          <StatCard label="Total tCO₂e" value={fmtEmissions(stats.totalEmissions)} sub="périmètre combiné" />
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-3 mb-6 items-center">
          <span className="font-mono text-[10px] text-text-3 uppercase tracking-widest mr-1">Filtres :</span>

          {/* Score */}
          <div className="flex gap-1.5">
            {(["all", "1", "2", "3"] as ScoreFilter[]).map((s) => (
              <button key={s} onClick={() => setScoreFilter(s)} className={filterBtnClass(scoreFilter === s)}>
                {s === "all" ? "Tous scores" : `P${s}`}
              </button>
            ))}
          </div>

          {/* Segment */}
          <div className="flex gap-1.5">
            {(["all", "ETI", "GG"] as SegmentFilter[]).map((seg) => (
              <button key={seg} onClick={() => setSegmentFilter(seg)} className={filterBtnClass(segmentFilter === seg)}>
                {seg === "all" ? "ETI + GG" : seg === "GG" ? "Grands groupes" : "ETI"}
              </button>
            ))}
          </div>

          {/* Region */}
          <select
            value={regionFilter}
            onChange={(e) => setRegionFilter(e.target.value)}
            className="px-3 py-1.5 bg-card border border-border rounded-lg font-mono text-[11px] text-text-2 focus:outline-none focus:border-primary/40"
          >
            <option value="all">Toutes régions</option>
            {regions.map((r) => (
              <option key={r} value={r}>{r}</option>
            ))}
          </select>

          {/* Toggle filters */}
          <button onClick={() => setScope3Filter((v) => !v)} className={toggleBtnClass(scope3Filter)}>
            ⚠ Scope 3=0 seulement
          </button>
          <button onClick={() => setPlanFilter((v) => !v)} className={toggleBtnClass(planFilter)}>
            ⚠ Sans plan de transition
          </button>

          {/* Export */}
          <button
            onClick={() => exportToCsv(filtered)}
            className="ml-auto px-4 py-1.5 bg-primary-glow/10 text-primary-glow border border-primary-glow/30 rounded-lg font-mono text-[11px] hover:bg-primary-glow/20 transition-colors flex items-center gap-2"
          >
            ↓ Exporter CSV
            <span className="bg-primary-glow/20 px-1.5 rounded text-[10px]">{filtered.length}</span>
          </button>
        </div>

        {/* Table */}
        {loading ? (
          <div className="flex items-center justify-center h-48 text-text-3 font-mono text-sm">
            <span className="animate-pulse">Chargement des données ADEME...</span>
          </div>
        ) : error ? (
          <div className="flex items-center justify-center h-48 text-red-400 font-mono text-sm">{error}</div>
        ) : (
          <div className="overflow-x-auto border border-border rounded-xl">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className="bg-card">
                  {["Organisation", "Secteur", "Territoire", "Émissions", "Scopes", "Plan", "Score", "Action"].map((h) => (
                    <th key={h} className="px-4 py-3 text-left font-mono text-[10px] text-text-3 uppercase tracking-[0.12em] border-b border-border whitespace-nowrap">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.map((p, i) => {
                  const isExpanded = expandedRow === p.organisation;
                  return (
                    <>
                      <tr
                        key={p.organisation}
                        className={`transition-colors cursor-pointer border-b border-border/40 ${
                          isExpanded ? "bg-primary/[0.06]" : i % 2 === 0 ? "bg-background" : "bg-card/30"
                        } hover:bg-primary/[0.05]`}
                        onClick={() => setExpandedRow(isExpanded ? null : p.organisation)}
                      >
                        <td className="px-4 py-3.5">
                          <div className="font-heading font-bold text-foreground text-[13px] leading-snug">{p.organisation}</div>
                          <div className="font-mono text-[10px] text-text-3 mt-0.5">{p.segment} · {p.codeNaf}</div>
                        </td>
                        <td className="px-4 py-3.5 text-xs text-text-2 max-w-[180px]">
                          <div className="line-clamp-2">{p.secteur}</div>
                        </td>
                        <td className="px-4 py-3.5">
                          <div className="text-xs text-text-2">{p.departement}</div>
                          <div className="font-mono text-[10px] text-text-3 mt-0.5">{p.region.replace("Provence-Alpes-Côte d'Azur", "PACA").replace("Auvergne-Rhône-Alpes", "AURA")}</div>
                        </td>
                        <td className="px-4 py-3.5">
                          <div className="font-heading font-bold text-sm text-foreground">{fmtEmissions(p.totalEmissions)}</div>
                          <div className="font-mono text-[10px] text-text-3 mt-0.5">tCO₂e</div>
                        </td>
                        <td className="px-4 py-3.5 min-w-[120px]">
                          <div className="flex gap-1 text-[10px] font-mono text-text-3 mb-1.5">
                            <span className="text-orange-400">S1</span>
                            <span className="text-yellow-400">S2</span>
                            <span className={p.scope3 === 0 ? "text-red-400" : "text-primary-glow"}>S3{p.scope3 === 0 ? " ⚠" : ""}</span>
                          </div>
                          <ScopeBar s1={p.scope1} s2={p.scope2} s3={p.scope3} />
                          <div className="font-mono text-[9px] text-text-3 mt-1">
                            {fmtEmissions(p.scope1)} · {fmtEmissions(p.scope2)} · {p.scope3 === 0 ? "manquant" : fmtEmissions(p.scope3)}
                          </div>
                        </td>
                        <td className="px-4 py-3.5"><PlanBadge plan={p.planTransition} /></td>
                        <td className="px-4 py-3.5"><ScoreBadge score={p.score} /></td>
                        <td className="px-4 py-3.5">
                          <button
                            onClick={(e) => { e.stopPropagation(); setSelectedProspect(p); }}
                            className="px-3 py-1.5 bg-primary-glow/10 text-primary-glow border border-primary-glow/30 rounded-lg font-mono text-[10px] hover:bg-primary-glow/20 transition-colors whitespace-nowrap"
                          >
                            Générer email →
                          </button>
                        </td>
                      </tr>
                      {isExpanded && (
                        <tr key={`${p.organisation}-expanded`} className="bg-primary/[0.04] border-b border-border/40">
                          <td colSpan={8} className="px-4 py-4">
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                              <div>
                                <div className="font-mono text-[9px] text-text-3 uppercase tracking-widest mb-1">Signal légal</div>
                                <p className="text-xs text-text-2 leading-relaxed">{p.signalLegal}</p>
                              </div>
                              <div>
                                <div className="font-mono text-[9px] text-text-3 uppercase tracking-widest mb-1">Interlocuteur cible</div>
                                <p className="text-xs text-foreground font-medium">{p.interlocuteur}</p>
                                <div className="font-mono text-[9px] text-text-3 uppercase tracking-widest mt-3 mb-1">Bilan historique</div>
                                <p className="text-xs text-text-2">{p.historique} · {p.nbBilans} bilan{p.nbBilans > 1 ? "s" : ""} publié{p.nbBilans > 1 ? "s" : ""}</p>
                              </div>
                              <div>
                                <div className="font-mono text-[9px] text-text-3 uppercase tracking-widest mb-1">Angle commercial</div>
                                <p className="text-xs text-text-2 leading-relaxed">{p.angleCommercial}</p>
                              </div>
                            </div>
                          </td>
                        </tr>
                      )}
                    </>
                  );
                })}
                {filtered.length === 0 && (
                  <tr>
                    <td colSpan={8} className="px-4 py-10 text-center text-text-3 font-mono text-sm">
                      Aucun prospect ne correspond aux filtres sélectionnés.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}

        {/* Outreach legend */}
        <div className="mt-6 flex gap-5 flex-wrap items-center">
          <div className="flex items-center gap-2 text-xs text-text-3">
            <span className="w-3 h-3 rounded-sm bg-orange-400" /> Scope 1 (émissions directes)
          </div>
          <div className="flex items-center gap-2 text-xs text-text-3">
            <span className="w-3 h-3 rounded-sm bg-yellow-400" /> Scope 2 (énergie indirecte)
          </div>
          <div className="flex items-center gap-2 text-xs text-text-3">
            <span className="w-3 h-3 rounded-sm bg-primary-glow" /> Scope 3 (chaîne de valeur)
          </div>
          <div className="flex items-center gap-2 text-xs text-text-3">
            <span className="w-3 h-3 rounded-sm bg-red-400/60" /> Scope 3 non déclaré ⚠
          </div>
          <div className="ml-auto flex items-center gap-1.5 text-xs text-text-3 font-mono">
            <span className="w-1.5 h-1.5 bg-primary-glow rounded-full animate-pulse-dot" />
            Cliquer sur une ligne pour voir le détail · Email généré automatiquement depuis le signal ADEME
          </div>
        </div>
      </SectionWrapper>

      {/* Email modal */}
      {selectedProspect && (
        <EmailModal prospect={selectedProspect} onClose={() => setSelectedProspect(null)} />
      )}
    </section>
  );
};

export default RadarSection;
