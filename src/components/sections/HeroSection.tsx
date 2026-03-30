import Tag from "@/components/ui/Tag";
import { heroMeta } from "@/lib/data";

const HeroSection = () => (
  <section className="min-h-screen flex flex-col justify-center px-6 md:px-[60px] py-20 relative overflow-hidden">
    {/* Radial glows */}
    <div className="absolute -top-[200px] -right-[200px] w-[600px] h-[600px] bg-[radial-gradient(circle,rgba(45,156,90,0.15)_0%,transparent_70%)] pointer-events-none" />
    <div className="absolute -bottom-[100px] -left-[100px] w-[400px] h-[400px] bg-[radial-gradient(circle,rgba(200,168,75,0.08)_0%,transparent_70%)] pointer-events-none" />

    <div className="relative z-10">
      <Tag>Mise en situation — ekodev Marseille</Tag>

      <h1 className="font-heading text-[clamp(48px,7vw,96px)] font-extrabold leading-[0.95] tracking-tight mt-8 mb-6">
        <div className="text-foreground">Prospection</div>
        <div className="text-transparent" style={{ WebkitTextStroke: "1px rgba(255,255,255,0.2)" }}>
          Bilan Carbone
        </div>
        <div className="text-primary-glow">Grands Comptes.</div>
      </h1>

      <p className="text-lg text-text-2 max-w-[560px] leading-relaxed mb-12 font-light">
        Une stratégie commerciale complète pour pénétrer le marché des filiales industrielles PACA — avec un système d'acquisition qui tourne en continu.
      </p>

      <div className="flex gap-10 flex-wrap">
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

    <div className="absolute bottom-10 left-6 md:left-[60px] flex items-center gap-3 text-text-3 text-xs font-mono tracking-[0.1em] uppercase">
      <div className="w-10 h-px bg-text-3 animate-scroll-line" />
      Découvrir
    </div>
  </section>
);

export default HeroSection;
