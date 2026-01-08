import { ReactNode } from 'react';

import { Card, CardContent } from '@/components/ui/card';

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
    <Card className="border-dashed border-line-strong bg-surface">
      <CardContent className="flex flex-col items-start gap-3 p-6">
        <div className="text-lg font-semibold text-ink">{title}</div>
        <p className="max-w-xl text-sm text-ink-muted">{description}</p>
        {action ? <div className="pt-2">{action}</div> : null}
      </CardContent>
    </Card>
  );
}
