import { NextResponse } from 'next/server';

const mockInvites: Record<string, { jobName: string; trade: string; scope: string }> = {
  'northbay-2024': {
    jobName: 'Maple Ridge Retail Buildout',
    trade: 'Concrete',
    scope: 'Slab pour + walkways. Check-in required by 4 PM.',
  },
};

export async function GET(
  _: Request,
  { params }: { params: { token: string } },
) {
  const invite = mockInvites[params.token];

  if (!invite) {
    return NextResponse.json({ error: 'Invalid token' }, { status: 404 });
  }

  return NextResponse.json(invite);
}
