import { ChartResult, TopicCard } from "./types";

export function buildCards(chart: ChartResult): TopicCard[] {
  const sun = chart.bodies.find((b) => b.key === "sun")?.signTr ?? "bilinmeyen";
  const moon = chart.bodies.find((b) => b.key === "moon")?.signTr ?? "bilinmeyen";
  const venus = chart.bodies.find((b) => b.key === "venus")?.signTr ?? "belirsiz";
  const mars = chart.bodies.find((b) => b.key === "mars")?.signTr ?? "belirsiz";
  const jupiter = chart.bodies.find((b) => b.key === "jupiter")?.signTr ?? "belirsiz";
  const saturn = chart.bodies.find((b) => b.key === "saturn")?.signTr ?? "belirsiz";
  const rising = chart.ascendant?.signTr ?? "saat yok";
  const keys = [`Güneş ${sun}`, `Ay ${moon}`, `Yükselen ${rising}`];

  const cards: TopicCard[] = [
    {
      id: "luck", title: "Şans", headline: `Kapı: ${rising}`, keys,
      body: `Bu doğum haritası okumasıdır, günlük burç değildir. Güneş ${sun} sahnedeki iraden, Ay ${moon} zamanlaman, yükselen ${rising} kapından nasıl girdiğindir. Jüpiter ${jupiter} genişleme iştahını boyar. Küçük bir kapıyı üç kez çalmak, büyük kapıda beklemekten daha çok yakışır. Kehanet değil, sahne tarifidir.`,
    },
    {
      id: "love", title: "Aşk", headline: `${venus} çekim, ${moon} bağ`, keys,
      body: `Aşk kartı teşhis değil ritimdir. Venüs ${venus} ısınma biçimin, Ay ${moon} ev hali ve bağın gece yüzü, Güneş ${sun} ilişkide görünmek istediğin ışıktır. Yükselen ${rising}: karşı taraf önce duruşunu görür. Acele evreni sıkıştırır, mesafe hikâyeyi soğutur. Tempo Ay’dadır.`,
    },
    {
      id: "money", title: "Para", headline: `${venus} değer, ${jupiter} genişleme`, keys,
      body: `Para kartı yatırım tavsiyesi değildir. Venüs ${venus} değer ölçün, Jüpiter ${jupiter} büyüme iştahın, Güneş ${sun} çalışma kimliğin, Ay ${moon} güvenlik ihtiyacındır. Yükselen ${rising} pazarlıktaki ilk kapıdır. Harita zengin etmez; deliğin ve tempoun haritasını çizer.`,
    },
    {
      id: "health", title: "Sağlık", headline: `${mars} hareket, ${moon} ritim`, keys,
      body: `Sağlık kartı tıbbi teşhis değildir. Güneş ${sun} canlılık temposu, Ay ${moon} uyku ve alışkanlık, Mars ${mars} hareket ve atak tarzı, Satürn ${saturn} uzun vadeli bakım ve sınırdır. Vücut bir takvimdir. Bu satır tedavi planı değil, ritim metaforudur.`,
    },
    {
      id: "career", title: "Kariyer", headline: `${sun} sahne, ${saturn} iskelet`, keys,
      body: `Kariyer kartı iş vaadi değildir. Güneş ${sun} görünmek istediğin meslek ışığı, Satürn ${saturn} disiplin ve zaman, yükselen ${rising} ilk izlenim, Jüpiter ${jupiter} büyüme koridorudur. Kapı açılır ama merdiven Satürn’dedir.`,
    },
    {
      id: "spirit", title: "Ruh", headline: `${moon} iç oda, ${sun} anlam`, keys,
      body: `Ruh kartı dini hüküm değildir. Ay ${moon} iç oda, Güneş ${sun} anlam arayışı, yükselen ${rising} dünyaya bakış açındır. Sessizlik de bir burç dilidir. Bu sahne teselli için değil, iç haritayı göstermek içindir.`,
    },
  ];
  return cards;
}