import { useEffect, useRef, useState, useCallback } from 'react';
import Globe, { type GlobeMethods } from 'react-globe.gl';

export interface OfficeMarker {
  code: string;
  lat: number;
  lng: number;
  label: string;
  mapsUrl: string;
}

interface Props {
  offices: OfficeMarker[];
}

// Brand palette applied to the globe
const LAND_COLOR   = 'rgba(120,120,128,0.85)';  // grey continents
const LAND_HOVER   = 'rgba(255,106,0,0.35)';    // orange tint on hover
const BORDER_COLOR = '#FF6A00';                 // orange country borders
const OCEAN_COLOR  = 'rgba(10,10,10,1)';
const ATMOSPHERE   = '#FF6A00';

export default function WorldGlobe({ offices }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const globeRef = useRef<GlobeMethods | undefined>(undefined);
  const [size, setSize] = useState({ width: 320, height: 320 });
  const [countries, setCountries] = useState<{ features: object[] }>({ features: [] });
  const [hovered, setHovered] = useState<object | null>(null);

  useEffect(() => {
    fetch('/data/world-countries.geojson')
      .then((r) => r.json())
      .then((data) => setCountries(data))
      .catch(() => {});
  }, []);

  const measure = useCallback(() => {
    const el = containerRef.current;
    if (!el) return;
    const width = el.clientWidth;
    // Wide frame like before, just a bit taller — combined with the zoom cap
    // below, that keeps the globe from ever reaching the top/bottom edges.
    setSize({ width, height: Math.min(width, 640) });
  }, []);

  useEffect(() => {
    measure();
    window.addEventListener('resize', measure);
    return () => window.removeEventListener('resize', measure);
  }, [measure]);

  // Slow auto-rotate; pauses naturally while the user drags.
  // minDistance caps how far the user can zoom in, so the globe can never grow
  // past the edges of its (square) frame and get clipped.
  useEffect(() => {
    const g = globeRef.current;
    if (!g) return;
    const controls = g.controls() as unknown as {
      autoRotate: boolean; autoRotateSpeed: number; minDistance: number; maxDistance: number;
    } | null;
    if (controls) {
      controls.autoRotate = true;
      controls.autoRotateSpeed = 0.5;
      controls.minDistance = 145;
      controls.maxDistance = 500;
    }
    g.pointOfView({ altitude: 2.2 }, 0);
  }, [size]);

  return (
    <div ref={containerRef} className="w-full flex justify-center" style={{ minHeight: size.height }}>
      <Globe
        ref={globeRef as never}
        width={size.width}
        height={size.height}
        backgroundColor="rgba(0,0,0,0)"
        globeImageUrl={null as unknown as string}
        showGlobe={true}
        showAtmosphere={true}
        atmosphereColor={ATMOSPHERE}
        atmosphereAltitude={0.18}
        globeMaterial={{ color: OCEAN_COLOR, transparent: false } as never}
        polygonsData={countries.features}
        polygonCapColor={(d) => (d === hovered ? LAND_HOVER : LAND_COLOR)}
        polygonSideColor={() => 'rgba(20,20,20,0.9)'}
        polygonStrokeColor={() => BORDER_COLOR}
        polygonAltitude={(d) => (d === hovered ? 0.02 : 0.008)}
        polygonsTransitionDuration={200}
        onPolygonHover={(d) => setHovered(d ?? null)}
        pointsData={offices}
        pointLat="lat"
        pointLng="lng"
        pointColor={() => '#FF6A00'}
        pointAltitude={0.02}
        pointRadius={0.45}
        pointLabel={(d) => (d as OfficeMarker).label}
        pointsMerge={false}
        ringsData={offices}
        ringLat="lat"
        ringLng="lng"
        ringColor={() => (t: number) => `rgba(255,106,0,${1 - t})`}
        ringMaxRadius={4}
        ringPropagationSpeed={2}
        ringRepeatPeriod={1600}
      />
    </div>
  );
}
