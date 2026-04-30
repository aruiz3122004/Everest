import { AppShell } from "@/components/layout/AppShell";

export default function InventoryPage() {
  return (
    <AppShell title="Inventario y productos">
      <section className="card p-5">
        <p className="text-sm text-slate-600">
          Vista preparada para `products`, `inventory_items` y `product_recipes`.
        </p>
      </section>
    </AppShell>
  );
}
