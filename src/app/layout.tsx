import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Everest SaaS",
  description: "SaaS de postres, helados y batidos con módulos operativos."
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}
