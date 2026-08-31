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
      " Sans burada piyango vaadi degil, kapi secme aliskanligidir. Gunes " + sun +
      " sahneyi, Jupiler " + jup + " genisleme istahini, Yukselen " + rise +
      " ilk adimi anlatir. Ayni kapıyı uc kez denemek bazen yeni sehir aramaktan temiz durur.",
    love:
      " Askta Venüs " + ven + " neyin degerli sayildigini, Ay " + moon +
      " ev halini, Gunes " + sun + " gurur cizgisini boyar. Iliski tahmini degil, ritim haritasidir.",
    money:
      " Para dilinde Merkur " + mer + " pazarlik temposu, Venüs " + ven +
      " fiyat duygusu, Jupiler " + jup + " buyume istahidir. Yatirim tavsiyesi degildir.",
    health:
      " Saglik karti teshis degildir. Gunes " + sun + " canlilk, Ay " + moon +
      " uyku ritmi, Merkur " + mer + " sinir temposunu metafor olarak anlatir.",
    career:
      " Kariyerde Yukselen " + rise + " ilk izlenim, Merkur " + mer +
      " soz ve is plani, Gunes " + sun + " sahne secimidir. Unvan kehaneti degildir.",
    spirit:
      " Ruh karti dini hukum degildir. Ay " + moon + " ic oda, Gunes " + sun +
      " anlam arayisi, Yukselen " + rise + " dunya ile kurulan esiktir.",
  };

  return card.body + " " + (tail[card.id] ?? "");
}