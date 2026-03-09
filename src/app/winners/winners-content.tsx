"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { StarsBackground } from "@/components/stars-background";
import { RocketIcon } from "@/components/rocket-icon";
import { Footer } from "@/components/footer";
import { MOCK_PRODUCTS, PAST_WINNERS } from "@/lib/mock-data";
import { getProducts } from "@/lib/api";
import { Product } from "@/lib/types";

const WINNER_CONFIG = {
  month: {
    label: "Product of the Month",
    icon: "👑",
    accent: "var(--neon-pink)",
    bg: "rgba(255, 45, 120, 0.06)",
    border: "rgba(255, 45, 120, 0.25)",
    hoverBorder: "rgba(255, 45, 120, 0.5)",
    glow: "neon-glow-pink-sm",
    glowColor: "rgba(255, 45, 120, 0.12)",
    shadowColor: "rgba(255, 45, 120, 0.08)",
    periodLabel: "March 2026",
  },
  week: {
    label: "Product of the Week",
    icon: "⭐",
    accent: "var(--neon-cyan)",
    bg: "rgba(0, 240, 255, 0.06)",
    border: "rgba(0, 240, 255, 0.25)",
    hoverBorder: "rgba(0, 240, 255, 0.5)",
    glow: "neon-glow-cyan-sm",
    glowColor: "rgba(0, 240, 255, 0.12)",
    shadowColor: "rgba(0, 240, 255, 0.08)",
    periodLabel: "Mar 3 - 9, 2026",
  },
  day: {
    label: "Product of the Day",
    icon: "🏆",
    accent: "var(--neon-yellow)",
    bg: "rgba(255, 230, 0, 0.06)",
    border: "rgba(255, 230, 0, 0.25)",
    hoverBorder: "rgba(255, 230, 0, 0.5)",
    glow: "neon-glow-yellow-sm",
    glowColor: "rgba(255, 230, 0, 0.12)",
    shadowColor: "rgba(255, 230, 0, 0.08)",
    periodLabel: "March 9, 2026",
  },
} as const;

function WinnerCard({
  product,
  tier,
  featured,
}: {
  product: Product;
  tier: "day" | "week" | "month";
  featured?: boolean;
}) {
  const config = WINNER_CONFIG[tier];

  return (
    <Link
      href={`/product/${product.id}`}
      className="retro-card block rounded-2xl no-underline group transition-all duration-300"
      style={{
        border: `1px solid ${config.border}`,
        background: "rgba(10, 10, 30, 0.7)",
        boxShadow: `0 0 30px ${config.shadowColor}, inset 0 1px 0 rgba(255, 255, 255, 0.04)`,
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = config.hoverBorder;
        e.currentTarget.style.boxShadow = `0 0 50px ${config.shadowColor}, 0 0 80px ${config.shadowColor}, inset 0 1px 0 rgba(255, 255, 255, 0.06)`;
        e.currentTarget.style.transform = "translateY(-2px)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = config.border;
        e.currentTarget.style.boxShadow = `0 0 30px ${config.shadowColor}, inset 0 1px 0 rgba(255, 255, 255, 0.04)`;
        e.currentTarget.style.transform = "translateY(0)";
      }}
    >
      <div className={featured ? "p-6 sm:p-8" : "p-5 sm:p-6"}>
        {/* Period label */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <span className="text-lg" aria-hidden="true">
              {config.icon}
            </span>
            <span
              className={`text-[10px] uppercase tracking-[3px] font-bold ${config.glow}`}
              style={{
                fontFamily: "var(--font-orbitron), 'Orbitron', sans-serif",
                color: config.accent,
              }}
            >
              {config.label}
            </span>
          </div>
          <span
            className="text-[10px] uppercase tracking-widest text-white/40"
            style={{ fontFamily: "var(--font-space-mono), 'Space Mono', monospace" }}
          >
            {config.periodLabel}
          </span>
        </div>

        {/* Divider */}
        <div
          className="mb-5"
          style={{
            height: "1px",
            background: `linear-gradient(90deg, ${config.border}, transparent)`,
          }}
        />

        {/* Product info */}
        <div className="flex items-start gap-4">
          <div
            className="shrink-0 rounded-xl flex items-center justify-center"
            style={{
              width: featured ? "64px" : "52px",
              height: featured ? "64px" : "52px",
              fontSize: featured ? "28px" : "22px",
              background: config.bg,
              border: `1px solid ${config.border}`,
              boxShadow: `0 0 16px ${config.glowColor}`,
            }}
          >
            {product.logoEmoji}
          </div>
          <div className="flex-1 min-w-0">
            <h3
              className={`font-bold tracking-wider uppercase text-white mb-1 ${
                featured ? "text-lg sm:text-xl" : "text-sm sm:text-base"
              }`}
              style={{ fontFamily: "var(--font-orbitron), 'Orbitron', sans-serif" }}
            >
              {product.name}
            </h3>
            <p
              className="text-xs sm:text-sm text-white/45 mb-3 line-clamp-2"
              style={{ fontFamily: "var(--font-space-mono), 'Space Mono', monospace" }}
            >
              {product.tagline}
            </p>
            <div className="flex items-center gap-3 flex-wrap">
              <span
                className="px-2.5 py-1 rounded-md text-[10px] uppercase tracking-widest font-semibold"
                style={{
                  background: config.bg,
                  border: `1px solid ${config.border}`,
                  color: config.accent,
                }}
              >
                {product.category}
              </span>
              {product.communityVotes && (
                <span className="text-[10px] text-white/40 tracking-wider">
                  {product.communityVotes} votes
                </span>
              )}
            </div>
          </div>

          {/* AI Score */}
          <div className="shrink-0 text-right">
            <div
              className={`font-black ${config.glow} ${featured ? "text-3xl sm:text-4xl" : "text-2xl sm:text-3xl"}`}
              style={{
                fontFamily: "var(--font-orbitron), 'Orbitron', sans-serif",
                color: config.accent,
              }}
            >
              {product.aiScore}
            </div>
            <div
              className="text-[9px] uppercase tracking-[2px] text-white/40 mt-0.5"
              style={{ fontFamily: "var(--font-space-mono), 'Space Mono', monospace" }}
            >
              AI Score
            </div>
          </div>
        </div>

        {/* AI Verdict */}
        {featured && (
          <div
            className="mt-5 p-4 rounded-xl"
            style={{
              background: "rgba(10, 10, 25, 0.6)",
              border: "1px solid rgba(255, 255, 255, 0.04)",
            }}
          >
            <div className="flex items-center gap-1.5 mb-2">
              <span className="text-[10px]">🤖</span>
              <span
                className="text-[9px] uppercase tracking-[2px] text-white/40"
                style={{ fontFamily: "var(--font-space-mono), 'Space Mono', monospace" }}
              >
                AI Verdict
              </span>
            </div>
            <p className="text-xs text-white/50 leading-relaxed italic">
              &ldquo;{product.aiVerdict}&rdquo;
            </p>
          </div>
        )}

        {/* View details hint */}
        <div className="flex items-center justify-end mt-4">
          <span
            className="text-[10px] uppercase tracking-widest text-white/35 group-hover:text-white/50 transition-colors duration-200"
            style={{ fontFamily: "var(--font-space-mono), 'Space Mono', monospace" }}
          >
            View Launch &rarr;
          </span>
        </div>
      </div>
    </Link>
  );
}

export function WinnersContent() {
  // Start with static mock data for instant render
  const [allProducts, setAllProducts] = useState<Product[]>([...MOCK_PRODUCTS, ...PAST_WINNERS]);

  // Hydrate from API on mount
  useEffect(() => {
    let cancelled = false;
    getProducts().then((products) => {
      if (!cancelled && products.length > 0) setAllProducts(products);
    });
    return () => { cancelled = true; };
  }, []);

  const monthWinner = allProducts.find((p) => p.isWinner === "month");
  const weekWinner = allProducts.find((p) => p.isWinner === "week");
  const dayWinner = allProducts.find((p) => p.isWinner === "day");

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

          <div className="flex items-center gap-3 sm:gap-4">
            <span
              className="hidden sm:inline text-xs uppercase tracking-widest text-white/30"
              style={{ fontFamily: "var(--font-space-mono), 'Space Mono', monospace" }}
            >
              Hall of Fame
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
            className="text-4xl mb-4 inline-block"
            style={{ filter: "drop-shadow(0 0 20px rgba(255, 230, 0, 0.3))" }}
          >
            🏆
          </div>
          <h2
            className="text-3xl sm:text-5xl font-black tracking-wider uppercase mb-6"
            style={{ fontFamily: "var(--font-orbitron), 'Orbitron', sans-serif" }}
          >
            <span className="chrome-text">Hall of</span>{" "}
            <span style={{ color: "var(--neon-yellow)" }} className="neon-glow-yellow-sm">
              Fame
            </span>
          </h2>
          <div className="retro-divider max-w-xs mx-auto mb-6" />
          <p className="text-sm sm:text-base text-white/50 max-w-2xl mx-auto leading-relaxed">
            Every Product of the Day, Week, and Month winner. The best startup launches
            on the internet, crowned by AI. No politics. No popularity contests.
            Just exceptional products.
          </p>
        </section>

        {/* Monthly Champion */}
        {monthWinner && (
          <section className="mb-12 sm:mb-16">
            <div className="flex items-center gap-3 mb-6">
              <div
                className="w-10 h-10 rounded-lg flex items-center justify-center text-lg"
                style={{
                  border: "1px solid rgba(255, 45, 120, 0.25)",
                  boxShadow: "0 0 12px rgba(255, 45, 120, 0.12)",
                  background: "rgba(10, 10, 25, 0.8)",
                }}
              >
                👑
              </div>
              <div>
                <h3
                  className="text-base sm:text-lg font-bold tracking-wider uppercase neon-glow-pink-sm"
                  style={{
                    fontFamily: "var(--font-orbitron), 'Orbitron', sans-serif",
                    color: "var(--neon-pink)",
                  }}
                >
                  Monthly Champion
                </h3>
                <p
                  className="text-[10px] uppercase tracking-widest text-white/40"
                  style={{ fontFamily: "var(--font-space-mono), 'Space Mono', monospace" }}
                >
                  The most prestigious title. Only 12 per year.
                </p>
              </div>
            </div>
            <WinnerCard product={monthWinner} tier="month" featured />
          </section>
        )}

        {/* Weekly Champion */}
        {weekWinner && (
          <section className="mb-12 sm:mb-16">
            <div className="flex items-center gap-3 mb-6">
              <div
                className="w-10 h-10 rounded-lg flex items-center justify-center text-lg"
                style={{
                  border: "1px solid rgba(0, 240, 255, 0.25)",
                  boxShadow: "0 0 12px rgba(0, 240, 255, 0.12)",
                  background: "rgba(10, 10, 25, 0.8)",
                }}
              >
                ⭐
              </div>
              <div>
                <h3
                  className="text-base sm:text-lg font-bold tracking-wider uppercase neon-glow-cyan-sm"
                  style={{
                    fontFamily: "var(--font-orbitron), 'Orbitron', sans-serif",
                    color: "var(--neon-cyan)",
                  }}
                >
                  Weekly Champion
                </h3>
                <p
                  className="text-[10px] uppercase tracking-widest text-white/40"
                  style={{ fontFamily: "var(--font-space-mono), 'Space Mono', monospace" }}
                >
                  The best daily winner from the past 7 days.
                </p>
              </div>
            </div>
            <WinnerCard product={weekWinner} tier="week" featured />
          </section>
        )}

        {/* Daily Champion */}
        {dayWinner && (
          <section className="mb-12 sm:mb-16">
            <div className="flex items-center gap-3 mb-6">
              <div
                className="w-10 h-10 rounded-lg flex items-center justify-center text-lg"
                style={{
                  border: "1px solid rgba(255, 230, 0, 0.25)",
                  boxShadow: "0 0 12px rgba(255, 230, 0, 0.12)",
                  background: "rgba(10, 10, 25, 0.8)",
                }}
              >
                🏆
              </div>
              <div>
                <h3
                  className="text-base sm:text-lg font-bold tracking-wider uppercase neon-glow-yellow-sm"
                  style={{
                    fontFamily: "var(--font-orbitron), 'Orbitron', sans-serif",
                    color: "var(--neon-yellow)",
                  }}
                >
                  Daily Champion
                </h3>
                <p
                  className="text-[10px] uppercase tracking-widest text-white/40"
                  style={{ fontFamily: "var(--font-space-mono), 'Space Mono', monospace" }}
                >
                  Today&apos;s highest-scoring launch.
                </p>
              </div>
            </div>
            <WinnerCard product={dayWinner} tier="day" featured />
          </section>
        )}

        {/* Coming Soon / Growing Archive */}
        <section>
          <div
            className="retro-card rounded-2xl p-8 sm:p-12 text-center"
            style={{
              borderColor: "rgba(176, 38, 255, 0.15)",
              background: "rgba(15, 10, 25, 0.9)",
              boxShadow:
                "0 0 40px rgba(176, 38, 255, 0.06), 0 0 80px rgba(0, 240, 255, 0.03)",
            }}
          >
            <div
              className="text-3xl mb-4 inline-block"
              style={{ filter: "drop-shadow(0 0 16px rgba(176, 38, 255, 0.3))" }}
            >
              📡
            </div>
            <h3
              className="text-lg sm:text-xl font-black tracking-wider uppercase mb-3"
              style={{ fontFamily: "var(--font-orbitron), 'Orbitron', sans-serif" }}
            >
              <span className="chrome-text">Archive</span>{" "}
              <span style={{ color: "var(--neon-purple)" }} className="neon-glow-purple-sm">
                Growing
              </span>
            </h3>
            <p className="text-sm text-white/40 max-w-md mx-auto mb-2">
              The Hall of Fame grows every day as the AI crowns new champions.
              Check back to see the full timeline of winners as the archive expands.
            </p>
            <p
              className="text-[10px] uppercase tracking-[3px] text-white/40 mt-4"
              style={{ fontFamily: "var(--font-space-mono), 'Space Mono', monospace" }}
            >
              New winners crowned daily at midnight UTC
            </p>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
