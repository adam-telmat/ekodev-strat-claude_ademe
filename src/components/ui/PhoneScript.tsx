interface PhoneScriptProps {
  beats: { time: string; text: string }[];
}

const PhoneScript = ({ beats }: PhoneScriptProps) => (
  <div className="bg-card border border-border rounded-lg overflow-hidden">
    <div className="bg-surface px-5 py-3.5 border-b border-border flex items-center gap-2.5 font-mono text-[11px] text-text-3">
      <span>📞</span>
      Script téléphonique — Objectif : RDV 30 min
    </div>
    <div className="p-6 space-y-4">
      {beats.map((beat, i) => (
        <div key={i} className="flex gap-4 items-start">
          <div className="flex-shrink-0 font-mono text-[10px] text-primary-glow pt-1 min-w-[60px]">{beat.time}</div>
          <div className="text-[13px] text-text-2 leading-relaxed border-l-2 border-border pl-4 [&_em]:not-italic [&_em]:text-foreground">
            <span dangerouslySetInnerHTML={{ __html: beat.text.replace(/(".*?")/g, '<em>$1</em>') }} />
          </div>
        </div>
      ))}
    </div>
  </div>
);

export default PhoneScript;
