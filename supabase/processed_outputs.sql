create extension if not exists "pgcrypto";

create schema if not exists app;

grant usage on schema app to anon, authenticated, service_role;

create table if not exists app.processed_outputs (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  expires_at timestamptz not null,
  user_id text not null,
  file_name text not null,
  file_type text not null,
  status text not null default 'success',
  result jsonb,
  error text
);

grant select, insert, update, delete on app.processed_outputs to anon, authenticated, service_role;

create index if not exists processed_outputs_expires_at_idx
  on app.processed_outputs (expires_at);

create index if not exists processed_outputs_user_id_idx
  on app.processed_outputs (user_id);

alter table app.processed_outputs enable row level security;

create policy "processed_outputs_select_own"
  on app.processed_outputs
  for select
  using (user_id = (auth.jwt() ->> 'sub'));

create policy "processed_outputs_insert_own"
  on app.processed_outputs
  for insert
  with check (user_id = (auth.jwt() ->> 'sub'));

create policy "processed_outputs_update_own"
  on app.processed_outputs
  for update
  using (user_id = (auth.jwt() ->> 'sub'));

create policy "processed_outputs_delete_own"
  on app.processed_outputs
  for delete
  using (user_id = (auth.jwt() ->> 'sub'));
