interface IcpCardProps {
  icon: string;
  title: string;
  desc: string;
  priority: number;
  badge?: string;
}

const IcpCard = ({ icon, title, desc, priority, badge }: IcpCardProps) => (
  <div className="bg-card border border-border rounded-lg p-7 transition-all duration-200 cursor-default hover:border-green-light hover:-translate-y-0.5">
    <div className="text-[28px] mb-4">{icon}</div>
    <h3 className="font-heading text-base font-bold mb-2 text-foreground">{title}</h3>
    <p className="text-[13px] text-text-2 leading-relaxed">{desc}</p>
    <span className="inline-block mt-3 px-2.5 py-1 bg-primary/15 border border-primary/25 rounded-full text-[11px] text-primary-glow font-mono">
      {badge || `Priorité ${priority}`}
    </span>
  </div>
);

export default IcpCard;
