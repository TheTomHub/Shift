import { ReactNode } from 'react';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

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
    <Card>
      <CardHeader className="flex-row items-center justify-between">
        <CardTitle className="text-xs font-medium uppercase tracking-wide text-ink-muted">
          {label}
        </CardTitle>
        {icon ? <div className="text-ink-muted">{icon}</div> : null}
      </CardHeader>
      <CardContent className="pt-0">
        <div className="text-2xl font-semibold text-ink">{value}</div>
        {trend ? <div className="mt-2 text-xs text-ink-muted">{trend}</div> : null}
      </CardContent>
    </Card>
  );
}
