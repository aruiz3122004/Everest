import { createServerSupabaseClient } from "@/lib/supabase/server";
import { env } from "@/lib/env";

export type DashboardKpi = {
  salesToday: number;
  lowStockItems: number;
  pendingPayroll: number;
};

export async function getDashboardKpis(): Promise<DashboardKpi> {
  const supabase = await createServerSupabaseClient();
  const todayStart = new Date();
  todayStart.setHours(0, 0, 0, 0);

  const { data: orders } = await supabase
    .from("store_orders")
    .select("total_amount")
    .eq("tenant_id", env.demoTenantId)
    .eq("status", "completado")
    .gte("created_at", todayStart.toISOString());

  const { count: lowStockCount } = await supabase
    .from("inventory_items")
    .select("item_id", { count: "exact", head: true })
    .eq("tenant_id", env.demoTenantId)
    .filter("stock_quantity", "lte", "min_stock_level");

  const monthStart = new Date(new Date().getFullYear(), new Date().getMonth(), 1);
  const { data: payroll } = await supabase
    .from("payroll_payments")
    .select("total_paid")
    .eq("tenant_id", env.demoTenantId)
    .gte("period_start", monthStart.toISOString().slice(0, 10));

  const salesToday = (orders ?? []).reduce((sum, row) => sum + Number(row.total_amount ?? 0), 0);
  const pendingPayroll = (payroll ?? []).reduce((sum, row) => sum + Number(row.total_paid ?? 0), 0);

  return {
    salesToday,
    lowStockItems: lowStockCount ?? 0,
    pendingPayroll
  };
}
