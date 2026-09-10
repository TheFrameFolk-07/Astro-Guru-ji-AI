import { useState } from "react";
import { MessageCircle, Sparkles, User } from "lucide-react";
import { GuruChat } from "./GuruChat";
import { SpecializedAstrology } from "./SpecializedAstrology";
import { ProfileView } from "./ProfileView";

type Tab = "guru" | "methods" | "profile";

const TABS: { id: Tab; label: string; icon: typeof MessageCircle }[] = [
  { id: "guru", label: "Guru Ji", icon: MessageCircle },
  { id: "methods", label: "Astrology", icon: Sparkles },
  { id: "profile", label: "Profile", icon: User },
];

export function MainApp() {
  const [tab, setTab] = useState<Tab>("guru");

  return (
    <div className="flex h-dvh flex-col bg-background">
      <main className="min-h-0 flex-1">
        {tab === "guru" && <GuruChat />}
        {tab === "methods" && <SpecializedAstrology />}
        {tab === "profile" && <ProfileView />}
      </main>

      <nav className="flex shrink-0 items-stretch border-t border-border bg-surface/95 pb-[env(safe-area-inset-bottom)] backdrop-blur">
        {TABS.map((t) => {
          const active = tab === t.id;
          const Icon = t.icon;
          return (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className="flex flex-1 flex-col items-center gap-1 py-2.5 transition active:scale-95"
            >
              <span
                className={`flex h-9 w-14 items-center justify-center rounded-full transition ${
                  active ? "bg-saffron/15 text-gold" : "text-muted-foreground"
                }`}
              >
                <Icon className="h-5 w-5" strokeWidth={active ? 2.4 : 1.8} />
              </span>
              <span className={`text-[11px] font-medium ${active ? "text-gold" : "text-muted-foreground"}`}>
                {t.label}
              </span>
            </button>
          );
        })}
      </nav>
    </div>
  );
}
