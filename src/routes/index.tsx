import { createFileRoute } from "@tanstack/react-router";
import { AstroProvider, useAstro } from "@/lib/astro-context";
import { SplashScreen } from "@/components/SplashScreen";
import { Onboarding } from "@/components/Onboarding";
import { MainApp } from "@/components/MainApp";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "AstroAI — AI Master Astrologer" },
      { name: "description", content: "AI-powered Vedic astrology: Guru Ji chatbot, Nadi, Lal Kitab, palmistry & face reading — all in your pocket." },
      { property: "og:title", content: "AstroAI — AI Master Astrologer" },
      { property: "og:description", content: "Your personal AI Vedic astrologer in your pocket." },
    ],
  }),
  component: () => (
    <AstroProvider>
      <Gate />
    </AstroProvider>
  ),
});

function Gate() {
  const { isAuthed, profile } = useAstro();

  if (!isAuthed) return <SplashScreen />;
  if (!profile) return <Onboarding />;
  return <MainApp />;
}
