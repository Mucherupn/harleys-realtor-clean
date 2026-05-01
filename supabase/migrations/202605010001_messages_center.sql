create table if not exists public.messages (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default timezone('utc', now()),
  message_type text not null,
  subject text not null,
  full_name text not null,
  email text not null,
  phone text not null,
  property_slug text,
  property_title text,
  source_page text,
  message_body text not null,
  status text not null default 'new',
  is_read boolean not null default false,
  archived boolean not null default false,
  metadata jsonb
);

alter table public.messages
  drop constraint if exists messages_message_type_check;
alter table public.messages
  add constraint messages_message_type_check
  check (message_type in ('property_enquiry', 'request_quote', 'contact_message', 'general_enquiry'));

alter table public.messages
  drop constraint if exists messages_status_check;
alter table public.messages
  add constraint messages_status_check
  check (status in ('new', 'in_progress', 'closed'));

create index if not exists messages_created_at_idx on public.messages (created_at desc);
create index if not exists messages_status_idx on public.messages (status);
create index if not exists messages_message_type_idx on public.messages (message_type);
create index if not exists messages_is_read_idx on public.messages (is_read);

alter table public.messages enable row level security;

create policy "public can insert messages"
on public.messages
for insert
to public
with check (true);

create policy "admin can select messages"
on public.messages
for select
to authenticated
using ((auth.jwt() ->> 'role') = 'admin');

create policy "admin can update messages"
on public.messages
for update
to authenticated
using ((auth.jwt() ->> 'role') = 'admin')
with check ((auth.jwt() ->> 'role') = 'admin');

create policy "admin can delete messages"
on public.messages
for delete
to authenticated
using ((auth.jwt() ->> 'role') = 'admin');
