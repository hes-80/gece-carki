"use client";

import { useEffect, useMemo, useState } from "react";
import { ChartResult, TopicCard } from "@/lib/types";
import { buildDaily } from "@/lib/transit";
import { StarRadar } from "@/components/StarRadar";
import { SignTarot } from "@/components/SignTarot";
import { extendCard } from "@/lib/readings/extra";

const ART: Record<string, string> = {
  luck: "/cards/sans.svg",
  love: "/cards/ask.svg",
  money: "/cards/para.svg",
  health: "/cards/saglik.svg",
  career: "/cards/kariyer.svg",
  spirit: "/cards/ruh.svg",
};

const SIGN_FILE: Record<string, string> = {
  Koc: "/signs/koc.jpg",
  Boga: "/signs/boga.jpg",
  Ikizler: "/signs/ikizler.jpg",
  Yengec: "/signs/yengec.jpg",
  Aslan: "/signs/aslan.jpg",
  Basak: "/signs/basak.jpg",
  Terazi: "/signs/terazi.jpg",
  Akrep: "/signs/akrep.jpg",
  Yay: "/signs/yay.jpg",
  Oglak: "/signs/oglak.jpg",
  Kova: "/signs/kova.jpg",
  Balik: "/signs/balik.jpg",
};

function signKey(tr: string) {
  const compact = tr
    .replace(/ç/g, "c").replace(/Ç/g, "C")
    .replace(/ğ/g, "g").replace(/Ğ/g, "G")
    .replace(/ı/g, "i").replace(/İ/g, "I")
    .replace(/ö/g, "o").replace(/Ö/g, "O")
    .replace(/ş/g, "s").replace(/Ş/g, "S")
    .replace(/ü/g, "u").replace(/Ü/g, "U");
  const map: Record<string, string> = {
    Koc: "Koc", Boga: "Boga", Ikizler: "Ikizler", Yengec: "Yengec",
    Aslan: "Aslan", Basak: "Basak", Terazi: "Terazi", Akrep: "Akrep",
    Yay: "Yay", Oglak: "Oglak", Kova: "Kova", Balik: "Balik",
  };
  return map[compact] || "Koc";
}

function elementOf(key: string) {
  if (["Koc", "Aslan", "Yay"].includes(key)) return { el: "ates", label: "Ates" };
  if (["Boga", "Basak", "Oglak"].includes(key)) return { el: "toprak", label: "Toprak" };
  if (["Ikizler", "Terazi", "Kova"].includes(key)) return { el: "hava", label: "Hava" };
  return { el: "su", label: "Su" };
}

function extraFor(id: string, daily: ReturnType<typeof buildDaily>) {
  if (id === "luck") return daily.luck;
  if (id === "love") return daily.love;
  if (id === "money") return daily.money;
  return "";
}

export function ResultPanel({ result }: { result: ChartResult }) {
  const [active, setActive] = useState<TopicCard | null>(null);
  const title = result.input.name || "Dosya";
  const daily = buildDaily(result);
  const sunTr = result.bodies.find((b) => b.key === "sun")?.signTr ?? "Koc";
  const sun = signKey(sunTr);
  const rise = result.ascendant ? result.ascendant.signTr : "saat yok";

  return (
    <aside className="neon-panel space-y-5 p-6 overflow-hidden">
      <header>
        <p className="text-xs uppercase tracking-[0.25em] text-orange-300">Kilitlendi</p>
        <h2 className="text-2xl font-black">{title}</h2>
        <p className="text-xs text-white/80">
          {result.input.place.city} · {rise}
        </p>
      </header>
      <SignTarot sign={sunTr} name={title} />
      <StarRadar
        sun={sunTr}
        moon={result.bodies.find((b) => b.key === "moon")?.signTr}
        rise={result.ascendant?.signTr}
        mercury={result.bodies.find((b) => b.key === "mercury")?.signTr}
        venus={result.bodies.find((b) => b.key === "venus")?.signTr}
      />
      <div className="daily-box">
        <p className="topic-kicker">{daily.label}</p>
        <p>{daily.headline}</p>
        <p className="daily-mini">{daily.luck}</p>
        <p className="daily-mini">{daily.love}</p>
        <p className="daily-mini">{daily.money}</p>
      </div>

      <div className="card-rail">
        {result.cards.map((card, i) => (
          <button
            key={card.id}
            type="button"
            className="picture-card"
            style={{ animationDelay: i * 90 + "ms" }}
            onClick={() => setActive(card)}
          >
            <img src={ART[card.id]} alt={card.title} className="picture-art" />
            <div className="picture-copy">
              <b>{card.title}</b>
              <span>{card.headline}</span>
            </div>
          </button>
        ))}
      </div>

      {active && (
        <CrawlOverlay
          name={title}
          card={{ ...active, body: extendCard(active, result) }}
          sun={sun}
          sunLabel={sunTr}
          extra={extraFor(active.id, daily)}
          onClose={() => setActive(null)}
        />
      )}
    </aside>
  );
}

function pickFemaleVoice(): SpeechSynthesisVoice | null {
  const voices = window.speechSynthesis.getVoices();
  const male = /male|tolga|ahmet|aydin|osman|david|mark|guy|ryan/;
  const female = /emel|elif|female|woman|natural|neural|online|zira|aria|jenny/;
  const ranked = voices.map((v) => {
    const n = (v.name + " " + v.lang).toLowerCase();
    let s = 0;
    if (female.test(n)) s += 25;
    if (n.includes("emel")) s += 40;
    if (v.lang.toLowerCase().startsWith("tr")) s += 8;
    if (male.test(n)) s -= 50;
    return { v, s };
  });
  ranked.sort((a, b) => b.s - a.s);
  return ranked[0] && ranked[0].s > 0 ? ranked[0].v : null;
}

function CrawlOverlay({
  name, card, sun, sunLabel, extra, onClose,
}: {
  name: string;
  card: TopicCard;
  sun: string;
  sunLabel: string;
  extra: string;
  onClose: () => void;
}) {
  const [rain, setRain] = useState(false);
  const info = elementOf(sun);
  const text = useMemo(
    () => card.title + ". " + name + ". " + card.body + " " + extra,
    [card, name, extra]
  );

  useEffect(() => {
    let cancelled = false;
    const speak = () => {
      if (cancelled) return;
      window.speechSynthesis.cancel();
      const u = new SpeechSynthesisUtterance(text);
      u.lang = "tr-TR";
      u.rate = 0.9;
      u.pitch = 1.05;
      const voice = pickFemaleVoice();
      if (voice) u.voice = voice;
      window.speechSynthesis.speak(u);
    };
    speak();
    const t = window.setTimeout(speak, 400);
    window.speechSynthesis.addEventListener("voiceschanged", speak);
    return () => {
      cancelled = true;
      window.clearTimeout(t);
      window.speechSynthesis.cancel();
      window.speechSynthesis.removeEventListener("voiceschanged", speak);
    };
  }, [text]);

  function closeWithRain() {
    window.speechSynthesis.cancel();
    setRain(true);
    window.setTimeout(onClose, 2600);
  }

  return (
    <div className={"crawl-mask theme-" + info.el}>
      {!rain && (
        <button type="button" className="crawl-close" onClick={closeWithRain}>
          kapat
        </button>
      )}
      <img className="sign-mascot" src={SIGN_FILE[sun] ?? "/signs/koc.jpg"} alt={sunLabel} />
      {rain && (
        <div className="rain-layer">
          {Array.from({ length: 30 }).map((_, i) => (
            <span
              key={i}
              className={"drop drop-" + info.el}
              style={{ left: (i * 3.3) % 100 + "%", animationDelay: (i % 12) * 0.1 + "s" }}
            />
          ))}
          <p className="rain-label">{sunLabel}</p>
        </div>
      )}
      <div className="crawl-sky">
        <div className="crawl-board">
          <p className="crawl-title">{card.title}</p>
          <p className="crawl-name">{name} · {sunLabel}</p>
          <p className="crawl-body">{card.body}</p>
          {extra ? <p className="crawl-body">{extra}</p> : null}
        </div>
      </div>
    </div>
  );
}