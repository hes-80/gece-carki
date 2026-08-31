"use client";

import { drawDaily } from "@/lib/tarot";

const FILE: Record<string, string> = {
  "0": "00",
  I: "01",
  II: "02",
  III: "03",
  IV: "04",
  V: "05",
  VI: "06",
  VII: "07",
  VIII: "08",
  IX: "09",
  X: "10",
  XI: "11",
  XII: "12",
  XIII: "13",
  XIV: "14",
  XV: "15",
  XVI: "16",
  XVII: "17",
  XVIII: "18",
  XIX: "19",
  XX: "20",
  XXI: "21",
};

export function SignTarot({ sign, name }: { sign: string; name: string }) {
  const card = drawDaily(name + "|" + sign);
  const file = FILE[card.no] ?? "00";

  return (
    <div className="tarot-card">
      <div className="tarot-inner">
        <img
          src={"/tarot/" + file + ".jpg"}
          alt={card.title}
          className="tarot-img"
        />
        <p className="tarot-say">{card.upright}</p>
      </div>
    </div>
  );
}