-- Shift v1 RLS policies + trigger helpers

create or replace function public.is_company_member(target_company_id uuid)
returns boolean
language sql
stable
as $$
  select exists (
    select 1
    from profiles
    where profiles.id = auth.uid()
      and profiles.company_id = target_company_id
  );
$$;

create or replace function public.is_manager(target_company_id uuid)
returns boolean
language sql
stable
as $$
  select exists (
    select 1
    from profiles
    where profiles.id = auth.uid()
      and profiles.company_id = target_company_id
      and profiles.role in ('owner', 'foreman')
  );
$$;

alter table profiles enable row level security;
alter table jobs enable row level security;
alter table day_logs enable row level security;
alter table tasks enable row level security;
alter table time_entries enable row level security;
alter table receipt_uploads enable row level security;
alter table cost_events enable row level security;
alter table job_financials enable row level security;
alter table subcontractors enable row level security;
alter table subcontractor_invites enable row level security;

-- Profiles: members can read/update their company, inserts via backend service only.
create policy "profiles_select_company"
  on profiles for select
  using (is_company_member(company_id));

create policy "profiles_update_company"
  on profiles for update
  using (is_company_member(company_id))
  with check (is_company_member(company_id));

-- Jobs: company read, owners/foremen can write.
create policy "jobs_select_company"
  on jobs for select
  using (is_company_member(company_id));

create policy "jobs_insert_manager"
  on jobs for insert
  with check (is_manager(company_id));

create policy "jobs_update_manager"
  on jobs for update
  using (is_manager(company_id))
  with check (is_manager(company_id));

create policy "jobs_delete_manager"
  on jobs for delete
  using (is_manager(company_id));

-- Day logs: company read, owners/foremen can write.
create policy "day_logs_select_company"
  on day_logs for select
  using (is_company_member(company_id));

create policy "day_logs_insert_manager"
  on day_logs for insert
  with check (is_manager(company_id));

create policy "day_logs_update_manager"
  on day_logs for update
  using (is_manager(company_id))
  with check (is_manager(company_id));

create policy "day_logs_delete_manager"
  on day_logs for delete
  using (is_manager(company_id));

-- Tasks: company read/write for now (adjustable).
create policy "tasks_select_company"
  on tasks for select
  using (is_company_member(company_id));

create policy "tasks_write_company"
  on tasks for insert
  with check (is_company_member(company_id));

create policy "tasks_update_company"
  on tasks for update
  using (is_company_member(company_id))
  with check (is_company_member(company_id));

create policy "tasks_delete_company"
  on tasks for delete
  using (is_company_member(company_id));

-- Time entries: company read/write.
create policy "time_entries_select_company"
  on time_entries for select
  using (is_company_member(company_id));

create policy "time_entries_write_company"
  on time_entries for insert
  with check (is_company_member(company_id));

create policy "time_entries_update_company"
  on time_entries for update
  using (is_company_member(company_id))
  with check (is_company_member(company_id));

create policy "time_entries_delete_company"
  on time_entries for delete
  using (is_company_member(company_id));

-- Receipt uploads: company read/write.
create policy "receipt_uploads_select_company"
  on receipt_uploads for select
  using (is_company_member(company_id));

create policy "receipt_uploads_write_company"
  on receipt_uploads for insert
  with check (is_company_member(company_id));

create policy "receipt_uploads_update_company"
  on receipt_uploads for update
  using (is_company_member(company_id))
  with check (is_company_member(company_id));

create policy "receipt_uploads_delete_company"
  on receipt_uploads for delete
  using (is_company_member(company_id));

-- Cost events + job financials: company read/write.
create policy "cost_events_select_company"
  on cost_events for select
  using (is_company_member(company_id));

create policy "cost_events_write_company"
  on cost_events for insert
  with check (is_company_member(company_id));

create policy "cost_events_update_company"
  on cost_events for update
  using (is_company_member(company_id))
  with check (is_company_member(company_id));

create policy "cost_events_delete_company"
  on cost_events for delete
  using (is_company_member(company_id));

create policy "job_financials_select_company"
  on job_financials for select
  using (is_company_member(company_id));

create policy "job_financials_write_company"
  on job_financials for insert
  with check (is_company_member(company_id));

create policy "job_financials_update_company"
  on job_financials for update
  using (is_company_member(company_id))
  with check (is_company_member(company_id));

-- Subcontractors + invites: company read/write.
create policy "subcontractors_select_company"
  on subcontractors for select
  using (is_company_member(company_id));

create policy "subcontractors_write_company"
  on subcontractors for insert
  with check (is_company_member(company_id));

create policy "subcontractors_update_company"
  on subcontractors for update
  using (is_company_member(company_id))
  with check (is_company_member(company_id));

create policy "subcontractors_delete_company"
  on subcontractors for delete
  using (is_company_member(company_id));

create policy "subcontractor_invites_select_company"
  on subcontractor_invites for select
  using (is_company_member(company_id));

create policy "subcontractor_invites_write_company"
  on subcontractor_invites for insert
  with check (is_company_member(company_id));

create policy "subcontractor_invites_update_company"
  on subcontractor_invites for update
  using (is_company_member(company_id))
  with check (is_company_member(company_id));

create policy "subcontractor_invites_delete_company"
  on subcontractor_invites for delete
  using (is_company_member(company_id));

-- Time entry trigger: when clock_out is set, compute duration_minutes and insert labor cost event.
create or replace function public.handle_time_entry_clock_out()
returns trigger
language plpgsql
as $$
declare
  effective_rate numeric(10, 2);
  duration_minutes integer;
  labor_cost numeric(12, 2);
begin
  if new.clock_out is null then
    return new;
  end if;

  duration_minutes := greatest(0, floor(extract(epoch from (new.clock_out - new.clock_in)) / 60));
  new.duration_minutes := duration_minutes;

  select coalesce(profiles.hourly_rate_chf, companies.default_hourly_rate_chf)
    into effective_rate
  from profiles
  join companies on companies.id = profiles.company_id
  where profiles.id = new.profile_id;

  labor_cost := round((duration_minutes / 60.0) * effective_rate, 2);

  insert into cost_events (
    company_id,
    job_id,
    event_date,
    category,
    amount_chf,
    source,
    reference_id
  ) values (
    new.company_id,
    new.job_id,
    coalesce(new.clock_out::date, current_date),
    'labor',
    labor_cost,
    'time_entry',
    new.id
  );

  return new;
end;
$$;

create trigger time_entries_clock_out_trigger
before update of clock_out on time_entries
for each row
when (old.clock_out is null and new.clock_out is not null)
execute function public.handle_time_entry_clock_out();

-- Cost event trigger: on insert, recompute job_financials rollup for that job.
create or replace function public.recompute_job_financials()
returns trigger
language plpgsql
as $$
declare
  labor_total numeric(12, 2);
  material_total numeric(12, 2);
  equipment_total numeric(12, 2);
  other_total numeric(12, 2);
  total_cost numeric(12, 2);
begin
  select
    coalesce(sum(case when category = 'labor' then amount_chf end), 0),
    coalesce(sum(case when category = 'materials' then amount_chf end), 0),
    coalesce(sum(case when category = 'equipment' then amount_chf end), 0),
    coalesce(sum(case when category = 'other' then amount_chf end), 0)
  into labor_total, material_total, equipment_total, other_total
  from cost_events
  where job_id = new.job_id;

  total_cost := labor_total + material_total + equipment_total + other_total;

  insert into job_financials (
    job_id,
    company_id,
    labor_cost_chf,
    material_cost_chf,
    equipment_cost_chf,
    other_cost_chf,
    total_cost_chf,
    updated_at
  ) values (
    new.job_id,
    new.company_id,
    labor_total,
    material_total,
    equipment_total,
    other_total,
    total_cost,
    now()
  )
  on conflict (job_id)
  do update set
    labor_cost_chf = excluded.labor_cost_chf,
    material_cost_chf = excluded.material_cost_chf,
    equipment_cost_chf = excluded.equipment_cost_chf,
    other_cost_chf = excluded.other_cost_chf,
    total_cost_chf = excluded.total_cost_chf,
    updated_at = excluded.updated_at;

  return new;
end;
$$;

create trigger cost_events_insert_financials_trigger
after insert on cost_events
for each row
execute function public.recompute_job_financials();
