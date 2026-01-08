import { ReactNode } from 'react';

export function DataRow({
  title,
  subtitle,
  status,
  meta,
  actions,
}: {
  title: string;
  subtitle?: string;
  status?: ReactNode;
  meta?: string;
  actions?: ReactNode;
}) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-line bg-surface-raised px-5 py-4">
      <div>
        <div className="text-base font-semibold text-ink">{title}</div>
        <div className="mt-1 text-sm text-ink-muted">{subtitle}</div>
      </div>
      <div className="flex flex-1 flex-wrap items-center justify-end gap-6 text-sm text-ink-muted">
        {status ? <div>{status}</div> : null}
        {meta ? <div>{meta}</div> : null}
        {actions ? <div className="flex items-center gap-2">{actions}</div> : null}
      </div>
    </div>
  );
}
