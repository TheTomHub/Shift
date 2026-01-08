import { ReactNode } from 'react';

import { cn } from '@/lib/utils';

export function PageHeader({
  title,
  description,
  action,
}: {
  title: string;
  description?: string;
  action?: ReactNode;
}) {
  return (
    <div className="flex flex-wrap items-start justify-between gap-4">
      <div>
        <h1 className="text-3xl font-semibold tracking-tight text-ink">{title}</h1>
        {description ? (
          <p className="mt-2 max-w-2xl text-sm text-ink-muted">{description}</p>
        ) : null}
      </div>
      {action ? <div className="flex items-center gap-2">{action}</div> : null}
    </div>
  );
}

export function HeaderBadge({ label, tone = 'default' }: { label: string; tone?: 'default' | 'alert' }) {
  return (
    <span
      className={cn(
        'rounded-full border px-3 py-1 text-xs font-medium',
        tone === 'alert'
          ? 'border-status-warning/40 bg-status-warning/10 text-status-warning'
          : 'border-line-strong bg-surface text-ink-muted',
      )}
    >
      {label}
    </span>
  );
}
