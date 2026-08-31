export type PlaceHit = {
  city: string;
  country: string;
  countryCode: string;
  lat: number;
  lon: number;
  label: string;
  timezone?: string;
};

export async function searchPlaces(query: string): Promise<PlaceHit[]> {
  const q = query.trim();
  if (q.length < 2) return [];
  const url =
    "https://geocoding-api.open-meteo.com/v1/search?name=" +
    encodeURIComponent(q) +
    "&count=10&language=tr";
  const res = await fetch(url);
  if (!res.ok) return [];
  const json = await res.json();
  const raw = (json.results ?? []) as any[];
  const mapped: PlaceHit[] = raw.map((r) => ({
    city: r.name,
    country: r.country ?? "",
    countryCode: String(r.country_code ?? ""),
    lat: r.latitude,
    lon: r.longitude,
    label: [r.name, r.admin1, r.country].filter(Boolean).join(", "),
    timezone: r.timezone,
  }));
  mapped.sort((a, b) => {
    const at = /turkiye|t\u00fcrkiye|turkey/i.test(a.country) ? 0 : 1;
    const bt = /turkiye|t\u00fcrkiye|turkey/i.test(b.country) ? 0 : 1;
    return at - bt;
  });
  return mapped;
}