import { ChartResult } from "@/lib/types";

function sign(result: ChartResult, key: string) {
  return result.bodies.find((b) => b.key === key)?.signTr ?? "";
}

export function natalHeadline(id: string, result: ChartResult) {
  const sun = sign(result, "sun");
  const moon = sign(result, "moon");
  const ven = sign(result, "venus");
  const mer = sign(result, "mercury");
  const mar = sign(result, "mars");
  const jup = sign(result, "jupiter");
  const sat = sign(result, "saturn");
  const rise = result.ascendant?.signTr ?? sun;

  if (id === "luck") return sun + " sahne, " + jup + " açılım";
  if (id === "love") return ven + " çekim, " + moon + " ev hali";
  if (id === "money") return sun + " değer, " + mer + " tempo";
  if (id === "health") return moon + " ritim, " + mar + " hareket";
  if (id === "career") return sat + " iskele, " + rise + " kapı";
  if (id === "spirit") return sun + " öz, " + moon + " iç oda";
  return sun + " · " + moon;
}