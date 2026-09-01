"use client";

import { FormEvent, useMemo, useState } from "react";
import { searchPlaces } from "@/lib/geocode";
import { computeChart } from "@/lib/chart";
import { BirthInput, ChartResult, PlaceHit } from "@/lib/types";
import { Disclaimer } from "./Disclaimer";
import { ResultPanel } from "./ResultPanel";
import { LiveSky } from "@/components/LiveSky";
import { SkyBoard } from "@/components/SkyBoard";

const emptyInput = (): Omit<BirthInput, "place"> & { place: PlaceHit | null } => ({
  name: "",
  year: 1995,
  month: 6,
  day: 15,
  hour: 14,
  minute: 30,
  timeUnknown: false,
  place: null,
  houseSystem: "placidus",
  acceptedDisclaimer: false,
});

export function BirthForm() {
  const [form, setForm] = useState(emptyInput);
  const [query, setQuery] = useState("");
  const [hits, setHits] = useState<PlaceHit[]>([]);
  const [searching, setSearching] = useState(false);
  const [error, setError] = useState("");
  const [result, setResult] = useState<ChartResult | null>(null);

  const canSubmit = useMemo(
    () => Boolean(form.acceptedDisclaimer && form.place && form.year >= 1800),
    [form]
  );

  async function onSearch() {
    setError("");
    setSearching(true);
    try {
      const found = await searchPlaces(query);
      setHits(found);
      if (found.length === 0) setError("Şehir bulunamadı. İlçe veya ülke ile dene.");
    } catch {
      setError("Şehir servisine ulaşılamadı.");
    } finally {
      setSearching(false);
    }
  }

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    setError("");
    if (!form.place) {
      setError("Doğum yerini listeden seç.");
      return;
    }
    if (!form.acceptedDisclaimer) {
      setError("Devam etmek için feragatnameyi onayla.");
      return;
    }
    try {
      const payload: BirthInput = { ...form, place: form.place };
      setResult(computeChart(payload));
    } catch (err) {
      console.error(err);
      setError("Harita hesaplanamadı. Saat ve koordinatı kontrol et.");
    }
  }

  return (
    <div className="mx-auto grid max-w-5xl gap-8 lg:grid-cols-[1.1fr_0.9fr]">
      <form onSubmit={onSubmit} className="neon-panel space-y-4 p-6">
        <header>
          <p className="text-xs uppercase tracking-[0.25em] text-cyan-300">Gece Çarkı</p>
          <h1 className="mt-2 text-3xl font-black italic tracking-tight">
            Doğum verisi gir, radar kilitlensin.
          </h1>
        </header>

        <label className="block text-sm">
          Ad (isteğe bağlı)
          <input
            className="mt-1 w-full rounded bg-black/40 px-3 py-2"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />
        </label>

        <div className="grid grid-cols-3 gap-3">
          <label className="text-sm">
            Gün
            <input
              type="number"
              min={1}
              max={31}
              className="mt-1 w-full rounded bg-black/40 px-3 py-2"
              value={form.day}
              onChange={(e) => setForm({ ...form, day: Number(e.target.value) })}
            />
          </label>
          <label className="text-sm">
            Ay
            <input
              type="number"
              min={1}
              max={12}
              className="mt-1 w-full rounded bg-black/40 px-3 py-2"
              value={form.month}
              onChange={(e) => setForm({ ...form, month: Number(e.target.value) })}
            />
          </label>
          <label className="text-sm">
            Yıl
            <input
              type="number"
              min={1900}
              max={2027}
              className="mt-1 w-full rounded bg-black/40 px-3 py-2"
              value={form.year}
              onChange={(e) => setForm({ ...form, year: Number(e.target.value) })}
            />
          </label>
        </div>

        <label className="flex items-center gap-2 text-sm">
          <input
            type="checkbox"
            checked={form.timeUnknown}
            onChange={(e) => setForm({ ...form, timeUnknown: e.target.checked })}
          />
          Doğum saatini bilmiyorum
        </label>

        {!form.timeUnknown && (
          <div className="grid grid-cols-2 gap-3">
            <label className="text-sm">
              Saat
              <input
                type="number"
                min={0}
                max={23}
                className="mt-1 w-full rounded bg-black/40 px-3 py-2"
                value={form.hour}
                onChange={(e) => setForm({ ...form, hour: Number(e.target.value) })}
              />
            </label>
            <label className="text-sm">
              Dakika
              <input
                type="number"
                min={0}
                max={59}
                className="mt-1 w-full rounded bg-black/40 px-3 py-2"
                value={form.minute}
                onChange={(e) => setForm({ ...form, minute: Number(e.target.value) })}
              />
            </label>
          </div>
        )}

        <div>
          <label className="text-sm">Doğum yeri</label>
          <div className="mt-1 flex gap-2">
            <input
              className="w-full rounded bg-black/40 px-3 py-2"
              placeholder="İstanbul, İzmir, Berlin..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            <button
              type="button"
              onClick={onSearch}
              className="rounded bg-cyan-400 px-4 py-2 font-bold text-black"
            >
              {searching ? "..." : "Bul"}
            </button>
          </div>
          <ul className="mt-2 max-h-40 space-y-1 overflow-auto text-sm">
            {hits.map((hit) => (
              <li key={hit.label + "-" + hit.lat}>
                <button
                  type="button"
                  className={
                    "w-full rounded px-3 py-2 text-left " +
                    (form.place?.label === hit.label
                      ? "bg-orange-500 text-black"
                      : "bg-white/5 hover:bg-white/10")
                  }
                  onClick={() => setForm({ ...form, place: hit })}
                >
                  {hit.label}
                </button>
              </li>
            ))}
          </ul>
          {form.place && (
            <p className="mt-2 text-xs text-cyan-200">
              Kilit: {form.place.label} · {form.place.lat.toFixed(3)}, {form.place.lon.toFixed(3)}
            </p>
          )}
        </div>

        <label className="block text-sm">
          Ev sistemi
          <select
            className="mt-1 w-full rounded bg-black/40 px-3 py-2"
            value={form.houseSystem}
            onChange={(e) =>
              setForm({ ...form, houseSystem: e.target.value as BirthInput["houseSystem"] })
            }
          >
            <option value="placidus">Placidus</option>
            <option value="whole-sign">Whole Sign</option>
            <option value="koch">Koch</option>
            <option value="equal">Equal</option>
          </select>
        </label>

        <label className="flex items-start gap-2 text-sm">
          <input
            type="checkbox"
            className="mt-1"
            checked={form.acceptedDisclaimer}
            onChange={(e) => setForm({ ...form, acceptedDisclaimer: e.target.checked })}
          />
          <span>
            Bunun eğlence amaçlı olduğunu, sağlık ve finans tavsiyesi olmadığını kabul
            ediyorum.
          </span>
        </label>

        <Disclaimer />

        {error && <p className="text-sm text-orange-300">{error}</p>}

        <button
          disabled={!canSubmit}
          className="w-full rounded bg-orange-500 py-3 text-lg font-black uppercase tracking-wide text-black disabled:opacity-40"
        >
          Radarı aç
        </button>

        {form.place && (
          <LiveSky
            lat={form.place.lat}
            lon={form.place.lon}
            city={form.place.city || form.place.label}
          />
        )}

                <SkyBoard natal={result} />
      </form>

      {result ? <ResultPanel result={result} /> : <EmptyRadar />}
    </div>
  );
}

function EmptyRadar() {
  return (
    <aside className="neon-panel grid min-h-[24rem] place-items-center p-6 text-center">
      <div>
        <div className="mx-auto h-40 w-40 rounded-full border border-cyan-400/40 shadow-[0_0_40px_#22d3ee55]" />
        <p className="mt-4 text-sm text-white/60">
          Şehir ve tarih kilitlenince çark burada dönecek.
        </p>
      </div>
    </aside>
  );
}