import { useEffect, useRef } from "react";
import { EkodevLogoWhite } from "@/components/layout/Navbar";

const FooterCta = () => {
  const ref = useRef<HTMLElement>(null);
  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add("visible"); }),
      { threshold: 0.08, rootMargin: "0px 0px -40px 0px" }
    );
    ref.current?.querySelectorAll(".reveal").forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  return (
    <footer ref={ref} style={{ background: "#003035", color: "#F8F7F3", padding: "100px 60px", textAlign: "center", position: "relative", overflow: "hidden" }}>
      {/* Yellow top bar */}
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 4, background: "#FFDC5A" }} />

      {/* Watermark */}
      <div style={{ position: "absolute", left: "50%", top: "50%", transform: "translate(-50%, -50%)", fontFamily: "'Fraunces', serif", fontSize: 200, fontWeight: 900, color: "rgba(255,255,255,0.018)", whiteSpace: "nowrap", pointerEvents: "none", userSelect: "none" }}>
        ekodev
      </div>

      {/* Logo blanc officiel */}
      <div className="reveal" style={{ display: "flex", justifyContent: "center", marginBottom: 48, position: "relative" }}>
        <EkodevLogoWhite />
      </div>

      <h2 className="reveal" style={{ fontFamily: "'Fraunces', serif", fontSize: "clamp(32px, 4.5vw, 56px)", fontWeight: 900, lineHeight: 1.1, marginBottom: 20, fontStyle: "italic", position: "relative" }}>
        Prêt à implémenter<br />ce système{" "}
        <span style={{ color: "#FFDC5A", fontStyle: "normal" }}>dès demain.</span>
      </h2>

      <p className="reveal" style={{ fontSize: 15, color: "rgba(248,247,243,0.68)", marginBottom: 56, fontWeight: 400, maxWidth: 480, marginLeft: "auto", marginRight: "auto", lineHeight: 1.65, position: "relative" }}>
        Le radar tourne. Les prospects sont identifiés. Les séquences sont configurées. Il reste à appuyer sur le bouton.
      </p>

      {/* CTA button */}
      <div className="reveal" style={{ position: "relative", marginBottom: 64 }}>
        <a href="mailto:adamtelmat.pro@gmail.com"
          style={{ display: "inline-flex", alignItems: "center", gap: 12, background: "#FFDC5A", color: "#003035", padding: "18px 40px", fontSize: 12, letterSpacing: "0.12em", textTransform: "uppercase", textDecoration: "none", fontFamily: "inherit", fontWeight: 600, transition: "all 0.25s" }}
          onMouseEnter={(e) => { const el = e.currentTarget as HTMLAnchorElement; el.style.background = "#F8F7F3"; el.style.transform = "translateY(-2px)"; }}
          onMouseLeave={(e) => { const el = e.currentTarget as HTMLAnchorElement; el.style.background = "#FFDC5A"; el.style.transform = "translateY(0)"; }}>
          Contacter Adam Telmat →
        </a>
      </div>

      {/* Certifications strip */}
      <div className="reveal" style={{ display: "flex", justifyContent: "center", gap: 32, marginBottom: 48, position: "relative" }}>
        {["B Corp Certifié", "EcoVadis Platinum", "Groupe EPSA", "Entreprise à Mission"].map((badge) => (
          <span key={badge} style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 9, letterSpacing: "0.12em", textTransform: "uppercase", color: "rgba(248,247,243,0.2)", padding: "6px 14px", border: "1px solid rgba(255,255,255,0.07)" }}>
            {badge}
          </span>
        ))}
      </div>

      {/* Contact line */}
      <div className="reveal" style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: "rgba(248,247,243,0.50)", letterSpacing: "0.1em", position: "relative" }}>
        <a href="mailto:adamtelmat.pro@gmail.com" style={{ color: "rgba(248,247,243,0.50)", textDecoration: "none" }}>adamtelmat.pro@gmail.com</a>
        {" · "}06 29 55 91 73{" · "}
        <a href="https://github.com/adam-telmat" style={{ color: "rgba(248,247,243,0.50)", textDecoration: "none" }}>github.com/adam-telmat</a>
      </div>
    </footer>
  );
};

export default FooterCta;


