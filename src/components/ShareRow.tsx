"use client";

import { useState } from "react";
import { ChartResult } from "@/lib/types";
import { buildDaily } from "@/lib/transit";

export function ShareRow({ result }: { result: ChartResult }) {
  const [ok, setOk] = useState("");
  const daily = buildDaily(result);
  const name = result.input.name || "Dosya";
  const sun = result.bodies.find((b) => b.key === "sun")?.signTr ?? "-";
  const moon = result.bodies.find((b) => b.key === "moon")?.signTr ?? "-";
  const rise = result.ascendant?.signTr ?? "saat yok";
  const text =
    "Gece Carki — " + name + "\n" +
    result.input.place.city + " · Gunes " + sun + " · Ay " + moon + " · Yukselen " + rise + "\n" +
    daily.headline + "\n" +
    "Eglence amaclidir. https://gece-carki.vercel.app";

  async function copy() {
    try {
      await navigator.clipboard.writeText(text);
      setOk("kopyalandi");
    } catch {
      setOk("kopyalanamadi");
    }
  }

  const wa = "https://wa.me/?text=" + encodeURIComponent(text);

  return (
    <div className="share-row">
      <button type="button" className="share-btn" onClick={copy}>kopyala</button>
      <a className="share-btn" href={wa} target="_blank" rel="noreferrer">whatsapp</a>
      {ok ? <span>{ok}</span> : null}
    </div>
  );
}