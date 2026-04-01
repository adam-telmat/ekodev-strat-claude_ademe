import Tag from "@/components/ui/Tag";
import { heroMeta } from "@/lib/data";

const HeroSection = () => (
  <section className="min-h-screen flex flex-col justify-center px-6 md:px-[60px] py-20 relative overflow-hidden">
    {/* Multi-layer background atmosphere */}
    <div className="absolute -top-[200px] -right-[200px] w-[700px] h-[700px] bg-[radial-gradient(circle,rgba(45,156,90,0.14)_0%,transparent_65%)] pointer-events-none" />
    <div className="absolute -bottom-[100px] -left-[100px] w-[500px] h-[500px] bg-[radial-gradient(circle,rgba(200,168,75,0.07)_0%,transparent_70%)] pointer-events-none" />
    <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[900px] h-[600px] bg-[radial-gradient(ellipse,rgba(45,156,90,0.04)_0%,transparent_70%)] pointer-events-none" />

    {/* Grid lines decoration */}
    <div className="absolute inset-0 pointer-events-none opacity-[0.025]"
      style={{
        backgroundImage: "linear-gradient(rgba(61,204,122,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(61,204,122,0.5) 1px, transparent 1px)",
        backgroundSize: "80px 80px",
      }}
    />

    <div className="relative z-10">
      <Tag>Mise en situation — ekodev Marseille · Yves Daumas, Directeur Régional Sud-Est</Tag>

      <h1 className="font-heading text-[clamp(52px,7.5vw,104px)] font-extrabold leading-[0.93] tracking-tight mt-8 mb-6">
        <div className="text-foreground">Prospection</div>
        <div className="text-transparent" style={{ WebkitTextStroke: "1px rgba(255,255,255,0.18)" }}>
          Bilan Carbone
        </div>
        <div className="text-primary-glow">Grands Comptes.</div>
      </h1>

      <p className="text-lg text-text-2 max-w-[580px] leading-relaxed mb-4 font-light">
        Pas une réponse scolaire. Un <strong className="text-foreground font-medium">système opérationnel</strong> — cible qualifiée via la data ADEME, séquence d'acquisition automatisée, vision LTV 3 ans. Disponible dès avril.
      </p>

      {/* ADEME callout */}
      <div className="inline-flex items-center gap-3 bg-primary/[0.08] border border-primary/20 rounded-full px-4 py-2 mb-10">
        <span className="w-1.5 h-1.5 bg-primary-glow rounded-full animate-pulse-dot" />
        <span className="font-mono text-[11px] text-primary-glow tracking-[0.1em]">
          20 prospects réels issus du registre BEGES · data.ademe.fr
        </span>
      </div>

      <div className="flex gap-8 md:gap-12 flex-wrap">
        {heroMeta.map((item) => (
          <div key={item.label} className="flex flex-col gap-1">
            <span className="font-mono text-[10px] tracking-[0.12em] uppercase text-text-3">{item.label}</span>
            <span className={`font-heading text-base font-bold ${item.highlight ? "text-primary-glow" : "text-foreground"}`}>
              {item.value}
            </span>
          </div>
        ))}
      </div>
    </div>

    {/* CTA arrow */}
    <div className="absolute bottom-10 left-6 md:left-[60px] flex items-center gap-3 text-text-3 text-xs font-mono tracking-[0.1em] uppercase">
      <div className="w-10 h-px bg-text-3 animate-scroll-line" />
      Découvrir le système
    </div>
  </section>
);

export default HeroSection;
