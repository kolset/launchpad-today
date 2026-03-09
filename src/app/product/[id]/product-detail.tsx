"use client";

import { Product } from "@/lib/types";
import { MOCK_PRODUCTS, PAST_WINNERS } from "@/lib/mock-data";
import { RocketIcon } from "@/components/rocket-icon";
import { StarsBackground } from "@/components/stars-background";
import Link from "next/link";

function ScoreBar({ value, label }: { value: number; label: string }) {
  const color =
    value >= 90
      ? "var(--neon-green)"
      : value >= 80
        ? "var(--neon-cyan)"
        : value >= 70
          ? "var(--neon-yellow)"
          : "var(--neon-orange)";

  const glowClass =
    value >= 90
      ? "neon-glow-green-sm"
      : value >= 80
        ? "neon-glow-cyan-sm"
        : "";

  const barShadow =
    value >= 90
      ? "0 0 12px var(--neon-green)"
      : value >= 80
        ? "0 0 12px var(--neon-cyan)"
        : "none";

  return (
    <div className="flex items-center gap-3">
      <span
        className="text-[10px] sm:text-xs uppercase tracking-wider text-white/40 w-20 sm:w-24 shrink-0"
        style={{ fontFamily: "'Space Mono', monospace" }}
      >
        {label}
      </span>
      <div
        className="flex-1 h-2 sm:h-2.5 rounded-full overflow-hidden"
        style={{ background: "rgba(255, 255, 255, 0.06)" }}
      >
        <div
          className="h-full rounded-full transition-all duration-1000 ease-out"
          style={{
            width: `${value}%`,
            background: color,
            boxShadow: barShadow,
          }}
        />
      </div>
      <span
        className={`text-sm sm:text-base font-bold w-10 text-right ${glowClass}`}
        style={{
          fontFamily: "'Orbitron', sans-serif",
          color,
        }}
      >
        {value}
      </span>
    </div>
  );
}

function WinnerBadge({ type }: { type: "day" | "week" | "month" }) {
  const labels = { day: "Product of the Day", week: "Product of the Week", month: "Product of the Month" };
  const colors = {
    day: { bg: "rgba(255, 230, 0, 0.12)", border: "rgba(255, 230, 0, 0.3)", text: "var(--neon-yellow)", glow: "0 0 20px rgba(255, 230, 0, 0.2)" },
    week: { bg: "rgba(0, 240, 255, 0.12)", border: "rgba(0, 240, 255, 0.3)", text: "var(--neon-cyan)", glow: "0 0 20px rgba(0, 240, 255, 0.2)" },
    month: { bg: "rgba(255, 45, 120, 0.12)", border: "rgba(255, 45, 120, 0.3)", text: "var(--neon-pink)", glow: "0 0 20px rgba(255, 45, 120, 0.2)" },
  };
  const c = colors[type];

  return (
    <div
      className="inline-flex items-center gap-2 px-4 py-2 rounded-full"
      style={{
        background: c.bg,
        border: `1px solid ${c.border}`,
        boxShadow: c.glow,
      }}
    >
      <span className="text-sm">🏆</span>
      <span
        className="text-[10px] sm:text-xs uppercase tracking-[2px] font-bold"
        style={{ fontFamily: "'Orbitron', sans-serif", color: c.text }}
      >
        {labels[type]}
      </span>
    </div>
  );
}

const ALL_PRODUCTS = [...MOCK_PRODUCTS, ...PAST_WINNERS];

function getRelatedProducts(product: Product, count: number = 3): Product[] {
  // First, try same category (excluding current product)
  const sameCategory = ALL_PRODUCTS.filter(
    (p) => p.category === product.category && p.id !== product.id
  );

  // Then, get others sorted by score (excluding current product and same category)
  const others = ALL_PRODUCTS.filter(
    (p) => p.category !== product.category && p.id !== product.id
  ).sort((a, b) => b.aiScore - a.aiScore);

  const combined = [...sameCategory, ...others];
  return combined.slice(0, count);
}

export function ProductDetail({ product }: { product: Product }) {
  const scoreColor =
    product.aiScore >= 90
      ? "var(--neon-green)"
      : product.aiScore >= 80
        ? "var(--neon-cyan)"
        : product.aiScore >= 70
          ? "var(--neon-yellow)"
          : "var(--neon-orange)";

  const scoreGlowClass =
    product.aiScore >= 90
      ? "neon-text-cyan"
      : product.aiScore >= 80
        ? "neon-glow-cyan-sm"
        : "neon-glow-yellow-sm";

  const scoreBg =
    product.aiScore >= 90
      ? "rgba(57, 255, 20, 0.08)"
      : product.aiScore >= 80
        ? "rgba(0, 240, 255, 0.08)"
        : "rgba(255, 230, 0, 0.08)";

  const scoreBorder =
    product.aiScore >= 90
      ? "rgba(57, 255, 20, 0.25)"
      : product.aiScore >= 80
        ? "rgba(0, 240, 255, 0.25)"
        : "rgba(255, 230, 0, 0.25)";

  const scoreBoxShadow =
    product.aiScore >= 90
      ? "0 0 40px rgba(57, 255, 20, 0.15), 0 0 80px rgba(57, 255, 20, 0.05)"
      : product.aiScore >= 80
        ? "0 0 40px rgba(0, 240, 255, 0.15), 0 0 80px rgba(0, 240, 255, 0.05)"
        : "0 0 40px rgba(255, 230, 0, 0.1)";

  // Determine if this product is the day's winner (highest score among today's, id=1)
  const isWinner = product.isWinner;

  return (
    <div className="min-h-screen grid-bg horizon-gradient relative">
      <StarsBackground />

      {/* Top bar with back link */}
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 pt-6 sm:pt-8">
        <a
          href="/"
          className="inline-flex items-center gap-2 text-xs uppercase tracking-[2px] transition-all duration-200 hover:gap-3 group"
          style={{
            fontFamily: "'Orbitron', sans-serif",
            color: "var(--neon-cyan)",
            minHeight: "44px",
            display: "inline-flex",
            alignItems: "center",
          }}
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="transition-transform duration-200 group-hover:-translate-x-1">
            <path d="M10 4L6 8L10 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
          Back to Rankings
        </a>
      </div>

      {/* Hero section */}
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 pt-6 sm:pt-10 pb-8">
        {/* Winner badge if applicable */}
        {isWinner && (
          <div className="mb-6 flex justify-center">
            <WinnerBadge type={isWinner} />
          </div>
        )}

        {/* Main card */}
        <div
          className={isWinner ? "winner-card rounded-2xl sm:rounded-3xl relative" : "retro-card rounded-2xl sm:rounded-3xl relative"}
        >
          {/* Top glow gradient */}
          <div
            className="absolute inset-x-0 top-0 h-40 pointer-events-none rounded-t-2xl sm:rounded-t-3xl"
            style={{
              background: isWinner
                ? "radial-gradient(ellipse at center top, rgba(255, 45, 120, 0.15) 0%, transparent 70%)"
                : "radial-gradient(ellipse at center top, rgba(0, 240, 255, 0.08) 0%, transparent 70%)",
              overflow: "hidden",
            }}
          />

          <div className="relative p-5 sm:p-8 md:p-10 min-w-0" style={{ overflowWrap: "break-word" }}>
            {/* Header: emoji + name + tagline */}
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5 sm:gap-6 mb-8">
              {/* Large emoji */}
              <div
                className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl flex items-center justify-center text-4xl sm:text-5xl shrink-0"
                style={{
                  background: isWinner
                    ? "linear-gradient(135deg, rgba(255, 45, 120, 0.15), rgba(176, 38, 255, 0.15))"
                    : "linear-gradient(135deg, rgba(0, 240, 255, 0.08), rgba(176, 38, 255, 0.08))",
                  border: isWinner
                    ? "1px solid rgba(255, 45, 120, 0.3)"
                    : "1px solid rgba(0, 240, 255, 0.15)",
                  boxShadow: isWinner
                    ? "0 0 30px rgba(255, 45, 120, 0.1)"
                    : "0 0 20px rgba(0, 240, 255, 0.05)",
                }}
              >
                {product.logoEmoji}
              </div>

              <div className="text-center sm:text-left flex-1 min-w-0">
                <div className="flex items-center justify-center sm:justify-start gap-3 mb-2 flex-wrap">
                  <h1
                    className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight"
                    style={{ fontFamily: "'Orbitron', sans-serif", overflowWrap: "break-word", wordBreak: "break-word" }}
                  >
                    {product.name}
                  </h1>
                  {isWinner && <RocketIcon size={32} flame={true} className="shrink-0 animate-rocket-float" />}
                </div>
                <p
                  className="text-sm sm:text-base md:text-lg"
                  style={{ color: "var(--neon-cyan)", overflowWrap: "break-word", wordBreak: "break-word" }}
                >
                  {product.tagline}
                </p>

                {/* Meta: category + submitter */}
                <div className="flex items-center justify-center sm:justify-start gap-3 mt-3">
                  <span className="tag-pill">{product.category}</span>
                  <span className="text-[10px] sm:text-xs text-white/25">
                    by @{product.submittedBy}
                  </span>
                </div>
              </div>
            </div>

            {/* Divider */}
            <div className="retro-divider mb-8" />

            {/* Two-column layout: Score left, Breakdown right */}
            <div className="grid grid-cols-1 md:grid-cols-[260px_1fr] gap-6 md:gap-8 mb-8">
              {/* AI Score — large, glowing centerpiece */}
              <div className="flex flex-col items-center">
                <div
                  className="rounded-2xl p-6 sm:p-8 text-center w-full"
                  style={{
                    background: scoreBg,
                    border: `1px solid ${scoreBorder}`,
                    boxShadow: scoreBoxShadow,
                  }}
                >
                  <div
                    className="text-[10px] uppercase tracking-[3px] mb-3 font-bold"
                    style={{ fontFamily: "'Orbitron', sans-serif", color: "rgba(255,255,255,0.35)" }}
                  >
                    AI Score
                  </div>
                  <div
                    className={`text-6xl sm:text-7xl font-black ${scoreGlowClass}`}
                    style={{
                      fontFamily: "'Orbitron', sans-serif",
                      color: scoreColor,
                      lineHeight: 1,
                    }}
                  >
                    {product.aiScore}
                  </div>
                  <div
                    className="text-[10px] uppercase tracking-widest mt-3"
                    style={{ color: "rgba(255,255,255,0.2)" }}
                  >
                    out of 100
                  </div>
                </div>

                {/* Visit site button */}
                <a
                  href={product.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="submit-btn w-full mt-4 px-6 py-3.5 rounded-xl text-xs text-white text-center block"
                  style={{ minHeight: "44px" }}
                >
                  Visit Site &rarr;
                </a>
              </div>

              {/* Score breakdown bars */}
              <div>
                <h3
                  className="text-xs uppercase tracking-[3px] mb-5 font-bold"
                  style={{ fontFamily: "'Orbitron', sans-serif", color: "rgba(255,255,255,0.35)" }}
                >
                  Score Breakdown
                </h3>
                <div className="space-y-4">
                  <ScoreBar value={product.aiBreakdown.innovation} label="Innovation" />
                  <ScoreBar value={product.aiBreakdown.execution} label="Execution" />
                  <ScoreBar value={product.aiBreakdown.potential} label="Potential" />
                  <ScoreBar value={product.aiBreakdown.timing} label="Timing" />
                </div>

                {/* Average indicator */}
                <div className="mt-5 pt-4" style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] uppercase tracking-wider text-white/25">
                      Category Average
                    </span>
                    <span className="text-xs text-white/25" style={{ fontFamily: "'Orbitron', sans-serif" }}>
                      ~75
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="mb-8">
              <h3
                className="text-xs uppercase tracking-[3px] mb-3 font-bold"
                style={{ fontFamily: "'Orbitron', sans-serif", color: "rgba(255,255,255,0.35)" }}
              >
                About
              </h3>
              <p
                className="text-sm sm:text-base text-white/60 leading-relaxed"
                style={{ overflowWrap: "break-word", wordBreak: "break-word" }}
              >
                {product.description}
              </p>
            </div>

            {/* AI Verdict */}
            <div
              className="rounded-xl p-5 sm:p-6"
              style={{
                background: "rgba(176, 38, 255, 0.06)",
                border: "1px solid rgba(176, 38, 255, 0.2)",
                boxShadow: "0 0 30px rgba(176, 38, 255, 0.05)",
              }}
            >
              <div className="flex items-center gap-2 mb-3">
                <span className="text-lg">🤖</span>
                <h3
                  className="text-xs uppercase tracking-[3px] font-bold"
                  style={{ fontFamily: "'Orbitron', sans-serif", color: "var(--neon-purple)" }}
                >
                  AI Verdict
                </h3>
              </div>
              <p
                className="text-sm sm:text-base text-white/70 leading-relaxed"
                style={{ overflowWrap: "break-word", wordBreak: "break-word" }}
              >
                {product.aiVerdict}
              </p>
            </div>

            {/* Share section */}
            <div className="mt-8 pt-6" style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="text-center sm:text-left">
                  <p className="text-xs text-white/25 uppercase tracking-wider" style={{ fontFamily: "'Orbitron', sans-serif" }}>
                    Share this launch
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <ShareButton product={product} platform="twitter" />
                  <ShareButton product={product} platform="linkedin" />
                  <CopyLinkButton productId={product.id} />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* More Launches section */}
        <MoreLaunches currentProduct={product} />

        {/* Footer link */}
        <div className="mt-8 text-center">
          <a
            href="/"
            className="inline-flex items-center gap-2 text-xs text-white/25 hover:text-white/50 transition-colors"
            style={{ fontFamily: "'Space Mono', monospace", minHeight: "44px" }}
          >
            launchpad.today
          </a>
        </div>
      </div>
    </div>
  );
}

function MoreLaunches({ currentProduct }: { currentProduct: Product }) {
  const related = getRelatedProducts(currentProduct, 3);

  if (related.length === 0) return null;

  return (
    <div className="mt-10">
      {/* Section header */}
      <div className="flex items-center gap-4 mb-6">
        <div className="retro-divider flex-1" />
        <h2
          className="text-xs sm:text-sm uppercase tracking-[3px] font-bold shrink-0"
          style={{
            fontFamily: "'Orbitron', sans-serif",
            color: "var(--neon-cyan)",
          }}
        >
          More Launches
        </h2>
        <div className="retro-divider flex-1" />
      </div>

      {/* Product cards grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {related.map((product) => {
          const cardScoreColor =
            product.aiScore >= 90
              ? "var(--neon-green)"
              : product.aiScore >= 80
                ? "var(--neon-cyan)"
                : product.aiScore >= 70
                  ? "var(--neon-yellow)"
                  : "var(--neon-orange)";

          const cardScoreGlow =
            product.aiScore >= 90
              ? "0 0 8px rgba(57, 255, 20, 0.4)"
              : product.aiScore >= 80
                ? "0 0 8px rgba(0, 240, 255, 0.4)"
                : "none";

          return (
            <Link
              key={product.id}
              href={`/product/${product.id}`}
              className="retro-card rounded-xl p-4 sm:p-5 block transition-all duration-200 hover:scale-[1.02] group"
              style={{ minHeight: "44px" }}
            >
              {/* Emoji + Score row */}
              <div className="flex items-center justify-between mb-3">
                <div
                  className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg flex items-center justify-center text-xl sm:text-2xl shrink-0"
                  style={{
                    background: "linear-gradient(135deg, rgba(0, 240, 255, 0.08), rgba(176, 38, 255, 0.08))",
                    border: "1px solid rgba(0, 240, 255, 0.15)",
                  }}
                >
                  {product.logoEmoji}
                </div>
                <div
                  className="text-lg sm:text-xl font-black"
                  style={{
                    fontFamily: "'Orbitron', sans-serif",
                    color: cardScoreColor,
                    textShadow: cardScoreGlow,
                  }}
                >
                  {product.aiScore}
                </div>
              </div>

              {/* Name */}
              <h3
                className="text-sm sm:text-base font-bold mb-1 group-hover:text-white transition-colors"
                style={{
                  fontFamily: "'Orbitron', sans-serif",
                  color: "rgba(255, 255, 255, 0.85)",
                  overflowWrap: "break-word",
                  wordBreak: "break-word",
                }}
              >
                {product.name}
              </h3>

              {/* Tagline - single line */}
              <p
                className="text-xs text-white/40 mb-3 line-clamp-1"
                style={{ overflowWrap: "break-word" }}
              >
                {product.tagline}
              </p>

              {/* Category tag */}
              <span className="tag-pill">{product.category}</span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

function ShareButton({ product, platform }: { product: Product; platform: "twitter" | "linkedin" }) {
  const url = `https://launchpad.today/product/${product.id}`;
  const text =
    platform === "twitter"
      ? `${product.name} just scored ${product.aiScore} on @LaunchpadToday! ${product.tagline}`
      : `Check out ${product.name} on Launchpad.today — AI Score: ${product.aiScore}`;

  const shareUrl =
    platform === "twitter"
      ? `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`
      : `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`;

  const label = platform === "twitter" ? "X" : "LinkedIn";

  return (
    <a
      href={shareUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg text-xs uppercase tracking-wider font-bold transition-all duration-200 hover:scale-105"
      style={{
        fontFamily: "'Orbitron', sans-serif",
        background: "rgba(255, 255, 255, 0.06)",
        border: "1px solid rgba(255, 255, 255, 0.1)",
        color: "rgba(255, 255, 255, 0.6)",
        minHeight: "44px",
      }}
    >
      {platform === "twitter" ? (
        <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
      ) : (
        <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
        </svg>
      )}
      {label}
    </a>
  );
}

function CopyLinkButton({ productId }: { productId: string }) {
  const handleCopy = () => {
    const url = `https://launchpad.today/product/${productId}`;
    navigator.clipboard.writeText(url).catch(() => {
      // Fallback: do nothing if clipboard API fails
    });
  };

  return (
    <button
      onClick={handleCopy}
      className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg text-xs uppercase tracking-wider font-bold transition-all duration-200 hover:scale-105 cursor-pointer"
      style={{
        fontFamily: "'Orbitron', sans-serif",
        background: "rgba(255, 255, 255, 0.06)",
        border: "1px solid rgba(255, 255, 255, 0.1)",
        color: "rgba(255, 255, 255, 0.6)",
        minHeight: "44px",
      }}
    >
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
        <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
        <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
      </svg>
      Copy
    </button>
  );
}
