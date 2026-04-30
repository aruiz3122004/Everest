import Link from "next/link";
import { BrandMark } from "@/components/branding/BrandMark";

const links = [
  { href: "/dashboard", label: "Dashboard" },
  { href: "/sales", label: "Ventas" },
  { href: "/inventory", label: "Inventario" },
  { href: "/payroll", label: "Nomina" },
  { href: "/admin", label: "Admin" },
  { href: "/config", label: "Config" }
];

export function AppShell({
  title,
  children
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-slate-50">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-6 py-4">
          <BrandMark />
          <nav className="hidden items-center gap-5 md:flex">
            {links.map((link) => (
              <Link key={link.href} href={link.href} className="text-sm text-slate-600 hover:text-slate-900">
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      </header>
      <main className="mx-auto w-full max-w-7xl px-6 py-8">
        <h1 className="mb-6 text-2xl font-semibold">{title}</h1>
        {children}
      </main>
    </div>
  );
}
