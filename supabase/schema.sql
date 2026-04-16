-- ============================================================
-- KG-VISA Database Schema
-- Run this in your Supabase SQL Editor (Dashboard > SQL Editor)
-- ============================================================

-- 1. Applications table
create table if not exists public.applications (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade not null,
  ref_id text unique not null default ('KG-' || to_char(now(), 'YYYY') || '-' || upper(substr(md5(random()::text), 1, 5))),
  status text not null default 'draft' check (status in ('draft', 'submitted', 'review', 'approved', 'issued', 'rejected')),

  -- Personal info
  first_name text not null default '',
  last_name text not null default '',
  date_of_birth text not null default '',
  gender text not null default '',
  nationality text not null default '',
  email text not null default '',
  phone text not null default '',

  -- Passport info
  passport_number text not null default '',
  passport_issue_date text not null default '',
  passport_expiry_date text not null default '',
  passport_issuing_country text not null default '',

  -- Travel info
  entry_date text not null default '',
  exit_date text not null default '',
  purpose text not null default '',
  accommodation text not null default '',
  visa_type text not null default '',

  -- Document URLs (Supabase Storage)
  photo_url text,
  passport_scan_url text,
  invitation_url text,

  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- 2. Transfers table
create table if not exists public.transfers (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade not null,
  tracking_id text unique not null default ('TR-' || upper(substr(md5(random()::text), 1, 8))),
  visa_number text not null,
  old_passport text not null,
  new_passport text not null,
  new_passport_expiry text not null,
  email text not null,
  reason text not null,
  status text not null default 'pending' check (status in ('pending', 'processing', 'completed', 'rejected')),
  created_at timestamptz not null default now()
);

-- 3. Row Level Security (RLS) — users can only access their own data
alter table public.applications enable row level security;
alter table public.transfers enable row level security;

-- Applications: users see only their own
create policy "Users can view own applications"
  on public.applications for select
  using (auth.uid() = user_id);

create policy "Users can insert own applications"
  on public.applications for insert
  with check (auth.uid() = user_id);

create policy "Users can update own applications"
  on public.applications for update
  using (auth.uid() = user_id);

-- Transfers: users see only their own
create policy "Users can view own transfers"
  on public.transfers for select
  using (auth.uid() = user_id);

create policy "Users can insert own transfers"
  on public.transfers for insert
  with check (auth.uid() = user_id);

-- 4. Auto-update updated_at on applications
create or replace function public.handle_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create trigger on_application_update
  before update on public.applications
  for each row execute function public.handle_updated_at();

-- 5. Storage bucket for documents
insert into storage.buckets (id, name, public)
values ('documents', 'documents', false)
on conflict (id) do nothing;

-- Storage policies: users can upload to their own folder
create policy "Users can upload own documents"
  on storage.objects for insert
  with check (
    bucket_id = 'documents'
    and (storage.foldername(name))[1] = auth.uid()::text
  );

create policy "Users can view own documents"
  on storage.objects for select
  using (
    bucket_id = 'documents'
    and (storage.foldername(name))[1] = auth.uid()::text
  );

-- 6. Index for fast lookups
create index if not exists idx_applications_user_id on public.applications(user_id);
create index if not exists idx_applications_ref_id on public.applications(ref_id);
create index if not exists idx_applications_email on public.applications(email);
create index if not exists idx_transfers_user_id on public.transfers(user_id);
create index if not exists idx_transfers_tracking_id on public.transfers(tracking_id);
