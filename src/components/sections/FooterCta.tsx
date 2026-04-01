const FooterCta = () => (
  <div className="px-6 md:px-[60px] py-[120px] text-center bg-gradient-to-br from-card to-background border-t border-border relative overflow-hidden">
    {/* Atmosphere */}
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-[radial-gradient(circle,rgba(45,156,90,0.10)_0%,transparent_65%)] pointer-events-none" />
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-[radial-gradient(circle,rgba(45,156,90,0.12)_0%,transparent_70%)] pointer-events-none" />

    <div className="relative z-10">
      {/* Eyebrow */}
      <div className="inline-flex items-center gap-3 mb-8">
        <div className="w-8 h-px bg-primary-glow" />
        <span className="font-mono text-[11px] text-text-3 tracking-[0.15em] uppercase">La prochaine étape</span>
        <div className="w-8 h-px bg-primary-glow" />
      </div>

      <h2 className="font-heading text-[clamp(40px,5.5vw,72px)] font-extrabold leading-[1.05] mb-6 tracking-tight">
        Disponible<br />
        <span className="text-primary-glow">en avril.</span>
      </h2>
      <p className="text-lg text-text-2 mb-4 max-w-[520px] mx-auto font-light leading-relaxed">
        Le système est configuré. Les 20 premiers prospects sont identifiés et scorés.
        Le premier email peut partir sous <strong className="text-foreground font-medium">48h</strong>.
      </p>
      <p className="text-sm text-text-3 mb-12 max-w-[480px] mx-auto font-mono">
        Objectif : 80–120 prospects dans le pipe · 15–20% de taux de réponse · LTV grand compte 80–100k€
      </p>

      {/* Stats row */}
      <div className="flex justify-center gap-8 md:gap-16 mb-12 flex-wrap">
        {[
          { num: "20", label: "prospects qualifiés\ndans cette démo" },
          { num: "8 sem.", label: "de la signature au\nlivrable final" },
          { num: "6 000€", label: "financement\nBpiFrance disponible" },
          { num: "80–100k€", label: "LTV grand compte\nsur 3 ans" },
        ].map((s) => (
          <div key={s.num} className="flex flex-col items-center gap-1">
            <span className="font-heading text-3xl font-extrabold text-primary-glow">{s.num}</span>
            <span className="font-mono text-[10px] text-text-3 text-center leading-tight whitespace-pre-line">{s.label}</span>
          </div>
        ))}
      </div>

      <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
        <a
          href="mailto:adamtelmat.pro@gmail.com"
          className="inline-flex items-center gap-3 bg-primary-glow text-background px-8 py-4 rounded-full font-heading text-[15px] font-bold no-underline transition-all duration-200 hover:bg-[#52e68e] hover:-translate-y-0.5 hover:shadow-[0_20px_40px_rgba(61,204,122,0.3)]"
        >
          Démarrer en avril
          <span>→</span>
        </a>
        <a
          href="#radar"
          className="inline-flex items-center gap-3 text-primary-glow border border-primary-glow/30 px-8 py-4 rounded-full font-heading text-[15px] font-bold no-underline transition-all duration-200 hover:bg-primary-glow/10 hover:border-primary-glow/60"
        >
          Voir les prospects →
        </a>
      </div>

      <p className="mt-8 text-[13px] text-text-3 font-mono">
        adamtelmat.pro@gmail.com · 06 29 55 91 73
      </p>

      <div className="mt-10 pt-8 border-t border-border/30 flex items-center justify-center gap-2 text-[11px] text-text-3 font-mono">
        <span className="w-1.5 h-1.5 bg-primary-glow rounded-full animate-pulse-dot" />
        Données issues du registre BEGES · source officielle data.ademe.fr · usage prospection commerciale
      </div>
    </div>
  </div>
);

export default FooterCta;
