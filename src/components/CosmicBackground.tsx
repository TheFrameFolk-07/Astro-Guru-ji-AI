import { useEffect, useState } from "react";

interface StarT {
  id: number;
  top: number;
  left: number;
  size: number;
  delay: number;
  dur: number;
}

export function CosmicBackground({ dense = false }: { dense?: boolean }) {
  const [stars, setStars] = useState<StarT[]>([]);

  useEffect(() => {
    setStars(
      Array.from({ length: dense ? 60 : 36 }).map((_, i) => ({
        id: i,
        top: Math.random() * 100,
        left: Math.random() * 100,
        size: Math.random() * 2 + 1,
        delay: Math.random() * 3,
        dur: 2 + Math.random() * 3,
      })),
    );
  }, [dense]);


  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="absolute inset-0 gradient-cosmic" />

      {/* Rotating zodiac ring */}
      <div className="absolute left-1/2 top-[-30%] h-[140vw] w-[140vw] -translate-x-1/2 animate-spin-slow opacity-[0.13]">
        <svg viewBox="0 0 400 400" className="h-full w-full">
          <circle cx="200" cy="200" r="180" fill="none" stroke="var(--gold)" strokeWidth="0.6" />
          <circle cx="200" cy="200" r="140" fill="none" stroke="var(--saffron)" strokeWidth="0.4" strokeDasharray="3 5" />
          <circle cx="200" cy="200" r="100" fill="none" stroke="var(--gold)" strokeWidth="0.4" />
          {Array.from({ length: 12 }).map((_, i) => {
            const a = (i / 12) * Math.PI * 2;
            return (
              <line
                key={i}
                x1={+(200 + Math.cos(a) * 100).toFixed(2)}
                y1={+(200 + Math.sin(a) * 100).toFixed(2)}
                x2={+(200 + Math.cos(a) * 180).toFixed(2)}
                y2={+(200 + Math.sin(a) * 180).toFixed(2)}
                stroke="var(--gold)"
                strokeWidth="0.4"
              />
            );
          })}
        </svg>
      </div>

      {stars.map((s) => (
        <span
          key={s.id}
          className="absolute rounded-full bg-gold animate-twinkle"
          style={{
            top: `${s.top}%`,
            left: `${s.left}%`,
            width: s.size,
            height: s.size,
            animationDelay: `${s.delay}s`,
            animationDuration: `${s.dur}s`,
          }}
        />
      ))}
    </div>
  );
}
