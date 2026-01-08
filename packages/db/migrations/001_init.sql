create table if not exists jobs (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  address text not null,
  status text not null,
  progress text not null,
  crew text not null,
  due_date text not null,
  budget_used text not null,
  created_at timestamptz not null default now()
);

create table if not exists subcontractor_invites (
  id uuid primary key default gen_random_uuid(),
  token text not null unique,
  trade text not null,
  job_id uuid references jobs(id),
  scope text not null,
  created_at timestamptz not null default now()
);
