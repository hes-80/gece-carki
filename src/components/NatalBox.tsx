"use client";

import { ChartResult } from "@/lib/types";

function compact(tr: string) {
  return tr
    .replace(/ç/g, "c").replace(/ğ/g, "g").replace(/ı/g, "i")
    .replace(/ö/g, "o").replace(/ş/g, "s").replace(/ü/g, "u");
}

function groupOf(sign: string) {
  const k = compact(sign);
  if (["Koc", "Aslan", "Yay"].includes(k))
    return { name: "Ateş", good: "Ateş ve Hava", hard: "Yengeç, Akrep, Balık" };
  if (["Boga", "Basak", "Oglak"].includes(k))
    return { name: "Toprak", good: "Toprak ve Su", hard: "Koç, Aslan, Yay" };
  if (["Ikizler", "Terazi", "Kova"].includes(k))
    return { name: "Hava", good: "Hava ve Ateş", hard: "Boğa, Başak, Oğlak" };
  return { name: "Su", good: "Su ve Toprak", hard: "İkizler, Terazi, Kova" };
}

const SUN: Record<string, string> = {
  Koc: "Güneş Koç: ilk adım, sahne, beklemeyi sevmez.",
  Boga: "Güneş Boğa: tempo yavaş, değer ve beden önde.",
  Ikizler: "Güneş İkizler: söz, geçiş, iki kapı birden.",
  Yengec: "Güneş Yengeç: ev, his, içeriyi korur.",
  Aslan: "Güneş Aslan: görünmek, alkış, merkez.",
  Basak: "Güneş Başak: düzen, iş, küçük düzeltme.",
  Terazi: "Güneş Terazi: denge, bağ, karşılıklı bakış.",
  Akrep: "Güneş Akrep: eşik, sır, tek kapı.",
  Yay: "Güneş Yay: yol, görüş, uzağa bakış.",
  Oglak: "Güneş Oğlak: iskele, kural, uzun iş.",
  Kova: "Güneş Kova: fikir, mesafe, neden böyle.",
  Balik: "Güneş Balık: sis, his, sınır yumuşar.",
};

const MOON: Record<string, string> = {
  Koc: "Ay Koç: iç ritim hızlı, öfke kısa.",
  Boga: "Ay Boğa: ev hali yavaş, güven yoksa susar.",
  Ikizler: "Ay İkizler: evde söz, dağılır, toplanır.",
  Yengec: "Ay Yengeç: yuva, koruma, dalga.",
  Aslan: "Ay Aslan: evde sahne, görünmek ister.",
  Basak: "Ay Başak: evde düzen, küçük kaygı.",
  Terazi: "Ay Terazi: evde denge, yalnız kalınca boşluk.",
  Akrep: "Ay Akrep: ev hali derin, paylaşılmaz.",
  Yay: "Ay Yay: evde yol, dar oda sıkar.",
  Oglak: "Ay Oğlak: evde görev, duyguyu geciktirir.",
  Kova: "Ay Kova: evde mesafe, kalabalıkta rahat.",
  Balik: "Ay Balık: ev hali akışkan, sınır silinir.",
};

export function NatalBox({ result }: { result: ChartResult }) {
  const sun = result.bodies.find((b) => b.key === "sun")?.signTr ?? "Koc";
  const moon = result.bodies.find((b) => b.key === "moon")?.signTr ?? "";
  const rise = result.ascendant?.signTr ?? "";
  const g = groupOf(sun);
  const sk = compact(sun);
  const mk = moon ? compact(moon) : "";

  return (
    <div className="natal-box">
      <p className="topic-kicker">Natal özet</p>
      <p>
        Güneş {sun}
        {moon ? ", Ay " + moon : ""}
        {rise ? ", yükselen " + rise : ", yükselen yok (saat yok)"}.
        Grup: {g.name}.
      </p>
      <p>{SUN[sk] ?? ""}</p>
      {mk ? <p>{MOON[mk] ?? ""}</p> : null}
      {rise ? (
        <p>Yükselen {rise}: dış kapı bu; ilk bakış buradan girer.</p>
      ) : (
        <p>Saat yok: yükselen ve evler tahmini kalır.</p>
      )}
      <p>
        Klasik uyum ({g.good}). Tempo sürtünmesi: {g.hard}. Evlilik kehaneti değildir.
      </p>
    </div>
  );
}