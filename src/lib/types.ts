export type HouseSystem = "placidus" | "whole-sign" | "koch" | "equal";
export type TimeStatus = "ok" | "ambiguous" | "nonexistent" | "unknown";
export type PlaceHit = {
  label: string; city: string; country: string; countryCode: string;
  lat: number; lon: number; timezone?: string;
};
export type BirthInput = {
  name: string; year: number; month: number; day: number;
  hour: number; minute: number; timeUnknown: boolean;
  place: PlaceHit; houseSystem: HouseSystem; acceptedDisclaimer: boolean;
};
export type PlanetKey =
  | "sun" | "moon" | "mercury" | "venus" | "mars"
  | "jupiter" | "saturn" | "uranus" | "neptune" | "pluto"
  | "true_node" | "chiron";
export type BodyReading = {
  key: PlanetKey; nameTr: string; lon: number; sign: string;
  signTr: string; signDeg: number; retrograde: boolean; house?: number;
};
export type AspectReading = { a: string; b: string; type: string; typeTr: string; orb: number; };
export type TopicId = "luck" | "love" | "money" | "health" | "career" | "spirit";
export type TopicCard = { id: TopicId; title: string; headline: string; body: string; keys: string[]; };
export type ChartResult = {
  input: BirthInput; zone: string; utcLabel: string; timeStatus: TimeStatus;
  timeWarning?: string; bodies: BodyReading[];
  ascendant?: { sign: string; signTr: string; lon: number };
  midheaven?: { sign: string; signTr: string; lon: number };
  aspects: AspectReading[]; cards: TopicCard[];
};