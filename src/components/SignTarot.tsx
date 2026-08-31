"use client";

import { drawDaily } from "@/lib/tarot";

export function SignTarot({ sign, name }: { sign: string; name: string }) {
  const card = drawDaily(`${name}|${sign}`);
  return (
    <div className="tarot-card">
      <div className="tarot-inner">
        <span className="tarot-no">{card.no}</span>
        <div className="tarot-face">
          <p className="tarot-big">{card.title}</p>
          <p className="tarot-day">bugunun karti</p>
        </div>
        <span className="tarot-title">{card.title}</span>
      </div>
      <p className="tarot-say">{card.upright}</p>
    </div>
  );
}