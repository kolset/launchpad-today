"use client";

import { TimeFilter } from "@/lib/types";

const FILTERS: { value: TimeFilter; label: string; icon: string }[] = [
  { value: "today", label: "Today", icon: "☀️" },
  { value: "week", label: "This Week", icon: "📅" },
  { value: "month", label: "This Month", icon: "🗓️" },
  { value: "all-time", label: "All Time", icon: "🏆" },
];

export function TimeFilterBar({
  active,
  onChange,
}: {
  active: TimeFilter;
  onChange: (f: TimeFilter) => void;
}) {
  return (
    <div role="group" aria-label="Time period filter" className="flex items-center gap-1 sm:gap-2 p-1 rounded-lg bg-white/[0.03] border border-white/[0.06]">
      {FILTERS.map((f) => (
        <button
          key={f.value}
          onClick={() => onChange(f.value)}
          aria-pressed={active === f.value}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs transition-all"
          style={
            active === f.value
              ? {
                  background: "rgba(0, 240, 255, 0.1)",
                  border: "1px solid rgba(0, 240, 255, 0.25)",
                  color: "var(--neon-cyan)",
                  fontFamily: "'Orbitron', sans-serif",
                  fontWeight: 600,
                  textShadow: "0 0 6px rgba(0, 240, 255, 0.4)",
                }
              : {
                  background: "transparent",
                  border: "1px solid transparent",
                  color: "rgba(255,255,255,0.35)",
                  fontFamily: "'Space Mono', monospace",
                }
          }
        >
          <span className="text-sm hidden sm:inline" aria-hidden="true">{f.icon}</span>
          <span className="text-[10px] sm:text-xs uppercase tracking-wider">{f.label}</span>
        </button>
      ))}
    </div>
  );
}
