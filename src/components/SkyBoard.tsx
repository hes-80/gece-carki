"use client";

const GROUPS = [
  { name: "Ates", signs: "Koc · Aslan · Yay" },
  { name: "Toprak", signs: "Boga · Basak · Oglak" },
  { name: "Hava", signs: "Ikizler · Terazi · Kova" },
  { name: "Su", signs: "Yengec · Akrep · Balik" },
];

const EVENTS = [
  {
    date: "6 Sub 2027",
    title: "Halkali Gunes tutulmasi",
    note: "Ay Gunes'i halka gibi birakir. Hat: Arjantin-Sili. Turkiye'den gorunmez.",
  },
  {
    date: "20-21 Sub 2027",
    title: "Penumbral Ay tutulmasi",
    note: "Ay hafif kararir. Turkiye'den zayif golge.",
  },
  {
    date: "24 Eki - 13 Kas 2026",
    title: "Merkur retro / Akrep",
    note: "Soz ve imza temposu yavaslar. Disk gecisi degil; kavusum donemi.",
  },
  {
    date: "2 Agu 2027",
    title: "Tam Gunes tutulmasi",
    note: "Ispanya-Misir hatti, yaklasik 6 dakika. Avrupa'nin onemli tutulmasi.",
  },
  {
    date: "13 Kas 2032",
    title: "Merkur Gunes diskinden gecer",
    note: "Sonraki gercek transit. Kalp gecisi budur; 2026-27'de yok.",
  },
];

export function SkyBoard() {
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
      <ul className="sky-list">
        {EVENTS.map((e) => (
          <li key={e.date}>
            <strong>{e.date}</strong>
            <em>{e.title}</em>
            <span>{e.note}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}