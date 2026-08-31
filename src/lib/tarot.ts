export type TarotDraw = {
  no: string;
  title: string;
  upright: string;
};

export const DECK: TarotDraw[] = [
  { no: "0", title: "Sozsuz", upright: "Bugun bosluk da bir cevaptir. Yeni bir isim koymadan once dinle." },
  { no: "I", title: "Sihirbaz", upright: "Elindeki uc araci birlestir. Kucuk bir hareket sahneyi degistirir." },
  { no: "II", title: "Rahibe", upright: "Gizli bilgi iceride. Hemen aciklama; bir gece daha tasi." },
  { no: "III", title: "Imparatorice", upright: "Besle, buyut, aceleyi birak. Verim sertlikten degil bakimdan gelir." },
  { no: "IV", title: "Imparator", upright: "Sinir ciz. Kural koy. Dagilan isi tek masaya topla." },
  { no: "V", title: "Bilge", upright: "Ogretmene veya kitaba sor. Bildigin yolu bir kez daha oku." },
  { no: "VI", title: "Secim", upright: "Kalp ile gurur ayni kapida. Birini sec, ikisini birden kovalama." },
  { no: "VII", title: "Savas Arabasi", upright: "Iki yonu tek hizde tut. Bugun irade, ilhamdan once gelir." },
  { no: "VIII", title: "Guc", upright: "Sertlik degil nabiz. Yumusak tut, birakinma." },
  { no: "IX", title: "Munevver", upright: "Tek basina durmak kacis degil. Bir saatlik sessizlik yeter." },
  { no: "X", title: "Cark", upright: "Tur donuyor. Kaybetmek gibi duran sey yer degistiriyor olabilir." },
  { no: "XI", title: "Adalet", upright: "Teraziyi tart. Eksik soz varsa bugun tamamla." },
  { no: "XII", title: "Asili", upright: "Ters dur. Acele karar iptal. Baska acidan bak." },
  { no: "XIII", title: "Esik", upright: "Biteni ugurla. Yeni oda eski mobilyayla acilmaz." },
  { no: "XIV", title: "Olcu", upright: "Su ile atesi karistir. Asiriya kacma, ritmi koru." },
  { no: "XV", title: "Bag", upright: "Neye baglandigini say. Ister misin, yoksa aliskanlik mi?" },
  { no: "XVI", title: "Kule", upright: "Sahte tavan cokebilir. Korkma, hava oradan girer." },
  { no: "XVII", title: "Yildiz", upright: "Ince bir umut yeter. Gece isigi da yol gosterir." },
  { no: "XVIII", title: "Ay", upright: "Sis var. Ruya ile korkuyu ayir. Hemen imza atma." },
  { no: "XIX", title: "Gunes", upright: "Sahne aydin. Gorun, paylaş, saklama." },
  { no: "XX", title: "Cagri", upright: "Eski bir hesap capliyor. Cevap ver, erteleme." },
  { no: "XXI", title: "Dunya", upright: "Bir daire kapandi. Teslim et, alkisi al, yenisine gec." },
];

export function drawDaily(seed: string): TarotDraw {
  const day = new Date().toISOString().slice(0, 10);
  const s = `${day}|${seed}`;
  let h = 0;
  for (let i = 0; i < s.length; i++) h = (h * 33 + s.charCodeAt(i)) >>> 0;
  return DECK[h % DECK.length];
}