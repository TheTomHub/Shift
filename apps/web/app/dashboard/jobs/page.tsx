import Link from 'next/link';
import { Filter, Plus, Search } from 'lucide-react';

import { DataRow } from '@/components/data-row';
import { PageHeader } from '@/components/page-header';
import { Section } from '@/components/section';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { jobs } from '@/data/jobs';

const statusTone = (status: string) => {
  if (status === 'In Progress') return 'success';
  if (status === 'Delayed') return 'warning';
  return 'neutral';
};

export default function JobsPage() {
  return (
    <div className="space-y-8">
      <PageHeader
        title="Jobs"
        description="Track live scopes across all active construction projects."
        action={
          <div className="flex items-center gap-3">
            <Button variant="secondary">
              <Filter className="mr-2 h-4 w-4" /> Filters
            </Button>
            <Button>
              <Plus className="mr-2 h-4 w-4" /> New job
            </Button>
          </div>
        }
      />

      <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-line bg-surface-raised px-4 py-3 text-sm text-ink-muted">
        <div className="flex items-center gap-2">
          <Search className="h-4 w-4" />
          <span>Search job name, address, or crew</span>
        </div>
        <div>Updated 2 minutes ago</div>
      </div>

      <Section title="Active jobs" description="High-signal snapshots with budget, progress, and crew status.">
        <div className="space-y-4">
          {jobs.map((job) => (
            <Link key={job.id} href={`/dashboard/jobs/${job.id}`} className="block">
              <DataRow
                title={job.name}
                subtitle={`${job.address} · ${job.crew}`}
                status={<Badge tone={statusTone(job.status)}>{job.status}</Badge>}
                meta={`${job.progress} · Due ${job.dueDate}`}
                actions={<span className="text-xs text-ink-muted">{job.budgetUsed}</span>}
              />
            </Link>
          ))}
        </div>
      </Section>
    </div>
  );
}
