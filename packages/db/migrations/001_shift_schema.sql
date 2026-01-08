-- Shift v1 schema
-- Core multi-tenant tables with company_id on all internal records.

create table if not exists companies (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  default_hourly_rate_chf numeric(10, 2) not null default 85.00,
  created_at timestamptz not null default now()
);

create table if not exists profiles (
  id uuid primary key,
  company_id uuid not null references companies(id) on delete cascade,
  full_name text not null,
  role text not null check (role in ('owner', 'foreman', 'pm', 'staff')),
  hourly_rate_chf numeric(10, 2),
  created_at timestamptz not null default now()
);

create index if not exists profiles_company_id_idx on profiles(company_id);

create table if not exists jobs (
  id uuid primary key default gen_random_uuid(),
  company_id uuid not null references companies(id) on delete cascade,
  name text not null,
  address text,
  status text not null default 'In Progress',
  start_date date,
  end_date date,
  created_by uuid references profiles(id),
  created_at timestamptz not null default now()
);

create index if not exists jobs_company_id_idx on jobs(company_id);
create index if not exists jobs_company_status_idx on jobs(company_id, status);
create index if not exists jobs_company_end_date_idx on jobs(company_id, end_date);

create table if not exists day_logs (
  id uuid primary key default gen_random_uuid(),
  company_id uuid not null references companies(id) on delete cascade,
  job_id uuid not null references jobs(id) on delete cascade,
  log_date date not null,
  summary text,
  weather text,
  created_by uuid references profiles(id),
  created_at timestamptz not null default now()
);

create index if not exists day_logs_company_id_idx on day_logs(company_id);
create index if not exists day_logs_job_id_idx on day_logs(job_id);
create index if not exists day_logs_job_date_idx on day_logs(job_id, log_date);

create table if not exists tasks (
  id uuid primary key default gen_random_uuid(),
  company_id uuid not null references companies(id) on delete cascade,
  job_id uuid references jobs(id) on delete cascade,
  title text not null,
  status text not null default 'open',
  due_date date,
  assigned_to uuid references profiles(id),
  created_by uuid references profiles(id),
  created_at timestamptz not null default now()
);

create index if not exists tasks_company_id_idx on tasks(company_id);
create index if not exists tasks_job_id_idx on tasks(job_id);
create index if not exists tasks_job_due_date_idx on tasks(job_id, due_date);

create table if not exists time_entries (
  id uuid primary key default gen_random_uuid(),
  company_id uuid not null references companies(id) on delete cascade,
  job_id uuid not null references jobs(id) on delete cascade,
  profile_id uuid not null references profiles(id) on delete cascade,
  day_log_id uuid references day_logs(id) on delete set null,
  clock_in timestamptz not null,
  clock_out timestamptz,
  duration_minutes integer,
  note text,
  created_at timestamptz not null default now()
);

create index if not exists time_entries_company_id_idx on time_entries(company_id);
create index if not exists time_entries_job_id_idx on time_entries(job_id);
create index if not exists time_entries_profile_id_idx on time_entries(profile_id);
create index if not exists time_entries_clock_in_idx on time_entries(clock_in);

create table if not exists subcontractors (
  id uuid primary key default gen_random_uuid(),
  company_id uuid not null references companies(id) on delete cascade,
  name text not null,
  trade text,
  phone text,
  email text,
  created_at timestamptz not null default now()
);

create index if not exists subcontractors_company_id_idx on subcontractors(company_id);

create table if not exists subcontractor_invites (
  id uuid primary key default gen_random_uuid(),
  company_id uuid not null references companies(id) on delete cascade,
  job_id uuid not null references jobs(id) on delete cascade,
  subcontractor_id uuid references subcontractors(id) on delete set null,
  token text not null unique,
  trade text not null,
  scope text not null,
  expires_at timestamptz,
  created_by uuid references profiles(id),
  created_at timestamptz not null default now()
);

create index if not exists subcontractor_invites_company_id_idx on subcontractor_invites(company_id);
create index if not exists subcontractor_invites_job_id_idx on subcontractor_invites(job_id);

create table if not exists receipt_uploads (
  id uuid primary key default gen_random_uuid(),
  company_id uuid not null references companies(id) on delete cascade,
  job_id uuid references jobs(id) on delete cascade,
  uploaded_by uuid references profiles(id),
  vendor text,
  amount_chf numeric(12, 2),
  receipt_date date,
  storage_path text not null,
  created_at timestamptz not null default now()
);

create index if not exists receipt_uploads_company_id_idx on receipt_uploads(company_id);
create index if not exists receipt_uploads_job_id_idx on receipt_uploads(job_id);
create index if not exists receipt_uploads_job_date_idx on receipt_uploads(job_id, receipt_date);

create table if not exists cost_events (
  id uuid primary key default gen_random_uuid(),
  company_id uuid not null references companies(id) on delete cascade,
  job_id uuid not null references jobs(id) on delete cascade,
  event_date date not null,
  category text not null check (category in ('labor', 'materials', 'equipment', 'other')),
  amount_chf numeric(12, 2) not null,
  source text not null,
  reference_id uuid,
  created_at timestamptz not null default now()
);

create index if not exists cost_events_company_id_idx on cost_events(company_id);
create index if not exists cost_events_job_id_idx on cost_events(job_id);
create index if not exists cost_events_job_date_idx on cost_events(job_id, event_date);

create table if not exists job_financials (
  job_id uuid primary key references jobs(id) on delete cascade,
  company_id uuid not null references companies(id) on delete cascade,
  labor_cost_chf numeric(12, 2) not null default 0,
  material_cost_chf numeric(12, 2) not null default 0,
  equipment_cost_chf numeric(12, 2) not null default 0,
  other_cost_chf numeric(12, 2) not null default 0,
  total_cost_chf numeric(12, 2) not null default 0,
  updated_at timestamptz not null default now()
);

create index if not exists job_financials_company_id_idx on job_financials(company_id);
