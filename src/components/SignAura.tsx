"use client";

function keyOf(tr: string) {
  return tr
    .replace(/ç/g, "c").replace(/ğ/g, "g").replace(/ı/g, "i")
    .replace(/ö/g, "o").replace(/ş/g, "s").replace(/ü/g, "u");
}

function elOf(k: string) {
  if (["Koc", "Aslan", "Yay"].includes(k)) return "ates";
  if (["Boga", "Basak", "Oglak"].includes(k)) return "toprak";
  if (["Ikizler", "Terazi", "Kova"].includes(k)) return "hava";
  return "su";
}

export function SignAura({ signTr }: { signTr: string }) {
  const k = keyOf(signTr);
  const el = elOf(k);
  return (
    <div className={"aura aura-" + el} aria-hidden>
      {Array.from({ length: 8 }).map((_, i) => (
        <span key={i} style={{ animationDelay: i * 0.2 + "s" }} />
      ))}
      <em>{signTr}</em>
    </div>
  );
}