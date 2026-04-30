import { AppShell } from "@/components/layout/AppShell";
import { KpiCard } from "@/components/dashboard/KpiCard";
import { getDashboardKpis } from "@/lib/services/dashboard.service";

export default async function DashboardPage() {
  const kpis = await getDashboardKpis();

  return (
    <AppShell title="Panel principal">
      <div className="grid gap-4 md:grid-cols-3">
        <KpiCard title="Ventas del dia" value={`$${kpis.salesToday.toLocaleString("es-CO")}`} helper="+12% vs ayer" />
        <KpiCard title="Inventario critico" value={`${kpis.lowStockItems} items`} helper="2 requieren compra urgente" />
        <KpiCard
          title="Nomina pendiente"
          value={`$${kpis.pendingPayroll.toLocaleString("es-CO")}`}
          helper="Periodo 15 - 30 abr"
        />
      </div>
    </AppShell>
  );
}
