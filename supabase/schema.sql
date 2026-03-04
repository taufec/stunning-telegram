-- Enable UUID extension
create extension if not exists "pgcrypto";

-- Create profiles table
create table public.profiles (
  id uuid references auth.users on delete cascade primary key,
  full_name text,
  email text,
  role text default 'user',
  created_at timestamptz default now()
);

-- Enable RLS on profiles
alter table public.profiles enable row level security;

-- Profiles RLS policies
create policy "Public profiles are viewable by everyone."
  on profiles for select
  using ( true );

create policy "Users can insert their own profile."
  on profiles for insert
  with check ( auth.uid() = id );

create policy "Users can update own profile."
  on profiles for update
  using ( auth.uid() = id );

-- Create listings table
create table public.listings (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz default now(),
  name text not null,
  tagline text not null,
  description text,
  category text not null,
  district text not null,
  website_url text,
  instagram_url text,
  tiktok_url text,
  linkedin_url text,
  logo_url text,
  is_featured boolean default false,
  is_sponsored boolean default false,
  status text default 'pending',
  submitted_by uuid references public.profiles(id) on delete cascade
);

-- Enable RLS on listings
alter table public.listings enable row level security;

-- Listings RLS policies
create policy "Approved listings are viewable by everyone."
  on listings for select
  using ( status = 'approved' );

create policy "Users can view their own listings."
  on listings for select
  using ( auth.uid() = submitted_by );

create policy "Authenticated users can insert listings."
  on listings for insert
  with check ( auth.role() = 'authenticated' );

create policy "Users can update their own listings."
  on listings for update
  using ( auth.uid() = submitted_by );

create policy "Admins can do everything on listings."
  on listings for all
  using ( 
    exists (
      select 1 from public.profiles
      where profiles.id = auth.uid() and profiles.role = 'admin'
    )
  );

-- Create storage bucket for logos
insert into storage.buckets (id, name, public) values ('listing-logos', 'listing-logos', true);

-- Storage RLS policies
create policy "Logos are publicly accessible."
  on storage.objects for select
  using ( bucket_id = 'listing-logos' );

create policy "Authenticated users can upload logos."
  on storage.objects for insert
  with check ( bucket_id = 'listing-logos' and auth.role() = 'authenticated' );

create policy "Users can update their own logos."
  on storage.objects for update
  using ( bucket_id = 'listing-logos' and auth.uid() = owner );

create policy "Users can delete their own logos."
  on storage.objects for delete
  using ( bucket_id = 'listing-logos' and auth.uid() = owner );
