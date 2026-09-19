export interface GeoResult {
  lat: number;
  lon: number;
  tz: string;
  label: string;
}

/** Look up coordinates + timezone for a free-text place name (Open-Meteo, no API key). */
export async function geocodePlace(place: string): Promise<GeoResult | null> {
  const q = place.trim();
  if (!q) return null;
  try {
    const res = await fetch(
      `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(
        q.split(",")[0].trim(),
      )}&count=1&language=en&format=json`,
    );
    if (!res.ok) return null;
    const json = (await res.json()) as {
      results?: { latitude: number; longitude: number; timezone?: string; name: string; country?: string }[];
    };
    const r = json.results?.[0];
    if (!r) return null;
    return {
      lat: r.latitude,
      lon: r.longitude,
      tz: r.timezone || "Asia/Kolkata",
      label: [r.name, r.country].filter(Boolean).join(", "),
    };
  } catch {
    return null;
  }
}
