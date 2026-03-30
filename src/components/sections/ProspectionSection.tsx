import SectionWrapper from "@/components/layout/SectionWrapper";
import EmailPreview from "@/components/ui/EmailPreview";
import PhoneScript from "@/components/ui/PhoneScript";
import ObjectionCard from "@/components/ui/ObjectionCard";
import { sequenceSteps, emailTemplate, phoneScript, objections } from "@/lib/data";

const ProspectionSection = () => (
  <section id="prospection" className="px-6 md:px-[60px] py-[100px] relative">
    <SectionWrapper num="03" eyebrowText="Obtenir le rendez-vous" title={<>Scripts &<br />séquence de prospection</>}>
      {/* Sequence */}
      <div className="flex items-center gap-4 mb-6">
        <div className="w-8 h-px bg-primary-glow" />
        <span className="font-mono text-[11px] text-text-3 tracking-[0.15em] uppercase">Séquence multicanale J0–J14</span>
      </div>

      <div className="relative pl-10 mb-10">
        <div className="absolute left-4 top-5 bottom-5 w-px bg-gradient-to-b from-primary-glow to-green-pale" />
        {sequenceSteps.map((step, i) => (
          <div key={i} className="flex gap-5 mb-6 items-start">
            <div className="flex-shrink-0 w-12 h-12 rounded-full bg-card border border-border flex items-center justify-center font-mono text-[10px] text-primary-glow relative -left-14 -mr-14">
              {step.day}
            </div>
            <div className="bg-card border border-border rounded-lg px-6 py-5 flex-1">
              <div className="font-mono text-[10px] tracking-[0.12em] uppercase text-primary-glow mb-1.5">{step.channel}</div>
              <div className="text-sm text-foreground mb-1">{step.action}</div>
              <div className="text-xs text-text-3">{step.detail}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Email template */}
      <div className="flex items-center gap-4 mb-6">
        <div className="w-8 h-px bg-primary-glow" />
        <span className="font-mono text-[11px] text-text-3 tracking-[0.15em] uppercase">Template email d'approche</span>
      </div>

      <div className="mb-8">
        <EmailPreview subject={emailTemplate.subject} body={emailTemplate.body} />
      </div>

      {/* Phone script */}
      <div className="flex items-center gap-4 mb-6">
        <div className="w-8 h-px bg-primary-glow" />
        <span className="font-mono text-[11px] text-text-3 tracking-[0.15em] uppercase">Script téléphonique — 2 minutes chrono</span>
      </div>

      <div className="mb-8">
        <PhoneScript beats={phoneScript} />
      </div>

      {/* Objections */}
      <div className="flex items-center gap-4 mt-[60px] mb-6">
        <div className="w-8 h-px bg-primary-glow" />
        <span className="font-mono text-[11px] text-text-3 tracking-[0.15em] uppercase">Objections & réponses</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {objections.map((obj, i) => (
          <div key={i} className="opacity-0 animate-fade-in" style={{ animationDelay: `${i * 100}ms` }}>
            <ObjectionCard question={obj.q} answer={obj.a} />
          </div>
        ))}
      </div>
    </SectionWrapper>
  </section>
);

export default ProspectionSection;
