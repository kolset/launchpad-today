"use client";

import { Product } from "@/lib/types";
import { RocketIcon } from "./rocket-icon";

export function WinnerBanner({ product }: { product: Product }) {
  return (
    <div className="relative z-10 overflow-hidden">
      {/* Gradient background */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(255, 45, 120, 0.12) 0%, rgba(176, 38, 255, 0.06) 40%, transparent 70%)",
        }}
      />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-12 relative">
        {/* Trophy label */}
        <div className="flex items-center justify-center gap-2 mb-4">
          <div className="h-px flex-1 max-w-[80px] bg-gradient-to-r from-transparent to-[var(--neon-yellow)]" />
          <span
            className="text-[10px] sm:text-xs uppercase tracking-[4px] neon-text-yellow"
            style={{ fontFamily: "'Orbitron', sans-serif", color: "var(--neon-yellow)" }}
          >
            Product of the Day
          </span>
          <div className="h-px flex-1 max-w-[80px] bg-gradient-to-l from-transparent to-[var(--neon-yellow)]" />
        </div>

        {/* Winner card */}
        <div className="retro-card rounded-xl p-4 sm:p-8 max-w-3xl mx-auto neon-border-pink overflow-hidden">
          <div className="flex flex-col sm:flex-row items-start gap-5">
            {/* Logo + Score */}
            <div className="flex sm:flex-col items-center gap-4 sm:gap-2">
              <div
                className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl flex items-center justify-center text-3xl sm:text-4xl"
                style={{
                  background: "linear-gradient(135deg, rgba(255, 45, 120, 0.2), rgba(176, 38, 255, 0.2))",
                  border: "1px solid rgba(255, 45, 120, 0.3)",
                }}
              >
                {product.logoEmoji}
              </div>
              <div className="text-center">
                <div
                  className="text-3xl sm:text-4xl font-black neon-text-yellow"
                  style={{ fontFamily: "'Orbitron', sans-serif", color: "var(--neon-yellow)" }}
                >
                  {product.aiScore}
                </div>
                <div className="text-[10px] uppercase tracking-widest text-white/30 mt-0.5">AI Score</div>
              </div>
            </div>

            {/* Details */}
            <div className="flex-1 min-w-0">
              <div className="flex items-start gap-3 mb-2">
                <h2
                  className="text-2xl sm:text-3xl font-bold tracking-tight"
                  style={{ fontFamily: "'Orbitron', sans-serif" }}
                >
                  {product.name}
                </h2>
                <RocketIcon size={28} flame={true} className="mt-1 shrink-0" />
              </div>
              <p
                className="text-sm sm:text-base mb-3"
                style={{ color: "var(--neon-cyan)" }}
              >
                {product.tagline}
              </p>
              <p className="text-xs sm:text-sm text-white/50 leading-relaxed mb-4">
                {product.description}
              </p>

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

              {/* Score breakdown */}
              <div className="flex flex-wrap gap-2 sm:gap-3 mt-4">
                {Object.entries(product.aiBreakdown).map(([key, value]) => (
                  <div key={key} className="flex items-center gap-1.5">
                    <span className="text-[10px] uppercase tracking-wider text-white/30">
                      {key}
                    </span>
                    <span
                      className="text-xs font-bold"
                      style={{
                        fontFamily: "'Orbitron', sans-serif",
                        color: value >= 90 ? "var(--neon-green)" : value >= 80 ? "var(--neon-cyan)" : "var(--neon-orange)",
                      }}
                    >
                      {value}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
