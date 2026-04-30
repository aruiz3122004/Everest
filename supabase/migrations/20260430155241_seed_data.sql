do $$
declare
  v_tenant_id uuid := gen_random_uuid();
  v_role_admin uuid := gen_random_uuid();
  v_role_cashier uuid := gen_random_uuid();
  v_category_ice uuid := gen_random_uuid();
  v_employee uuid := gen_random_uuid();
  v_customer uuid := gen_random_uuid();
  v_product uuid := gen_random_uuid();
  v_item_milk uuid := gen_random_uuid();
  v_order uuid := gen_random_uuid();
begin
  insert into tenants (tenant_id, name, slug)
  values (v_tenant_id, 'Everest Centro', 'everest-centro');

  insert into roles (role_id, tenant_id, name) values
    (v_role_admin, v_tenant_id, 'admin'),
    (v_role_cashier, v_tenant_id, 'cajero');

  insert into employees (employee_id, tenant_id, first_name, last_name, role_id, hourly_rate, base_salary, hire_date)
  values (v_employee, v_tenant_id, 'Laura', 'Mendez', v_role_cashier, 18000, 2500000, current_date - interval '9 months');

  insert into customers (customer_id, tenant_id, full_name, phone, email)
  values (v_customer, v_tenant_id, 'Carlos Perez', '3000000000', 'carlos@example.com');

  insert into categories (category_id, tenant_id, name)
  values (v_category_ice, v_tenant_id, 'Helados');

  insert into products (product_id, tenant_id, name, category_id, base_price)
  values (v_product, v_tenant_id, 'Cono doble', v_category_ice, 12000);

  insert into inventory_items (item_id, tenant_id, name, stock_quantity, unit_measure, min_stock_level)
  values (v_item_milk, v_tenant_id, 'Crema de leche', 10, 'Litros', 15);

  insert into product_recipes (tenant_id, product_id, item_id, quantity_required)
  values (v_tenant_id, v_product, v_item_milk, 0.25);

  insert into store_orders (order_id, tenant_id, employee_id, customer_id, total_amount, payment_method, status, created_at)
  values (v_order, v_tenant_id, v_employee, v_customer, 24000, 'tarjeta', 'completado', now());

  insert into order_items (tenant_id, order_id, product_id, quantity, subtotal)
  values (v_tenant_id, v_order, v_product, 2, 24000);

  insert into attendance_log (tenant_id, employee_id, clock_in, clock_out)
  values (v_tenant_id, v_employee, now() - interval '8 hours', now());

  insert into payroll_payments (tenant_id, employee_id, period_start, period_end, total_paid, tax_deductions)
  values (v_tenant_id, v_employee, date_trunc('month', current_date)::date, current_date, 1200000, 120000);

  insert into tax_configurations (tenant_id, tax_name, percentage)
  values (v_tenant_id, 'IVA', 19), (v_tenant_id, 'Impoconsumo', 8);

  insert into business_expenses (tenant_id, category, amount, receipt_url, expense_date)
  values (v_tenant_id, 'Servicios publicos', 540000, 'https://example.com/recibo-1.jpg', current_date);

  raise notice 'DEMO_TENANT_ID=%', v_tenant_id;
end $$;