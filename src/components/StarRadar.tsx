"use client";

const SIGNS = ["Koc","Boga","Ikizler","Yengec","Aslan","Basak","Terazi","Akrep","Yay","Oglak","Kova","Balik"];

function keyOf(tr: string) {
  return tr
    .replace(/ç/g, "c").replace(/Ç/g, "C")
    .replace(/ğ/g, "g").replace(/Ğ/g, "G")
    .replace(/ı/g, "i").replace(/İ/g, "I")
    .replace(/ö/g, "o").replace(/Ö/g, "O")
    .replace(/ş/g, "s").replace(/Ş/g, "S")
    .replace(/ü/g, "u").replace(/Ü/g, "U");
}

export function StarRadar({
  sun, moon, rise, mercury, venus,
}: {
  sun?: string;
  moon?: string;
  rise?: string;
  mercury?: string;
  venus?: string;
}) {
  const s = keyOf(sun || "");
  const m = keyOf(moon || "");
  const r = keyOf(rise || "");
  const mer = keyOf(mercury || "");
  const ven = keyOf(venus || "");
  const cx = 110;
  const cy = 110;
  const rad = 88;

  return (
    <div className="radar-wrap">
      <svg viewBox="0 0 220 220" className="radar-svg">
        <circle cx={cx} cy={cy} r={rad} fill="none" stroke="rgba(103,232,249,0.25)" strokeWidth="1" />
        <circle cx={cx} cy={cy} r="55" fill="none" stroke="rgba(251,146,60,0.25)" strokeWidth="1" />
        {SIGNS.map((name, i) => {
          const a = ((i / 12) * Math.PI * 2) - Math.PI / 2;
          const x = cx + Math.cos(a) * rad;
          const y = cy + Math.sin(a) * rad;
          return (
            <line
              key={name}
              x1={cx}
              y1={cy}
              x2={x}
              y2={y}
              stroke="rgba(255,255,255,0.12)"
              strokeWidth="1"
            />
          );
        })}
        {SIGNS.map((name, i) => {
          const a = ((i / 12) * Math.PI * 2) - Math.PI / 2;
          const x = cx + Math.cos(a) * 96;
          const y = cy + Math.sin(a) * 96;
          const hot = name === s || name === m || name === r;
          return (
            <text
              key={"t"+name}
              x={x}
              y={y}
              textAnchor="middle"
              dominantBaseline="middle"
              fontSize="11"
              fill={hot ? "#fdba74" : "rgba(255,255,255,0.45)"}
            >
              {name}
            </text>
          );
        })}
        {[
          { k: s, color: "#fb923c", label: "G" },
          { k: m, color: "#67e8f9", label: "A" },
          { k: r, color: "#fde047", label: "Y" },
          { k: mer, color: "#e5e7eb", label: "M" },
          { k: ven, color: "#f9a8d4", label: "V" },
        ].map((p, idx) => {
          const i = Math.max(0, SIGNS.indexOf(p.k));
          const a = ((i / 12) * Math.PI * 2) - Math.PI / 2;
          const dist = 70 - idx * 12;
          const x = cx + Math.cos(a) * dist;
          const y = cy + Math.sin(a) * dist;
          return (
            <g key={p.label}>
              <circle cx={x} cy={y} r="6" fill={p.color} />
              <text x={x} y={y+1} textAnchor="middle" dominantBaseline="middle" fontSize="8" fill="#111">
                {p.label}
              </text>
            </g>
          );
        })}
      </svg>
      <p className="radar-legend" style={{fontSize:"13px"}}>G Gunes / A Ay / Y Yukselen</p>
    </div>
  );
}