import { useState } from "react";
import { Moon, Sparkles, Star } from "lucide-react";
import { CosmicBackground } from "./CosmicBackground";
import { useAstro } from "@/lib/astro-context";

export function SplashScreen() {
  const { loginWithGoogle } = useAstro();
  const [loading, setLoading] = useState(false);

  const handleLogin = () => {
    setLoading(true);
    setTimeout(() => loginWithGoogle(), 1600);
  };

  return (
    <div className="relative flex min-h-dvh flex-col items-center justify-between overflow-hidden px-6 py-12">
      <CosmicBackground dense />

      <div className="relative z-10 flex flex-1 flex-col items-center justify-center text-center">
        <div className="relative mb-8 flex h-32 w-32 items-center justify-center">
          <div className="absolute inset-0 rounded-full border border-gold/30 animate-spin-slow" />
          <div className="absolute inset-3 rounded-full border border-saffron/20" />
          <div className="animate-float-slow flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-saffron to-gold shadow-[0_0_40px_rgba(255,153,51,0.5)]">
            <Moon className="h-10 w-10 text-[#1a1206]" strokeWidth={1.6} />
          </div>
          <Sparkles className="absolute -right-1 -top-1 h-6 w-6 text-gold animate-twinkle" />
          <Star className="absolute -bottom-2 left-0 h-4 w-4 text-saffron animate-twinkle" />
        </div>

        <p className="mb-2 text-sm uppercase tracking-[0.4em] text-gold/80">
          Vedic · AI · Cosmos
        </p>
        <h1 className="font-display text-5xl font-bold leading-tight text-gold-gradient">
          AstroAI
        </h1>
        <p className="mt-4 max-w-xs text-base text-muted-foreground">
          Welcome to AstroAI — your personal AI Master Astrologer. Unlock the
          secrets written in your stars.
        </p>
      </div>

      <div className="relative z-10 w-full max-w-sm">
        <button
          onClick={handleLogin}
          disabled={loading}
          className="flex h-14 w-full items-center justify-center gap-3 rounded-2xl bg-foreground text-base font-semibold text-[#1a1206] shadow-lg transition active:scale-[0.98] disabled:opacity-80"
        >
          {loading ? (
            <>
              <span className="h-5 w-5 animate-spin rounded-full border-2 border-[#1a1206]/30 border-t-[#1a1206]" />
              Connecting…
            </>
          ) : (
            <>
              <GoogleIcon />
              Continue with Google
            </>
          )}
        </button>
        <p className="mt-4 text-center text-xs text-muted-foreground/70">
          By continuing you agree to our cosmic terms & privacy ritual.
        </p>
      </div>
    </div>
  );
}

function GoogleIcon() {
  return (
    <svg className="h-5 w-5" viewBox="0 0 48 48">
      <path
        fill="#FFC107"
        d="M43.6 20.5H42V20H24v8h11.3C33.7 32.4 29.3 35.5 24 35.5 17.6 35.5 12.5 30.4 12.5 24S17.6 12.5 24 12.5c3 0 5.7 1.1 7.8 3l5.7-5.7C33.9 6.5 29.2 4.5 24 4.5 13.2 4.5 4.5 13.2 4.5 24S13.2 43.5 24 43.5 43.5 34.8 43.5 24c0-1.2-.1-2.3-.4-3.5z"
      />
      <path
        fill="#FF3D00"
        d="M6.3 14.7l6.6 4.8C14.7 15.1 19 12.5 24 12.5c3 0 5.7 1.1 7.8 3l5.7-5.7C33.9 6.5 29.2 4.5 24 4.5 16.3 4.5 9.7 8.9 6.3 14.7z"
      />
      <path
        fill="#4CAF50"
        d="M24 43.5c5.2 0 9.9-2 13.4-5.2l-6.2-5.2c-2 1.5-4.6 2.4-7.2 2.4-5.3 0-9.7-3.1-11.3-7.5l-6.5 5C9.6 39 16.2 43.5 24 43.5z"
      />
      <path
        fill="#1976D2"
        d="M43.6 20.5H42V20H24v8h11.3c-.8 2.2-2.2 4.1-4.1 5.6l6.2 5.2C41 35.6 43.5 30.3 43.5 24c0-1.2-.1-2.3-.4-3.5z"
      />
    </svg>
  );
}
