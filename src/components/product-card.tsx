"use client";

import { Product } from "@/lib/types";
import { SmallRocket } from "./rocket-icon";
import { UpvoteButton } from "./upvote-button";
import { useState } from "react";
import Link from "next/link";

function ScoreBar({ value, label, delay = 0 }: { value: number; label: string; delay?: number }) {
  const color =
    value >= 90
      ? "var(--neon-green)"
      : value >= 80
        ? "var(--neon-cyan)"
        : value >= 70
          ? "var(--neon-yellow)"
          : "var(--neon-orange)";

  const glow =
    value >= 90
      ? `0 0 8px var(--neon-green)`
      : value >= 80
        ? `0 0 8px var(--neon-cyan)`
        : "none";

  const glowClass =
    value >= 90 ? "neon-glow-green-sm" : value >= 80 ? "neon-glow-cyan-sm" : "";

  return (
    <div className="flex items-center gap-2">
      <span className="text-[10px] uppercase tracking-wider text-white/30 w-20 shrink-0">
        {label}
      </span>
      <div className="flex-1 h-1.5 rounded-full bg-white/[0.06] overflow-hidden">
        <div
          className="h-full rounded-full animate-bar-fill"
          style={{
            width: `${value}%`,
            background: color,
            boxShadow: glow,
            animationDelay: `${delay}ms`,
          }}
        />
      </div>
      <span
        className={`text-xs font-bold w-8 text-right ${glowClass}`}
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

export function ProductCard({
  product,
  rank,
  index = 0,
}: {
  product: Product;
  rank: number;
  index?: number;
}) {
  const [expanded, setExpanded] = useState(false);

  const rankClass = rank <= 3 ? `rank-${rank}` : "";
  const accentClass = rank === 2 ? "rank-accent-2" : rank === 3 ? "rank-accent-3" : "";

  return (
    <div
      className={`retro-card rounded-xl p-4 sm:p-5 card-stagger ${accentClass}`}
      style={{ animationDelay: `${index * 60}ms` }}
    >
      <div className="flex items-start gap-3 sm:gap-4">
        {/* Rank */}
        <div className="flex flex-col items-center gap-1 shrink-0 pt-1">
          <span
            className={`rank-badge text-xl sm:text-2xl ${rankClass}`}
            style={rank > 3 ? { color: "rgba(255,255,255,0.25)" } : undefined}
          >
            {String(rank).padStart(2, "0")}
          </span>
          {rank <= 3 && <SmallRocket />}
        </div>

        {/* Emoji logo */}
        <div
          className="w-12 h-12 sm:w-14 sm:h-14 rounded-lg flex items-center justify-center text-2xl shrink-0"
          style={{
            background: "rgba(0, 240, 255, 0.06)",
            border: "1px solid rgba(0, 240, 255, 0.12)",
          }}
        >
          {product.logoEmoji}
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <div className="min-w-0">
              <h3
                className="text-sm sm:text-base font-bold tracking-wide truncate"
                style={{ fontFamily: "'Orbitron', sans-serif" }}
              >
                <Link
                  href={`/product/${product.id}`}
                  className="transition-all duration-200 hover:text-[var(--neon-cyan)]"
                  style={{ textDecoration: "none" }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.textShadow = "0 0 8px rgba(0, 240, 255, 0.4)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.textShadow = "none";
                  }}
                >
                  {product.name}
                </Link>
              </h3>
              <p className="text-xs sm:text-sm text-white/50 mt-0.5 line-clamp-1">
                {product.tagline}
              </p>
            </div>

            {/* Upvote + AI Score + Chevron */}
            <div className="flex items-center gap-1.5 sm:gap-2">
              {/* Upvote button */}
              <UpvoteButton
                productId={product.id}
                baseVotes={product.communityVotes ?? 0}
              />

              {/* AI Score with glow */}
              <div
                className="shrink-0 rounded-lg px-3 py-1.5 text-center"
                style={{
                  background:
                    product.aiScore >= 90
                      ? "rgba(57, 255, 20, 0.1)"
                      : product.aiScore >= 80
                        ? "rgba(0, 240, 255, 0.1)"
                        : "rgba(255, 230, 0, 0.1)",
                  border: `1px solid ${
                    product.aiScore >= 90
                      ? "rgba(57, 255, 20, 0.25)"
                      : product.aiScore >= 80
                        ? "rgba(0, 240, 255, 0.25)"
                        : "rgba(255, 230, 0, 0.25)"
                  }`,
                }}
              >
                <div
                  className={`text-lg sm:text-xl font-black ${product.aiScore >= 90 ? "neon-glow-green-sm" : product.aiScore >= 80 ? "neon-glow-cyan-sm" : "neon-glow-yellow-sm"}`}
                  style={{
                    fontFamily: "'Orbitron', sans-serif",
                    color:
                      product.aiScore >= 90
                        ? "var(--neon-green)"
                        : product.aiScore >= 80
                          ? "var(--neon-cyan)"
                          : "var(--neon-yellow)",
                  }}
                >
                  {product.aiScore}
                </div>
                <div className="text-[8px] uppercase tracking-widest text-white/25">
                  AI
                </div>
              </div>

              {/* Expand button */}
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setExpanded(!expanded);
                }}
                className="shrink-0 flex items-center gap-1 rounded-md px-2 py-1 cursor-pointer transition-colors hover:bg-white/[0.08]"
                style={{ minHeight: "44px" }}
                aria-label={expanded ? "Collapse AI score" : "Expand AI score"}
              >
                <span className="text-[10px] uppercase tracking-wider text-white/30">
                  {expanded ? "Close" : "Details"}
                </span>
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 16 16"
                  fill="none"
                  className="text-white/30 transition-transform duration-200"
                  style={{ transform: expanded ? "rotate(180deg)" : "rotate(0deg)" }}
                >
                  <path d="M4 6L8 10L12 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
              </button>
            </div>
          </div>

          {/* Tags */}
          <div className="flex items-center gap-2 mt-2 flex-wrap">
            <span className="tag-pill">{product.category}</span>
            <span className="text-[10px] text-white/20">
              by @{product.submittedBy}
            </span>
            {(product.commentCount ?? 0) > 0 && (
              <Link
                href={`/product/${product.id}`}
                className="flex items-center gap-1 text-[10px] text-white/25 hover:text-white/50 transition-colors"
                onClick={(e) => e.stopPropagation()}
              >
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                </svg>
                {product.commentCount}
              </Link>
            )}
            {(product.communityVotes ?? 0) > 50 && (
              <span
                className="flex items-center gap-1 text-[10px] uppercase tracking-wider font-bold"
                style={{ color: "var(--neon-orange)" }}
              >
                <svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M13 2L3 14h9l-1 10 10-12h-9l1-10z" />
                </svg>
                Trending
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Expanded content with animation */}
      {expanded && (
        <div className="mt-4 pt-4 border-t border-white/[0.06] card-expand-enter" style={{ overflow: "visible" }}>
          <p className="text-sm text-white/50 leading-relaxed mb-4" style={{ overflowWrap: "break-word", wordBreak: "break-word", whiteSpace: "normal" }}>
            {product.description}
          </p>

          {/* Score bars with full labels */}
          <div className="space-y-2 mb-4">
            <ScoreBar value={product.aiBreakdown.innovation} label="Innovation" delay={0} />
            <ScoreBar value={product.aiBreakdown.execution} label="Execution" delay={80} />
            <ScoreBar value={product.aiBreakdown.potential} label="Potential" delay={160} />
            <ScoreBar value={product.aiBreakdown.timing} label="Timing" delay={240} />
          </div>

          {/* AI Verdict */}
          <div
            className="rounded-lg p-3 text-xs leading-relaxed"
            style={{
              background: "rgba(176, 38, 255, 0.08)",
              border: "1px solid rgba(176, 38, 255, 0.2)",
            }}
          >
            <span
              className="uppercase tracking-widest text-[10px] font-bold"
              style={{ color: "var(--neon-purple)" }}
            >
              AI Verdict:{" "}
            </span>
            <span className="text-white/70">{product.aiVerdict}</span>
          </div>

          {/* Links */}
          <div className="flex items-center gap-4 mt-3">
            <Link
              href={`/product/${product.id}`}
              className="neon-link text-xs uppercase tracking-widest transition-all"
              style={{ color: "var(--neon-pink)", fontFamily: "'Orbitron', sans-serif", minHeight: "44px", display: "inline-flex", alignItems: "center" }}
            >
              Full Details &rarr;
            </Link>
            <a
              href={product.url}
              target="_blank"
              rel="noopener noreferrer"
              className="neon-link text-xs uppercase tracking-widest transition-all"
              style={{ color: "var(--neon-cyan)", minHeight: "44px", display: "inline-flex", alignItems: "center" }}
            >
              Visit Site &rarr;
            </a>
          </div>
        </div>
      )}
    </div>
  );
}
