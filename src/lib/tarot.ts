export type TarotDraw = {
  no: string;
  title: string;
  upright: string;
};

export const DECK: TarotDraw[] = [
  { no: "0", title: "Sözsüz", upright: "Bugün boşluk da bir cevaptır. Yeni bir isim koymadan önce dinle." },
  { no: "I", title: "Sihirbaz", upright: "Elindeki üç aracı birleştir. Küçük bir hareket sahneyi değiştirir." },
  { no: "II", title: "Rahibe", upright: "Gizli bilgi içeride. Hemen açıklama; bir gece daha taşı." },
  { no: "III", title: "İmparatoriçe", upright: "Besle, büyüt, aceleyi bırak. Verim sertlikten değil bakımdan gelir." },
  { no: "IV", title: "İmparator", upright: "Sınır çiz. Kural koy. Dağılan işi tek masaya topla." },
  { no: "V", title: "Bilge", upright: "Öğretmene veya kitaba sor. Bildiğin yolu bir kez daha oku." },
  { no: "VI", title: "Seçim", upright: "Kalp ile gurur aynı kapıda. Birini seç, ikisini birden kovalama." },
  { no: "VII", title: "Savaş Arabası", upright: "İki yönü tek hizde tut. Bugün irade, ilhamdan önce gelir." },
  { no: "VIII", title: "Güç", upright: "Sertlik değil nabız. Yumuşak tut, bırakınma." },
  { no: "IX", title: "Münevver", upright: "Tek başına durmak kaçış değil. Bir saatlik sessizlik yeter." },
  { no: "X", title: "Çark", upright: "Tur dönüyor. Kaybetmek gibi duran şey yer değiştiriyor olabilir." },
  { no: "XI", title: "Adalet", upright: "Teraziyi tart. Eksik söz varsa bugün tamamla." },
  { no: "XII", title: "Asılı", upright: "Ters dur. Acele karar iptal. Başka açıdan bak." },
  { no: "XIII", title: "Eşik", upright: "Biteni uğurla. Yeni oda eski mobilyayla açılmaz." },
  { no: "XIV", title: "Ölçü", upright: "Su ile ateşi karıştır. Aşıra kaçma, ritmi koru." },
  { no: "XV", title: "Bağ", upright: "Neye bağlandığını say. İster misin, yoksa alışkanlık mı?" },
  { no: "XVI", title: "Kule", upright: "Sahte tavan çökebilir. Korkma, hava oradan girer." },
  { no: "XVII", title: "Yıldız", upright: "İnce bir umut yeter. Gece ışığı da yol gösterir." },
  { no: "XVIII", title: "Ay", upright: "Sis var. Rüya ile korkuyu ayır. Hemen imza atma." },
  { no: "XIX", title: "Güneş", upright: "Sahne aydın. Görün, paylaş, saklama." },
  { no: "XX", title: "Çağrı", upright: "Eski bir hesap çalıyor. Cevap ver, erteleme." },
  { no: "XXI", title: "Dünya", upright: "Bir daire kapandı. Teslim et, alkışı al, yenisine geç." },
];

export function drawDaily(seed: string): TarotDraw {
  const day = new Date().toISOString().slice(0, 10);
  const s = day + "|" + seed;
  let h = 0;
  for (let i = 0; i < s.length; i++) h = (h * 33 + s.charCodeAt(i)) >>> 0;
  return DECK[h % DECK.length];
}