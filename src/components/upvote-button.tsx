"use client";

import { useEffect, useState, useCallback } from "react";

const STORAGE_KEY = "launchpad-upvotes";

function getVotedIds(): Set<string> {
  if (typeof window === "undefined") return new Set();
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) return new Set(JSON.parse(stored));
  } catch {
    // ignore parse errors
  }
  return new Set();
}

function saveVotedIds(ids: Set<string>) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify([...ids]));
  } catch {
    // ignore storage errors
  }
}

export function UpvoteButton({
  productId,
  baseVotes,
}: {
  productId: string;
  baseVotes: number;
}) {
  const [voted, setVoted] = useState(false);
  const [count, setCount] = useState(baseVotes);
  const [animating, setAnimating] = useState(false);

  useEffect(() => {
    const ids = getVotedIds();
    if (ids.has(productId)) {
      setVoted(true);
      setCount(baseVotes + 1);
    }
  }, [productId, baseVotes]);

  const handleClick = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();
      const ids = getVotedIds();

      setAnimating(true);
      setTimeout(() => setAnimating(false), 300);

      if (ids.has(productId)) {
        ids.delete(productId);
        saveVotedIds(ids);
        setVoted(false);
        setCount(baseVotes);
      } else {
        ids.add(productId);
        saveVotedIds(ids);
        setVoted(true);
        setCount(baseVotes + 1);
      }
    },
    [productId, baseVotes]
  );

  return (
    <button
      onClick={handleClick}
      className="flex flex-col items-center justify-center shrink-0 rounded-lg transition-all"
      style={{
        minWidth: "44px",
        minHeight: "44px",
        padding: "6px 4px",
        background: voted
          ? "rgba(255, 45, 120, 0.2)"
          : "rgba(255, 255, 255, 0.03)",
        border: voted
          ? "1px solid rgba(255, 45, 120, 0.5)"
          : "1px solid rgba(255, 255, 255, 0.08)",
        boxShadow: voted
          ? "0 0 12px rgba(255, 45, 120, 0.3), 0 0 24px rgba(255, 45, 120, 0.15)"
          : "none",
        cursor: "pointer",
        transform: animating ? "scale(1.15)" : "scale(1)",
        transition: "all 0.2s cubic-bezier(0.16, 1, 0.3, 1)",
      }}
      aria-label={voted ? "Remove upvote" : "Upvote this product"}
    >
      {/* Rocket SVG */}
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill={voted ? "var(--neon-pink)" : "none"}
        stroke={voted ? "var(--neon-pink)" : "rgba(255,255,255,0.2)"}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        style={{
          filter: voted
            ? "drop-shadow(0 0 4px rgba(255, 45, 120, 0.6))"
            : "none",
          transition: "all 0.2s ease",
        }}
      >
        <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z" />
        <path d="M12 15l-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z" />
        <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0" />
        <path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5" />
      </svg>

      {/* Vote count */}
      <span
        style={{
          fontFamily: "'Orbitron', sans-serif",
          fontSize: "10px",
          fontWeight: 700,
          color: voted ? "var(--neon-pink)" : "rgba(255,255,255,0.2)",
          textShadow: voted
            ? "0 0 4px rgba(255, 45, 120, 0.4)"
            : "none",
          marginTop: "2px",
          lineHeight: 1,
          transition: "all 0.2s ease",
        }}
      >
        {count}
      </span>
    </button>
  );
}
