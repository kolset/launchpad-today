"use client";

import { RocketIcon } from "./rocket-icon";

export function Header({ onSubmitClick }: { onSubmitClick: () => void }) {
  return (
    <header className="relative z-10 border-b border-white/[0.06]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <div className="animate-rocket-float">
            <RocketIcon size={36} flame={true} />
          </div>
          <div>
            <h1
              className="text-lg sm:text-xl font-bold tracking-wider uppercase"
              style={{ fontFamily: "'Orbitron', sans-serif" }}
            >
              <span style={{ color: "var(--neon-cyan)" }}>Launch</span>
              <span style={{ color: "var(--neon-pink)" }}>pad</span>
              <span className="text-white/40">.today</span>
            </h1>
          </div>
        </div>

        {/* Nav */}
        <div className="flex items-center gap-3 sm:gap-4">
          <span
            className="hidden sm:inline text-xs uppercase tracking-widest text-white/30"
            style={{ fontFamily: "'Space Mono', monospace" }}
          >
            AI-Ranked Launches
          </span>
          <button onClick={onSubmitClick} className="submit-btn px-3 sm:px-4 py-2 rounded text-xs sm:text-sm text-white whitespace-nowrap">
            <span className="sm:hidden">Launch</span>
            <span className="hidden sm:inline">Submit Launch</span>
          </button>
        </div>
      </div>
    </header>
  );
}
