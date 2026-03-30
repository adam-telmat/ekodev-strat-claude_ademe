import { useFadeIn } from "@/hooks/useFadeIn";

interface SectionWrapperProps {
  num?: string;
  eyebrowText: string;
  title?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}

const SectionWrapper = ({ num, eyebrowText, title, children, className = "" }: SectionWrapperProps) => {
  const { ref, isVisible } = useFadeIn();

  return (
    <div ref={ref} className={className}>
      <div className="flex items-center gap-4 mb-4">
        {num && <span className="font-mono text-[11px] text-primary-glow tracking-[0.15em]">{num}</span>}
        <div className="w-8 h-px bg-primary-glow" />
        <span className="font-mono text-[11px] text-text-3 tracking-[0.15em] uppercase">{eyebrowText}</span>
      </div>
      {title && (
        <h2 className="font-heading text-[clamp(32px,4vw,52px)] font-extrabold leading-[1.1] mb-[60px] tracking-tight">
          {title}
        </h2>
      )}
      <div
        className={`transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
      >
        {children}
      </div>
    </div>
  );
};

export default SectionWrapper;
