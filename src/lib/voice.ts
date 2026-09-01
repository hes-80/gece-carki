export function pickVoice(): SpeechSynthesisVoice | null {
  const voices = window.speechSynthesis.getVoices();
  if (!voices.length) return null;
  const ban = /male|tolga|ahmet|aydin|osman|david|mark|guy|ryan|yeltay|cem/;
  const prefer = [/emel/, /filiz/, /elif/, /yelda/, /online.*tr/, /neural/, /natural/, /female/, /woman/, /nova/, /shimmer/];
  const scored = voices.map((v) => {
    const n = (v.name + " " + v.lang).toLowerCase();
    let s = 0;
    if (v.lang.toLowerCase().startsWith("tr")) s += 20;
    prefer.forEach((re, i) => { if (re.test(n)) s += 40 - i; });
    if (ban.test(n)) s -= 80;
    return { v, s };
  });
  scored.sort((a, b) => b.s - a.s);
  if (scored[0].s > 0) return scored[0].v;
  return voices.find((v) => v.lang.toLowerCase().startsWith("tr")) || null;
}

export function moodOf(sign: string) {
  const k = sign.replace(/ç/g, "c").replace(/ğ/g, "g").replace(/ı/g, "i").replace(/ö/g, "o").replace(/ş/g, "s").replace(/ü/g, "u");
  if (["Koc", "Aslan", "Yay"].includes(k)) return "Ates grubu. Tempo hizli, sahne acik.";
  if (["Boga", "Basak", "Oglak"].includes(k)) return "Toprak grubu. Is ve beden onde.";
  if (["Ikizler", "Terazi", "Kova"].includes(k)) return "Hava grubu. Soz ve bag onde.";
  return "Su grubu. His ve ev onde.";
}

export async function speakText(raw: string) {
  const text = String(raw || "").replace(/[·•]/g, ", ").replace(/\s+/g, " ").trim();
  try {
    const res = await fetch("/api/speak", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text }),
    });
    if (res.ok) {
      const buf = await res.arrayBuffer();
      const url = URL.createObjectURL(new Blob([buf], { type: "audio/mpeg" }));
      const audio = new Audio(url);
      await audio.play();
      return;
    }
  } catch {}
  if (!window.speechSynthesis) return;
  window.speechSynthesis.cancel();
  const u = new SpeechSynthesisUtterance(text);
  u.lang = "tr-TR";
  u.rate = 0.88;
  const voice = pickVoice();
  if (voice) u.voice = voice;
  window.speechSynthesis.speak(u);
}
