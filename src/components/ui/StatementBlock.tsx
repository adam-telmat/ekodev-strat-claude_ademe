interface StatementBlockProps {
  children: React.ReactNode;
}

const StatementBlock = ({ children }: StatementBlockProps) => (
  <div className="bg-gradient-to-br from-card to-secondary border border-border border-l-4 border-l-primary-glow rounded-lg p-10 relative overflow-hidden">
    <span className="absolute -top-5 right-8 text-[200px] font-heading text-primary-glow/[0.04] leading-none pointer-events-none select-none">"</span>
    <div className="text-xl leading-[1.7] text-foreground font-light max-w-[800px] [&_strong]:text-primary-glow [&_strong]:font-semibold">
      {children}
    </div>
  </div>
);

export default StatementBlock;
