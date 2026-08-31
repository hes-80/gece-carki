import { Engine, fmtLon } from "caelus";
import { embeddedData } from "caelus/data-embedded";
import { toUT } from "caelus-birth";
import { BirthInput, BodyReading, ChartResult, PlanetKey } from "./types";
import { buildCards } from "./interpret";

const engine = new Engine(embeddedData);

const PLANET_TR: Record<PlanetKey, string> = {
  sun: "Güneş",
  moon: "Ay",
  mercury: "Merkür",
  venus: "Venüs",
  mars: "Mars",
  jupiter: "Jüpiter",
  saturn: "Satürn",
  uranus: "Uranüs",
  neptune: "Neptün",
  pluto: "Plüton",
  true_node: "Kuzey Ay Düğümü",
  chiron: "Kiron",
};

const SIGN_TR: Record<string, string> = {
  Aries: "Koç",
  Taurus: "Boğa",
  Gemini: "İkizler",
  Cancer: "Yengeç",
  Leo: "Aslan",
  Virgo: "Başak",
  Libra: "Terazi",
  Scorpio: "Akrep",
  Sagittarius: "Yay",
  Capricorn: "Oğlak",
  Aquarius: "Kova",
  Pisces: "Balık",
};

const ASPECT_TR: Record<string, string> = {
  conjunction: "Kavuşum",
  opposition: "Karşıt",
  trine: "Üçgen",
  square: "Kare",
  sextile: "Sekstil",
};

function signFromLon(lon: number) {
  const signs = Object.keys(SIGN_TR);
  const idx = Math.floor((((lon % 360) + 360) % 360) / 30);
  return signs[idx] ?? "Aries";
}

function toBody(key: PlanetKey, raw: any): BodyReading | null {
  if (!raw || typeof raw.lon !== "number") return null;
  const sign = raw.sign ?? signFromLon(raw.lon);
  return {
    key,
    nameTr: PLANET_TR[key],
    lon: raw.lon,
    sign,
    signTr: SIGN_TR[sign] ?? sign,
    signDeg: raw.signDeg ?? (((raw.lon % 360) + 360) % 360) % 30,
    retrograde: Boolean(raw.retrograde),
    house: raw.house,
  };
}

export function computeChart(input: BirthInput): ChartResult {
  const hour = input.timeUnknown ? 12 : input.hour;
  const minute = input.timeUnknown ? 0 : input.minute;

  const converted = toUT({
    year: input.year,
    month: input.month,
    day: input.day,
    hour,
    minute,
    lat: input.place.lat,
    lon: input.place.lon,
    zone: input.place.timezone,
  });

  const chart = engine.chart(
    converted.utc.year,
    converted.utc.month,
    converted.utc.day,
    converted.utc.hour,
    converted.utc.minute ?? 0,
    0,
    input.place.lat,
    input.place.lon,
    input.houseSystem
  );

  const keys: PlanetKey[] = [
    "sun",
    "moon",
    "mercury",
    "venus",
    "mars",
    "jupiter",
    "saturn",
    "uranus",
    "neptune",
    "pluto",
    "true_node",
    "chiron",
  ];

  const bodies = keys
    .map((key) => toBody(key, (chart as any).bodies?.[key]))
    .filter((x): x is BodyReading => Boolean(x));

  const angles = (chart as any).angles ?? {};
  const ascLon = angles.asc ?? angles.ASC;
  const mcLon = angles.mc ?? angles.MC;
  const ascSign = typeof ascLon === "number" ? signFromLon(ascLon) : undefined;
  const mcSign = typeof mcLon === "number" ? signFromLon(mcLon) : undefined;

  const aspects = ((chart as any).aspects ?? [])
    .filter((a: any) =>
      ["conjunction", "opposition", "trine", "square", "sextile"].includes(a.aspect ?? a.type)
    )
    .slice(0, 18)
    .map((a: any) => {
      const type = a.aspect ?? a.type;
      return {
        a: a.a ?? a.body1,
        b: a.b ?? a.body2,
        type,
        typeTr: ASPECT_TR[type] ?? type,
        orb: Number(a.orb ?? 0),
      };
    });

  const timeStatus = input.timeUnknown
    ? "unknown"
    : ((converted as any).status as ChartResult["timeStatus"]);

  let timeWarning: string | undefined;
  if (input.timeUnknown) {
    timeWarning =
      "Saat bilinmediği için yükselen ve evler tahmini. Öğlen saati kullanıldı; Ay birkaç derece sapabilir.";
  } else if ((converted as any).status === "ambiguous") {
    timeWarning =
      "Bu dakika yaz saati geçişinde iki kez yaşanmış olabilir. Yükselen bir-iki derece oynayabilir.";
  } else if ((converted as any).status === "nonexistent") {
    timeWarning =
      "Bu saat o gece saatlerin ileri alınması yüzünden resmi olarak yok. En yakın geçerli ana çekildi.";
  }

  const result: ChartResult = {
    input,
    zone: (converted as any).zone,
    utcLabel: `${converted.utc.year}-${String(converted.utc.month).padStart(2, "0")}-${String(
      converted.utc.day
    ).padStart(2, "0")} ${String(converted.utc.hour).padStart(2, "0")}:${String(
      converted.utc.minute ?? 0
    ).padStart(2, "0")} UT`,
    timeStatus,
    timeWarning,
    bodies,
    ascendant:
      !input.timeUnknown && typeof ascLon === "number" && ascSign
        ? { sign: ascSign, signTr: SIGN_TR[ascSign], lon: ascLon }
        : undefined,
    midheaven:
      !input.timeUnknown && typeof mcLon === "number" && mcSign
        ? { sign: mcSign, signTr: SIGN_TR[mcSign], lon: mcLon }
        : undefined,
    aspects,
    cards: [],
  };

  result.cards = buildCards(result);
  return result;
}

export function prettyLon(lon: number) {
  try {
    return fmtLon(lon);
  } catch {
    return `${lon.toFixed(2)}°`;
  }
}