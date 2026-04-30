import { IceCreamBowl } from "lucide-react";

export function BrandMark() {
  return (
    <div className="inline-flex items-center gap-2">
      <div className="rounded-xl bg-brand-50 p-2 text-brand-600">
        <IceCreamBowl className="h-5 w-5" />
      </div>
      <div>
        <p className="text-sm font-semibold leading-none">Everest</p>
        <p className="text-xs text-slate-500">Dessert Cloud</p>
      </div>
    </div>
  );
}
