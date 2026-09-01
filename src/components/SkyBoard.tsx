"use client";

const GROUPS = [
  { name: "Ates", signs: "Koc · Aslan · Yay" },
  { name: "Toprak", signs: "Boga · Basak · Oglak" },
  { name: "Hava", signs: "Ikizler · Terazi · Kova" },
  { name: "Su", signs: "Yengec · Akrep · Balik" },
];

const EVENTS = [
  {
    at: "2026-10-24",
    date: "24 Eki - 13 Kas 2026",
    title: "Merkur retro / Akrep",
    note: "Soz ve imza temposu yavaslar. Disk gecisi degil; kavusum donemi.",
  },
  {
    at: "2027-02-06",
    date: "6 Sub 2027",
    title: "Halkali Gunes tutulmasi",
    note: "Ay Gunes'i halka gibi birakir. Hat: Arjantin-Sili. Turkiye'den gorunmez.",
  },
  {
    at: "2027-02-20",
    date: "20-21 Sub 2027",
    title: "Penumbral Ay tutulmasi",
    note: "Ay hafif kararir. Turkiye'den zayif golge.",
  },
  {
    at: "2027-08-02",
    date: "2 Agu 2027",
    title: "Tam Gunes tutulmasi",
    note: "Ispanya-Misir hatti, yaklasik 6 dakika. Avrupa'nin onemli tutulmasi.",
  },
  {
    at: "2032-11-13",
    date: "13 Kas 2032",
    title: "Merkur Gunes diskinden gecer",
    note: "Sonraki gercek transit. Kalp gecisi budur; 2026-27'de yok.",
  },
];

function daysLeft(iso: string) {
  const now = new Date();
  const t = new Date(iso + "T00:00:00");
  const d = Math.ceil((t.getTime() - now.getTime()) / 86400000);
  if (d > 1) return d + " gun";
  if (d === 1) return "yarin";
  if (d === 0) return "bugun";
  return "gecti";
}

export function SkyBoard() {
  const next = EVENTS.find((e) => daysLeft(e.at) !== "gecti") || EVENTS[EVENTS.length - 1];

  return (
    <div className="sky-board">
      <p className="sky-k">burc gruplari</p>
      <div className="elem-row">
        {GROUPS.map((g) => (
          <div key={g.name} className="elem-cell">
            <b>{g.name}</b>
            <span>{g.signs}</span>
          </div>
        ))}
      </div>
      <p className="sky-k">gokyuzu takvimi</p>
      <p className="sky-next">
        Siradaki: {next.title} · {daysLeft(next.at)}
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