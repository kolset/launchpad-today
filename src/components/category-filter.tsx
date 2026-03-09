"use client";

import { Category } from "@/lib/types";

export function CategoryFilter({
  categories,
  active,
  onChange,
}: {
  categories: Category[];
  active: Category | "All";
  onChange: (c: Category | "All") => void;
}) {
  const allOptions: (Category | "All")[] = ["All", ...categories];

  return (
    <div
      className="overflow-x-auto scrollbar-hide -mx-4 px-4 sm:mx-0 sm:px-0"
      role="group"
      aria-label="Category filter"
      style={{ scrollSnapType: "x mandatory", WebkitOverflowScrolling: "touch" }}
    >
      <div className="flex items-center gap-2 w-max">
        {allOptions.map((cat) => {
          const isActive = active === cat;
          return (
            <button
              key={cat}
              onClick={() => onChange(cat)}
              aria-pressed={isActive}
              className="shrink-0 rounded-md uppercase tracking-wider transition-all whitespace-nowrap"
              style={{
                scrollSnapAlign: "start",
                fontFamily: "'Space Mono', monospace",
                fontSize: "11px",
                padding: "4px 12px",
                minHeight: "44px",
                display: "inline-flex",
                alignItems: "center",
                background: isActive
                  ? "rgba(0, 240, 255, 0.15)"
                  : "rgba(0, 240, 255, 0.04)",
                border: isActive
                  ? "1px solid rgba(0, 240, 255, 0.5)"
                  : "1px solid rgba(255, 255, 255, 0.08)",
                color: isActive
                  ? "var(--neon-cyan)"
                  : "rgba(255, 255, 255, 0.2)",
                textShadow: isActive
                  ? "0 0 6px rgba(0, 240, 255, 0.4)"
                  : "none",
                fontWeight: isActive ? 700 : 400,
              }}
            >
              {cat}
            </button>
          );
        })}
      </div>
    </div>
  );
}
