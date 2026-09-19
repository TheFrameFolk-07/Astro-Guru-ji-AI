import * as Astronomy from "astronomy-engine";
import type { AstroProfile } from "./astro-context";

const SIGNS = [
  { name: "Capricorn", from: [12, 22], to: [1, 19], element: "Earth", ruler: "Saturn" },
  { name: "Aquarius", from: [1, 20], to: [2, 18], element: "Air", ruler: "Saturn" },
  { name: "Pisces", from: [2, 19], to: [3, 20], element: "Water", ruler: "Jupiter" },
  { name: "Aries", from: [3, 21], to: [4, 19], element: "Fire", ruler: "Mars" },
  { name: "Taurus", from: [4, 20], to: [5, 20], element: "Earth", ruler: "Venus" },
  { name: "Gemini", from: [5, 21], to: [6, 20], element: "Air", ruler: "Mercury" },
  { name: "Cancer", from: [6, 21], to: [7, 22], element: "Water", ruler: "Moon" },
  { name: "Leo", from: [7, 23], to: [8, 22], element: "Fire", ruler: "Sun" },
  { name: "Virgo", from: [8, 23], to: [9, 22], element: "Earth", ruler: "Mercury" },
  { name: "Libra", from: [9, 23], to: [10, 22], element: "Air", ruler: "Venus" },
  { name: "Scorpio", from: [10, 23], to: [11, 21], element: "Water", ruler: "Mars" },
  { name: "Sagittarius", from: [11, 22], to: [12, 21], element: "Fire", ruler: "Jupiter" },
];

export function getSign(dob: string) {
  if (!dob) return SIGNS[3];
  const d = new Date(dob);
  const m = d.getMonth() + 1;
  const day = d.getDate();
  for (const s of SIGNS) {
    const [fm, fd] = s.from;
    const [tm, td] = s.to;
    if (fm === tm) {
      if (m === fm && day >= fd && day <= td) return s;
    } else if ((m === fm && day >= fd) || (m === tm && day <= td)) {
      return s;
    }
  }
  return SIGNS[0];
}

export function birthYear(dob: string) {
  if (!dob) return new Date().getFullYear();
  return new Date(dob).getFullYear();
}

export function firstName(name: string) {
  return name?.trim().split(" ")[0] || "Seeker";
}

const ZODIAC = [
  "Aries", "Taurus", "Gemini", "Cancer", "Leo", "Virgo",
  "Libra", "Scorpio", "Sagittarius", "Capricorn", "Aquarius", "Pisces",
];

const NAKSHATRAS = [
  "Ashwini", "Bharani", "Krittika", "Rohini", "Mrigashira", "Ardra",
  "Punarvasu", "Pushya", "Ashlesha", "Magha", "Purva Phalguni", "Uttara Phalguni",
  "Hasta", "Chitra", "Swati", "Vishakha", "Anuradha", "Jyeshtha",
  "Mula", "Purva Ashadha", "Uttara Ashadha", "Shravana", "Dhanishta",
  "Shatabhisha", "Purva Bhadrapada", "Uttara Bhadrapada", "Revati",
];

const BODIES: { key: string; name: string; body: Astronomy.Body }[] = [
  { key: "Su", name: "Sun", body: Astronomy.Body.Sun },
  { key: "Mo", name: "Moon", body: Astronomy.Body.Moon },
  { key: "Ma", name: "Mars", body: Astronomy.Body.Mars },
  { key: "Me", name: "Mercury", body: Astronomy.Body.Mercury },
  { key: "Ju", name: "Jupiter", body: Astronomy.Body.Jupiter },
  { key: "Ve", name: "Venus", body: Astronomy.Body.Venus },
  { key: "Sa", name: "Saturn", body: Astronomy.Body.Saturn },
];

const DEFAULT_LAT = 28.6139; // New Delhi fallback
const DEFAULT_LON = 77.209;
const DEFAULT_TZ = "Asia/Kolkata";

const norm = (d: number) => ((d % 360) + 360) % 360;
const rad = (d: number) => (d * Math.PI) / 180;
const deg = (r: number) => (r * 180) / Math.PI;

/** Convert a wall-clock date+time in an IANA timezone to a real UTC instant. */
function zonedToUtc(dob: string, tob: string, tz: string): Date {
  const base = Date.parse(`${dob}T${(tob || "12:00").slice(0, 5)}:00Z`);
  if (Number.isNaN(base)) return new Date();
  let utc = base;
  for (let i = 0; i < 2; i++) {
    const offset = tzOffsetMs(new Date(utc), tz);
    utc = base - offset;
  }
  return new Date(utc);
}

function tzOffsetMs(date: Date, tz: string): number {
  try {
    const dtf = new Intl.DateTimeFormat("en-US", {
      timeZone: tz,
      hour12: false,
      year: "numeric", month: "2-digit", day: "2-digit",
      hour: "2-digit", minute: "2-digit", second: "2-digit",
    });
    const p = Object.fromEntries(dtf.formatToParts(date).map((x) => [x.type, x.value]));
    const asUtc = Date.UTC(
      Number(p.year), Number(p.month) - 1, Number(p.day),
      Number(p.hour) % 24, Number(p.minute), Number(p.second),
    );
    return asUtc - date.getTime();
  } catch {
    return 5.5 * 3600 * 1000;
  }
}

/** Lahiri (Chitrapaksha) ayanamsa in degrees for a given instant. */
function ayanamsa(date: Date): number {
  const T = (date.getTime() / 86400000 + 2440587.5 - 2451545.0) / 36525;
  return 23.85300 + 1.396042 * T + 0.0003086 * T * T;
}

/** Mean lunar node (Rahu), tropical longitude. */
function meanNode(date: Date): number {
  const T = (date.getTime() / 86400000 + 2440587.5 - 2451545.0) / 36525;
  return norm(125.0445479 - 1934.1362891 * T + 0.0020754 * T * T);
}

function obliquity(date: Date): number {
  const T = (date.getTime() / 86400000 + 2440587.5 - 2451545.0) / 36525;
  return 23.4392911 - 0.0130042 * T - 1.64e-7 * T * T;
}

export interface Placement {
  key: string;
  name: string;
  longitude: number; // sidereal ecliptic longitude, 0-360
  signIndex: number;
  sign: string;
  degree: number; // degrees within the sign
  retrograde: boolean;
  nakshatra: string;
}

export interface BirthChartData {
  ascendant: string;
  ascIndex: number;
  ascDegree: number;
  houses: { planets: Placement[] }[]; // whole-sign houses 1..12
  planets: Placement[];
  moonNakshatra: string;
  utc: Date;
  lat: number;
  lon: number;
  tz: string;
  exact: boolean; // true when birth place coordinates are known
}

function placement(key: string, name: string, lonSidereal: number, retrograde: boolean): Placement {
  const l = norm(lonSidereal);
  const signIndex = Math.floor(l / 30);
  return {
    key,
    name,
    longitude: l,
    signIndex,
    sign: ZODIAC[signIndex],
    degree: l - signIndex * 30,
    retrograde,
    nakshatra: NAKSHATRAS[Math.floor(l / (360 / 27)) % 27],
  };
}

function geoLongitude(body: Astronomy.Body, date: Date): number {
  const vec = Astronomy.GeoVector(body, date, true);
  return Astronomy.Ecliptic(vec).elon;
}

export function birthChart(profile: AstroProfile | null): BirthChartData {
  const lat = profile?.lat ?? DEFAULT_LAT;
  const lon = profile?.lon ?? DEFAULT_LON;
  const tz = profile?.tz ?? DEFAULT_TZ;
  const utc = profile?.dob
    ? zonedToUtc(profile.dob, profile.tob, tz)
    : new Date();

  const ayan = ayanamsa(utc);

  const planets: Placement[] = BODIES.map(({ key, name, body }) => {
    const l = geoLongitude(body, utc);
    let retro = false;
    if (body !== Astronomy.Body.Sun && body !== Astronomy.Body.Moon) {
      const later = geoLongitude(body, new Date(utc.getTime() + 86400000));
      retro = norm(later - l) > 180;
    }
    return placement(key, name, l - ayan, retro);
  });

  const node = meanNode(utc);
  planets.push(placement("Ra", "Rahu", node - ayan, true));
  planets.push(placement("Ke", "Ketu", node + 180 - ayan, true));

  // Ascendant from local sidereal time and geographic latitude.
  const gstHours = Astronomy.SiderealTime(utc); // Greenwich apparent sidereal time
  const lstDeg = norm(gstHours * 15 + lon);
  const eps = obliquity(utc);
  const ascTropical = norm(
    deg(
      Math.atan2(
        Math.cos(rad(lstDeg)),
        -(Math.sin(rad(lstDeg)) * Math.cos(rad(eps)) + Math.tan(rad(lat)) * Math.sin(rad(eps))),
      ),
    ),
  );
  const asc = norm(ascTropical - ayan);
  const ascIndex = Math.floor(asc / 30);

  const houses: { planets: Placement[] }[] = Array.from({ length: 12 }, () => ({ planets: [] }));
  for (const p of planets) {
    const house = norm((p.signIndex - ascIndex) * 30) / 30;
    houses[house].planets.push(p);
  }

  const moon = planets.find((p) => p.key === "Mo")!;

  return {
    ascendant: ZODIAC[ascIndex],
    ascIndex,
    ascDegree: asc - ascIndex * 30,
    houses,
    planets,
    moonNakshatra: moon.nakshatra,
    utc,
    lat,
    lon,
    tz,
    exact: profile?.lat != null && profile?.lon != null,
  };
}

export function nakshatra(profile: AstroProfile | null) {
  return birthChart(profile).moonNakshatra;
}

export function signForHouse(ascIndex: number, houseNum: number) {
  return ZODIAC[(ascIndex + houseNum - 1) % 12];
}
