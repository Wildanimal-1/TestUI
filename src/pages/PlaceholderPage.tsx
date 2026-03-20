interface PlaceholderPageProps {
  title: string;
  description: string;
}

export default function PlaceholderPage({ title, description }: PlaceholderPageProps) {
  return (
    <div className="border border-[var(--border-primary)] border-dashed">
      <div className="px-4 py-8 text-center">
        <h2 className="text-sm font-medium text-[var(--text-primary)] mb-1">{title}</h2>
        <p className="text-xs text-[var(--text-tertiary)]">{description}</p>
      </div>
    </div>
  );
}
