import { AppShell } from "@/components/layout/AppShell";

export default function PayrollPage() {
  return (
    <AppShell title="Nomina y RRHH">
      <section className="card p-5">
        <p className="text-sm text-slate-600">
          Vista preparada para `employees`, `attendance_log` y `payroll_payments`.
        </p>
      </section>
    </AppShell>
  );
}
