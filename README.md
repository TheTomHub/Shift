# Shift Monorepo

Shift is a construction SMB operations tool with a focused owner dashboard, subcontractor portal, and mobile companion app.

## Repo structure

```
apps/web      Next.js (TypeScript) owner dashboard + subcontractor portal
apps/mobile   Expo React Native (TypeScript)
packages/db   Supabase SQL migrations
packages/shared Shared types + zod schemas
```

## Getting started

### Web (Next.js)

```bash
cd apps/web
npm install
npm run dev
```

The dashboard is available at:
- `http://localhost:3000/`
- `http://localhost:3000/dashboard/jobs`
- `http://localhost:3000/dashboard/jobs/JOB-1024`
- `http://localhost:3000/s/northbay-2024`

### Mobile (Expo)

```bash
cd apps/mobile
npm install
npm run start
```

### Supabase (optional local)

```bash
# Install Supabase CLI if needed
supabase start
supabase db reset
```

Migrations live in `packages/db/migrations`.

## Environment variables

Web:
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `NEXT_PUBLIC_SENTRY_DSN`
- `NEXT_PUBLIC_POSTHOG_KEY`
- `NEXT_PUBLIC_BASE_URL` (optional for local route handler calls)

Mobile (Expo):
- `EXPO_PUBLIC_SENTRY_DSN`
- `EXPO_PUBLIC_POSTHOG_KEY`

## Design system

The web app uses Tailwind + shadcn/ui-style primitives with tokens in `apps/web/lib/tokens.ts` and reusable components in `apps/web/components`.
