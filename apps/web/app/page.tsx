import { ArrowUpRight, HardHat, ShieldCheck, Truck } from 'lucide-react';

import { Divider } from '@/components/divider';
import { EmptyState } from '@/components/empty-state';
import { PageHeader } from '@/components/page-header';
import { Section } from '@/components/section';
import { StatCard } from '@/components/stat-card';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const stats = [
  { label: 'Active jobs', value: '18', icon: <HardHat className="h-5 w-5" /> },
  { label: 'Avg. schedule variance', value: '2.4 days', icon: <Truck className="h-5 w-5" /> },
  { label: 'Subcontractors', value: '64', icon: <ShieldCheck className="h-5 w-5" /> },
];

export default function MarketingPage() {
  return (
    <div className="space-y-12">
      <PageHeader
        title="Construction ops that feel calm and in control."
        description="Shift keeps project managers, field leads, and subs aligned with focused job views, clean status updates, and zero clutter."
        action={<Button>Request early access</Button>}
      />

      <div className="grid gap-6 md:grid-cols-3">
        {stats.map((stat) => (
          <StatCard key={stat.label} {...stat} />
        ))}
      </div>

      <Divider />

      <Section
        title="Built for jobsite velocity"
        description="Every screen is designed for quick decisions, outdoor readability, and high trust with your subs."
      >
        <div className="grid gap-6 md:grid-cols-3">
          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold text-ink">Clear status lanes</h3>
              <p className="mt-2 text-sm text-ink-muted">
                See which scopes are on track, at risk, or blocked without digging through tabs.
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold text-ink">Sub portal that stays simple</h3>
              <p className="mt-2 text-sm text-ink-muted">
                Invite subs by token, get daily check-ins, and keep logs in one feed.
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold text-ink">Decision-grade summaries</h3>
              <p className="mt-2 text-sm text-ink-muted">
                Capture risks, budget shifts, and next steps in a format ready for owners.
              </p>
            </CardContent>
          </Card>
        </div>
      </Section>

      <Section title="Launch checklist" description="Get the essentials wired in minutes.">
        <EmptyState
          title="Your first job is ready"
          description="Connect Supabase, invite a subcontractor, and publish a daily log. The Shift workspace will auto-build your core dashboards."
          action={
            <Button variant="secondary">
              View setup guide <ArrowUpRight className="ml-2 h-4 w-4" />
            </Button>
          }
        />
      </Section>
    </div>
  );
}
