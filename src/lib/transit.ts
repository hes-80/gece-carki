import { Engine } from "caelus";
import { embeddedData } from "caelus/data-embedded";
import { ChartResult } from "./types";

const engine = new Engine(embeddedData);

const SIGN_TR: Record<string, string> = {
  Aries: "Ko\u00e7",
  Taurus: "Bo\u011fa",
  Gemini: "\u0130kizler",
  Cancer: "Yenge\u00e7",
  Leo: "Aslan",
  Virgo: "Ba\u015fak",
  Libra: "Terazi",
  Scorpio: "Akrep",
  Sagittarius: "Yay",
  Capricorn: "O\u011flak",
  Aquarius: "Kova",
  Pisces: "Bal\u0131k",
};

function signFromLon(lon: number) {
  const names = Object.keys(SIGN_TR);
  const idx = Math.floor((((lon % 360) + 360) % 360) / 30);
  return names[idx] ?? "Aries";
}

function bodySign(chart: any, key: string) {
  const raw = chart?.bodies?.[key];
  if (!raw || typeof raw.lon !== "number") return undefined;
  const en = raw.sign ?? signFromLon(raw.lon);
  return SIGN_TR[en] ?? en;
}

function houseForEngine(system: ChartResult["input"]["houseSystem"]) {
  return system === "whole-sign" ? "wholeSign" : system;
}

export function buildDaily(natal: ChartResult) {
  const now = new Date();
  const chart = engine.chart(
    now.getUTCFullYear(),
    now.getUTCMonth() + 1,
    now.getUTCDate(),
    now.getUTCHours(),
    now.getUTCMinutes(),
    0,
    natal.input.place.lat,
    natal.input.place.lon,
    houseForEngine(natal.input.houseSystem)
  );

  const sunN = natal.bodies.find((b) => b.key === "sun")?.signTr ?? "-";
  const moonN = natal.bodies.find((b) => b.key === "moon")?.signTr ?? "-";
  const sunT = bodySign(chart, "sun") ?? "-";
  const moonT = bodySign(chart, "moon") ?? "-";
  const mercT = bodySign(chart, "mercury") ?? "-";
  const venT = bodySign(chart, "venus") ?? "-";

  const sameSun = sunT === sunN;
  const sameMoon = moonT === moonN;

  return {
    label: now.toLocaleDateString("tr-TR"),
    sunT,
    moonT,
    headline: sameSun
      ? "Bug\u00fcn G\u00fcne\u015f senin G\u00fcne\u015f burcunda: sahne biraz daha senin."
      : `Bug\u00fcn G\u00fcne\u015f ${sunT}, senin G\u00fcne\u015fin ${sunN}. Tempo farkl\u0131, \u00e7apraz bak.`,
    luck:
      `G\u00fcnl\u00fck not: Ay ${moonT}. ` +
      (sameMoon
        ? "Ay senin Ay burcunda; i\u00e7 ritimle d\u0131\u015f ritim \u00fcst \u00fcste binebilir."
        : `Senin Ay\u0131n ${moonN}. K\u00fc\u00e7\u00fck bir i\u015f\u0131k yak, b\u00fcy\u00fck iddia etme.`) +
      ` Merk\u00fcr ${mercT} s\u00f6z ve i\u015f temposunu boyar.`,
    love:
      `A\u015fk: Ven\u00fcs ${venT}. Yak\u0131nl\u0131kta bug\u00fcn\u00fcn rengi bu. Ay ${moonT} dalgay\u0131, senin Ay\u0131n ${moonN} ev halini anlat\u0131r.`,
    money:
      `Para: G\u00fcne\u015f ${sunT}, Merk\u00fcr ${mercT}. Bir i\u015fi bitirmek, \u00fc\u00e7\u00fcn\u00fc a\u00e7\u0131k b\u0131rakmaktan daha temiz durur. Yat\u0131r\u0131m tavsiyesi de\u011fildir.`,
  };
}