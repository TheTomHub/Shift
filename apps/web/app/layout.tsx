import './globals.css';

import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Link from 'next/link';

import { cn } from '@/lib/utils';

const inter = Inter({ subsets: ['latin'], display: 'swap' });

export const metadata: Metadata = {
  title: 'Shift | Construction Ops for SMBs',
  description: 'Shift keeps construction teams aligned on every job.',
};

const navItems = [
  { label: 'Jobs', href: '/dashboard/jobs' },
  { label: 'Schedule', href: '/dashboard/jobs?view=schedule' },
  { label: 'Invoices', href: '/dashboard/jobs?view=invoices' },
  { label: 'Team', href: '/dashboard/jobs?view=team' },
];

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={cn(inter.className, 'min-h-screen')}
      >
        <header className="border-b border-line bg-surface-raised">
          <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
            <Link href="/" className="text-lg font-semibold tracking-tight">
              Shift
            </Link>
            <nav className="hidden items-center gap-6 text-sm text-ink-muted md:flex">
              {navItems.map((item) => (
                <Link key={item.href} href={item.href} className="hover:text-ink">
                  {item.label}
                </Link>
              ))}
            </nav>
            <div className="flex items-center gap-3 text-sm">
              <span className="hidden text-ink-muted md:inline">ops@oakridge.co</span>
              <div className="h-9 w-9 rounded-full border border-line-strong bg-surface" />
            </div>
          </div>
        </header>
        <main className="mx-auto max-w-6xl px-6 py-10">{children}</main>
      </body>
    </html>
  );
}
