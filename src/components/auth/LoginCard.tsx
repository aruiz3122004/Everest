"use client";

import { motion } from "framer-motion";
import { BrandMark } from "@/components/branding/BrandMark";
import { Chrome } from "lucide-react";
import Link from "next/link";

export function LoginCard() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25 }}
      className="card w-full max-w-md p-8"
    >
      <div className="mb-8 flex justify-center">
        <BrandMark />
      </div>
      <h1 className="mb-2 text-center text-3xl font-semibold tracking-tight">Inicia sesion</h1>
      <p className="mb-6 text-center text-sm text-slate-500">
        Gestiona ventas, inventario y nomina en una sola plataforma.
      </p>

      <form className="space-y-3">
        <input
          type="email"
          placeholder="Correo electronico"
          className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-brand-500"
        />
        <input
          type="password"
          placeholder="Contrasena"
          className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-brand-500"
        />
        <button
          type="submit"
          className="w-full rounded-xl bg-gradient-to-r from-brand-600 to-brand-500 px-4 py-3 text-sm font-medium text-white transition hover:opacity-95"
        >
          Continuar
        </button>
      </form>

      <div className="my-5 flex items-center gap-3">
        <div className="h-px flex-1 bg-slate-200" />
        <span className="text-xs text-slate-400">o</span>
        <div className="h-px flex-1 bg-slate-200" />
      </div>

      <button className="mx-auto flex w-14 items-center justify-center rounded-xl border border-slate-200 p-3 text-slate-700">
        <Chrome className="h-5 w-5" />
      </button>

      <p className="mt-5 text-center text-xs text-slate-500">
        Al continuar aceptas los terminos de Everest.{" "}
        <Link href="#" className="text-brand-600 underline">
          Ver politicas
        </Link>
      </p>
    </motion.div>
  );
}
