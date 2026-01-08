import { CheckCircle2, ClipboardCheck } from 'lucide-react';

import { EmptyState } from '@/components/empty-state';
import { PageHeader } from '@/components/page-header';
import { Section } from '@/components/section';
import { Button } from '@/components/ui/button';

interface PageProps {
  params: { token: string };
}

async function getInvite(token: string) {
  const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL ?? ''}/api/invite/${token}`, {
    cache: 'no-store',
  });
  if (!response.ok) {
    return null;
  }
  return response.json();
}

export default async function SubPortalPage({ params }: PageProps) {
  const invite = await getInvite(params.token);

  return (
    <div className="space-y-10">
      <PageHeader
        title="Subcontractor check-in"
        description="Log today’s work in under a minute."
        action={<Button variant="secondary">Need help?</Button>}
      />

      <Section title="Today’s assignment" description="The details for your active scope.">
        {invite ? (
          <div className="rounded-2xl border border-line bg-surface-raised p-6">
            <div className="flex items-center gap-3 text-sm text-ink-muted">
              <CheckCircle2 className="h-5 w-5 text-status-success" />
              Invite verified for {invite.trade}
            </div>
            <div className="mt-4 text-xl font-semibold text-ink">{invite.jobName}</div>
            <p className="mt-2 text-sm text-ink-muted">{invite.scope}</p>
          </div>
        ) : (
          <EmptyState
            title="Invite link needs review"
            description="Ask your project manager to resend the link or verify the token in Shift."
          />
        )}
      </Section>

      <Section title="Submit today’s log" description="Quick status keeps everyone aligned.">
        <div className="rounded-2xl border border-line bg-surface-raised p-6">
          <div className="flex items-center gap-3 text-sm text-ink-muted">
            <ClipboardCheck className="h-5 w-5" />
            PWA-ready form placeholder (runs through server route handlers).
          </div>
          <Button className="mt-4" disabled>
            Submit log (coming soon)
          </Button>
        </div>
      </Section>
    </div>
  );
}
