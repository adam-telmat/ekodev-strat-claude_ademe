interface ObjectionCardProps {
  question: string;
  answer: string;
}

const ObjectionCard = ({ question, answer }: ObjectionCardProps) => (
  <div className="rounded-lg overflow-hidden">
    <div className="bg-destructive/10 border border-destructive/20 border-b-0 px-5 py-4 text-[13px] text-[#ff9090] flex gap-2.5 items-start">
      <span className="text-destructive font-bold flex-shrink-0">✗</span>
      {question}
    </div>
    <div className="bg-primary/[0.08] border border-primary/15 px-5 py-4 text-[13px] text-text-2 leading-relaxed flex gap-2.5 items-start">
      <span className="text-primary-glow font-bold flex-shrink-0 mt-px">✓</span>
      {answer}
    </div>
  </div>
);

export default ObjectionCard;
