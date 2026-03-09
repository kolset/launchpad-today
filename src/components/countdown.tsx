"use client";

import { useEffect, useState } from "react";

function getTimeUntilMidnight() {
  const now = new Date();
  const midnight = new Date(now);
  midnight.setHours(24, 0, 0, 0);
  const diff = midnight.getTime() - now.getTime();

  const hours = Math.floor(diff / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((diff % (1000 * 60)) / 1000);

  return { hours, minutes, seconds };
}

export function Countdown() {
  const [time, setTime] = useState({ hours: 0, minutes: 0, seconds: 0 });
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setTime(getTimeUntilMidnight());
    setMounted(true);
    const interval = setInterval(() => {
      setTime(getTimeUntilMidnight());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const pad = (n: number) => String(n).padStart(2, "0");

  return (
    <div className="flex items-center gap-2" aria-hidden="true" title={`Next ranking in ${pad(time.hours)}:${pad(time.minutes)}:${pad(time.seconds)}`} style={{ opacity: mounted ? 1 : 0, transition: "opacity 0.4s ease-in" }}>
      <span className="text-[10px] uppercase tracking-widest text-white/25">
        Next ranking in
      </span>
      <div className="flex items-center gap-1">
        {[
          { val: time.hours, label: "H" },
          { val: time.minutes, label: "M" },
          { val: time.seconds, label: "S" },
        ].map((unit, i) => (
          <div key={unit.label} className="flex items-center gap-1">
            {i > 0 && (
              <span
                className="text-sm font-bold animate-pulse-glow"
                style={{ color: "var(--neon-pink)" }}
              >
                :
              </span>
            )}
            <span
              className="text-sm sm:text-base font-bold neon-glow-cyan-sm"
              style={{
                fontFamily: "var(--font-orbitron), 'Orbitron', sans-serif",
                color: "var(--neon-cyan)",
              }}
            >
              {pad(unit.val)}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
