import { CalendarDays, ClipboardList, MapPin, Users } from 'lucide-react';

import { Divider } from '@/components/divider';
import { PageHeader } from '@/components/page-header';
import { Section } from '@/components/section';
import { StatCard } from '@/components/stat-card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { jobActivity, jobOverview } from '@/data/jobs';

export default function JobDetailPage() {
  return (
    <div className="space-y-10">
      <PageHeader
        title={jobOverview.name}
        description={jobOverview.address}
        action={
          <div className="flex items-center gap-2">
            <Badge tone="success">{jobOverview.status}</Badge>
            <Button variant="secondary">Share update</Button>
          </div>
        }
      />

      <div className="grid gap-6 md:grid-cols-3">
        <StatCard label="Progress" value={jobOverview.progress} icon={<ClipboardList className="h-5 w-5" />} />
        <StatCard label="Timeline" value={jobOverview.timeline} icon={<CalendarDays className="h-5 w-5" />} />
        <StatCard label="Team" value={`${jobOverview.pm} · ${jobOverview.superintendent}`} icon={<Users className="h-5 w-5" />} />
      </div>

      <Divider />

      <Section title="Current focus" description="What the team is working on today.">
        <Card>
          <CardContent className="p-6 text-sm text-ink-muted">
            <p className="text-base font-semibold text-ink">{jobOverview.currentPhase}</p>
            <p className="mt-3">Risk: {jobOverview.risks}</p>
          </CardContent>
        </Card>
      </Section>

      <Section title="Latest activity" description="Live signal from jobsite updates.">
        <div className="space-y-4">
          {jobActivity.map((activity) => (
            <Card key={activity.title}>
              <CardContent className="p-5">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <div className="text-base font-semibold text-ink">{activity.title}</div>
                    <p className="mt-2 text-sm text-ink-muted">{activity.detail}</p>
                  </div>
                  <span className="flex items-center gap-2 text-xs text-ink-muted">
                    <MapPin className="h-4 w-4" /> {activity.time}
                  </span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </Section>
    </div>
  );
}
