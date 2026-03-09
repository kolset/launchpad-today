"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { CATEGORIES, Category } from "@/lib/types";
import { RocketIcon } from "./rocket-icon";

interface SubmitResult {
  id: string;
  name: string;
  aiScore: number;
  aiVerdict: string;
}

interface SubmitModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: {
    name: string;
    tagline: string;
    description: string;
    url: string;
    category: Category;
    submittedBy: string;
  }) => SubmitResult;
}

function CharCounter({ current, max }: { current: number; max: number }) {
  const isNear = current >= max * 0.85;
  const isOver = current >= max;
  return (
    <span
      className="text-[10px] tabular-nums transition-colors"
      style={{
        color: isOver
          ? "var(--neon-pink)"
          : isNear
            ? "var(--neon-yellow)"
            : "rgba(255, 255, 255, 0.25)",
      }}
    >
      {current}/{max}
    </span>
  );
}

function ScoreReveal({
  result,
  productName,
  onClose,
}: {
  result: SubmitResult;
  productName: string;
  onClose: () => void;
}) {
  const [copied, setCopied] = useState(false);

  const scoreColor =
    result.aiScore >= 90
      ? "var(--neon-green)"
      : result.aiScore >= 80
        ? "var(--neon-cyan)"
        : result.aiScore >= 70
          ? "var(--neon-yellow)"
          : "var(--neon-orange)";

  const scoreGlowClass =
    result.aiScore >= 90
      ? "neon-glow-green-sm"
      : result.aiScore >= 80
        ? "neon-glow-cyan-sm"
        : "neon-glow-yellow-sm";

  const scoreBg =
    result.aiScore >= 90
      ? "rgba(57, 255, 20, 0.08)"
      : result.aiScore >= 80
        ? "rgba(0, 240, 255, 0.08)"
        : "rgba(255, 230, 0, 0.08)";

  const scoreBorder =
    result.aiScore >= 90
      ? "rgba(57, 255, 20, 0.25)"
      : result.aiScore >= 80
        ? "rgba(0, 240, 255, 0.25)"
        : "rgba(255, 230, 0, 0.25)";

  const scoreBoxShadow =
    result.aiScore >= 90
      ? "0 0 40px rgba(57, 255, 20, 0.15), 0 0 80px rgba(57, 255, 20, 0.05)"
      : result.aiScore >= 80
        ? "0 0 40px rgba(0, 240, 255, 0.15), 0 0 80px rgba(0, 240, 255, 0.05)"
        : "0 0 40px rgba(255, 230, 0, 0.1)";

  const productUrl = `https://launchpad.today/product/${result.id}`;
  const tweetText = `${productName} just scored ${result.aiScore}/100 on @LaunchpadToday — ranked by AI, not hype. Check it out:`;
  const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(tweetText)}&url=${encodeURIComponent(productUrl)}`;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(productUrl).catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex flex-col items-center text-center py-4">
      {/* Product name */}
      <p
        className="text-xs uppercase tracking-[3px] text-white/50 mb-5"
        style={{ fontFamily: "var(--font-orbitron), 'Orbitron', sans-serif" }}
      >
        {productName}
      </p>

      {/* Score display */}
      <div
        className="animate-score-reveal rounded-2xl p-6 sm:p-8 mb-6 w-full max-w-[260px]"
        style={{
          background: scoreBg,
          border: `1px solid ${scoreBorder}`,
          boxShadow: scoreBoxShadow,
        }}
      >
        <div
          className="text-[10px] uppercase tracking-[3px] mb-3 font-bold"
          style={{
            fontFamily: "var(--font-orbitron), 'Orbitron', sans-serif",
            color: "rgba(255, 255, 255, 0.35)",
          }}
        >
          AI Score
        </div>
        <div
          className={`text-6xl sm:text-7xl font-black animate-score-number animate-score-glow ${scoreGlowClass}`}
          style={{
            fontFamily: "var(--font-orbitron), 'Orbitron', sans-serif",
            color: scoreColor,
            lineHeight: 1,
          }}
        >
          {result.aiScore}
        </div>
        <div
          className="text-[10px] uppercase tracking-widest mt-3"
          style={{ color: "rgba(255, 255, 255, 0.4)" }}
        >
          out of 100
        </div>
      </div>

      {/* AI Verdict */}
      <div
        className="rounded-xl p-4 mb-6 w-full text-left"
        style={{
          background: "rgba(176, 38, 255, 0.06)",
          border: "1px solid rgba(176, 38, 255, 0.15)",
        }}
      >
        <div className="flex items-center gap-2 mb-2">
          <span className="text-sm">🤖</span>
          <span
            className="text-[10px] uppercase tracking-[2px] font-bold"
            style={{
              fontFamily: "var(--font-orbitron), 'Orbitron', sans-serif",
              color: "var(--neon-purple)",
            }}
          >
            AI Verdict
          </span>
        </div>
        <p className="text-xs text-white/60 leading-relaxed">
          {result.aiVerdict}
        </p>
      </div>

      {/* Share buttons */}
      <div className="flex items-center gap-3 mb-4 w-full justify-center">
        <a
          href={twitterUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg text-xs uppercase tracking-wider font-bold transition-all duration-200 hover:scale-105"
          style={{
            fontFamily: "var(--font-orbitron), 'Orbitron', sans-serif",
            background: "rgba(255, 255, 255, 0.06)",
            border: "1px solid rgba(255, 255, 255, 0.1)",
            color: "rgba(255, 255, 255, 0.6)",
            minHeight: "44px",
          }}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
          </svg>
          Share on X
        </a>
        <button
          onClick={handleCopyLink}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg text-xs uppercase tracking-wider font-bold transition-all duration-200 hover:scale-105 cursor-pointer"
          style={{
            fontFamily: "var(--font-orbitron), 'Orbitron', sans-serif",
            background: copied ? "rgba(57, 255, 20, 0.1)" : "rgba(255, 255, 255, 0.06)",
            border: copied ? "1px solid var(--neon-green)" : "1px solid rgba(255, 255, 255, 0.1)",
            color: copied ? "var(--neon-green)" : "rgba(255, 255, 255, 0.6)",
            minHeight: "44px",
          }}
        >
          {copied ? (
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20 6L9 17l-5-5" />
            </svg>
          ) : (
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
              <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
            </svg>
          )}
          {copied ? "Copied!" : "Copy Link"}
        </button>
      </div>

      {/* View Full Details link */}
      <a
        href={`/product/${result.id}`}
        className="text-xs uppercase tracking-[2px] font-bold transition-all duration-200 hover:opacity-80 mb-5"
        style={{
          fontFamily: "var(--font-orbitron), 'Orbitron', sans-serif",
          color: "var(--neon-cyan)",
          minHeight: "44px",
          display: "inline-flex",
          alignItems: "center",
        }}
      >
        View Full Details &rarr;
      </a>

      {/* Close button */}
      <button
        onClick={onClose}
        className="w-full py-3 rounded-lg text-sm text-white/50 hover:text-white/80 transition-colors"
        style={{
          background: "rgba(255, 255, 255, 0.04)",
          border: "1px solid rgba(255, 255, 255, 0.08)",
          minHeight: "44px",
        }}
      >
        Close
      </button>
    </div>
  );
}

export function SubmitModal({ isOpen, onClose, onSubmit }: SubmitModalProps) {
  const [name, setName] = useState("");
  const [tagline, setTagline] = useState("");
  const [description, setDescription] = useState("");
  const [url, setUrl] = useState("");
  const [category, setCategory] = useState<Category>("AI/ML");
  const [submittedBy, setSubmittedBy] = useState("");
  const [launching, setLaunching] = useState(false);
  const [launched, setLaunched] = useState(false);
  const [scoreResult, setScoreResult] = useState<SubmitResult | null>(null);
  const modalRef = useRef<HTMLDivElement>(null);
  const previouslyFocusedRef = useRef<HTMLElement | null>(null);

  const NAME_MAX = 60;
  const TAGLINE_MAX = 120;
  const DESC_MAX = 500;

  // Lock body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // Save trigger element and restore focus on close
  useEffect(() => {
    if (isOpen) {
      previouslyFocusedRef.current = document.activeElement as HTMLElement;
    } else if (previouslyFocusedRef.current) {
      previouslyFocusedRef.current.focus();
      previouslyFocusedRef.current = null;
    }
  }, [isOpen]);

  // Focus trap: keep Tab cycling within the modal
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "Escape") {
        handleClose();
        return;
      }
      if (e.key !== "Tab" || !modalRef.current) return;

      const focusable = modalRef.current.querySelectorAll<HTMLElement>(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      if (focusable.length === 0) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (e.shiftKey) {
        if (document.activeElement === first) {
          e.preventDefault();
          last.focus();
        }
      } else {
        if (document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [onClose]
  );

  // Auto-focus the first input when modal opens
  useEffect(() => {
    if (isOpen && modalRef.current && !scoreResult) {
      const timer = setTimeout(() => {
        const firstInput = modalRef.current?.querySelector<HTMLElement>("input, button");
        firstInput?.focus();
      }, 50);
      return () => clearTimeout(timer);
    }
  }, [isOpen, launching, scoreResult]);

  if (!isOpen) return null;

  const handleClose = () => {
    // Reset all state when closing
    setLaunching(false);
    setLaunched(false);
    setScoreResult(null);
    setName("");
    setTagline("");
    setDescription("");
    setUrl("");
    setCategory("AI/ML");
    setSubmittedBy("");
    onClose();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLaunching(true);

    // Phase 1: Rocket ignition (1.5s)
    setTimeout(() => {
      setLaunched(true);
      const result = onSubmit({ name, tagline, description, url, category, submittedBy });

      // Phase 2: Rocket launches, then transition to score reveal (2s)
      setTimeout(() => {
        setLaunching(false);
        setLaunched(false);
        setScoreResult(result);
      }, 2000);
    }, 1500);
  };

  const isValid =
    name &&
    tagline &&
    description &&
    url &&
    submittedBy &&
    name.length <= NAME_MAX &&
    tagline.length <= TAGLINE_MAX &&
    description.length <= DESC_MAX;

  // Determine current phase for header display
  const showForm = !launching && !scoreResult;
  const showAnimation = launching;
  const showScore = !!scoreResult;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 modal-overlay"
      onClick={handleClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="submit-modal-title"
      onKeyDown={handleKeyDown}
    >
      <div
        ref={modalRef}
        className="retro-card rounded-2xl p-6 sm:p-8 w-full max-w-lg max-h-[90vh] overflow-y-auto neon-border-cyan modal-card-enter"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <RocketIcon size={32} flame={true} />
            <h2
              id="submit-modal-title"
              className="text-lg sm:text-xl font-bold tracking-wider uppercase"
              style={{ fontFamily: "var(--font-orbitron), 'Orbitron', sans-serif", color: "var(--neon-cyan)" }}
            >
              {showScore ? "Score Reveal" : "Submit Launch"}
            </h2>
          </div>
          <button
            onClick={handleClose}
            aria-label="Close submit modal"
            className="text-white/30 hover:text-white/70 transition-colors text-xl"
          >
            &times;
          </button>
        </div>

        {/* Phase 1: Launch animation */}
        {showAnimation && (
          <div className="flex flex-col items-center justify-center py-16">
            <div className={launched ? "animate-launch" : "animate-rocket-float"}>
              <RocketIcon size={80} flame={true} />
            </div>
            <p
              className="mt-6 text-sm uppercase tracking-[4px] animate-pulse-glow"
              style={{
                fontFamily: "var(--font-orbitron), 'Orbitron', sans-serif",
                color: launched ? "var(--neon-green)" : "var(--neon-yellow)",
              }}
            >
              {launched ? "Launch Successful!" : "Igniting engines..."}
            </p>
            {launched && (
              <p className="text-xs text-white/40 mt-2">
                AI is now analyzing your submission...
              </p>
            )}
          </div>
        )}

        {/* Phase 2: Score reveal */}
        {showScore && (
          <ScoreReveal
            result={scoreResult}
            productName={scoreResult.name}
            onClose={handleClose}
          />
        )}

        {/* Phase 0: Form */}
        {showForm && (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label htmlFor="submit-name" className="text-[10px] uppercase tracking-widest text-white/40">
                  Product Name *
                </label>
                <CharCounter current={name.length} max={NAME_MAX} />
              </div>
              <input
                id="submit-name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value.slice(0, NAME_MAX))}
                placeholder="NeuralForge"
                className="retro-input w-full px-4 py-2.5 rounded-lg text-sm"
                maxLength={NAME_MAX}
                required
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label htmlFor="submit-tagline" className="text-[10px] uppercase tracking-widest text-white/40">
                  Tagline *
                </label>
                <CharCounter current={tagline.length} max={TAGLINE_MAX} />
              </div>
              <input
                id="submit-tagline"
                type="text"
                value={tagline}
                onChange={(e) => setTagline(e.target.value.slice(0, TAGLINE_MAX))}
                placeholder="One line that explains what you built"
                className="retro-input w-full px-4 py-2.5 rounded-lg text-sm"
                maxLength={TAGLINE_MAX}
                required
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label htmlFor="submit-description" className="text-[10px] uppercase tracking-widest text-white/40">
                  Description *
                </label>
                <CharCounter current={description.length} max={DESC_MAX} />
              </div>
              <textarea
                id="submit-description"
                value={description}
                onChange={(e) => setDescription(e.target.value.slice(0, DESC_MAX))}
                placeholder="What does it do? Who is it for? Why now?"
                className="retro-textarea w-full px-4 py-2.5 rounded-lg text-sm min-h-[100px]"
                maxLength={DESC_MAX}
                required
              />
            </div>

            <div>
              <label htmlFor="submit-url" className="block text-[10px] uppercase tracking-widest text-white/40 mb-1.5">
                URL *
              </label>
              <input
                id="submit-url"
                type="url"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="https://yourproduct.com"
                className="retro-input w-full px-4 py-2.5 rounded-lg text-sm"
                required
              />
            </div>

            <div>
              <label htmlFor="submit-category" className="block text-[10px] uppercase tracking-widest text-white/40 mb-1.5">
                Category *
              </label>
              <select
                id="submit-category"
                value={category}
                onChange={(e) => setCategory(e.target.value as Category)}
                className="retro-input w-full px-4 py-2.5 rounded-lg text-sm"
              >
                {CATEGORIES.map((cat) => (
                  <option key={cat} value={cat} style={{ background: "#0A0A0F" }}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="submit-handle" className="block text-[10px] uppercase tracking-widest text-white/40 mb-1.5">
                Your Handle *
              </label>
              <input
                id="submit-handle"
                type="text"
                value={submittedBy}
                onChange={(e) => setSubmittedBy(e.target.value)}
                placeholder="@yourname"
                className="retro-input w-full px-4 py-2.5 rounded-lg text-sm"
                required
              />
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={!isValid}
              className="submit-btn w-full py-3 rounded-lg text-sm text-white disabled:opacity-30 disabled:cursor-not-allowed"
            >
              Initiate Launch Sequence
            </button>

            <p className="text-[10px] text-white/20 text-center">
              AI will analyze and score your product within minutes
            </p>
          </form>
        )}
      </div>
    </div>
  );
}
