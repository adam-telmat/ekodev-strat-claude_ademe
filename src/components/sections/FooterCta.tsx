const FooterCta = () => (
  <div className="px-6 md:px-[60px] py-[100px] text-center bg-gradient-to-br from-card to-background border-t border-border relative overflow-hidden">
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[radial-gradient(circle,rgba(45,156,90,0.08)_0%,transparent_70%)] pointer-events-none" />

    <div className="relative z-10">
      <h2 className="font-heading text-[clamp(36px,5vw,64px)] font-extrabold leading-[1.1] mb-6 tracking-tight">
        Disponible<br />
        <span className="text-primary-glow">en avril.</span>
      </h2>
      <p className="text-lg text-text-2 mb-12 max-w-[500px] mx-auto font-light">
        Le système est configuré. Les prospects sont identifiés. Il reste à appuyer sur le bouton.
      </p>
      <a
        href="mailto:adamtelmat.pro@gmail.com"
        className="inline-flex items-center gap-3 bg-primary-glow text-background px-8 py-4 rounded-full font-heading text-[15px] font-bold no-underline transition-all duration-200 hover:bg-[#52e68e] hover:-translate-y-0.5 hover:shadow-[0_20px_40px_rgba(61,204,122,0.3)]"
      >
        Démarrer en avril
        <span>→</span>
      </a>
      <p className="mt-6 text-[13px] text-text-3 font-mono">
        adamtelmat.pro@gmail.com · 06 29 55 91 73
      </p>
    </div>
  </div>
);

export default FooterCta;
