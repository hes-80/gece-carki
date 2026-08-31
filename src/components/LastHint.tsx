"use client";

import { loadLast } from "@/lib/persist";

export function LastHint() {
  const last = loadLast<{ name?: string; place?: { city?: string } }>();
  if (!last?.name && !last?.place?.city) return null;
  return (
    <p className="text-xs text-cyan-300">
      Son kayit: {last.name || "-"} · {last.place?.city || "-"}
    </p>
  );
}