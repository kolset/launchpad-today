"use client";

import Link from "next/link";
import { RocketIcon } from "./rocket-icon";

function FooterLink({ href, children, external }: { href: string; children: React.ReactNode; external?: boolean }) {
  const baseClass = "text-xs text-white/35 hover:text-[var(--neon-cyan)] transition-colors duration-200";
  if (external) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={baseClass}
        style={{ minHeight: "44px", display: "inline-flex", alignItems: "center" }}
      >
        {children}
      </a>
    );
  }
  return (
    <Link
      href={href}
      className={baseClass}
      style={{ minHeight: "44px", display: "inline-flex", alignItems: "center" }}
    >
      {children}
    </Link>
  );
}

function SocialIcon({ href, label, children }: { href: string; label: string; children: React.ReactNode }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="w-10 h-10 rounded-lg flex items-center justify-center transition-all duration-200"
      style={{
        background: "rgba(0, 240, 255, 0.04)",
        border: "1px solid rgba(255, 255, 255, 0.06)",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.background = "rgba(0, 240, 255, 0.1)";
        e.currentTarget.style.borderColor = "rgba(0, 240, 255, 0.25)";
        e.currentTarget.style.boxShadow = "0 0 12px rgba(0, 240, 255, 0.1)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.background = "rgba(0, 240, 255, 0.04)";
        e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.06)";
        e.currentTarget.style.boxShadow = "none";
      }}
    >
      {children}
    </a>
  );
}

export function Footer() {
  return (
    <footer className="relative z-10 mt-16">
      {/* Top divider with neon glow */}
      <div className="retro-divider" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10 sm:py-14">
        {/* Main footer grid */}
        <div className="grid grid-cols-1 sm:grid-cols-12 gap-8 sm:gap-6">
          {/* Brand column */}
          <div className="sm:col-span-5">
            <div className="flex items-center gap-3 mb-4">
              <RocketIcon size={28} flame={true} />
              <span
                className="text-base tracking-wider uppercase"
                style={{ fontFamily: "var(--font-orbitron), 'Orbitron', sans-serif" }}
              >
                <span style={{ color: "var(--neon-cyan)" }}>Launch</span>
                <span style={{ color: "var(--neon-pink)" }}>pad</span>
                <span className="text-white/40">.today</span>
              </span>
            </div>
            <p className="text-xs text-white/30 leading-relaxed max-w-xs mb-5">
              Every day, AI picks the best startup launch on the internet.
              No bias. No politics. Just the score.
            </p>

            {/* Social icons */}
            <div className="flex items-center gap-2">
              <SocialIcon href="https://twitter.com/launchpadtoday" label="Follow on Twitter/X">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-white/40">
                  <path d="M4 4l11.733 16h4.267l-11.733 -16h-4.267z" />
                  <path d="M4 20l6.768 -6.768m2.46 -2.46l6.772 -6.772" />
                </svg>
              </SocialIcon>
              <SocialIcon href="https://github.com/launchpadtoday" label="View on GitHub">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-white/40">
                  <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
                </svg>
              </SocialIcon>
            </div>
          </div>

          {/* Navigation column */}
          <div className="sm:col-span-3">
            <h4
              className="text-[10px] uppercase tracking-[3px] text-white/40 mb-4"
              style={{ fontFamily: "var(--font-orbitron), 'Orbitron', sans-serif" }}
            >
              Navigate
            </h4>
            <div className="flex flex-col gap-0.5">
              <FooterLink href="/">Today&apos;s Rankings</FooterLink>
              <FooterLink href="/winners">Winners</FooterLink>
              <FooterLink href="/about">About</FooterLink>
              <FooterLink href="/">Submit a Launch</FooterLink>
            </div>
          </div>

          {/* Resources column */}
          <div className="sm:col-span-4">
            <h4
              className="text-[10px] uppercase tracking-[3px] text-white/40 mb-4"
              style={{ fontFamily: "var(--font-orbitron), 'Orbitron', sans-serif" }}
            >
              Resources
            </h4>
            <div className="flex flex-col gap-0.5">
              <FooterLink href="/api">API Docs</FooterLink>
              <FooterLink href="/terms">Terms of Service</FooterLink>
              <FooterLink href="/privacy">Privacy Policy</FooterLink>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          className="mt-10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3"
          style={{ borderTop: "1px solid rgba(255, 255, 255, 0.04)" }}
        >
          <p
            className="text-[10px] uppercase tracking-[3px] text-white/40"
            style={{ fontFamily: "var(--font-orbitron), 'Orbitron', sans-serif" }}
          >
            Mission Control &copy; {new Date().getFullYear()}
          </p>
          <p className="text-[10px] text-white/40">
            Built with AI. Ranked by AI. No humans were bribed.
          </p>
        </div>
      </div>
    </footer>
  );
}
