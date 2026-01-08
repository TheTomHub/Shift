import { cn } from '@/lib/utils';

export function Badge({
  children,
  tone = 'neutral',
}: {
  children: React.ReactNode;
  tone?: 'neutral' | 'success' | 'warning' | 'danger';
}) {
  const tones = {
    neutral: 'border-line-strong bg-surface text-ink-muted',
    success: 'border-status-success/40 bg-status-success/10 text-status-success',
    warning: 'border-status-warning/40 bg-status-warning/10 text-status-warning',
    danger: 'border-status-danger/40 bg-status-danger/10 text-status-danger',
  };

  return (
    <span className={cn('rounded-full border px-3 py-1 text-xs font-medium', tones[tone])}>
      {children}
    </span>
  );
}
