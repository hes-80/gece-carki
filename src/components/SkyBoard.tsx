"use client";

const GROUPS = [
  { name: "Ateş", signs: "Koç · Aslan · Yay", mood: "Hızlı ateş. Hareket, sahne, ilk adım." },
  { name: "Toprak", signs: "Boğa · Başak · Oğlak", mood: "Yavaş toprak. İş, beden, birikim." },
  { name: "Hava", signs: "İkizler · Terazi · Kova", mood: "Hafif hava. Söz, bağ, fikir." },
  { name: "Su", signs: "Yengeç · Akrep · Balık", mood: "Derin su. His, ev, giz." },
];

const EVENTS = [
  {
    at: "2026-10-24",
    date: "24 Eki - 13 Kas 2026",
    title: "Merkür retro, Akrep",
    note: "Söz ve imza temposu yavaşlar. Disk geçişi değil.",
  },
  {
    at: "2027-02-06",
    date: "6 Şub 2027",
    title: "Halkalı Güneş tutulması",
    note: "Hat: Arjantin-Şili. Türkiye'den görünmez.",
  },
  {
    at: "2027-02-20",
    date: "20-21 Şub 2027",
    title: "Penumbral Ay tutulması",
    note: "Ay hafif kararır. Türkiye'den zayıf gölge.",
  },
  {
    at: "2027-08-02",
    date: "2 Ağu 2027",
    title: "Tam Güneş tutulması",
    note: "İspanya-Mısır hattı, yaklaşık 6 dakika.",
  },
  {
    at: "2032-11-13",
    date: "13 Kas 2032",
    title: "Merkür Güneş diskinden geçer",
    note: "Sonraki gerçek transit. 2026-27'de yok.",
  },
];

function daysLeft(iso: string) {
  const now = new Date();
  const t = new Date(iso + "T00:00:00");
  const d = Math.ceil((t.getTime() - now.getTime()) / 86400000);
  if (d > 1) return d + " gün";
  if (d === 1) return "yarın";
  if (d === 0) return "bugün";
  return "geçti";
}

export function SkyBoard() {
  const next = EVENTS.find((e) => daysLeft(e.at) !== "geçti") || EVENTS[EVENTS.length - 1];

  return (
    <div className="sky-board">
      <p className="sky-k">burç grupları</p>
      <div className="elem-row">
        {GROUPS.map((g) => (
          <div key={g.name} className="elem-cell">
            <b>{g.name}</b>
            <span>{g.signs}</span>
            <i>{g.mood}</i>
          </div>
        ))}
      </div>
      <p className="sky-k">gökyüzü takvimi</p>
      <p className="sky-next">
        Sıradaki: {next.title} · {daysLeft(next.at)}
      </p>
      <ul className="sky-list">
        {EVENTS.map((e) => (
          <li key={e.at}>
            <strong>
              {e.date} · {daysLeft(e.at)}
            </strong>
            <em>{e.title}</em>
            <span>{e.note}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}