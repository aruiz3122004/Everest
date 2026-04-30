import { AppShell } from "@/components/layout/AppShell";

export default function AdminPage() {
  return (
    <AppShell title="Administracion">
      <section className="card p-5">
        <p className="text-sm text-slate-600">
          Gestion central del negocio con panel de sucursales y configuraciones operativas.
        </p>
      </section>
    </AppShell>
  );
}
