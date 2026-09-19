import { useRef, useState } from "react";
import {
  Calendar,
  Camera,
  Check,
  ChevronLeft,
  Clock,
  Hand,
  Images,
  MapPin,
  Sparkles,
  User,
  X,
} from "lucide-react";
import { CosmicBackground } from "./CosmicBackground";
import { useAstro, type AstroProfile } from "@/lib/astro-context";
import { analyzeImageFile, faceReading, palmReading } from "@/lib/image-analysis";
import { geocodePlace } from "@/lib/geocode";


const TOTAL = 6;

export function Onboarding({
  initial,
  onCancel,
  submitLabel,
}: {
  initial?: AstroProfile | null;
  onCancel?: () => void;
  submitLabel?: string;
} = {}) {
  const { saveProfile } = useAstro();
  const [step, setStep] = useState(0);

  const [name, setName] = useState(initial?.name ?? "");
  const [dob, setDob] = useState(initial?.dob ?? "");
  const [tob, setTob] = useState(initial?.tob ?? "");
  const [pob, setPob] = useState(initial?.pob ?? "");
  const [facePhoto, setFacePhoto] = useState<string | null>(initial?.facePhoto ?? null);
  const [palmPhoto, setPalmPhoto] = useState<string | null>(initial?.palmPhoto ?? null);
  const [faceText, setFaceText] = useState<string | null>(initial?.faceReading ?? null);
  const [palmText, setPalmText] = useState<string | null>(initial?.palmReading ?? null);


  const canNext = () => {
    if (step === 0) return name.trim().length > 1;
    if (step === 1) return !!dob;
    if (step === 2) return !!tob;
    if (step === 3) return pob.trim().length > 1;
    return true; // uploads optional
  };

  const next = () => setStep((s) => Math.min(s + 1, TOTAL - 1));
  const back = () => setStep((s) => Math.max(s - 1, 0));

  const [saving, setSaving] = useState(false);

  const submit = async () => {
    if (saving) return;
    setSaving(true);
    const place = pob.trim();
    let geo =
      initial && initial.pob === place && initial.lat != null
        ? { lat: initial.lat, lon: initial.lon!, tz: initial.tz!, label: initial.placeLabel ?? place }
        : null;
    if (!geo) geo = await geocodePlace(place);
    saveProfile({
      name: name.trim(),
      dob,
      tob,
      pob: place,
      lat: geo?.lat ?? null,
      lon: geo?.lon ?? null,
      tz: geo?.tz ?? null,
      placeLabel: geo?.label ?? null,
      facePhoto,
      palmPhoto,
      faceReading: faceText,
      palmReading: palmText,
      createdAt: initial?.createdAt ?? Date.now(),
    } satisfies AstroProfile);
    setSaving(false);
    onCancel?.();
  };



  return (
    <div className="relative flex min-h-dvh flex-col overflow-hidden px-6 pb-10 pt-8">
      <CosmicBackground />

      {/* Progress */}
      <div className="relative z-10">
        {onCancel && (
          <div className="mb-3 flex items-center justify-between">
            <h1 className="font-display text-lg font-bold text-gold-gradient">Edit Details</h1>
            <button
              onClick={onCancel}
              aria-label="Cancel editing"
              className="flex h-9 w-9 items-center justify-center rounded-full glass text-foreground active:scale-95"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        )}
        <div className="mb-2 flex items-center gap-3">
          {step > 0 ? (
            <button
              onClick={back}
              className="flex h-9 w-9 items-center justify-center rounded-full glass text-foreground active:scale-95"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
          ) : (
            <div className="h-9 w-9" />
          )}
          <div className="flex-1">
            <div className="h-2 w-full overflow-hidden rounded-full bg-surface-2">
              <div
                className="h-full rounded-full bg-gradient-to-r from-saffron to-gold transition-all duration-500"
                style={{ width: `${((step + 1) / TOTAL) * 100}%` }}
              />
            </div>
          </div>
          <span className="w-12 text-right text-xs font-semibold text-gold">
            {step + 1}/{TOTAL}
          </span>
        </div>
      </div>


      {/* Step content */}
      <div key={step} className="relative z-10 flex flex-1 flex-col justify-center animate-[fade-in_0.4s_ease-out]">
        {step === 0 && (
          <StepShell icon={<User />} title="What's your name?" subtitle="So Guru Ji knows who he's guiding.">
            <FloatingInput label="Full Name" value={name} onChange={setName} autoFocus />
          </StepShell>
        )}

        {step === 1 && (
          <StepShell icon={<Calendar />} title="Date of Birth" subtitle="Your cosmic blueprint begins here.">
            <NativeField icon={<Calendar className="h-5 w-5 text-gold" />}>
              <input
                type="date"
                value={dob}
                max={new Date().toISOString().slice(0, 10)}
                onChange={(e) => setDob(e.target.value)}
                className="w-full bg-transparent py-4 text-lg text-foreground outline-none [color-scheme:dark]"
              />
            </NativeField>
          </StepShell>
        )}

        {step === 2 && (
          <StepShell icon={<Clock />} title="Time of Birth" subtitle="Exact time refines your planetary houses.">
            <NativeField icon={<Clock className="h-5 w-5 text-gold" />}>
              <input
                type="time"
                value={tob}
                onChange={(e) => setTob(e.target.value)}
                className="w-full bg-transparent py-4 text-lg text-foreground outline-none [color-scheme:dark]"
              />
            </NativeField>
          </StepShell>
        )}

        {step === 3 && (
          <StepShell icon={<MapPin />} title="Place of Birth" subtitle="City, State, Country">
            <FloatingInput label="e.g. Varanasi, UP, India" value={pob} onChange={setPob} autoFocus />
          </StepShell>
        )}

        {step === 4 && (
          <StepShell icon={<Camera />} title="Face Reading" subtitle="Upload Face Photo for Face Reading">
            <UploadArea
              icon={<Camera className="h-8 w-8" />}
              label="Upload Face Photo"
              analyzingText="Analyzing facial symmetry and planetary influences…"
              captureMode="user"
              photo={facePhoto}
              reading={faceText}
              onResult={(url, m) => {
                setFacePhoto(url);
                setFaceText(faceReading(m));
              }}
            />
          </StepShell>
        )}

        {step === 5 && (
          <StepShell icon={<Hand />} title="Palmistry" subtitle="Upload Palm Photo for Hast Rekha Analysis">
            <UploadArea
              icon={<Hand className="h-8 w-8" />}
              label="Upload Palm Photo"
              analyzingText="Scanning lines (Heart, Life, Head lines)…"
              captureMode="environment"
              photo={palmPhoto}
              reading={palmText}
              onResult={(url, m) => {
                setPalmPhoto(url);
                setPalmText(palmReading(m));
              }}
            />
          </StepShell>
        )}

      </div>

      {/* Footer action */}
      <div className="relative z-10 pt-4">
        {step < TOTAL - 1 ? (
          <button
            onClick={next}
            disabled={!canNext()}
            className="h-14 w-full rounded-2xl bg-gradient-to-r from-saffron to-gold text-base font-bold text-[#1a1206] shadow-lg transition active:scale-[0.98] disabled:opacity-40"
          >
            Continue
          </button>
        ) : (
          <button
            onClick={() => void submit()}
            disabled={saving}
            className="flex h-14 w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-saffron to-gold text-base font-bold text-[#1a1206] shadow-lg transition active:scale-[0.98] disabled:opacity-60"
          >
            {saving ? (
              <>
                <span className="h-5 w-5 animate-spin rounded-full border-2 border-[#1a1206]/30 border-t-[#1a1206]" />
                Locating your birth sky…
              </>
            ) : (
              <>
                <Sparkles className="h-5 w-5" />
                {submitLabel ?? (onCancel ? "Save & Recompute Charts" : "Submit & Generate Charts")}
              </>
            )}
          </button>
        )}
        {step >= 4 && (
          <p className="mt-3 text-center text-xs text-muted-foreground/70">Photo upload is optional — you can skip.</p>
        )}
      </div>
    </div>
  );
}

function StepShell({
  icon,
  title,
  subtitle,
  children,
}: {
  icon: React.ReactNode;
  title: string;
  subtitle: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-saffron/15 text-gold [&>svg]:h-7 [&>svg]:w-7">
        {icon}
      </div>
      <h2 className="font-display text-3xl font-bold text-foreground">{title}</h2>
      <p className="mb-8 mt-2 text-sm text-muted-foreground">{subtitle}</p>
      {children}
    </div>
  );
}

function FloatingInput({
  label,
  value,
  onChange,
  autoFocus,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  autoFocus?: boolean;
}) {
  const [focused, setFocused] = useState(false);
  const active = focused || value.length > 0;
  return (
    <div className="relative">
      <input
        // eslint-disable-next-line jsx-a11y/no-autofocus
        autoFocus={autoFocus}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        className="peer h-16 w-full rounded-2xl border border-input bg-surface px-4 pt-5 text-lg text-foreground outline-none transition focus:border-gold"
      />
      <label
        className={`pointer-events-none absolute left-4 transition-all ${
          active ? "top-2.5 text-xs text-gold" : "top-1/2 -translate-y-1/2 text-base text-muted-foreground"
        }`}
      >
        {label}
      </label>
    </div>
  );
}

function NativeField({ icon, children }: { icon: React.ReactNode; children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-3 rounded-2xl border border-input bg-surface px-4 focus-within:border-gold">
      {icon}
      {children}
    </div>
  );
}

function UploadArea({
  icon,
  label,
  analyzingText,
  captureMode,
  photo,
  reading,
  onResult,
}: {
  icon: React.ReactNode;
  label: string;
  analyzingText: string;
  captureMode: "user" | "environment";
  photo: string | null;
  reading: string | null;
  onResult: (dataUrl: string, metrics: import("@/lib/image-analysis").ImageMetrics) => void;
}) {
  const cameraRef = useRef<HTMLInputElement>(null);
  const galleryRef = useRef<HTMLInputElement>(null);
  const [analyzing, setAnalyzing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFile = async (file: File) => {
    setError(null);
    setAnalyzing(true);
    try {
      const { dataUrl, metrics } = await analyzeImageFile(file);
      onResult(dataUrl, metrics);
    } catch {
      setError("Could not read that image. Please try another photo.");
    } finally {
      setAnalyzing(false);
    }
  };

  const pick = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    e.target.value = "";
    if (f) void handleFile(f);
  };

  return (
    <div>
      <input
        ref={cameraRef}
        type="file"
        accept="image/*"
        capture={captureMode}
        className="hidden"
        onChange={pick}
      />
      <input ref={galleryRef} type="file" accept="image/*" className="hidden" onChange={pick} />

      <div className="relative flex h-52 w-full flex-col items-center justify-center gap-3 overflow-hidden rounded-3xl border-2 border-dashed border-gold/40 bg-surface text-gold">
        {analyzing ? (
          <div className="flex flex-col items-center gap-4 px-6 text-center">
            <span className="h-12 w-12 animate-spin rounded-full border-4 border-gold/20 border-t-gold" />
            <p className="text-sm font-medium text-foreground">{analyzingText}</p>
          </div>
        ) : photo ? (
          <img src={photo} alt={label} className="h-full w-full object-cover" />
        ) : (
          <>
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-saffron/15">{icon}</div>
            <span className="text-base font-semibold text-foreground">{label}</span>
            <span className="text-xs text-muted-foreground">Take a photo or choose from your gallery</span>
          </>
        )}
        {!analyzing && photo && (
          <span className="absolute right-3 top-3 flex items-center gap-1 rounded-full bg-emerald-500/90 px-2 py-1 text-xs font-semibold text-white">
            <Check className="h-3 w-3" /> Analyzed
          </span>
        )}
      </div>

      <div className="mt-3 grid grid-cols-2 gap-3">
        <button
          onClick={() => cameraRef.current?.click()}
          disabled={analyzing}
          className="flex h-12 items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-saffron to-gold text-sm font-bold text-[#1a1206] active:scale-95 disabled:opacity-50"
        >
          <Camera className="h-4.5 w-4.5" /> Take Photo
        </button>
        <button
          onClick={() => galleryRef.current?.click()}
          disabled={analyzing}
          className="flex h-12 items-center justify-center gap-2 rounded-2xl border border-gold/40 bg-saffron/10 text-sm font-bold text-gold active:scale-95 disabled:opacity-50"
        >
          <Images className="h-4.5 w-4.5" /> Gallery
        </button>
      </div>

      {error && <p className="mt-2 text-center text-xs text-destructive">{error}</p>}

      {!analyzing && reading && (
        <div className="mt-3 rounded-2xl border border-gold/25 bg-surface-2 p-3">
          <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-gold">Analysis Result</p>
          <p className="text-sm leading-relaxed text-foreground">{reading}</p>
        </div>
      )}
    </div>
  );
}

