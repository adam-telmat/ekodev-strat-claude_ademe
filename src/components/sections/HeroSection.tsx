import { useEffect, useRef } from "react";

const EyeAnimation = () => (
  <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "flex-end", paddingRight: "4%", pointerEvents: "none" }}>
    <style>{`
      @keyframes rotCCW { from { transform: rotate(0deg); } to { transform: rotate(-360deg); } }
      @keyframes rotCW  { from { transform: rotate(0deg); } to { transform: rotate(360deg);  } }
      @keyframes eyePulse { 0%,100% { opacity:1; transform:scale(1); } 50% { opacity:.8; transform:scale(1.03); } }
      .r1 { animation: rotCCW 20s linear infinite; transform-origin: 50% 50%; }
      .r2 { animation: rotCW  14s linear infinite; transform-origin: 50% 50%; }
      .r3 { animation: rotCCW 32s linear infinite; transform-origin: 50% 50%; }
      .eye { animation: eyePulse 4s ease-in-out infinite; transform-origin: 50% 50%; }
    `}</style>

    <svg width="640" height="640" viewBox="0 0 640 640" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Ring 3 — outermost, very slow */}
      <g className="r3">
        <path d="M320 60 A260 260 0 0 1 540 160"  stroke="rgba(155,197,199,0.18)" strokeWidth="2" strokeLinecap="round" fill="none"/>
        <path d="M540 480 A260 260 0 0 1 320 580" stroke="rgba(155,197,199,0.18)" strokeWidth="2" strokeLinecap="round" fill="none"/>
        <path d="M100 480 A260 260 0 0 0 100 160"  stroke="rgba(155,197,199,0.10)" strokeWidth="1.5" strokeLinecap="round" fill="none"/>
        <circle cx="540" cy="160" r="4" fill="rgba(255,220,90,0.5)"/>
      </g>

      {/* Ring 2 — middle, CW */}
      <g className="r2">
        <path d="M320 90 A230 230 0 0 1 550 320"  stroke="rgba(255,220,90,0.20)" strokeWidth="2.5" strokeLinecap="round" fill="none"/>
        <path d="M90  320 A230 230 0 0 1 320 550" stroke="rgba(255,220,90,0.14)" strokeWidth="1.5" strokeLinecap="round" fill="none"/>
        <path d="M490 140 A230 230 0 0 1 550 320" stroke="rgba(255,220,90,0.35)" strokeWidth="3.5" strokeLinecap="round" fill="none"/>
        <circle cx="550" cy="320" r="4.5" fill="rgba(255,220,90,0.65)"/>
        <circle cx="90"  cy="320" r="3"   fill="rgba(155,197,199,0.45)"/>
      </g>

      {/* Ring 1 — inner, CCW */}
      <g className="r1">
        <path d="M320 115 A205 205 0 0 1 525 320" stroke="rgba(155,197,199,0.22)" strokeWidth="1.5" strokeLinecap="round" fill="none"/>
        <path d="M115 320 A205 205 0 0 1 320 525" stroke="rgba(155,197,199,0.22)" strokeWidth="1.5" strokeLinecap="round" fill="none"/>
        <circle cx="525" cy="320" r="3.5" fill="rgba(155,197,199,0.6)"/>
        <circle cx="320" cy="115" r="3"   fill="rgba(255,220,90,0.4)"/>
      </g>

      {/* EYE */}
      <g className="eye">
        {/* Eye outline */}
        <path
          d="M130 320 C175 230 245 190 320 190 C395 190 465 230 510 320 C465 410 395 450 320 450 C245 450 175 410 130 320Z"
          fill="rgba(155,197,199,0.07)"
          stroke="rgba(155,197,199,0.40)"
          strokeWidth="1.5"
        />
        {/* Iris */}
        <circle cx="320" cy="320" r="72" fill="rgba(155,197,199,0.15)" stroke="rgba(155,197,199,0.45)" strokeWidth="1.5"/>
        {/* Pupil dark */}
        <circle cx="320" cy="320" r="36" fill="rgba(0,36,40,0.92)" stroke="rgba(155,197,199,0.55)" strokeWidth="1"/>
        {/* Inner glow */}
        <circle cx="320" cy="320" r="16" fill="rgba(155,197,199,0.28)"/>
        {/* Specular */}
        <circle cx="334" cy="308" r="8"  fill="rgba(255,255,255,0.18)"/>
        {/* Horizontal lines */}
        <line x1="130" y1="320" x2="248" y2="320" stroke="rgba(155,197,199,0.45)" strokeWidth="1.5"/>
        <line x1="392" y1="320" x2="510" y2="320" stroke="rgba(155,197,199,0.45)" strokeWidth="1.5"/>
      </g>
    </svg>
  </div>
);

const HeroSection = () => {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add("visible"); }),
      { threshold: 0.05 }
    );
    ref.current?.querySelectorAll(".reveal").forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  return (
    <div id="hero" ref={ref} style={{
      minHeight: "100vh",
      background: "#003035",
      display: "flex",
      alignItems: "center",
      padding: "100px 80px 80px",
      position: "relative",
      overflow: "hidden",
    }}>
      {/* Full-screen eye animation — behind text */}
      <EyeAnimation />

      {/* Radial glow behind eye */}
      <div style={{
        position: "absolute", inset: 0, pointerEvents: "none",
        background: "radial-gradient(ellipse at 76% 50%, rgba(155,197,199,0.07) 0%, transparent 55%)",
      }} />

      {/* LEFT — minimal text */}
      <div className="reveal" style={{ position: "relative", zIndex: 2, maxWidth: 540 }}>

        {/* Eyebrow */}
        <div style={{
          display: "inline-flex", alignItems: "center", gap: 10, marginBottom: 28,
          fontFamily: "'JetBrains Mono', monospace", fontSize: 10,
          letterSpacing: "0.2em", textTransform: "uppercase",
          color: "rgba(255,220,90,0.65)",
        }}>
          <span style={{ width: 20, height: 1, background: "#FFDC5A", display: "inline-block" }} />
          Mise en situation — ekodev Marseille
        </div>

        {/* H1 — 3 lignes fixes */}
        <h1 style={{
          fontFamily: "'Fraunces', serif",
          fontSize: "clamp(52px, 5.5vw, 80px)",
          fontWeight: 900,
          lineHeight: 1.08,
          letterSpacing: "-0.025em",
          color: "#F8F7F3",
          marginBottom: 40,
          whiteSpace: "nowrap",
        }}>
          <span style={{ display: "block" }}>Système d'acquisition</span>
          <span style={{ display: "block", fontStyle: "italic", color: "#9BC5C7" }}>Data-Driven</span>
          <span style={{ display: "block" }}>Stratégie Climat.</span>
        </h1>

        {/* Single CTA */}
        <a href="#ciblage" style={{
          display: "inline-flex", alignItems: "center", gap: 12,
          background: "#FFDC5A", color: "#003035",
          padding: "16px 36px", fontSize: 12,
          letterSpacing: "0.12em", textTransform: "uppercase",
          textDecoration: "none", fontWeight: 600, transition: "all 0.25s",
        }}
        onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = "#ffe97a"; (e.currentTarget as HTMLElement).style.transform = "translateY(-2px)"; }}
        onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = "#FFDC5A"; (e.currentTarget as HTMLElement).style.transform = "translateY(0)"; }}>
          Découvrir le système →
        </a>
      </div>
    </div>
  );
};

export default HeroSection;
