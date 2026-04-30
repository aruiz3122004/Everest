"use client";

import { motion } from "framer-motion";

type Props = {
  title: string;
  value: string;
  helper: string;
};

export function KpiCard({ title, value, helper }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2 }}
      className="card p-5"
    >
      <p className="text-xs uppercase tracking-wide text-slate-500">{title}</p>
      <p className="mt-2 text-2xl font-semibold">{value}</p>
      <p className="mt-1 text-xs text-slate-500">{helper}</p>
    </motion.div>
  );
}
