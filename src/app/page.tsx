import Link from "next/link";
import { BrandMark } from "@/components/branding/BrandMark";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-slate-50">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-6 py-4">
          <BrandMark />
          <Link
            href="/login"
            className="rounded-xl bg-slate-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-slate-700"
          >
            Ingresar
          </Link>
        </div>
      </header>
      <main className="mx-auto grid w-full max-w-7xl gap-8 px-6 py-16 md:grid-cols-2">
        <section>
          <p className="mb-2 text-sm font-medium text-brand-600">SaaS para heladerias y postres</p>
          <h1 className="text-4xl font-semibold tracking-tight">Opera tus sucursales en tiempo real</h1>
          <p className="mt-4 max-w-lg text-slate-600">
            Gestiona inventario, ventas, nomina y gastos tributarios con flujos rapidos y paneles claros.
          </p>
        </section>
        <section className="card p-6">
          <p className="text-sm text-slate-600">Modulos habilitados</p>
          <ul className="mt-3 space-y-2 text-sm">
            <li>Ventas y clientes</li>
            <li>Inventario y recetas</li>
            <li>RRHH y nomina</li>
            <li>Impuestos y gastos</li>
          </ul>
        </section>
      </main>
    </div>
  );
}
