"use client";

import { RocketIcon } from "./rocket-icon";

export function Footer() {
  return (
    <footer className="relative z-10 border-t border-white/[0.06] mt-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
        {/* Retro divider */}
        <div className="retro-divider mb-8" />

        <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <RocketIcon size={24} flame={true} />
            <span
              className="text-sm tracking-wider uppercase"
              style={{ fontFamily: "'Orbitron', sans-serif" }}
            >
              <span style={{ color: "var(--neon-cyan)" }}>Launch</span>
              <span style={{ color: "var(--neon-pink)" }}>pad</span>
              <span className="text-white/40">.today</span>
            </span>
          </div>

          {/* Tagline */}
          <p className="text-xs text-white/25 text-center">
            Every day, AI picks the best startup launch on the internet.
            <br />
            No bias. No politics. Just the score.
          </p>

          {/* Links */}
          <div className="flex items-center gap-4 text-xs text-white/30">
            <span className="hover:text-white/50 cursor-pointer transition-colors">About</span>
            <span className="hover:text-white/50 cursor-pointer transition-colors">API</span>
            <span className="hover:text-white/50 cursor-pointer transition-colors">Twitter</span>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-8 text-center">
          <p
            className="text-[10px] uppercase tracking-[4px] text-white/15"
            style={{ fontFamily: "'Orbitron', sans-serif" }}
          >
            Mission Control &copy; {new Date().getFullYear()}
          </p>
        </div>
      </div>
    </footer>
  );
}
