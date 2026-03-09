"use client";

import { useState, useEffect, useRef, useMemo, useCallback } from "react";
import { useRouter } from "next/navigation";
import { MOCK_PRODUCTS, PAST_WINNERS } from "@/lib/mock-data";
import { getProducts } from "@/lib/api";
import { Product } from "@/lib/types";

const STATIC_ALL_PRODUCTS: Product[] = [...MOCK_PRODUCTS, ...PAST_WINNERS];
const MAX_RESULTS = 8;
const MAX_RECENT = 5;
const RECENT_KEY = "launchpad-recent-searches";

function getRecentSearches(): string[] {
  if (typeof window === "undefined") return [];
  try {
    const stored = localStorage.getItem(RECENT_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
}

function saveRecentSearch(query: string) {
  if (typeof window === "undefined" || !query.trim()) return;
  try {
    const existing = getRecentSearches();
    const filtered = existing.filter(
      (s) => s.toLowerCase() !== query.toLowerCase()
    );
    const updated = [query.trim(), ...filtered].slice(0, MAX_RECENT);
    localStorage.setItem(RECENT_KEY, JSON.stringify(updated));
  } catch {
    // localStorage not available
  }
}

function clearRecentSearches() {
  if (typeof window === "undefined") return;
  try {
    localStorage.removeItem(RECENT_KEY);
  } catch {
    // localStorage not available
  }
}

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SearchModal({ isOpen, onClose }: SearchModalProps) {
  const [query, setQuery] = useState("");
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [allProducts, setAllProducts] = useState<Product[]>(STATIC_ALL_PRODUCTS);
  const inputRef = useRef<HTMLInputElement>(null);
  const resultsRef = useRef<HTMLDivElement>(null);
  const previouslyFocusedRef = useRef<HTMLElement | null>(null);
  const router = useRouter();

  // Hydrate products from API on first open
  const hasFetchedRef = useRef(false);
  useEffect(() => {
    if (isOpen && !hasFetchedRef.current) {
      hasFetchedRef.current = true;
      getProducts().then((products) => {
        if (products.length > 0) setAllProducts(products);
      });
    }
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

  // Search logic
  const results = useMemo(() => {
    if (!query.trim()) return [];
    const q = query.toLowerCase();
    return allProducts.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.tagline.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q)
    ).slice(0, MAX_RESULTS);
  }, [query, allProducts]);

  // Load recent searches when modal opens
  useEffect(() => {
    if (isOpen) {
      setRecentSearches(getRecentSearches());
      setQuery("");
      setSelectedIndex(0);
    }
  }, [isOpen]);

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

  // Auto-focus input when modal opens
  useEffect(() => {
    if (isOpen) {
      // Small delay to ensure DOM is ready
      const timer = setTimeout(() => {
        inputRef.current?.focus();
      }, 50);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  // Reset selection when results change
  useEffect(() => {
    setSelectedIndex(0);
  }, [results]);

  const navigateToProduct = useCallback(
    (product: Product) => {
      saveRecentSearch(product.name);
      onClose();
      router.push(`/product/${product.id}`);
    },
    [onClose, router]
  );

  const handleRecentClick = useCallback(
    (term: string) => {
      setQuery(term);
    },
    []
  );

  const handleClearRecent = useCallback(() => {
    clearRecentSearches();
    setRecentSearches([]);
  }, []);

  // Keyboard navigation
  useEffect(() => {
    if (!isOpen) return;

    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
        return;
      }

      if (e.key === "ArrowDown") {
        e.preventDefault();
        setSelectedIndex((prev) =>
          prev < results.length - 1 ? prev + 1 : 0
        );
        return;
      }

      if (e.key === "ArrowUp") {
        e.preventDefault();
        setSelectedIndex((prev) =>
          prev > 0 ? prev - 1 : results.length - 1
        );
        return;
      }

      if (e.key === "Enter" && results.length > 0) {
        e.preventDefault();
        navigateToProduct(results[selectedIndex]);
        return;
      }
    }

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, results, selectedIndex, onClose, navigateToProduct]);

  // Scroll selected result into view
  useEffect(() => {
    if (!resultsRef.current) return;
    const selected = resultsRef.current.querySelector(
      `[data-index="${selectedIndex}"]`
    );
    if (selected) {
      selected.scrollIntoView({ block: "nearest" });
    }
  }, [selectedIndex]);

  if (!isOpen) return null;

  const showRecent = !query.trim() && recentSearches.length > 0;
  const showNoResults = query.trim().length > 0 && results.length === 0;

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center pt-[15vh] sm:pt-[20vh] px-4 modal-overlay"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="Search launches"
    >
      <div
        className="retro-card rounded-2xl w-full max-w-xl overflow-hidden neon-border-cyan modal-card-enter"
        onClick={(e) => e.stopPropagation()}
        style={{
          boxShadow:
            "0 0 40px rgba(0, 240, 255, 0.12), 0 25px 60px rgba(0, 0, 0, 0.5)",
        }}
      >
        {/* Search header */}
        <div
          className="flex items-center gap-3 px-5 py-4"
          style={{
            borderBottom: "1px solid rgba(0, 240, 255, 0.1)",
          }}
        >
          {/* Search icon */}
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            style={{ color: "var(--neon-cyan)", flexShrink: 0 }}
          >
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>

          {/* Input with blinking cursor effect */}
          <div className="flex-1 relative">
            <input
              ref={inputRef}
              type="search"
              role="combobox"
              aria-expanded={results.length > 0}
              aria-autocomplete="list"
              aria-label="Search launches"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search launches..."
              className="w-full bg-transparent text-sm text-white placeholder:text-white/25 outline-none caret-[var(--neon-cyan)]"
              style={{
                fontFamily: "var(--font-space-mono), 'Space Mono', monospace",
                caretColor: "var(--neon-cyan)",
              }}
            />
          </div>

          {/* ESC badge */}
          <kbd
            className="hidden sm:inline-flex items-center text-[10px] uppercase tracking-wider text-white/25 px-2 py-1 rounded"
            style={{
              fontFamily: "var(--font-space-mono), 'Space Mono', monospace",
              border: "1px solid rgba(255, 255, 255, 0.1)",
              background: "rgba(255, 255, 255, 0.03)",
              minHeight: "24px",
            }}
          >
            ESC
          </kbd>
        </div>

        {/* Recent searches */}
        {showRecent && (
          <div className="px-5 py-4">
            <div className="flex items-center justify-between mb-3">
              <span
                className="text-[10px] uppercase tracking-[2px] text-white/30"
                style={{ fontFamily: "var(--font-orbitron), 'Orbitron', sans-serif" }}
              >
                Recent Searches
              </span>
              <button
                onClick={handleClearRecent}
                className="text-[10px] uppercase tracking-wider text-white/20 hover:text-white/50 transition-colors"
                style={{
                  fontFamily: "var(--font-space-mono), 'Space Mono', monospace",
                  minHeight: "44px",
                  minWidth: "44px",
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                Clear
              </button>
            </div>
            <div className="space-y-1">
              {recentSearches.map((term) => (
                <button
                  key={term}
                  onClick={() => handleRecentClick(term)}
                  className="flex items-center gap-3 w-full text-left px-3 py-2.5 rounded-lg transition-all duration-200 group"
                  style={{
                    minHeight: "44px",
                    background: "rgba(255, 255, 255, 0.02)",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background =
                      "rgba(0, 240, 255, 0.05)";
                    e.currentTarget.style.borderColor =
                      "rgba(0, 240, 255, 0.15)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background =
                      "rgba(255, 255, 255, 0.02)";
                    e.currentTarget.style.borderColor = "transparent";
                  }}
                >
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-white/20 group-hover:text-white/40 transition-colors"
                    style={{ flexShrink: 0 }}
                  >
                    <polyline points="1 4 1 10 7 10" />
                    <path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10" />
                  </svg>
                  <span
                    className="text-sm text-white/50 group-hover:text-white/80 transition-colors"
                    style={{ fontFamily: "var(--font-space-mono), 'Space Mono', monospace" }}
                  >
                    {term}
                  </span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Results */}
        {results.length > 0 && (
          <div
            ref={resultsRef}
            className="max-h-[50vh] overflow-y-auto"
            style={{
              borderTop: showRecent
                ? "1px solid rgba(0, 240, 255, 0.1)"
                : "none",
            }}
          >
            <div className="px-3 py-2">
              <span
                className="block px-2 py-2 text-[10px] uppercase tracking-[2px] text-white/30"
                style={{ fontFamily: "var(--font-orbitron), 'Orbitron', sans-serif" }}
              >
                Results
              </span>
              {results.map((product, index) => (
                <button
                  key={product.id}
                  data-index={index}
                  onClick={() => navigateToProduct(product)}
                  className="flex items-center gap-3 w-full text-left px-3 py-3 rounded-lg transition-all duration-200 group"
                  style={{
                    minHeight: "44px",
                    background:
                      index === selectedIndex
                        ? "rgba(0, 240, 255, 0.08)"
                        : "transparent",
                    border:
                      index === selectedIndex
                        ? "1px solid rgba(0, 240, 255, 0.2)"
                        : "1px solid transparent",
                    boxShadow:
                      index === selectedIndex
                        ? "0 0 12px rgba(0, 240, 255, 0.08)"
                        : "none",
                  }}
                  onMouseEnter={() => setSelectedIndex(index)}
                >
                  {/* Emoji */}
                  <div
                    className="w-10 h-10 rounded-lg flex items-center justify-center text-lg"
                    style={{
                      background: "rgba(0, 240, 255, 0.05)",
                      border: "1px solid rgba(0, 240, 255, 0.1)",
                      flexShrink: 0,
                    }}
                  >
                    {product.logoEmoji}
                  </div>

                  {/* Product info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span
                        className="text-sm font-bold text-white/90 group-hover:text-white transition-colors truncate"
                        style={{ fontFamily: "var(--font-orbitron), 'Orbitron', sans-serif" }}
                      >
                        {product.name}
                      </span>
                      {/* Category tag */}
                      <span className="tag-pill shrink-0 hidden sm:inline">
                        {product.category}
                      </span>
                    </div>
                    <p
                      className="text-xs text-white/40 truncate mt-0.5"
                      style={{ fontFamily: "var(--font-space-mono), 'Space Mono', monospace" }}
                    >
                      {product.tagline}
                    </p>
                  </div>

                  {/* AI Score */}
                  <div
                    className="text-sm font-black shrink-0"
                    style={{
                      fontFamily: "var(--font-orbitron), 'Orbitron', sans-serif",
                      color:
                        product.aiScore >= 90
                          ? "var(--neon-yellow)"
                          : product.aiScore >= 80
                          ? "var(--neon-cyan)"
                          : product.aiScore >= 70
                          ? "var(--neon-pink)"
                          : "var(--neon-orange)",
                      textShadow:
                        product.aiScore >= 90
                          ? "0 0 8px rgba(255, 230, 0, 0.5)"
                          : product.aiScore >= 80
                          ? "0 0 8px rgba(0, 240, 255, 0.5)"
                          : product.aiScore >= 70
                          ? "0 0 8px rgba(255, 45, 120, 0.5)"
                          : "0 0 8px rgba(255, 107, 43, 0.5)",
                    }}
                  >
                    {product.aiScore}
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* No results */}
        {showNoResults && (
          <div className="px-5 py-10 text-center">
            <div className="text-3xl mb-3">🚀</div>
            <p
              className="text-sm font-bold text-white/50 mb-1"
              style={{ fontFamily: "var(--font-orbitron), 'Orbitron', sans-serif" }}
            >
              No launches found
            </p>
            <p
              className="text-xs text-white/25"
              style={{ fontFamily: "var(--font-space-mono), 'Space Mono', monospace" }}
            >
              Try a different search term
            </p>
          </div>
        )}

        {/* Empty initial state (no query, no recent) */}
        {!query.trim() && recentSearches.length === 0 && (
          <div className="px-5 py-8 text-center">
            <p
              className="text-xs text-white/25"
              style={{ fontFamily: "var(--font-space-mono), 'Space Mono', monospace" }}
            >
              Type to search products, categories, or taglines
            </p>
          </div>
        )}

        {/* Footer hint */}
        <div
          className="px-5 py-3 flex items-center justify-between"
          style={{
            borderTop: "1px solid rgba(0, 240, 255, 0.07)",
            background: "rgba(0, 0, 0, 0.2)",
          }}
        >
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1.5 text-[10px] text-white/20">
              <kbd
                className="inline-flex items-center justify-center w-5 h-5 rounded text-[9px]"
                style={{
                  border: "1px solid rgba(255, 255, 255, 0.1)",
                  background: "rgba(255, 255, 255, 0.03)",
                }}
              >
                ↑
              </kbd>
              <kbd
                className="inline-flex items-center justify-center w-5 h-5 rounded text-[9px]"
                style={{
                  border: "1px solid rgba(255, 255, 255, 0.1)",
                  background: "rgba(255, 255, 255, 0.03)",
                }}
              >
                ↓
              </kbd>
              navigate
            </span>
            <span className="flex items-center gap-1.5 text-[10px] text-white/20">
              <kbd
                className="inline-flex items-center justify-center px-1.5 h-5 rounded text-[9px]"
                style={{
                  border: "1px solid rgba(255, 255, 255, 0.1)",
                  background: "rgba(255, 255, 255, 0.03)",
                }}
              >
                ↵
              </kbd>
              open
            </span>
          </div>
          <span
            className="text-[10px] text-white/15 hidden sm:inline"
            style={{ fontFamily: "var(--font-space-mono), 'Space Mono', monospace" }}
          >
            launchpad.today
          </span>
        </div>
      </div>
    </div>
  );
}
