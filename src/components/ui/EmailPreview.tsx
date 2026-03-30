interface EmailPreviewProps {
  subject: string;
  body: string;
}

const EmailPreview = ({ subject, body }: EmailPreviewProps) => (
  <div className="bg-card border border-border rounded-lg overflow-hidden">
    <div className="bg-surface p-4 border-b border-border flex items-center gap-4">
      <div className="flex gap-1.5">
        <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]" />
        <span className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e]" />
        <span className="w-2.5 h-2.5 rounded-full bg-[#28c840]" />
      </div>
      <span className="font-mono text-xs text-text-2">{subject}</span>
    </div>
    <div className="p-7 text-sm leading-[1.8] text-text-2 whitespace-pre-line">{body}</div>
  </div>
);

export default EmailPreview;
