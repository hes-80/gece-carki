"use client";

import { ChartResult } from "@/lib/types";

const GROUPS = [
  { name: "Ateş", keys: ["Koc", "Aslan", "Yay"], signs: "Koç · Aslan · Yay", mood: "Mizaç: hızlı ateş. Tempo, sahne, ilk adım." },
  { name: "Toprak", keys: ["Boga", "Basak", "Oglak"], signs: "Boğa · Başak · Oğlak", mood: "Mizaç: yavaş toprak. İş, beden, birikim." },
  { name: "Hava", keys: ["Ikizler", "Terazi", "Kova"], signs: "İkizler · Terazi · Kova", mood: "Mizaç: hafif hava. Söz, bağ, fikir." },
  { name: "Su", keys: ["Yengec", "Akrep", "Balik"], signs: "Yengeç · Akrep · Balık", mood: "Mizaç: derin su. His, ev, giz." },
];

const EVENTS = [
  { at: "2026-10-24", until: "2026-11-13", date: "24 Eki - 13 Kas 2026", title: "Merkür retro, Akrep", note: "Söz ve imza temposu yavaşlar. Disk geçişi değil." },
  { at: "2027-02-06", until: "2027-02-06", date: "6 Şub 2027", title: "Halkalı Güneş tutulması", note: "Hat: Arjantin-Şili. Türkiye'den görünmez." },
  { at: "2027-02-20", until: "2027-02-21", date: "20-21 Şub 2027", title: "Penumbral Ay tutulması", note: "Ay hafif kararır. Türkiye'den zayıf gölge." },
  { at: "2027-08-02", until: "2027-08-02", date: "2 Ağu 2027", title: "Tam Güneş tutulması", note: "İspanya-Mısır hattı, yaklaşık 6 dakika." },
  { at: "2032-11-13", until: "2032-11-13", date: "13 Kas 2032", title: "Merkür Güneş diskinden geçer", note: "Sonraki gerçek transit. 2026-27'de yok." },
];

const DAY_TR = ["Pazar", "Pazartesi", "Salı", "Çarşamba", "Perşembe", "Cuma", "Cumartesi"];
const DAY_RULER = ["Güneş", "Ay", "Mars", "Merkür", "Jüpiter", "Venüs", "Satürn"];

function compact(tr: string) {
  return tr.replace(/ç/g, "c").replace(/ğ/g, "g").replace(/ı/g, "i").replace(/ö/g, "o").replace(/ş/g, "s").replace(/ü/g, "u");
}

function groupOf(sign: string) {
  const k = compact(sign);
  return GROUPS.find((g) => g.keys.includes(k)) || GROUPS[0];
}

function pairOf(el: string) {
  if (el === "Ateş") return { good: "Ateş ve Hava", signs: "Koç, Aslan, Yay, İkizler, Terazi, Kova", hard: "Yengeç, Akrep, Balık" };
  if (el === "Toprak") return { good: "Toprak ve Su", signs: "Boğa, Başak, Oğlak, Yengeç, Akrep, Balık", hard: "Koç, Aslan, Yay" };
  if (el === "Hava") return { good: "Hava ve Ateş", signs: "İkizler, Terazi, Kova, Koç, Aslan, Yay", hard: "Boğa, Başak, Oğlak" };
  return { good: "Su ve Toprak", signs: "Yengeç, Akrep, Balık, Boğa, Başak, Oğlak", hard: "İkizler, Terazi, Kova" };
}

function daysLeft(iso: string) {
  const t = new Date(iso + "T00:00:00");
  const d = Math.ceil((t.getTime() - Date.now()) / 86400000);
  if (d > 1) return d + " gün";
  if (d === 1) return "yarın";
  if (d === 0) return "bugün";
  return "geçti";
}

function openWeekdays(sun: string, moon: string) {
  const el = groupOf(sun).name;
  const picks: number[] = [];
  if (el === "Ateş") picks.push(0, 2);
  if (el === "Toprak") picks.push(6, 3);
  if (el === "Hava") picks.push(3, 5);
  if (el === "Su") picks.push(1, 5);
  const m = groupOf(moon).name;
  if (m === "Su" && !picks.includes(1)) picks.push(1);
  if (m === "Hava" && !picks.includes(3)) picks.push(3);
  return picks;
}

export function SkyBoard({ natal }: { natal?: ChartResult | null }) {
  const next = EVENTS.find((e) => daysLeft(e.at) !== "geçti") || EVENTS[EVENTS.length - 1];
  const now = new Date();
  const sun = natal?.bodies.find((b) => b.key === "sun")?.signTr ?? "";
  const moon = natal?.bodies.find((b) => b.key === "moon")?.signTr ?? "";
  const rise = natal?.ascendant?.signTr ?? "";
  const g = sun ? groupOf(sun) : null;
  const pair = g ? pairOf(g.name) : null;
  const open = sun ? openWeekdays(sun, moon || sun) : [];
  const week = Array.from({ length: 7 }).map((_, i) => {
    const d = new Date(now);
    d.setDate(now.getDate() + i);
    const wd = d.getDay();
    return {
      label: d.toLocaleDateString("tr-TR", { day: "numeric", month: "short" }),
      day: DAY_TR[wd],
      ruler: DAY_RULER[wd],
      open: open.includes(wd),
    };
  });
  const monthHit = EVENTS.filter((e) => {
    const a = new Date(e.at + "T00:00:00");
    return a.getFullYear() === now.getFullYear() && a.getMonth() === now.getMonth();
  });

  return (
    <div className="sky-board">
      <p className="sky-k">burç grupları</p>
      <div className="elem-row">
        {GROUPS.map((x) => (
          <div key={x.name} className="elem-cell">
            <b>{x.name}</b>
            <span>{x.signs}</span>
            <i>{x.mood}</i>
          </div>
        ))}
      </div>

      <p className="sky-k">gökyüzü takvimi</p>
      <p className="sky-next">Sıradaki: {next.title} · {daysLeft(next.at)}</p>

      {natal && g && pair ? (
        <>
          <p className="sky-k">senin haritan</p>
          <p className="sky-note">
            Güneş {sun}, Ay {moon || "—"}, yükselen {rise || "saat yok"}.
            Grup: {g.name}. Klasik uyum ({pair.good}): {pair.signs}.
            Tempo sürtünmesi: {pair.hard}. Evlilik kehaneti değildir.
          </p>
          <p className="sky-k">bu hafta (gezegen günü)</p>
          <ul className="sky-list">
            {week.map((w) => (
              <li key={w.label}>
                <strong>{w.label} · {w.day}</strong>
                <em>{w.ruler}{w.open ? " · bu haritada açık gün" : ""}</em>
              </li>
            ))}
          </ul>
          <p className="sky-k">bu ay</p>
          <p className="sky-note">
            {monthHit.length
              ? monthHit.map((e) => e.date + " " + e.title).join(" · ")
              : "Bu ay listede büyük tutulma yok. Tempo günlük Güneş-Merkür notundan okunur."}
          </p>
        </>
      ) : (
        <p className="sky-note">Radar kilitlenince uyum ve haftalık günler senin Güneş-Ay-yükselenine göre dolar.</p>
      )}

      <ul className="sky-list">
        {EVENTS.map((e) => (
          <li key={e.at}>
            <strong>{e.date} · {daysLeft(e.at)}</strong>
            <em>{e.title}</em>
            <span>{e.note}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}