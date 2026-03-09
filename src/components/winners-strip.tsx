"use client";

import Link from "next/link";
import { Product } from "@/lib/types";

function WinnerCard({ product, label }: { product: Product; label: string }) {
  const colors = {
    day: { accent: "var(--neon-yellow)", bg: "rgba(255, 230, 0, 0.06)", border: "rgba(255, 230, 0, 0.15)", hoverBorder: "rgba(255, 230, 0, 0.35)" },
    week: { accent: "var(--neon-cyan)", bg: "rgba(0, 240, 255, 0.06)", border: "rgba(0, 240, 255, 0.15)", hoverBorder: "rgba(0, 240, 255, 0.35)" },
    month: { accent: "var(--neon-pink)", bg: "rgba(255, 45, 120, 0.06)", border: "rgba(255, 45, 120, 0.15)", hoverBorder: "rgba(255, 45, 120, 0.35)" },
  };
  const glowMap = { day: "neon-glow-yellow-sm", week: "neon-glow-cyan-sm", month: "neon-glow-pink-sm" };
  const iconMap = { day: "☀️", week: "📅", month: "👑" };
  const winnerType = product.isWinner || "day";
  const c = colors[winnerType];
  const glowClass = glowMap[winnerType];
  const icon = iconMap[winnerType];

  return (
    <Link
      href={`/product/${product.id}`}
      className="winner-strip-card rounded-xl p-4 flex items-center gap-3 min-w-0 no-underline"
      style={{ background: c.bg, border: `1px solid ${c.border}` }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = c.hoverBorder;
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = c.border;
      }}
    >
      <div
        className="w-10 h-10 rounded-lg flex items-center justify-center text-xl shrink-0"
        style={{ background: c.bg, border: `1px solid ${c.border}` }}
      >
        {product.logoEmoji}
      </div>
      <div className="min-w-0">
        <div className="flex items-center gap-1.5 mb-0.5">
          <span className="text-xs" aria-hidden="true">{icon}</span>
          <span className="text-[10px] uppercase tracking-[2px]" style={{ color: c.accent }}>
            {label}
          </span>
        </div>
        <div
          className="text-sm font-bold truncate text-white"
          style={{ fontFamily: "var(--font-orbitron), 'Orbitron', sans-serif" }}
        >
          {product.name}
        </div>
        <div className="text-[10px] text-white/30 truncate">{product.tagline}</div>
      </div>
      <div
        className={`text-lg font-black shrink-0 ml-auto ${glowClass}`}
        style={{ fontFamily: "var(--font-orbitron), 'Orbitron', sans-serif", color: c.accent }}
      >
        {product.aiScore}
      </div>
    </Link>
  );
}

export function WinnersStrip({
  dayWinner,
  weekWinner,
  monthWinner,
}: {
  dayWinner: Product;
  weekWinner: Product;
  monthWinner: Product;
}) {
  return (
    <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <WinnerCard product={dayWinner} label="Product of the Day" />
        <WinnerCard product={weekWinner} label="Product of the Week" />
        <WinnerCard product={monthWinner} label="Product of the Month" />
      </div>
    </div>
  );
}
