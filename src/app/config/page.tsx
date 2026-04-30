import { AppShell } from "@/components/layout/AppShell";

export default function ConfigPage() {
  return (
    <AppShell title="Configuracion tributaria">
      <section className="card p-5">
        <p className="text-sm text-slate-600">
          Modulo preparado para `tax_configurations` y `business_expenses`.
        </p>
      </section>
    </AppShell>
  );
}
