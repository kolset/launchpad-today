"use client";

import Link from "next/link";
import { StarsBackground } from "@/components/stars-background";
import { RocketIcon } from "@/components/rocket-icon";
import { Footer } from "@/components/footer";

const SCORE_TIERS = [
  {
    range: "90 to100",
    label: "Exceptional",
    color: "var(--neon-yellow)",
    glow: "neon-glow-yellow-sm",
    borderColor: "rgba(255, 230, 0, 0.3)",
    desc: "A generational product. The kind of launch people talk about for years.",
  },
  {
    range: "80 to89",
    label: "Strong",
    color: "var(--neon-green)",
    glow: "neon-glow-green-sm",
    borderColor: "rgba(57, 255, 20, 0.3)",
    desc: "Impressive across the board. Serious contender for Product of the Day.",
  },
  {
    range: "70 to79",
    label: "Promising",
    color: "var(--neon-cyan)",
    glow: "neon-glow-cyan-sm",
    borderColor: "rgba(0, 240, 255, 0.3)",
    desc: "Good foundation with clear potential. One or two areas need sharpening.",
  },
  {
    range: "Below 70",
    label: "Needs Work",
    color: "var(--neon-pink)",
    glow: "neon-glow-pink-sm",
    borderColor: "rgba(255, 45, 120, 0.3)",
    desc: "The bones might be there, but execution or timing isn't clicking yet.",
  },
];

const CRITERIA = [
  {
    name: "Innovation",
    range: "0 to100",
    icon: "💡",
    color: "var(--neon-cyan)",
    borderColor: "rgba(0, 240, 255, 0.25)",
    glowColor: "rgba(0, 240, 255, 0.12)",
    desc: "How novel is the idea? Is this solving a new problem or approaching an old one differently? We're looking for genuine originality, not a reskin of something that already exists. The AI weighs uniqueness of approach, creative problem-solving, and whether the concept pushes boundaries.",
  },
  {
    name: "Execution",
    range: "0 to100",
    icon: "⚡",
    color: "var(--neon-pink)",
    borderColor: "rgba(255, 45, 120, 0.25)",
    glowColor: "rgba(255, 45, 120, 0.12)",
    desc: "How well is it built? UX quality, technical sophistication, polish level. A great idea poorly executed won't score high here. The AI evaluates design quality, user experience flow, technical implementation, performance, and overall craftsmanship.",
  },
  {
    name: "Potential",
    range: "0 to100",
    icon: "🔮",
    color: "var(--neon-purple)",
    borderColor: "rgba(176, 38, 255, 0.25)",
    glowColor: "rgba(176, 38, 255, 0.12)",
    desc: "Market size, scalability, defensibility, and revenue model clarity. Can this become a real business? The AI assesses total addressable market, competitive moats, monetization strategy, and whether the product can scale without breaking.",
  },
  {
    name: "Timing",
    range: "0 to100",
    icon: "🎯",
    color: "var(--neon-yellow)",
    borderColor: "rgba(255, 230, 0, 0.25)",
    glowColor: "rgba(255, 230, 0, 0.12)",
    desc: "Is the market ready? Are conditions right for this to succeed now? Being too early is just as fatal as being too late. The AI considers current market trends, regulatory environment, technology readiness, and cultural momentum.",
  },
];

const WINNER_LEVELS = [
  {
    title: "Product of the Day",
    icon: "🏆",
    color: "var(--neon-yellow)",
    glow: "neon-glow-yellow-sm",
    borderColor: "rgba(255, 230, 0, 0.25)",
    desc: "The highest-scoring launch submitted that day. At midnight UTC, the AI crowns the winner. Every day is a fresh competition.",
  },
  {
    title: "Product of the Week",
    icon: "⭐",
    color: "var(--neon-cyan)",
    glow: "neon-glow-cyan-sm",
    borderColor: "rgba(0, 240, 255, 0.25)",
    desc: "The highest-scoring daily winner from the past 7 days. Weekly winners represent the best of the best from a full week of launches.",
  },
  {
    title: "Product of the Month",
    icon: "👑",
    color: "var(--neon-pink)",
    glow: "neon-glow-pink-sm",
    borderColor: "rgba(255, 45, 120, 0.25)",
    desc: "The top weekly winner from the past month. This is the most prestigious title on Launchpad.today. Only 12 products per year earn it.",
  },
];

export function AboutContent() {
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
                style={{ fontFamily: "'Orbitron', sans-serif" }}
              >
                <span style={{ color: "var(--neon-cyan)" }}>Launch</span>
                <span style={{ color: "var(--neon-pink)" }}>pad</span>
                <span className="text-white/40">.today</span>
              </h1>
            </div>
          </Link>

          <div className="flex items-center gap-3 sm:gap-4">
            <span
              className="hidden sm:inline text-xs uppercase tracking-widest text-white/30"
              style={{ fontFamily: "'Space Mono', monospace" }}
            >
              Mission Control
            </span>
            <Link
              href="/"
              className="submit-btn px-4 py-2 rounded text-xs sm:text-sm text-white inline-block"
            >
              Back to Launches
            </Link>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
        {/* Hero Section */}
        <section className="text-center mb-16 sm:mb-20">
          <div
            className="text-xs uppercase tracking-[6px] mb-4"
            style={{
              fontFamily: "'Orbitron', sans-serif",
              color: "var(--neon-cyan)",
            }}
          >
            <span className="neon-glow-cyan-sm">Transmission Incoming</span>
          </div>
          <h2
            className="text-3xl sm:text-5xl font-black tracking-wider uppercase mb-6"
            style={{ fontFamily: "'Orbitron', sans-serif" }}
          >
            <span className="chrome-text">Mission</span>{" "}
            <span style={{ color: "var(--neon-cyan)" }} className="neon-text-cyan">
              Control
            </span>
          </h2>
          <div className="retro-divider max-w-xs mx-auto mb-6" />
          <p className="text-sm sm:text-base text-white/50 max-w-2xl mx-auto leading-relaxed">
            Everything you need to know about how Launchpad.today works, how the AI scores your
            launch, and how winners get crowned.
          </p>
        </section>

        {/* The Mission */}
        <section className="mb-16 sm:mb-20">
          <div className="retro-card rounded-2xl p-6 sm:p-10">
            <div className="flex items-center gap-3 mb-6">
              <div
                className="w-10 h-10 rounded-lg flex items-center justify-center text-lg"
                style={{
                  border: "1px solid rgba(255, 45, 120, 0.25)",
                  boxShadow: "0 0 12px rgba(255, 45, 120, 0.12)",
                  background: "rgba(10, 10, 25, 0.8)",
                }}
              >
                🚀
              </div>
              <h3
                className="text-lg sm:text-xl font-bold tracking-wider uppercase neon-glow-pink-sm"
                style={{ fontFamily: "'Orbitron', sans-serif", color: "var(--neon-pink)" }}
              >
                The Mission
              </h3>
            </div>

            <div className="space-y-4 text-sm text-white/60 leading-relaxed">
              <p>
                Most startup ranking platforms have a problem. Popularity contests reward who has
                the biggest audience, not who built the best product. Insider networks push their
                friends to the top. The playing field isn't level.
              </p>
              <p>
                Launchpad.today fixes that by removing humans from the judging process entirely.
                Our AI evaluates every submission on the same four criteria, with the same
                standards, every single time. It doesn't care who you know, how many Twitter
                followers you have, or whether you're backed by a top-tier VC.
              </p>
              <p>
                No bias. No politics. No pay-to-play. Just your product, scored on its merits.
                That's it.
              </p>
            </div>
          </div>
        </section>

        {/* AI Scoring Methodology */}
        <section className="mb-16 sm:mb-20">
          <div className="text-center mb-10">
            <h3
              className="text-lg sm:text-2xl font-bold tracking-wider uppercase neon-glow-cyan-sm mb-3"
              style={{ fontFamily: "'Orbitron', sans-serif", color: "var(--neon-cyan)" }}
            >
              AI Scoring Methodology
            </h3>
            <p className="text-xs sm:text-sm text-white/40 max-w-xl mx-auto">
              Every launch is evaluated across four dimensions. Each scores 0 to 100.
              The composite score is a weighted average of all four.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {CRITERIA.map((criterion) => (
              <div key={criterion.name} className="retro-card rounded-xl p-6">
                <div className="flex items-start gap-4 mb-4">
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center text-xl shrink-0"
                    style={{
                      border: `1px solid ${criterion.borderColor}`,
                      boxShadow: `0 0 12px ${criterion.glowColor}`,
                      background: "rgba(10, 10, 25, 0.8)",
                    }}
                  >
                    {criterion.icon}
                  </div>
                  <div>
                    <h4
                      className="text-base font-bold tracking-wider uppercase"
                      style={{
                        fontFamily: "'Orbitron', sans-serif",
                        color: criterion.color,
                      }}
                    >
                      {criterion.name}
                    </h4>
                    <span className="text-[10px] uppercase tracking-widest text-white/30">
                      {criterion.range} points
                    </span>
                  </div>
                </div>
                <p className="text-xs text-white/50 leading-relaxed">{criterion.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* How Scores Work */}
        <section className="mb-16 sm:mb-20">
          <div className="retro-card rounded-2xl p-6 sm:p-10">
            <div className="flex items-center gap-3 mb-6">
              <div
                className="w-10 h-10 rounded-lg flex items-center justify-center text-lg"
                style={{
                  border: "1px solid rgba(0, 240, 255, 0.25)",
                  boxShadow: "0 0 12px rgba(0, 240, 255, 0.12)",
                  background: "rgba(10, 10, 25, 0.8)",
                }}
              >
                📊
              </div>
              <h3
                className="text-lg sm:text-xl font-bold tracking-wider uppercase neon-glow-cyan-sm"
                style={{ fontFamily: "'Orbitron', sans-serif", color: "var(--neon-cyan)" }}
              >
                How Scores Work
              </h3>
            </div>

            <div className="space-y-4 text-sm text-white/60 leading-relaxed mb-8">
              <p>
                Your composite score is a weighted average of all four criteria. The AI doesn't
                just average the numbers blindly. It weighs each dimension based on the category
                of your product and current market conditions.
              </p>
              <p>
                A developer tool might weight Execution and Innovation higher. A consumer app
                might lean more on Timing and Potential. The weights adapt, but the standards
                never drop.
              </p>
            </div>

            {/* Score tiers */}
            <div className="space-y-3">
              {SCORE_TIERS.map((tier) => (
                <div
                  key={tier.label}
                  className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 p-4 rounded-xl"
                  style={{
                    background: "rgba(10, 10, 30, 0.6)",
                    border: `1px solid ${tier.borderColor}`,
                  }}
                >
                  <div className="flex items-center gap-3 sm:w-48 shrink-0">
                    <span
                      className={`text-sm font-black ${tier.glow}`}
                      style={{
                        fontFamily: "'Orbitron', sans-serif",
                        color: tier.color,
                        minWidth: "80px",
                      }}
                    >
                      {tier.range}
                    </span>
                    <span
                      className="text-[10px] uppercase tracking-widest font-bold"
                      style={{ color: tier.color }}
                    >
                      {tier.label}
                    </span>
                  </div>
                  <p className="text-xs text-white/45 leading-relaxed">{tier.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Winners */}
        <section className="mb-16 sm:mb-20">
          <div className="text-center mb-10">
            <h3
              className="text-lg sm:text-2xl font-bold tracking-wider uppercase neon-glow-yellow-sm mb-3"
              style={{ fontFamily: "'Orbitron', sans-serif", color: "var(--neon-yellow)" }}
            >
              Winners
            </h3>
            <p className="text-xs sm:text-sm text-white/40 max-w-xl mx-auto">
              Three tiers of glory. Each one harder to earn than the last.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {WINNER_LEVELS.map((level) => (
              <div key={level.title} className="retro-card rounded-xl p-6 text-center">
                <div
                  className="w-14 h-14 rounded-xl flex items-center justify-center text-2xl mx-auto mb-4"
                  style={{
                    border: `1px solid ${level.borderColor}`,
                    boxShadow: `0 0 16px ${level.borderColor}`,
                    background: "rgba(10, 10, 25, 0.8)",
                  }}
                >
                  {level.icon}
                </div>
                <h4
                  className={`text-xs font-bold uppercase tracking-[2px] mb-3 ${level.glow}`}
                  style={{
                    fontFamily: "'Orbitron', sans-serif",
                    color: level.color,
                  }}
                >
                  {level.title}
                </h4>
                <p className="text-xs text-white/45 leading-relaxed">{level.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Submit CTA */}
        <section>
          <div
            className="retro-card rounded-2xl p-8 sm:p-12 text-center"
            style={{
              borderColor: "rgba(255, 45, 120, 0.2)",
              background: "rgba(15, 10, 25, 0.9)",
              boxShadow: "0 0 40px rgba(255, 45, 120, 0.08), 0 0 80px rgba(176, 38, 255, 0.04)",
            }}
          >
            <div className="animate-rocket-float inline-block mb-4">
              <RocketIcon size={48} flame={true} />
            </div>
            <h3
              className="text-xl sm:text-2xl font-black tracking-wider uppercase mb-3"
              style={{ fontFamily: "'Orbitron', sans-serif" }}
            >
              <span className="chrome-text">Ready for</span>{" "}
              <span style={{ color: "var(--neon-pink)" }} className="neon-glow-pink-sm">
                Launch?
              </span>
            </h3>
            <p className="text-sm text-white/40 max-w-md mx-auto mb-6">
              Submit your startup and let the AI be the judge. No gatekeepers, no waiting list.
              Your product speaks for itself.
            </p>
            <Link
              href="/"
              className="submit-btn px-8 py-3 rounded-lg text-sm text-white inline-block"
            >
              Submit Your Launch
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
