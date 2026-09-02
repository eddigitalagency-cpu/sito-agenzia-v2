import { getPool } from './db';
import { getCountryByCode } from '../data/countries';
import type { Lang } from '../i18n/dictionary';

export interface OfficeMarker {
  code: string;
  lat: number;
  lng: number;
  label: string;
}

/** Published offices, mapped to globe markers with a localized label. Call initDB() first. */
export async function getPublishedOfficeMarkers(lang: Lang): Promise<OfficeMarker[]> {
  const rows = (await getPool().query<{ country_code: string; region: string; province: string; street: string }>(
    'SELECT country_code, region, province, street FROM offices WHERE published=true ORDER BY display_order, id'
  )).rows;
  return rows.map((r) => {
    const c = getCountryByCode(r.country_code);
    const countryName = c ? c[lang] : r.country_code;
    const label = [r.street, r.province, countryName].filter(Boolean).join(', ') || countryName;
    return { code: r.country_code, lat: c?.lat ?? 0, lng: c?.lng ?? 0, label };
  });
}
