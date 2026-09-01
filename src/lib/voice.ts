export function pickVoice(): SpeechSynthesisVoice | null {
  const voices = window.speechSynthesis.getVoices();
  if (!voices.length) return null;
  const ban = /male|tolga|ahmet/;
  const prefer = [/emel/, /filiz/, /female/, /nova/, /shimmer/];
  const scored = voices.map((v) => {
    const n = (v.name + " " + v.lang).toLowerCase();
    let s = 0;
    if (v.lang.toLowerCase().startsWith("tr")) s += 10;
    prefer.forEach((re, i) => { if (re.test(n)) s += 30 - i; });
    if (ban.test(n)) s -= 80;
    return { v, s };
  });
  scored.sort((a, b) => b.s - a.s);
  return scored[0] && scored[0].s > 0 ? scored[0].v : null;
}

export function moodOf(sign: string) {
  const k = sign.replace(/ç/g,"c").replace(/ğ/g,"g").replace(/ı/g,"i").replace(/ö/g,"o").replace(/ş/g,"s").replace(/ü/g,"u");
  if (["Koc","Aslan","Yay"].includes(k)) return "Ates grubu.";
  if (["Boga","Basak","Oglak"].includes(k)) return "Toprak grubu.";
  if (["Ikizler","Terazi","Kova"].includes(k)) return "Hava grubu.";
  return "Su grubu.";
}

export async function speakText(raw: string) {
  try { window.speechSynthesis.cancel(); } catch {}
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
      await new Audio(url).play();
      return;
    }
  } catch {}
  if (!window.speechSynthesis) return;
  const u = new SpeechSynthesisUtterance(text);
  u.lang = "tr-TR";
  u.rate = 0.88;
  window.speechSynthesis.speak(u);
}