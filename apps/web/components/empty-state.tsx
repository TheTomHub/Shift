import { ReactNode } from 'react';

export function EmptyState({
  title,
  description,
  action,
}: {
  title: string;
  description: string;
  action?: ReactNode;
}) {
  return (
    <div className="flex flex-col items-start gap-3 rounded-2xl border border-dashed border-line-strong bg-surface px-6 py-8">
      <div className="text-lg font-semibold text-ink">{title}</div>
      <p className="max-w-xl text-sm text-ink-muted">{description}</p>
      {action ? <div className="pt-2">{action}</div> : null}
    </div>
  );
}
