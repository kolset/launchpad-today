"use client";

import { Product } from "@/lib/types";
import { SmallRocket } from "./rocket-icon";
import { useState } from "react";

function ScoreBar({ value, label }: { value: number; label: string }) {
  return (
    <div className="flex items-center gap-2">
      <span className="text-[10px] uppercase tracking-wider text-white/30 w-16 shrink-0">
        {label}
      </span>
      <div className="flex-1 h-1.5 rounded-full bg-white/[0.06] overflow-hidden">
        <div
          className="h-full rounded-full transition-all duration-700"
          style={{
            width: `${value}%`,
            background:
              value >= 90
                ? "var(--neon-green)"
                : value >= 80
                  ? "var(--neon-cyan)"
                  : value >= 70
                    ? "var(--neon-yellow)"
                    : "var(--neon-orange)",
            boxShadow:
              value >= 90
                ? "0 0 8px var(--neon-green)"
                : value >= 80
                  ? "0 0 8px var(--neon-cyan)"
                  : "none",
          }}
        />
      </div>
      <span
        className="text-xs font-bold w-8 text-right"
        style={{
          fontFamily: "'Orbitron', sans-serif",
          color:
            value >= 90
              ? "var(--neon-green)"
              : value >= 80
                ? "var(--neon-cyan)"
                : value >= 70
                  ? "var(--neon-yellow)"
                  : "var(--neon-orange)",
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
}: {
  product: Product;
  rank: number;
}) {
  const [expanded, setExpanded] = useState(false);

  const rankClass = rank <= 3 ? `rank-${rank}` : "";

  return (
    <div
      className="retro-card rounded-xl p-4 sm:p-5 cursor-pointer"
      onClick={() => setExpanded(!expanded)}
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
                {product.name}
              </h3>
              <p className="text-xs sm:text-sm text-white/50 mt-0.5 line-clamp-1">
                {product.tagline}
              </p>
            </div>

            {/* AI Score */}
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
                className="text-lg sm:text-xl font-black"
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
                Score
              </div>
            </div>
          </div>

          {/* Tags */}
          <div className="flex items-center gap-2 mt-2">
            <span className="tag-pill">{product.category}</span>
            <span className="text-[10px] text-white/20">
              by @{product.submittedBy}
            </span>
          </div>
        </div>
      </div>

      {/* Expanded content */}
      {expanded && (
        <div className="mt-4 pt-4 border-t border-white/[0.06]">
          <p className="text-sm text-white/50 leading-relaxed mb-4">
            {product.description}
          </p>

          {/* Score bars */}
          <div className="space-y-2 mb-4">
            <ScoreBar value={product.aiBreakdown.innovation} label="Innov." />
            <ScoreBar value={product.aiBreakdown.execution} label="Exec." />
            <ScoreBar value={product.aiBreakdown.potential} label="Potent." />
            <ScoreBar value={product.aiBreakdown.timing} label="Timing" />
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

          {/* Link */}
          <a
            href={product.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block mt-3 text-xs uppercase tracking-widest hover:opacity-80 transition-opacity"
            style={{ color: "var(--neon-cyan)" }}
            onClick={(e) => e.stopPropagation()}
          >
            Visit Site &rarr;
          </a>
        </div>
      )}
    </div>
  );
}
