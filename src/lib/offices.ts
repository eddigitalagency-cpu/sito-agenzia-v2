import { getPool } from './db';
import { getCountryByCode } from '../data/countries';
import type { Lang } from '../i18n/dictionary';

export interface OfficeMarker {
  code: string;
  lat: number;
  lng: number;
  label: string;
  mapsUrl: string;
}

/** Published offices, mapped to globe markers with a localized label. Call initDB() first. */
export async function getPublishedOfficeMarkers(lang: Lang): Promise<OfficeMarker[]> {
  const rows = (await getPool().query<{ country_code: string; region: string; province: string; city: string; street: string }>(
    'SELECT country_code, region, province, city, street FROM offices WHERE published=true ORDER BY display_order, id'
  )).rows;
  return rows.map((r) => {
    const c = getCountryByCode(r.country_code);
    const countryName = c ? c[lang] : r.country_code;
    // Short label for the footer/legend: city (or province as fallback) + country —
    // always understandable even when only the country was filled in.
    const label = [r.city || r.province, countryName].filter(Boolean).join(', ') || countryName;
    // Full address for the Google Maps query — as much detail as was entered.
    const fullAddress = [r.street, r.city, r.province, r.region, countryName].filter(Boolean).join(', ');
    const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(fullAddress)}`;
    return { code: r.country_code, lat: c?.lat ?? 0, lng: c?.lng ?? 0, label, mapsUrl };
  });
}
