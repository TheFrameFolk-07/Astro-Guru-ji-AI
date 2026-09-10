import { useState } from "react";
import {
  Calendar,
  Clock,
  FileDown,
  MapPin,
  MessageSquareText,
  Pencil,
  RefreshCw,
  Sparkles,
  Star,
  User,
} from "lucide-react";
import { jsPDF } from "jspdf";
import { useAstro } from "@/lib/astro-context";
import { Onboarding } from "./Onboarding";
import {
  birthChart,
  firstName,
  getSign,
  nakshatra,
  signForHouse,
} from "@/lib/astro-utils";

const clean = (t: string) =>
  t.replace(/[\u{1F000}-\u{1FFFF}\u2600-\u27BF\uFE0F]/gu, "").trim();

function savePdf(doc: jsPDF, filename: string) {
  try {
    const blob = doc.output("blob");
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    a.remove();
    setTimeout(() => URL.revokeObjectURL(url), 4000);
  } catch {
    doc.save(filename);
  }
}

export function ProfileView() {
  const { profile, chatHistory, reset } = useAstro();
  const [confirm, setConfirm] = useState(false);
  const [exporting, setExporting] = useState(false);
  const [exportingChat, setExportingChat] = useState(false);
  const [editing, setEditing] = useState(false);
  if (!profile) return null;

  if (editing) {
    return <Onboarding initial={profile} onCancel={() => setEditing(false)} />;
  }

  const sign = getSign(profile.dob);
  const nak = nakshatra(profile);

  const fmtDate = profile.dob
    ? new Date(profile.dob).toLocaleDateString(undefined, {
        day: "numeric",
        month: "long",
        year: "numeric",
      })
    : "—";

  const exportPdf = () => {
    setExporting(true);
    setTimeout(() => {
      try {
        const doc = new jsPDF({ unit: "pt", format: "a4" });
        const W = doc.internal.pageSize.getWidth();
        const M = 48;
        let y = 64;
        const navy = [11, 12, 16] as const;
        const saffron = [255, 153, 51] as const;
        const gold = [212, 175, 55] as const;

        // Header band
        doc.setFillColor(...navy);
        doc.rect(0, 0, W, 96, "F");
        doc.setTextColor(...gold);
        doc.setFont("helvetica", "bold");
        doc.setFontSize(24);
        doc.text("AstroAI", M, 50);
        doc.setTextColor(...saffron);
        doc.setFontSize(13);
        doc.text("Personalized Vedic Astrology Report", M, 72);

        const heading = (t: string) => {
          if (y > 760) {
            doc.addPage();
            y = 64;
          }
          doc.setTextColor(...saffron);
          doc.setFont("helvetica", "bold");
          doc.setFontSize(14);
          doc.text(t, M, y);
          doc.setDrawColor(...gold);
          doc.line(M, y + 6, W - M, y + 6);
          y += 26;
        };
        const line = (label: string, value: string) => {
          if (y > 780) {
            doc.addPage();
            y = 64;
          }
          doc.setTextColor(60, 60, 60);
          doc.setFont("helvetica", "bold");
          doc.setFontSize(11);
          doc.text(label, M, y);
          doc.setFont("helvetica", "normal");
          doc.setTextColor(20, 20, 20);
          doc.text(value, M + 130, y);
          y += 20;
        };
        const para = (t: string) => {
          doc.setFont("helvetica", "normal");
          doc.setFontSize(11);
          doc.setTextColor(40, 40, 40);
          const wrapped = doc.splitTextToSize(t, W - M * 2);
          for (const ln of wrapped) {
            if (y > 790) {
              doc.addPage();
              y = 64;
            }
            doc.text(ln, M, y);
            y += 16;
          }
          y += 6;
        };

        y = 128;
        heading("Onboarding Summary");
        line("Full Name", profile.name || "—");
        line("Date of Birth", fmtDate);
        line("Time of Birth", profile.tob || "—");
        line("Place of Birth", profile.pob || "—");
        line("Sun Sign", `${sign.name} (${sign.element}, ${sign.ruler})`);
        line("Nakshatra", nak);
        line(
          "Face Reading",
          profile.facePhoto ? "Captured & analysed" : "Not provided",
        );
        line(
          "Palmistry",
          profile.palmPhoto ? "Captured & analysed" : "Not provided",
        );
        y += 8;

        heading("Birth Chart Placements");
        const chart = birthChart(profile);
        para(`Lagna (Ascendant): ${chart.ascendant}`);
        chart.houses.forEach((h, i) => {
          const planets =
            h.planets.map((p) => p.name).join(", ") || "No major planet";
          line(
            `House ${i + 1} · ${signForHouse(chart.ascIndex, i + 1)}`,
            planets,
          );
        });
        y += 8;

        heading("Key Guru Ji Insights");
        const guruMsgs = chatHistory.filter((m) => m.role === "guru");
        if (guruMsgs.length <= 1) {
          para(
            "No conversation recorded yet. Chat with Guru Ji to populate personalized insights here.",
          );
        } else {
          guruMsgs.slice(-6).forEach((m, i) => {
            para(
              `${i + 1}. ${m.text.replace(/[\u{1F000}-\u{1FFFF}\u2600-\u27BF]/gu, "").trim()}`,
            );
          });
        }

        doc.setTextColor(150, 150, 150);
        doc.setFontSize(9);
        doc.text(
          `Generated ${new Date().toLocaleString()} · AstroAI`,
          M,
          doc.internal.pageSize.getHeight() - 28,
        );

        savePdf(doc, `${firstName(profile.name)}-astrology-report.pdf`);
      } finally {
        setExporting(false);
      }
    }, 400);
  };

  const exportTranscript = () => {
    if (chatHistory.length === 0) return;
    setExportingChat(true);
    setTimeout(() => {
      try {
        const doc = new jsPDF({ unit: "pt", format: "a4" });
        const W = doc.internal.pageSize.getWidth();
        const H = doc.internal.pageSize.getHeight();
        const M = 48;
        let y = 128;

        doc.setFillColor(11, 12, 16);
        doc.rect(0, 0, W, 96, "F");
        doc.setTextColor(212, 175, 55);
        doc.setFont("helvetica", "bold");
        doc.setFontSize(24);
        doc.text("AstroAI", M, 50);
        doc.setTextColor(255, 153, 51);
        doc.setFontSize(13);
        doc.text("Guru Ji Chat Transcript", M, 72);

        doc.setFont("helvetica", "normal");
        doc.setFontSize(10);
        doc.setTextColor(90, 90, 90);
        doc.text(
          `${profile.name || "Seeker"} · ${sign.name} · ${nak} Nakshatra · Exported ${new Date().toLocaleString()}`,
          M,
          y,
        );
        y += 26;

        chatHistory.forEach((m) => {
          const isGuru = m.role === "guru";
          const label = isGuru ? "Guru Ji" : "You";
          if (y > H - 80) {
            doc.addPage();
            y = 64;
          }
          doc.setFont("helvetica", "bold");
          doc.setFontSize(11);
          if (isGuru) doc.setTextColor(200, 110, 20);
          else doc.setTextColor(70, 70, 70);
          doc.text(label, M, y);
          y += 15;

          doc.setFont("helvetica", "normal");
          doc.setFontSize(11);
          doc.setTextColor(25, 25, 25);
          const wrapped = doc.splitTextToSize(
            clean(m.text) || "—",
            W - M * 2 - 12,
          );
          for (const ln of wrapped) {
            if (y > H - 60) {
              doc.addPage();
              y = 64;
            }
            doc.text(ln, M + 12, y);
            y += 15;
          }
          y += 10;
        });

        savePdf(doc, `${firstName(profile.name)}-guru-ji-transcript.pdf`);
      } finally {
        setExportingChat(false);
      }
    }, 400);
  };

  return (
    <div className="h-full overflow-y-auto no-scrollbar px-4 pb-6 pt-5">
      <h1 className="font-display text-2xl font-bold text-gold-gradient">
        Your Profile
      </h1>
      <p className="mb-5 mt-1 text-sm text-muted-foreground">
        Saved birth details & cosmic charts.
      </p>

      {/* Hero card */}
      <div className="relative mb-5 overflow-hidden rounded-3xl border border-gold/30 bg-gradient-to-br from-surface to-surface-2 p-5">
        <Star className="absolute -right-3 -top-3 h-20 w-20 text-gold/10" />
        <div className="flex items-center gap-4">
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-saffron to-gold text-2xl font-bold text-[#1a1206] font-display">
            {firstName(profile.name).charAt(0)}
          </div>
          <div className="min-w-0">
            <h2 className="truncate font-display text-xl font-bold text-foreground">
              {profile.name}
            </h2>
            <p className="text-sm text-gold">
              {sign.name} · {nak} Nakshatra
            </p>
          </div>
        </div>
        <div className="mt-4 flex items-center gap-2">
          <Badge>{sign.element}</Badge>
          <Badge>Ruler: {sign.ruler}</Badge>
          <button
            onClick={() => setEditing(true)}
            className="ml-auto flex items-center gap-1.5 rounded-full border border-gold/40 bg-saffron/15 px-3 py-1.5 text-xs font-semibold text-gold active:scale-95"
          >
            <Pencil className="h-3.5 w-3.5" /> Edit
          </button>
        </div>
      </div>

      {/* Details */}
      <div className="mb-5 space-y-3">
        <DetailRow
          icon={<User className="h-5 w-5" />}
          label="Full Name"
          value={profile.name}
        />
        <DetailRow
          icon={<Calendar className="h-5 w-5" />}
          label="Date of Birth"
          value={fmtDate}
        />
        <DetailRow
          icon={<Clock className="h-5 w-5" />}
          label="Time of Birth"
          value={profile.tob || "—"}
        />
        <DetailRow
          icon={<MapPin className="h-5 w-5" />}
          label="Place of Birth"
          value={profile.pob || "—"}
        />
      </div>

      {/* Photos */}
      <h3 className="mb-2 font-display text-base font-bold text-foreground">
        Uploaded Readings
      </h3>
      <div className="mb-6 grid grid-cols-2 gap-3">
        <PhotoCard label="Face Reading" photo={profile.facePhoto} />
        <PhotoCard label="Palm (Hast Rekha)" photo={profile.palmPhoto} />
      </div>

      {/* Export PDF */}
      <button
        onClick={exportPdf}
        disabled={exporting}
        className="mb-3 flex h-13 w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-saffron to-gold py-3.5 font-semibold text-[#1a1206] active:scale-[0.99] disabled:opacity-70"
      >
        {exporting ? (
          <>
            <RefreshCw className="h-5 w-5 animate-spin" /> Generating Report…
          </>
        ) : (
          <>
            <FileDown className="h-5 w-5" /> Export PDF Astrology Report
          </>
        )}
      </button>

      {/* Chat transcript */}
      <button
        onClick={exportTranscript}
        disabled={exportingChat || chatHistory.length === 0}
        className="mb-1 flex h-13 w-full items-center justify-center gap-2 rounded-2xl border border-gold/40 bg-saffron/10 py-3.5 font-semibold text-gold active:scale-[0.99] disabled:opacity-50"
      >
        {exportingChat ? (
          <>
            <RefreshCw className="h-5 w-5 animate-spin" /> Preparing Transcript…
          </>
        ) : (
          <>
            <MessageSquareText className="h-5 w-5" /> Download Chat Transcript
          </>
        )}
      </button>
      {chatHistory.length === 0 && (
        <p className="mb-3 text-center text-xs text-muted-foreground">
          Chat with Guru Ji first to enable transcript download.
        </p>
      )}
      {chatHistory.length > 0 && <div className="mb-3" />}

      {/* Reset */}
      {!confirm ? (
        <button
          onClick={() => setConfirm(true)}
          className="flex h-13 w-full items-center justify-center gap-2 rounded-2xl border border-destructive/40 bg-destructive/10 py-3.5 font-semibold text-destructive active:scale-[0.99]"
        >
          <RefreshCw className="h-5 w-5" /> Reset App / Clear Data
        </button>
      ) : (
        <div className="rounded-2xl border border-destructive/40 bg-destructive/10 p-4">
          <p className="mb-3 text-sm text-foreground">
            This clears your profile and logs you out. Continue?
          </p>
          <div className="flex gap-3">
            <button
              onClick={() => setConfirm(false)}
              className="h-11 flex-1 rounded-xl bg-surface-2 font-semibold text-foreground"
            >
              Cancel
            </button>
            <button
              onClick={reset}
              className="h-11 flex-1 rounded-xl bg-destructive font-semibold text-destructive-foreground"
            >
              Clear &amp; Restart
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

function Badge({ children }: { children: React.ReactNode }) {
  return (
    <span className="rounded-full bg-saffron/15 px-3 py-1 text-xs font-semibold text-gold">
      {children}
    </span>
  );
}

function DetailRow({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-center gap-3 rounded-2xl border border-border bg-surface px-4 py-3.5">
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-saffron/15 text-gold">
        {icon}
      </div>
      <div className="min-w-0">
        <p className="text-xs text-muted-foreground">{label}</p>
        <p className="truncate font-medium text-foreground">{value}</p>
      </div>
    </div>
  );
}

function PhotoCard({ label, photo }: { label: string; photo: string | null }) {
  return (
    <div className="overflow-hidden rounded-2xl border border-border bg-surface">
      <div className="flex aspect-square items-center justify-center bg-surface-2">
        {photo ? (
          <img src={photo} alt={label} className="h-full w-full object-cover" />
        ) : (
          <Sparkles className="h-8 w-8 text-muted-foreground/40" />
        )}
      </div>
      <p className="px-3 py-2 text-center text-xs font-medium text-muted-foreground">
        {label}
      </p>
    </div>
  );
}
