export interface ImageMetrics {
  width: number;
  height: number;
  brightness: number; // 0-100
  warmth: number; // 0-100 (red vs blue dominance)
  contrast: number; // 0-100
  symmetry: number; // 0-100 (left/right mirror similarity)
  detail: number; // 0-100 (edge density — line richness for palms)
}

export interface AnalyzedImage {
  dataUrl: string;
  metrics: ImageMetrics;
}

const MAX = 600;

/** Downscale to <=600px JPEG (keeps localStorage under quota) and measure real pixel statistics. */
export function analyzeImageFile(file: File): Promise<AnalyzedImage> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = () => reject(new Error("read-failed"));
    reader.onload = () => {
      const img = new Image();
      img.onerror = () => reject(new Error("decode-failed"));
      img.onload = () => {
        const scale = Math.min(1, MAX / Math.max(img.width, img.height));
        const w = Math.max(1, Math.round(img.width * scale));
        const h = Math.max(1, Math.round(img.height * scale));
        const canvas = document.createElement("canvas");
        canvas.width = w;
        canvas.height = h;
        const ctx = canvas.getContext("2d");
        if (!ctx) return reject(new Error("no-canvas"));
        ctx.drawImage(img, 0, 0, w, h);
        const dataUrl = canvas.toDataURL("image/jpeg", 0.72);

        const { data } = ctx.getImageData(0, 0, w, h);
        const lum = new Float32Array(w * h);
        let sum = 0;
        let rSum = 0;
        let bSum = 0;
        for (let i = 0, p = 0; i < data.length; i += 4, p++) {
          const r = data[i];
          const g = data[i + 1];
          const b = data[i + 2];
          const l = 0.299 * r + 0.587 * g + 0.114 * b;
          lum[p] = l;
          sum += l;
          rSum += r;
          bSum += b;
        }
        const mean = sum / lum.length;
        let varSum = 0;
        for (let p = 0; p < lum.length; p++) varSum += (lum[p] - mean) ** 2;
        const std = Math.sqrt(varSum / lum.length);

        // Symmetry: compare left half to mirrored right half
        let diff = 0;
        let count = 0;
        const half = Math.floor(w / 2);
        for (let y = 0; y < h; y += 2) {
          for (let x = 0; x < half; x += 2) {
            diff += Math.abs(lum[y * w + x] - lum[y * w + (w - 1 - x)]);
            count++;
          }
        }
        const symmetry = count
          ? Math.max(0, 100 - (diff / count / 255) * 260)
          : 50;

        // Edge density (Sobel-lite) — proxy for palm-line richness
        let edges = 0;
        let edgeCount = 0;
        for (let y = 1; y < h - 1; y += 2) {
          for (let x = 1; x < w - 1; x += 2) {
            const gx = Math.abs(lum[y * w + x + 1] - lum[y * w + x - 1]);
            const gy = Math.abs(lum[(y + 1) * w + x] - lum[(y - 1) * w + x]);
            edges += gx + gy;
            edgeCount++;
          }
        }

        resolve({
          dataUrl,
          metrics: {
            width: img.width,
            height: img.height,
            brightness: clamp((mean / 255) * 100),
            warmth: clamp(50 + ((rSum - bSum) / lum.length / 255) * 200),
            contrast: clamp((std / 80) * 100),
            symmetry: clamp(symmetry),
            detail: edgeCount ? clamp((edges / edgeCount / 40) * 100) : 0,
          },
        });
      };
      img.src = reader.result as string;
    };
    reader.readAsDataURL(file);
  });
}

const clamp = (n: number) => Math.round(Math.max(0, Math.min(100, n)));

const band = (v: number, low: string, mid: string, high: string) =>
  v < 38 ? low : v < 68 ? mid : high;

export function faceReading(m: ImageMetrics) {
  const glow = band(
    m.brightness,
    "a subdued, inward Chandra glow",
    "a balanced Surya-Chandra glow",
    "a bright Surya-dominant glow",
  );
  const temper = band(
    m.warmth,
    "cool Shukra tones — calm and diplomatic",
    "even elemental tones — steady temperament",
    "warm Mangal tones — high drive and courage",
  );
  const sym = band(
    m.symmetry,
    "notable asymmetry — a restless, creative mind",
    "gentle asymmetry — practical adaptability",
    "strong facial symmetry — disciplined and fortunate",
  );
  const def = band(
    m.contrast,
    "soft feature definition — a gentle nature",
    "moderate feature definition — measured decisions",
    "sharp feature definition — decisive leadership",
  );
  return [
    `Facial symmetry measured at ${m.symmetry}% — ${sym}.`,
    `Complexion radiance ${m.brightness}%: ${glow}.`,
    `Tone analysis shows ${temper}.`,
    `Structure: ${def}.`,
  ].join(" ");
}

export function palmReading(m: ImageMetrics) {
  const lines = band(
    m.detail,
    "few, deep lines — a focused single-path life",
    "a clear, moderate line network — balanced destiny",
    "a dense line network — many opportunities and travel",
  );
  const heart = band(
    m.warmth,
    "a cool Heart line — loyal but reserved in love",
    "a balanced Heart line — warmth with discernment",
    "a strong Heart line — passionate attachments",
  );
  const head = band(
    m.contrast,
    "a smooth Head line — intuitive thinking",
    "a defined Head line — analytical balance",
    "a deeply etched Head line — sharp intellect",
  );
  const life = band(
    m.brightness,
    "a shaded Life line — conserve energy, rest well",
    "a steady Life line — consistent vitality",
    "a luminous Life line — robust vitality and longevity",
  );
  return [
    `Line density scored ${m.detail}% — ${lines}.`,
    `Heart line: ${heart}.`,
    `Head line: ${head}.`,
    `Life line: ${life}.`,
  ].join(" ");
}
