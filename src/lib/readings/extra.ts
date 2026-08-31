import { ChartResult, TopicCard } from "../types";

export function extendCard(card: TopicCard, result: ChartResult): string {
  const sun = result.bodies.find((b) => b.key === "sun")?.signTr ?? "-";
  const moon = result.bodies.find((b) => b.key === "moon")?.signTr ?? "-";
  const ven = result.bodies.find((b) => b.key === "venus")?.signTr ?? "-";
  const mer = result.bodies.find((b) => b.key === "mercury")?.signTr ?? "-";
  const jup = result.bodies.find((b) => b.key === "jupiter")?.signTr ?? "-";
  const rise = result.ascendant?.signTr ?? "saat yok";

  const tail: Record<string, string> = {
    luck:
      " Şans burada piyango vaadi değil, kapı seçme alışkanlığıdır. Güneş " +
      sun +
      " sahneyi, Jüpiter " +
      jup +
      " genişleme iştahını, yükselen " +
      rise +
      " ilk adımı anlatır. Aynı kapıyı üç kez denemek bazen yeni şehir aramaktan temiz durur.",
    love:
      " Aşkta Venüs " +
      ven +
      " neyin değerli sayıldığını, Ay " +
      moon +
      " ev halini, Güneş " +
      sun +
      " gurur çizgisini boyar. İlişki tahmini değil, ritim haritasıdır.",
    money:
      " Para dilinde Merkür " +
      mer +
      " pazarlık temposu, Venüs " +
      ven +
      " fiyat duygusu, Jüpiter " +
      jup +
      " büyüme iştahıdır. Yatırım tavsiyesi değildir.",
    health:
      " Sağlık kartı teşhis değildir. Güneş " +
      sun +
      " canlılık, Ay " +
      moon +
      " uyku ritmi, Merkür " +
      mer +
      " sinir temposunu metafor olarak anlatır.",
    career:
      " Kariyerde yükselen " +
      rise +
      " ilk izlenim, Merkür " +
      mer +
      " söz ve iş planı, Güneş " +
      sun +
      " sahne seçimidir. Unvan kehaneti değildir.",
    spirit:
      " Ruh kartı dini hüküm değildir. Ay " +
      moon +
      " iç oda, Güneş " +
      sun +
      " anlam arayışı, yükselen " +
      rise +
      " dünya ile kurulan eşiktir.",
  };

  return card.body + " " + (tail[card.id] ?? "");
}