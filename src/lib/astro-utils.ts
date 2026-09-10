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

export function nakshatra(profile: AstroProfile | null) {
  const list = [
    "Ashwini", "Bharani", "Krittika", "Rohini", "Mrigashira", "Ardra",
    "Punarvasu", "Pushya", "Ashlesha", "Magha", "Purva Phalguni", "Hasta",
  ];
  const seed = profile ? new Date(profile.dob).getDate() : 1;
  return list[seed % list.length];
}

const PLANETS = [
  { key: "Su", name: "Sun" },
  { key: "Mo", name: "Moon" },
  { key: "Ma", name: "Mars" },
  { key: "Me", name: "Mercury" },
  { key: "Ju", name: "Jupiter" },
  { key: "Ve", name: "Venus" },
  { key: "Sa", name: "Saturn" },
  { key: "Ra", name: "Rahu" },
  { key: "Ke", name: "Ketu" },
];

const ZODIAC = [
  "Aries", "Taurus", "Gemini", "Cancer", "Leo", "Virgo",
  "Libra", "Scorpio", "Sagittarius", "Capricorn", "Aquarius", "Pisces",
];

function seedFrom(profile: AstroProfile | null) {
  if (!profile) return 7;
  const d = new Date(profile.dob);
  const t = (profile.tob || "00:00").split(":").map(Number);
  let s = d.getDate() + (d.getMonth() + 1) * 31 + d.getFullYear();
  s += (t[0] || 0) * 60 + (t[1] || 0);
  for (const ch of profile.pob || "") s += ch.charCodeAt(0);
  return s;
}

export interface BirthChartData {
  ascendant: string; // zodiac sign of 1st house
  ascIndex: number;
  houses: { planets: { key: string; name: string }[] }[]; // length 12, house 1..12
}

export function birthChart(profile: AstroProfile | null): BirthChartData {
  const seed = seedFrom(profile);
  const ascIndex = seed % 12;
  const houses: { planets: { key: string; name: string }[] }[] = Array.from(
    { length: 12 },
    () => ({ planets: [] }),
  );
  PLANETS.forEach((p, i) => {
    const house = (seed * (i + 3) + i * 7) % 12;
    houses[house].planets.push(p);
  });
  return { ascendant: ZODIAC[ascIndex], ascIndex, houses };
}

export function signForHouse(ascIndex: number, houseNum: number) {
  return ZODIAC[(ascIndex + houseNum - 1) % 12];
}
