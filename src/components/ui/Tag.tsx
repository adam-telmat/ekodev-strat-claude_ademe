interface TagProps {
  children: React.ReactNode;
}

const Tag = ({ children }: TagProps) => (
  <div className="inline-flex items-center gap-2 bg-primary/15 border border-primary/30 text-primary-glow font-mono text-[11px] tracking-[0.15em] uppercase px-3.5 py-1.5 rounded-full w-fit">
    <span className="w-1.5 h-1.5 bg-primary-glow rounded-full animate-pulse-dot" />
    {children}
  </div>
);

export default Tag;
