interface PersonaCardProps {
  role: string;
  why: string;
  angle: string;
  priority: number;
}

const borderColors: Record<number, string> = {
  1: "border-t-primary-glow",
  2: "border-t-gold",
  3: "border-t-text-3",
};

const PersonaCard = ({ role, why, angle, priority }: PersonaCardProps) => (
  <div className={`bg-card border border-border rounded-lg p-6 relative overflow-hidden border-t-2 ${borderColors[priority] || ""}`}>
    <span className="absolute top-4 right-4 font-mono text-[10px] text-text-3 tracking-[0.1em]">P{priority}</span>
    <div className="font-heading text-[15px] font-bold mb-2 text-foreground">{role}</div>
    <div className="text-[13px] text-text-2 leading-relaxed mb-3">{why}</div>
    <div className="text-xs text-primary-glow font-mono">→ Angle : {angle}</div>
  </div>
);

export default PersonaCard;
