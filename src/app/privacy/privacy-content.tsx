"use client";

import Link from "next/link";
import { StarsBackground } from "@/components/stars-background";
import { RocketIcon } from "@/components/rocket-icon";
import { Footer } from "@/components/footer";

const LAST_UPDATED = "March 9, 2026";

const SECTIONS = [
  {
    icon: "📡",
    title: "What We Collect",
    color: "var(--neon-cyan)",
    borderColor: "rgba(0, 240, 255, 0.25)",
    glowColor: "rgba(0, 240, 255, 0.12)",
    glowClass: "neon-glow-cyan-sm",
    paragraphs: [
      "When you submit a startup, we collect the product name, tagline, description, URL, and category you provide. That's the core of what makes Launchpad.today work.",
      "If you sign up for our newsletter, we'll store your email address. We won't send you anything you didn't ask for.",
      "We also collect basic analytics data (page views, referral sources) to understand how people use the site. Nothing personally identifiable.",
    ],
  },
  {
    icon: "🤖",
    title: "AI Scoring",
    color: "var(--neon-pink)",
    borderColor: "rgba(255, 45, 120, 0.25)",
    glowColor: "rgba(255, 45, 120, 0.12)",
    glowClass: "neon-glow-pink-sm",
    paragraphs: [
      "Every submission gets scored by AI models. These scores are algorithmic, not human opinions. They don't represent endorsements, investment advice, or guarantees of any kind.",
      "The AI evaluates your product's public-facing information. It doesn't access private data, internal metrics, or anything you haven't submitted.",
    ],
  },
  {
    icon: "🔒",
    title: "Data Sharing",
    color: "var(--neon-purple)",
    borderColor: "rgba(176, 38, 255, 0.25)",
    glowColor: "rgba(176, 38, 255, 0.12)",
    glowClass: "neon-glow-purple-sm",
    paragraphs: [
      "We don't sell your data to third parties. Period.",
      "Submission data (product name, tagline, description, score) is displayed publicly on the site. That's the whole point. But your email address stays private.",
      "We may share aggregated, anonymized usage statistics. Nothing that could identify you personally.",
    ],
  },
  {
    icon: "🍪",
    title: "Cookies & Local Storage",
    color: "var(--neon-yellow)",
    borderColor: "rgba(255, 230, 0, 0.25)",
    glowColor: "rgba(255, 230, 0, 0.12)",
    glowClass: "neon-glow-yellow-sm",
    paragraphs: [
      "We don't use tracking cookies. No third-party ad networks. No creepy retargeting.",
      "We use localStorage in your browser to remember your upvotes and search history. This data stays on your device and never leaves it.",
    ],
  },
  {
    icon: "🛡️",
    title: "Your Rights",
    color: "var(--neon-green)",
    borderColor: "rgba(57, 255, 20, 0.25)",
    glowColor: "rgba(57, 255, 20, 0.12)",
    glowClass: "neon-glow-green-sm",
    paragraphs: [
      "You can request deletion of your submission data at any time. Just email us and we'll handle it.",
      "If you signed up for the newsletter, you can unsubscribe with one click. We'll remove your email from our list immediately.",
    ],
  },
];

export function PrivacyContent() {
  return (
    <div className="min-h-screen grid-bg horizon-gradient relative">
      <StarsBackground />

      {/* Header */}
      <header className="relative z-10 border-b border-white/[0.06]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
            <div className="animate-rocket-float">
              <RocketIcon size={36} flame={true} />
            </div>
            <div>
              <h1
                className="text-lg sm:text-xl font-bold tracking-wider uppercase"
                style={{ fontFamily: "var(--font-orbitron), 'Orbitron', sans-serif" }}
              >
                <span style={{ color: "var(--neon-cyan)" }}>Launch</span>
                <span style={{ color: "var(--neon-pink)" }}>pad</span>
                <span className="text-white/40">.today</span>
              </h1>
            </div>
          </Link>

          <Link
            href="/"
            className="submit-btn px-4 py-2 rounded text-xs sm:text-sm text-white inline-block"
          >
            Back to Launches
          </Link>
        </div>
      </header>

      {/* Main content */}
      <main className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
        {/* Page heading */}
        <section className="text-center mb-12 sm:mb-16">
          <div
            className="text-xs uppercase tracking-[6px] mb-4"
            style={{
              fontFamily: "var(--font-orbitron), 'Orbitron', sans-serif",
              color: "var(--neon-cyan)",
            }}
          >
            <span className="neon-glow-cyan-sm">Legal Transmission</span>
          </div>
          <h2
            className="text-3xl sm:text-4xl font-black tracking-wider uppercase mb-4"
            style={{ fontFamily: "var(--font-orbitron), 'Orbitron', sans-serif" }}
          >
            <span className="chrome-text">Privacy</span>{" "}
            <span style={{ color: "var(--neon-cyan)" }} className="neon-text-cyan">
              Policy
            </span>
          </h2>
          <div className="retro-divider max-w-xs mx-auto mb-4" />
          <p className="text-xs text-white/30 uppercase tracking-widest">
            Last updated: {LAST_UPDATED}
          </p>
        </section>

        {/* Intro */}
        <section className="mb-10">
          <div className="retro-card rounded-2xl p-6 sm:p-8">
            <p className="text-sm text-white/60 leading-relaxed">
              Launchpad.today is built on a simple principle: judge products, not people. We carry
              that same philosophy into how we handle your data. Here's exactly what we collect, why
              we collect it, and what we do with it.
            </p>
          </div>
        </section>

        {/* Sections */}
        <div className="space-y-6">
          {SECTIONS.map((section) => (
            <section key={section.title}>
              <div className="retro-card rounded-xl p-6 sm:p-8">
                <div className="flex items-center gap-3 mb-5">
                  <div
                    className="w-10 h-10 rounded-lg flex items-center justify-center text-lg shrink-0"
                    style={{
                      border: `1px solid ${section.borderColor}`,
                      boxShadow: `0 0 12px ${section.glowColor}`,
                      background: "rgba(10, 10, 25, 0.8)",
                    }}
                  >
                    {section.icon}
                  </div>
                  <h3
                    className={`text-sm sm:text-base font-bold tracking-wider uppercase ${section.glowClass}`}
                    style={{
                      fontFamily: "var(--font-orbitron), 'Orbitron', sans-serif",
                      color: section.color,
                    }}
                  >
                    {section.title}
                  </h3>
                </div>

                <div className="space-y-3 text-sm text-white/55 leading-relaxed">
                  {section.paragraphs.map((p, i) => (
                    <p key={i}>{p}</p>
                  ))}
                </div>
              </div>
            </section>
          ))}
        </div>

        {/* Contact */}
        <section className="mt-10">
          <div
            className="retro-card rounded-2xl p-6 sm:p-8 text-center"
            style={{
              borderColor: "rgba(0, 240, 255, 0.15)",
              background: "rgba(15, 10, 25, 0.9)",
            }}
          >
            <h3
              className="text-sm font-bold tracking-wider uppercase neon-glow-cyan-sm mb-3"
              style={{ fontFamily: "var(--font-orbitron), 'Orbitron', sans-serif", color: "var(--neon-cyan)" }}
            >
              Questions?
            </h3>
            <p className="text-sm text-white/45 mb-4">
              If you've got questions about your data or this policy, reach out.
            </p>
            <a
              href="mailto:hello@launchpad.today"
              className="submit-btn px-6 py-2.5 rounded-lg text-sm text-white inline-block"
            >
              hello@launchpad.today
            </a>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
