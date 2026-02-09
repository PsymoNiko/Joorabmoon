-- Profiles table for all users (buyers and sellers)
create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text,
  first_name text,
  last_name text,
  gender text,
  birthdate date,
  city text,
  country text,
  wallet_address text,
  role text not null default 'buyer' check (role in ('buyer', 'seller')),
  avatar_url text,
  show_email boolean default true,
  show_birthdate boolean default false,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

alter table public.profiles enable row level security;

create policy "profiles_select_public" on public.profiles for select using (true);
create policy "profiles_insert_own" on public.profiles for insert with check (auth.uid() = id);
create policy "profiles_update_own" on public.profiles for update using (auth.uid() = id);
create policy "profiles_delete_own" on public.profiles for delete using (auth.uid() = id);

-- Shops table for sellers
create table if not exists public.shops (
  id uuid primary key default gen_random_uuid(),
  owner_id uuid not null references public.profiles(id) on delete cascade,
  shop_name text not null,
  slug text unique not null,
  description text,
  location text,
  contact_number text,
  show_contact boolean default false,
  logo_url text,
  banner_url text,
  wallet_address text,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

alter table public.shops enable row level security;

create policy "shops_select_public" on public.shops for select using (true);
create policy "shops_insert_owner" on public.shops for insert with check (auth.uid() = owner_id);
create policy "shops_update_owner" on public.shops for update using (auth.uid() = owner_id);
create policy "shops_delete_owner" on public.shops for delete using (auth.uid() = owner_id);

-- Products table
create table if not exists public.products (
  id uuid primary key default gen_random_uuid(),
  shop_id uuid not null references public.shops(id) on delete cascade,
  name text not null,
  description text,
  price_ton numeric(12,4) not null default 0,
  price_usd numeric(12,2),
  category text default 'socks',
  sizes text[] default '{}',
  colors text[] default '{}',
  image_urls text[] default '{}',
  stock integer default 0,
  is_active boolean default true,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

alter table public.products enable row level security;

create policy "products_select_public" on public.products for select using (true);
create policy "products_insert_shop_owner" on public.products for insert
  with check (
    auth.uid() = (select owner_id from public.shops where id = shop_id)
  );
create policy "products_update_shop_owner" on public.products for update
  using (
    auth.uid() = (select owner_id from public.shops where id = shop_id)
  );
create policy "products_delete_shop_owner" on public.products for delete
  using (
    auth.uid() = (select owner_id from public.shops where id = shop_id)
  );

-- Orders table
create table if not exists public.orders (
  id uuid primary key default gen_random_uuid(),
  buyer_id uuid not null references public.profiles(id) on delete cascade,
  shop_id uuid not null references public.shops(id) on delete cascade,
  status text not null default 'pending' check (status in ('pending', 'paid', 'shipped', 'delivered', 'cancelled')),
  payment_method text check (payment_method in ('ton', 'tonkeeper', 'mytonwallet', 'telegram_stars')),
  payment_tx_hash text,
  total_ton numeric(12,4),
  total_usd numeric(12,2),
  shipping_address text,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

alter table public.orders enable row level security;

create policy "orders_select_own" on public.orders for select
  using (
    auth.uid() = buyer_id or
    auth.uid() = (select owner_id from public.shops where id = shop_id)
  );
create policy "orders_insert_buyer" on public.orders for insert with check (auth.uid() = buyer_id);
create policy "orders_update_involved" on public.orders for update
  using (
    auth.uid() = buyer_id or
    auth.uid() = (select owner_id from public.shops where id = shop_id)
  );

-- Order items
create table if not exists public.order_items (
  id uuid primary key default gen_random_uuid(),
  order_id uuid not null references public.orders(id) on delete cascade,
  product_id uuid not null references public.products(id) on delete cascade,
  quantity integer not null default 1,
  size text,
  color text,
  price_ton numeric(12,4) not null,
  created_at timestamptz default now()
);

alter table public.order_items enable row level security;

create policy "order_items_select_own" on public.order_items for select
  using (
    auth.uid() = (select buyer_id from public.orders where id = order_id) or
    auth.uid() = (select s.owner_id from public.shops s join public.orders o on o.shop_id = s.id where o.id = order_id)
  );
create policy "order_items_insert_buyer" on public.order_items for insert
  with check (
    auth.uid() = (select buyer_id from public.orders where id = order_id)
  );

-- Messages / Chat
create table if not exists public.conversations (
  id uuid primary key default gen_random_uuid(),
  shop_id uuid not null references public.shops(id) on delete cascade,
  buyer_id uuid not null references public.profiles(id) on delete cascade,
  created_at timestamptz default now(),
  updated_at timestamptz default now(),
  unique(shop_id, buyer_id)
);

alter table public.conversations enable row level security;

create policy "conversations_select_involved" on public.conversations for select
  using (
    auth.uid() = buyer_id or
    auth.uid() = (select owner_id from public.shops where id = shop_id)
  );
create policy "conversations_insert_buyer" on public.conversations for insert
  with check (auth.uid() = buyer_id);

create table if not exists public.messages (
  id uuid primary key default gen_random_uuid(),
  conversation_id uuid not null references public.conversations(id) on delete cascade,
  sender_id uuid not null references public.profiles(id) on delete cascade,
  content text not null,
  message_type text default 'text' check (message_type in ('text', 'payment_request', 'payment_confirmation')),
  currency text,
  amount numeric(12,4),
  read boolean default false,
  created_at timestamptz default now()
);

alter table public.messages enable row level security;

create policy "messages_select_involved" on public.messages for select
  using (
    auth.uid() = sender_id or
    auth.uid() in (
      select buyer_id from public.conversations where id = conversation_id
      union
      select s.owner_id from public.shops s join public.conversations c on c.shop_id = s.id where c.id = conversation_id
    )
  );
create policy "messages_insert_involved" on public.messages for insert
  with check (
    auth.uid() = sender_id and
    auth.uid() in (
      select buyer_id from public.conversations where id = conversation_id
      union
      select s.owner_id from public.shops s join public.conversations c on c.shop_id = s.id where c.id = conversation_id
    )
  );
create policy "messages_update_read" on public.messages for update
  using (
    auth.uid() != sender_id and
    auth.uid() in (
      select buyer_id from public.conversations where id = conversation_id
      union
      select s.owner_id from public.shops s join public.conversations c on c.shop_id = s.id where c.id = conversation_id
    )
  );

-- Auto-create profile trigger
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, email, first_name, last_name, role)
  values (
    new.id,
    new.email,
    coalesce(new.raw_user_meta_data ->> 'first_name', null),
    coalesce(new.raw_user_meta_data ->> 'last_name', null),
    coalesce(new.raw_user_meta_data ->> 'role', 'buyer')
  )
  on conflict (id) do nothing;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;

create trigger on_auth_user_created
  after insert on auth.users
  for each row
  execute function public.handle_new_user();
