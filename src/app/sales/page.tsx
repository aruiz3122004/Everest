import { AppShell } from "@/components/layout/AppShell";

export default function SalesPage() {
  return (
    <AppShell title="Ventas y clientes">
      <section className="card p-5">
        <p className="text-sm text-slate-600">Modulo listo para conectar con `store_orders` y `order_items`.</p>
      </section>
    </AppShell>
  );
}
