/**
 * Server-side geocoding via OpenStreetMap Nominatim (free, no API key).
 * Used when an office is saved in the admin, so the map pin sits on the
 * actual city/address instead of the country's centroid.
 * https://operations.osmfoundation.org/policies/nominatim/ — max 1 req/s,
 * identifying User-Agent required. Called only on admin save, so well within bounds.
 */
export async function geocodeAddress(query: string): Promise<{ lat: number; lng: number } | null> {
  const q = query.trim();
  if (!q) return null;
  try {
    const url = `https://nominatim.openstreetmap.org/search?format=json&limit=1&q=${encodeURIComponent(q)}`;
    const res = await fetch(url, {
      headers: { 'User-Agent': 'EDDigitalAgencyWebsite/1.0 (admin office geocoding; info@eddigitalagency.it)' },
      signal: AbortSignal.timeout(6000),
    });
    if (!res.ok) return null;
    const data = (await res.json()) as { lat: string; lon: string }[];
    const first = data[0];
    if (!first) return null;
    const lat = parseFloat(first.lat);
    const lng = parseFloat(first.lon);
    if (Number.isNaN(lat) || Number.isNaN(lng)) return null;
    return { lat, lng };
  } catch {
    return null;
  }
}
