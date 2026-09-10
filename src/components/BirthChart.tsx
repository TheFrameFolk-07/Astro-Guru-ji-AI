import { useMemo, useRef } from "react";
import { Download } from "lucide-react";
import { useAstro } from "@/lib/astro-context";
import { birthChart, signForHouse, firstName } from "@/lib/astro-utils";

const S = 320;
// North-Indian diamond house label anchor points
const POS: [number, number][] = [
  [S / 2, S / 4], // H1
  [S / 4, S / 8], // H2
  [S / 8, S / 4], // H3
  [S / 4, S / 2], // H4
  [S / 8, (3 * S) / 4], // H5
  [S / 4, (7 * S) / 8], // H6
  [S / 2, (3 * S) / 4], // H7
  [(3 * S) / 4, (7 * S) / 8], // H8
  [(7 * S) / 8, (3 * S) / 4], // H9
  [(3 * S) / 4, S / 2], // H10
  [(7 * S) / 8, S / 4], // H11
  [(3 * S) / 4, S / 8], // H12
];

export function BirthChart() {
  const { profile } = useAstro();
  const svgRef = useRef<SVGSVGElement>(null);
  const chart = useMemo(() => birthChart(profile), [profile]);

  const download = () => {
    const svg = svgRef.current;
    if (!svg) return;
    const xml = new XMLSerializer().serializeToString(svg);
    const svg64 = btoa(unescape(encodeURIComponent(xml)));
    const img = new Image();
    img.onload = () => {
      const scale = 3;
      const canvas = document.createElement("canvas");
      canvas.width = S * scale;
      canvas.height = S * scale;
      const ctx = canvas.getContext("2d")!;
      ctx.fillStyle = "#0B0C10";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
      const a = document.createElement("a");
      a.download = `${firstName(profile?.name ?? "birth")}-birth-chart.png`;
      a.href = canvas.toDataURL("image/png");
      a.click();
    };
    img.src = "data:image/svg+xml;base64," + svg64;
  };

  return (
    <div className="rounded-3xl border border-gold/30 bg-gradient-to-br from-surface to-surface-2 p-4">
      <div className="mb-3 flex items-center justify-between">
        <div>
          <h2 className="font-display text-base font-bold text-gold-gradient">Your Birth Chart</h2>
          <p className="text-xs text-muted-foreground">Lagna: {chart.ascendant} Ascendant</p>
        </div>
        <button
          onClick={download}
          className="flex items-center gap-1.5 rounded-full border border-gold/40 bg-saffron/15 px-3 py-2 text-xs font-semibold text-gold active:scale-95"
        >
          <Download className="h-4 w-4" /> Save
        </button>
      </div>

      <div className="mx-auto w-full max-w-[320px]">
        <svg ref={svgRef} viewBox={`0 0 ${S} ${S}`} className="h-auto w-full" xmlns="http://www.w3.org/2000/svg">
          <rect x="0" y="0" width={S} height={S} fill="#0B0C10" />
          <g stroke="#D4AF37" strokeWidth="1.4" fill="none" opacity="0.85">
            <rect x="2" y="2" width={S - 4} height={S - 4} />
            <line x1="2" y1="2" x2={S - 2} y2={S - 2} />
            <line x1={S - 2} y1="2" x2="2" y2={S - 2} />
            <polygon points={`${S / 2},2 ${S - 2},${S / 2} ${S / 2},${S - 2} 2,${S / 2}`} />
          </g>
          {chart.houses.map((h, i) => {
            const [x, y] = POS[i];
            const sign = signForHouse(chart.ascIndex, i + 1);
            return (
              <g key={i} textAnchor="middle">
                <text x={x} y={y - 6} fill="#FF9933" fontSize="9" fontWeight="700">
                  {sign.slice(0, 3)}
                </text>
                <text x={x} y={y + 9} fill="#F5EFE0" fontSize="11" fontWeight="600">
                  {h.planets.map((p) => p.key).join(" ") || "—"}
                </text>
              </g>
            );
          })}
        </svg>
      </div>
      <p className="mt-2 text-center text-[11px] text-muted-foreground">
        North-Indian style · Su Sun · Mo Moon · Ma Mars · Me Mercury · Ju Jupiter · Ve Venus · Sa Saturn · Ra/Ke Nodes
      </p>
    </div>
  );
}
