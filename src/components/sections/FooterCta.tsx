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
        Le radar tourne. Les prospects sont identifiés. Les séquences sont configurées.
      </p>

      {/* Contact line */}
      <div id="contact" className="reveal" style={{ position: "relative", display: "flex", flexWrap: "wrap", justifyContent: "center", alignItems: "center", gap: "12px 32px", marginTop: 8 }}>
        <span style={{ display: "flex", alignItems: "center", gap: 8, color: "#F8F7F3", fontFamily: "'Instrument Sans', sans-serif", fontSize: 15, fontWeight: 600 }}>
          <span style={{ fontSize: 16 }}>✉</span> adamtelmat.pro@gmail.com
        </span>
        <span style={{ display: "flex", alignItems: "center", gap: 8, color: "#F8F7F3", fontFamily: "'Instrument Sans', sans-serif", fontSize: 15, fontWeight: 600 }}>
          <span style={{ fontSize: 16 }}>☎</span> 06 29 55 91 73
        </span>
        <a href="https://www.linkedin.com/in/adam-telmat/" target="_blank" rel="noopener noreferrer" style={{ display: "flex", alignItems: "center", gap: 8, color: "#F8F7F3", textDecoration: "none", fontFamily: "'Instrument Sans', sans-serif", fontSize: 15, fontWeight: 600 }}
          onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = "#FFDC5A")}
          onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = "#F8F7F3")}>
          <span style={{ fontSize: 16 }}>in</span> linkedin.com/in/adam-telmat
        </a>
      </div>
    </footer>
  );
};

export default FooterCta;


