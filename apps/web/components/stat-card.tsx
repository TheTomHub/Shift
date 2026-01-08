import { ReactNode } from 'react';

export function StatCard({
  label,
  value,
  trend,
  icon,
}: {
  label: string;
  value: string;
  trend?: string;
  icon?: ReactNode;
}) {
  return (
    <div className="rounded-2xl border border-line bg-surface-raised p-5">
      <div className="flex items-center justify-between">
        <span className="text-xs font-medium uppercase tracking-wide text-ink-muted">{label}</span>
        {icon ? <div className="text-ink-muted">{icon}</div> : null}
      </div>
      <div className="mt-4 text-2xl font-semibold text-ink">{value}</div>
      {trend ? <div className="mt-2 text-xs text-ink-muted">{trend}</div> : null}
    </div>
  );
}
