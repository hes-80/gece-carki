export function pickVoice(): SpeechSynthesisVoice | null {
  const voices = window.speechSynthesis.getVoices();
  if (!voices.length) return null;

  const ban = /male|tolga|ahmet|aydin|osman|david|mark|guy|ryan|yeltay|cem/;
  const prefer = [
    /emel/,
    /filiz/,
    /elif/,
    /yelda/,
    /online.*tr/,
    /neural.*tr/,
    /natural.*tr/,
    /female/,
    /woman/,
    /zira/,
    /aria/,
    /jenny/,
  ];

  const scored = voices.map((v) => {
    const n = (v.name + " " + v.lang).toLowerCase();
    let s = 0;
    if (v.lang.toLowerCase().startsWith("tr")) s += 20;
    prefer.forEach((re, i) => {
      if (re.test(n)) s += 40 - i;
    });
    if (ban.test(n)) s -= 80;
    return { v, s };
  });
  scored.sort((a, b) => b.s - a.s);
  return scored[0].s > 0 ? scored[0].v : voices.find((v) => v.lang.toLowerCase().startsWith("tr")) || null;
}

export function speakText(raw: string) {
  if (!window.speechSynthesis) return;
  const text = raw
    .replace(/[·•]/g, ", ")
    .replace(/\s+/g, " ")
    .replace(/Merkur/g, "Merkür")
    .replace(/Gunes/g, "Güneş")
    .replace(/Ates/g, "Ateş")
    .trim();

  window.speechSynthesis.cancel();
  const u = new SpeechSynthesisUtterance(text);
  u.lang = "tr-TR";
  u.rate = 0.88;
  u.pitch = 1.12;
  u.volume = 1;
  const voice = pickVoice();
  if (voice) u.voice = voice;
  window.speechSynthesis.speak(u);
}
export function moodOf(sign: string) {
  const k = sign
    .replace(/ç/g, "c")
    .replace(/ğ/g, "g")
    .replace(/ı/g, "i")
    .replace(/ö/g, "o")
    .replace(/ş/g, "s")
    .replace(/ü/g, "u")
    .replace(/Ç/g, "C")
    .replace(/İ/g, "I");
  if (["Koc", "Aslan", "Yay"].includes(k)) return "Ateş grubu. Tempo hızlı, sahne açık.";
  if (["Boga", "Basak", "Oglak"].includes(k)) return "Toprak grubu. İş ve beden önde.";
  if (["Ikizler", "Terazi", "Kova"].includes(k)) return "Hava grubu. Söz ve bağ önde.";
  return "Su grubu. His ve ev önde.";
}