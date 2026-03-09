"use client";

import { RocketIcon } from "./rocket-icon";

interface HeaderProps {
  onSubmitClick: () => void;
  onSearchClick: () => void;
}

export function Header({ onSubmitClick, onSearchClick }: HeaderProps) {
  return (
    <header className="relative z-10 border-b border-white/[0.06]">
      {/* Skip to main content link */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:z-50 focus:top-2 focus:left-2 focus:px-4 focus:py-2 focus:rounded-lg focus:text-sm focus:font-bold"
        style={{
          background: "var(--neon-cyan)",
          color: "var(--deep-black)",
          fontFamily: "'Orbitron', sans-serif",
        }}
      >
        Skip to main content
      </a>
      <nav className="max-w-6xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between" aria-label="Main navigation">
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

          {/* Search button */}
          <button
            onClick={onSearchClick}
            className="flex items-center gap-2 px-3 py-2 rounded-lg transition-all duration-200"
            style={{
              minHeight: "44px",
              minWidth: "44px",
              background: "rgba(0, 240, 255, 0.06)",
              border: "1px solid rgba(0, 240, 255, 0.15)",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "rgba(0, 240, 255, 0.12)";
              e.currentTarget.style.borderColor = "rgba(0, 240, 255, 0.3)";
              e.currentTarget.style.boxShadow =
                "0 0 12px rgba(0, 240, 255, 0.15)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "rgba(0, 240, 255, 0.06)";
              e.currentTarget.style.borderColor = "rgba(0, 240, 255, 0.15)";
              e.currentTarget.style.boxShadow = "none";
            }}
            aria-label="Search launches"
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              style={{ color: "var(--neon-cyan)" }}
            >
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
            <kbd
              className="hidden sm:inline-flex items-center text-[10px] text-white/25 px-1.5 py-0.5 rounded"
              style={{
                fontFamily: "'Space Mono', monospace",
                border: "1px solid rgba(255, 255, 255, 0.1)",
                background: "rgba(255, 255, 255, 0.03)",
              }}
            >
              Cmd+K
            </kbd>
          </button>

          <button
            onClick={onSubmitClick}
            className="submit-btn px-3 sm:px-4 py-2 rounded text-xs sm:text-sm text-white whitespace-nowrap"
            style={{ minHeight: "44px" }}
          >
            <span className="sm:hidden">Launch</span>
            <span className="hidden sm:inline">Submit Launch</span>
          </button>
        </div>
      </nav>
    </header>
  );
}
