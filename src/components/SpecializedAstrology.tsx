import { useState } from "react";
import {
  Activity,
  Brain,
  ChevronRight,
  Droplet,
  Fingerprint,
  Globe2,
  HeartPulse,
  HelpCircle,
  Heart,
  Leaf,
  ScrollText,
  Sun,
  Wind,
  X,
} from "lucide-react";
import { useAstro } from "@/lib/astro-context";
import { birthYear, firstName, getSign } from "@/lib/astro-utils";

type ModuleId = "nadi" | "lal" | "mundane" | "horary" | "medical";

const CARDS: {
  id: ModuleId;
  title: string;
  hindi: string;
  desc: string;
  icon: React.ReactNode;
}[] = [
  { id: "nadi", title: "Nadi Astrology", hindi: "नाड़ी ज्योतिष", desc: "Thumbprint Destiny Finder", icon: <Fingerprint /> },
  { id: "lal", title: "Lal Kitab", hindi: "लाल किताब", desc: "Planetary Dosha & Remedies", icon: <ScrollText /> },
  { id: "mundane", title: "Mundane Astrology", hindi: "मेदिनी ज्योतिष", desc: "Global & National Predictions", icon: <Globe2 /> },
  { id: "horary", title: "Horary Astrology", hindi: "प्रश्न कुंडली", desc: "Instant Question Analysis", icon: <HelpCircle /> },
  { id: "medical", title: "Medical Astrology", hindi: "मेडिकल एस्ट्रोलॉजी", desc: "Astro-Wellness & Body Mapping", icon: <HeartPulse /> },
];

export function SpecializedAstrology() {
  const [open, setOpen] = useState<ModuleId | null>(null);

  return (
    <div className="h-full overflow-y-auto no-scrollbar px-4 pb-6 pt-5">
      <h1 className="font-display text-2xl font-bold text-gold-gradient">Specialized Methods</h1>
      <p className="mb-5 mt-1 text-sm text-muted-foreground">Ancient sciences, decoded by AI for you.</p>

      <div className="space-y-3">
        {CARDS.map((c) => (
          <button
            key={c.id}
            onClick={() => setOpen(c.id)}
            className="flex w-full items-center gap-4 rounded-2xl border border-border bg-surface p-4 text-left active:scale-[0.99]"
          >
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-saffron/15 text-gold [&>svg]:h-6 [&>svg]:w-6">
              {c.icon}
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2">
                <h2 className="truncate font-display text-base font-bold text-foreground">{c.title}</h2>
                <span className="shrink-0 text-xs text-gold/80">{c.hindi}</span>
              </div>
              <p className="truncate text-sm text-muted-foreground">{c.desc}</p>
            </div>
            <ChevronRight className="h-5 w-5 shrink-0 text-muted-foreground" />
          </button>
        ))}
      </div>

      {open && (
        <Modal title={CARDS.find((c) => c.id === open)!.title} onClose={() => setOpen(null)}>
          {open === "nadi" && <NadiView />}
          {open === "lal" && <LalKitabView />}
          {open === "mundane" && <MundaneView />}
          {open === "horary" && <HoraryView />}
          {open === "medical" && <MedicalView />}
        </Modal>
      )}
    </div>
  );
}

function Modal({ title, children, onClose }: { title: string; children: React.ReactNode; onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-background animate-[fade-in_0.25s_ease-out]">
      <header className="flex items-center justify-between border-b border-border bg-surface px-4 py-3">
        <h2 className="font-display text-lg font-bold text-foreground">{title}</h2>
        <button onClick={onClose} className="flex h-9 w-9 items-center justify-center rounded-full bg-surface-2 text-foreground active:scale-95">
          <X className="h-5 w-5" />
        </button>
      </header>
      <div className="flex-1 overflow-y-auto no-scrollbar px-4 py-5">{children}</div>
    </div>
  );
}

/* ---------- Nadi ---------- */
function NadiView() {
  const { profile } = useAstro();
  const yr = birthYear(profile?.dob ?? "");
  const fn = firstName(profile?.name ?? "");
  const [state, setState] = useState<"idle" | "scanning" | "done">("idle");

  const scan = () => {
    setState("scanning");
    setTimeout(() => setState("done"), 2600);
  };

  return (
    <div>
      <p className="mb-5 text-sm text-muted-foreground">
        Your thumb impression unlocks the ancient leaf manuscript said to be written by the sage Agastya.
      </p>

      {state !== "done" ? (
        <button
          onClick={scan}
          disabled={state === "scanning"}
          className="relative mx-auto flex h-56 w-full max-w-xs flex-col items-center justify-center gap-4 rounded-3xl border-2 border-gold/40 bg-surface"
        >
          <div className={`flex h-24 w-24 items-center justify-center rounded-full bg-saffron/10 ${state === "scanning" ? "animate-pulse-glow" : ""}`}>
            <Fingerprint className={`h-14 w-14 ${state === "scanning" ? "text-saffron" : "text-gold"}`} />
          </div>
          <span className="text-base font-semibold text-foreground">
            {state === "scanning" ? "Reading thumb impression…" : "Scan Thumbprint"}
          </span>
          {state === "scanning" && (
            <span className="absolute inset-x-6 top-1/2 h-0.5 animate-bounce bg-gold/70" />
          )}
        </button>
      ) : (
        <div className="rounded-3xl border border-gold/30 bg-gradient-to-b from-surface to-surface-2 p-5">
          <div className="mb-3 flex items-center gap-2 text-gold">
            <ScrollText className="h-5 w-5" />
            <span className="font-display text-sm font-bold uppercase tracking-widest">Leaf Manuscript {yr}</span>
          </div>
          <p className="mb-3 text-[15px] leading-relaxed text-foreground">
            "He who is born in the year {yr}, named {fn}, carries the mark of Jupiter upon the second thumb ridge.
            In youth he wanders; in maturity he commands respect through knowledge."
          </p>
          <div className="space-y-2 text-sm text-muted-foreground">
            <p>📜 <b className="text-foreground">Past Kanda:</b> Karmic debt of speech, now cleared.</p>
            <p>🪔 <b className="text-foreground">Present Kanda:</b> A door of opportunity opens within 90 days.</p>
            <p>✨ <b className="text-foreground">Remedy:</b> Light a ghee lamp on Thursdays and feed Brahmins.</p>
          </div>
        </div>
      )}
    </div>
  );
}

/* ---------- Lal Kitab ---------- */
function LalKitabView() {
  const { profile } = useAstro();
  const ruler = getSign(profile?.dob ?? "").ruler;
  const rows = [
    { planet: "Saturn (शनि)", remedy: "Feed birds & donate black sesame on Saturdays" },
    { planet: "Mars (मंगल)", remedy: "Donate copper / sweet jaggery to a temple" },
    { planet: "Mercury (बुध)", remedy: "Wear green; gift books to children" },
    { planet: "Sun (सूर्य)", remedy: "Offer water to the rising Sun daily" },
    { planet: ruler.includes("Moon") ? "Moon (चन्द्र)" : "Venus (शुक्र)", remedy: "Wear white; keep silver; respect women" },
  ];
  return (
    <div>
      <p className="mb-4 text-sm text-muted-foreground">
        Practical, low-cost remedies (सरल उपाय) tuned to the doshas detected in your chart (ruling planet: {ruler}).
      </p>
      <div className="overflow-hidden rounded-2xl border border-border">
        <div className="grid grid-cols-2 bg-saffron/15 text-sm font-bold text-gold">
          <div className="px-4 py-3">Afflicted Planet (ग्रह)</div>
          <div className="border-l border-border px-4 py-3">Simple Remedy (सरल उपाय)</div>
        </div>
        {rows.map((r, i) => (
          <div key={i} className={`grid grid-cols-2 text-sm ${i % 2 ? "bg-surface" : "bg-surface-2"}`}>
            <div className="px-4 py-3 font-medium text-foreground">{r.planet}</div>
            <div className="border-l border-border px-4 py-3 text-muted-foreground">{r.remedy}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ---------- Mundane ---------- */
function MundaneView() {
  const feed = [
    { tag: "Global", icon: <Globe2 className="h-4 w-4" />, title: "Jupiter–Saturn square stirs markets", body: "Volatility expected in tech and commodities through the next transit. Long-term assets favoured over speculation." },
    { tag: "Economy", icon: <Activity className="h-4 w-4" />, title: "Rising powers see currency strength", body: "Nations under Capricorn influence consolidate trade alliances; inflation cools by the next lunar quarter." },
    { tag: "Leadership", icon: <Sun className="h-4 w-4" />, title: "Mars transit favours decisive leaders", body: "A period of bold political reform across South Asia; diplomacy outperforms confrontation." },
    { tag: "Climate", icon: <Wind className="h-4 w-4" />, title: "Watery signs warn of monsoon shifts", body: "Coastal regions should prepare for irregular rainfall as the Moon waxes in Cancer." },
  ];
  return (
    <div className="space-y-3">
      <p className="text-sm text-muted-foreground">Predictions for the world, drawn from current planetary transits.</p>
      {feed.map((f, i) => (
        <article key={i} className="rounded-2xl border border-border bg-surface p-4">
          <div className="mb-2 flex w-fit items-center gap-1.5 rounded-full bg-saffron/15 px-2.5 py-1 text-xs font-semibold text-gold">
            {f.icon} {f.tag}
          </div>
          <h3 className="font-display text-base font-bold text-foreground">{f.title}</h3>
          <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{f.body}</p>
        </article>
      ))}
    </div>
  );
}

/* ---------- Horary ---------- */
function HoraryView() {
  const [q, setQ] = useState("");
  const [result, setResult] = useState<null | { ts: string; asc: string; moon: string; verdict: string }>(null);
  const [loading, setLoading] = useState(false);

  const ask = () => {
    if (!q.trim()) return;
    setLoading(true);
    setTimeout(() => {
      const now = new Date();
      const signs = ["Aries", "Taurus", "Gemini", "Cancer", "Leo", "Virgo", "Libra", "Scorpio", "Sagittarius", "Capricorn", "Aquarius", "Pisces"];
      const asc = signs[now.getMinutes() % 12];
      const moon = signs[now.getSeconds() % 12];
      setResult({
        ts: now.toLocaleString(),
        asc,
        moon,
        verdict:
          now.getSeconds() % 2 === 0
            ? "The signs are favourable — proceed with confidence, but act before the next full moon."
            : "Patience is advised. The current planetary alignment suggests waiting 11 days for clarity.",
      });
      setLoading(false);
    }, 1800);
  };

  return (
    <div>
      <div className="mb-4 rounded-2xl border border-gold/30 bg-saffron/10 p-4">
        <p className="text-sm font-medium text-foreground">Don't know your birth time? Ask your question now.</p>
        <p className="mt-1 text-xs text-muted-foreground">A Prashna chart is cast for the exact moment you ask.</p>
      </div>

      <textarea
        value={q}
        onChange={(e) => setQ(e.target.value)}
        rows={3}
        placeholder="e.g. Will I get the new job offer?"
        className="w-full rounded-2xl border border-input bg-surface p-4 text-base text-foreground outline-none focus:border-gold"
      />
      <button
        onClick={ask}
        disabled={loading}
        className="mt-3 h-12 w-full rounded-2xl bg-gradient-to-r from-saffron to-gold font-bold text-[#1a1206] active:scale-[0.99] disabled:opacity-60"
      >
        {loading ? "Casting Prashna chart…" : "Cast Chart & Answer"}
      </button>

      {result && (
        <div className="mt-5 rounded-2xl border border-border bg-surface p-4">
          <p className="mb-3 text-xs text-muted-foreground">Chart cast for: {result.ts}</p>
          <div className="mx-auto mb-4 grid aspect-square w-48 grid-cols-3 grid-rows-3 gap-px overflow-hidden rounded-lg border border-gold/40 bg-gold/30">
            {Array.from({ length: 9 }).map((_, i) => (
              <div key={i} className="flex items-center justify-center bg-surface text-[10px] text-muted-foreground">
                {i === 0 ? <span className="font-bold text-gold">Asc</span> : i === 4 ? "♄" : i === 2 ? "☉" : i === 6 ? "☽" : "·"}
              </div>
            ))}
          </div>
          <div className="space-y-1.5 text-sm">
            <p className="text-muted-foreground">Ascendant: <b className="text-foreground">{result.asc}</b></p>
            <p className="text-muted-foreground">Moon sign: <b className="text-foreground">{result.moon}</b></p>
            <p className="mt-3 rounded-xl bg-saffron/10 p-3 text-[15px] leading-relaxed text-foreground">{result.verdict}</p>
          </div>
        </div>
      )}
    </div>
  );
}

/* ---------- Medical ---------- */
function MedicalView() {
  const map = [
    { part: "Head & Mind", planet: "Moon (चन्द्र)", icon: <Brain className="h-5 w-5" />, tip: "Meditate at dawn; reduce screen time before sleep." },
    { part: "Heart & Spine", planet: "Sun (सूर्य)", icon: <Heart className="h-5 w-5" />, tip: "Sun salutations and cardio strengthen vitality." },
    { part: "Blood & Energy", planet: "Mars (मंगल)", icon: <Droplet className="h-5 w-5" />, tip: "Stay hydrated; favour iron-rich greens." },
    { part: "Digestion", planet: "Mercury (बुध)", icon: <Activity className="h-5 w-5" />, tip: "Warm water with turmeric balances digestion." },
    { part: "Joints & Bones", planet: "Saturn (शनि)", icon: <Leaf className="h-5 w-5" />, tip: "Sesame oil massage (Abhyanga) eases stiffness." },
  ];
  return (
    <div>
      <p className="mb-4 text-sm text-muted-foreground">
        Each planet governs a region of the body. Here is your personalized Astro-Wellness map.
      </p>
      <div className="space-y-3">
        {map.map((m, i) => (
          <div key={i} className="flex items-start gap-3 rounded-2xl border border-border bg-surface p-4">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-saffron/15 text-gold">{m.icon}</div>
            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-x-2">
                <h3 className="font-display text-base font-bold text-foreground">{m.part}</h3>
                <span className="text-xs text-gold/80">· {m.planet}</span>
              </div>
              <p className="mt-1 text-sm text-muted-foreground">🌿 {m.tip}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
