-- Everest SaaS schema (multi-tenant)
create extension if not exists pgcrypto;

create table if not exists tenants (
  tenant_id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text not null unique,
  created_at timestamptz not null default now()
);

create table if not exists roles (
  role_id uuid primary key default gen_random_uuid(),
  tenant_id uuid not null references tenants(tenant_id) on delete cascade,
  name text not null check (name in ('admin', 'cajero', 'mesero')),
  created_at timestamptz not null default now()
);

create table if not exists employees (
  employee_id uuid primary key default gen_random_uuid(),
  tenant_id uuid not null references tenants(tenant_id) on delete cascade,
  first_name text not null,
  last_name text not null,
  role_id uuid not null references roles(role_id),
  hourly_rate numeric(12,2),
  base_salary numeric(12,2),
  hire_date date not null,
  created_at timestamptz not null default now()
);

create table if not exists customers (
  customer_id uuid primary key default gen_random_uuid(),
  tenant_id uuid not null references tenants(tenant_id) on delete cascade,
  full_name text not null,
  phone text,
  email text,
  created_at timestamptz not null default now()
);

create table if not exists categories (
  category_id uuid primary key default gen_random_uuid(),
  tenant_id uuid not null references tenants(tenant_id) on delete cascade,
  name text not null,
  created_at timestamptz not null default now()
);

create table if not exists products (
  product_id uuid primary key default gen_random_uuid(),
  tenant_id uuid not null references tenants(tenant_id) on delete cascade,
  name text not null,
  category_id uuid not null references categories(category_id),
  base_price numeric(12,2) not null check (base_price >= 0),
  created_at timestamptz not null default now()
);

create table if not exists inventory_items (
  item_id uuid primary key default gen_random_uuid(),
  tenant_id uuid not null references tenants(tenant_id) on delete cascade,
  name text not null,
  stock_quantity numeric(12,3) not null default 0,
  unit_measure text not null,
  min_stock_level numeric(12,3) not null default 0,
  created_at timestamptz not null default now()
);

create table if not exists product_recipes (
  recipe_id uuid primary key default gen_random_uuid(),
  tenant_id uuid not null references tenants(tenant_id) on delete cascade,
  product_id uuid not null references products(product_id) on delete cascade,
  item_id uuid not null references inventory_items(item_id) on delete cascade,
  quantity_required numeric(12,3) not null check (quantity_required > 0),
  created_at timestamptz not null default now(),
  unique (product_id, item_id)
);

create table if not exists store_orders (
  order_id uuid primary key default gen_random_uuid(),
  tenant_id uuid not null references tenants(tenant_id) on delete cascade,
  employee_id uuid not null references employees(employee_id),
  customer_id uuid references customers(customer_id),
  total_amount numeric(12,2) not null check (total_amount >= 0),
  payment_method text not null check (payment_method in ('efectivo', 'tarjeta', 'transferencia')),
  status text not null check (status in ('completado', 'cancelado')),
  created_at timestamptz not null default now()
);

create table if not exists order_items (
  order_item_id uuid primary key default gen_random_uuid(),
  tenant_id uuid not null references tenants(tenant_id) on delete cascade,
  order_id uuid not null references store_orders(order_id) on delete cascade,
  product_id uuid not null references products(product_id),
  quantity numeric(12,3) not null check (quantity > 0),
  subtotal numeric(12,2) not null check (subtotal >= 0),
  created_at timestamptz not null default now()
);

create table if not exists attendance_log (
  log_id uuid primary key default gen_random_uuid(),
  tenant_id uuid not null references tenants(tenant_id) on delete cascade,
  employee_id uuid not null references employees(employee_id) on delete cascade,
  clock_in timestamptz not null,
  clock_out timestamptz,
  created_at timestamptz not null default now()
);

create table if not exists payroll_payments (
  payroll_id uuid primary key default gen_random_uuid(),
  tenant_id uuid not null references tenants(tenant_id) on delete cascade,
  employee_id uuid not null references employees(employee_id) on delete cascade,
  period_start date not null,
  period_end date not null,
  total_paid numeric(12,2) not null check (total_paid >= 0),
  tax_deductions numeric(12,2) not null default 0 check (tax_deductions >= 0),
  created_at timestamptz not null default now()
);

create table if not exists tax_configurations (
  tax_id uuid primary key default gen_random_uuid(),
  tenant_id uuid not null references tenants(tenant_id) on delete cascade,
  tax_name text not null,
  percentage numeric(5,2) not null check (percentage >= 0),
  created_at timestamptz not null default now()
);

create table if not exists business_expenses (
  expense_id uuid primary key default gen_random_uuid(),
  tenant_id uuid not null references tenants(tenant_id) on delete cascade,
  category text not null,
  amount numeric(12,2) not null check (amount >= 0),
  receipt_url text,
  expense_date date not null default current_date,
  created_at timestamptz not null default now()
);

-- Indexes
create index if not exists idx_employees_tenant on employees(tenant_id);
create index if not exists idx_products_tenant on products(tenant_id);
create index if not exists idx_orders_tenant on store_orders(tenant_id);
create index if not exists idx_order_items_order on order_items(order_id);
create index if not exists idx_inventory_tenant on inventory_items(tenant_id);
create index if not exists idx_attendance_employee on attendance_log(employee_id);
create index if not exists idx_payroll_employee on payroll_payments(employee_id);

-- RLS Base (activar y luego crear policies por JWT claim tenant_id)
alter table tenants enable row level security;
alter table roles enable row level security;
alter table employees enable row level security;
alter table customers enable row level security;
alter table categories enable row level security;
alter table products enable row level security;
alter table inventory_items enable row level security;
alter table product_recipes enable row level security;
alter table store_orders enable row level security;
alter table order_items enable row level security;
alter table attendance_log enable row level security;
alter table payroll_payments enable row level security;
alter table tax_configurations enable row level security;
alter table business_expenses enable row level security;
