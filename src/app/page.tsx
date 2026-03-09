"use client";

import { useState, useMemo, useEffect, lazy, Suspense } from "react";
import { useToast } from "@/components/toast";
import { StarsBackground } from "@/components/stars-background";
import { Header } from "@/components/header";
import { WinnerBanner } from "@/components/winner-banner";
import { WinnersStrip } from "@/components/winners-strip";
import { ProductCard } from "@/components/product-card";
import { TimeFilterBar } from "@/components/time-filter";
import { CategoryFilter } from "@/components/category-filter";
import { Countdown } from "@/components/countdown";
import { Footer } from "@/components/footer";
import { SmallRocket } from "@/components/rocket-icon";
import { MOCK_PRODUCTS, PAST_WINNERS } from "@/lib/mock-data";
import { getProducts, submitProduct, subscribeEmail } from "@/lib/api";
import { TimeFilter, Category, Product } from "@/lib/types";

const SubmitModal = lazy(() => import("@/components/submit-modal").then(m => ({ default: m.SubmitModal })));
const SearchModal = lazy(() => import("@/components/search-modal").then(m => ({ default: m.SearchModal })));

const EMOJIS = ["🚀", "💡", "⚡", "🔮", "🎯", "🧪", "🛸", "🌟", "🔥", "💎"];

export default function Home() {
  const [timeFilter, setTimeFilter] = useState<TimeFilter>("today");
  const [categoryFilter, setCategoryFilter] = useState<Category | "All">("All");
  const [showSubmit, setShowSubmit] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [products, setProducts] = useState<Product[]>(MOCK_PRODUCTS);
  const [pastWinners, setPastWinners] = useState<Product[]>(PAST_WINNERS);
  const [email, setEmail] = useState("");
  const [emailSubmitted, setEmailSubmitted] = useState(false);
  const { showToast } = useToast();

  // Global Cmd/Ctrl+K shortcut
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setShowSearch((prev) => !prev);
      }
    }
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Hydrate products from API (Supabase if configured, otherwise mock data)
  useEffect(() => {
    let cancelled = false;
    getProducts().then((allProducts) => {
      if (cancelled) return;
      // Separate today's products from past winners
      const today = allProducts.filter((p) => !p.isWinner || p.isWinner === "day");
      const past = allProducts.filter((p) => p.isWinner === "week" || p.isWinner === "month");
      if (today.length > 0) setProducts(today);
      if (past.length > 0) setPastWinners(past);
    });
    return () => { cancelled = true; };
  }, []);

  // All products including past winners for non-today filters
  const allProducts = useMemo(() => [...products, ...pastWinners], [products, pastWinners]);

  // Current day's winner (highest AI score from today's products)
  const dayWinner = useMemo(
    () => products.reduce((best, p) => (p.aiScore > best.aiScore ? p : best), products[0]),
    [products]
  );

  // Week and month winners from past data
  const weekWinner = pastWinners.find((p) => p.isWinner === "week") || dayWinner;
  const monthWinner = pastWinners.find((p) => p.isWinner === "month") || dayWinner;

  // Compute which categories have products in the current time filter pool
  const activeCategories = useMemo(() => {
    const pool = timeFilter === "today" ? products : allProducts;
    const cats = new Set(pool.map((p) => p.category));
    return [...cats].sort() as Category[];
  }, [products, allProducts, timeFilter]);

  // Filter and rank products based on time filter + category
  const rankedProducts = useMemo(() => {
    let filtered: Product[];
    switch (timeFilter) {
      case "today":
        filtered = products;
        break;
      case "week":
        filtered = allProducts;
        break;
      case "month":
        filtered = allProducts;
        break;
      case "all-time":
        filtered = allProducts;
        break;
      default:
        filtered = products;
    }

    // Apply category filter
    if (categoryFilter !== "All") {
      filtered = filtered.filter((p) => p.category === categoryFilter);
    }

    return [...filtered]
      .sort((a, b) => b.aiScore - a.aiScore)
      .filter((p) => timeFilter === "today" ? p.id !== dayWinner.id : true);
  }, [products, allProducts, timeFilter, categoryFilter, dayWinner]);

  const handleSubmit = (data: {
    name: string;
    tagline: string;
    description: string;
    url: string;
    category: Category;
    submittedBy: string;
  }): { id: string; name: string; aiScore: number; aiVerdict: string } => {
    const logoEmoji = EMOJIS[Math.floor(Math.random() * EMOJIS.length)];
    const aiScore = Math.floor(Math.random() * 25) + 65;
    const aiVerdict =
      "AI analysis pending. Full breakdown will be available shortly after our models complete their review.";
    const aiBreakdown = {
      innovation: Math.floor(Math.random() * 20) + 70,
      execution: Math.floor(Math.random() * 20) + 70,
      potential: Math.floor(Math.random() * 20) + 70,
      timing: Math.floor(Math.random() * 20) + 70,
    };

    // Optimistic local update
    const tempId = String(Date.now());
    const newProduct: Product = {
      id: tempId,
      ...data,
      submittedAt: new Date().toISOString(),
      logoEmoji,
      aiScore,
      aiVerdict,
      aiBreakdown,
      communityVotes: 0,
    };
    setProducts((prev) => [...prev, newProduct]);
    showToast({
      message: `${data.name} has been submitted! AI analysis is underway.`,
      type: "success",
      action: { label: "View your launch", href: `/product/${tempId}` },
    });

    // Persist to Supabase (fire-and-forget, mock mode returns a mock product)
    submitProduct({
      name: data.name,
      tagline: data.tagline,
      description: data.description,
      url: data.url,
      category: data.category as Category,
      submittedBy: data.submittedBy,
      logoEmoji,
      aiScore,
      aiVerdict,
      aiBreakdown,
    }).then((saved) => {
      if (saved && saved.id !== tempId) {
        // Replace temp product with the one from Supabase (has real ID)
        setProducts((prev) => prev.map((p) => (p.id === tempId ? saved : p)));
      }
    });

    return { id: tempId, name: data.name, aiScore, aiVerdict };
  };

  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setEmailSubmitted(true);
      const submittedEmail = email;
      setEmail("");
      showToast({
        message: "You're on the launchpad! Daily winners in your inbox.",
        type: "success",
      });
      // Persist to Supabase (fire-and-forget)
      subscribeEmail(submittedEmail);
    }
  };

  // Dynamic stats
  const highestScore = useMemo(() => Math.max(...products.map((p) => p.aiScore)), [products]);

  // Today's date formatted
  const todayFormatted = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="min-h-screen grid-bg horizon-gradient relative">
      <StarsBackground />

      <Header onSubmitClick={() => setShowSubmit(true)} onSearchClick={() => setShowSearch(true)} />

      {/* Winner Banner */}
      <WinnerBanner product={dayWinner} />

      {/* Winners Strip */}
      <div className="py-8 sm:py-10">
        <WinnersStrip
          dayWinner={dayWinner}
          weekWinner={weekWinner}
          monthWinner={monthWinner}
        />
      </div>

      {/* Main content */}
      <main id="main-content" className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 pb-8">
        {/* Section header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <SmallRocket />
              <h2
                className="text-lg sm:text-xl font-bold tracking-wider uppercase"
                style={{ fontFamily: "var(--font-orbitron), 'Orbitron', sans-serif" }}
              >
                Launch Rankings
              </h2>
            </div>
            <p className="text-xs text-white/40">{todayFormatted}</p>
          </div>

          <div className="flex items-center gap-4">
            <Countdown />
          </div>
        </div>

        {/* Filter bar */}
        <div className="mb-4">
          <TimeFilterBar active={timeFilter} onChange={setTimeFilter} />
        </div>

        {/* Category filter pills */}
        <div className="mb-6">
          <CategoryFilter
            categories={activeCategories}
            active={categoryFilter}
            onChange={setCategoryFilter}
          />
        </div>

        {/* Product list */}
        <div className="space-y-4" role="list" aria-label="Startup launch rankings">
          {rankedProducts.map((product, index) => (
            <div key={product.id} role="listitem">
              <ProductCard
                product={product}
                rank={timeFilter === "today" ? index + 2 : index + 1}
                index={index}
              />
            </div>
          ))}
        </div>

        {/* Empty state */}
        {rankedProducts.length === 0 && (
          <div
            className="retro-card rounded-2xl text-center py-14 px-6"
            style={{
              borderColor: "rgba(0, 240, 255, 0.1)",
              background: "rgba(10, 10, 25, 0.6)",
            }}
          >
            <div
              className="w-16 h-16 rounded-xl flex items-center justify-center text-3xl mx-auto mb-5"
              style={{
                border: "1px solid rgba(0, 240, 255, 0.15)",
                boxShadow: "0 0 20px rgba(0, 240, 255, 0.08)",
                background: "rgba(0, 240, 255, 0.04)",
              }}
            >
              {categoryFilter !== "All" ? "🔍" : "🚀"}
            </div>
            <p
              className="text-sm font-bold mb-1.5"
              style={{ fontFamily: "var(--font-orbitron), 'Orbitron', sans-serif" }}
            >
              {categoryFilter !== "All"
                ? "No launches found"
                : "The launchpad is clear"}
            </p>
            <p className="text-xs text-white/30 mb-6 max-w-xs mx-auto">
              {categoryFilter !== "All"
                ? `No startups in ${categoryFilter} have launched yet. Check another category or submit yours.`
                : "No startups have launched today yet. Be the first to ignite the board."}
            </p>
            {categoryFilter !== "All" ? (
              <button
                onClick={() => setCategoryFilter("All")}
                className="submit-btn px-6 py-2.5 rounded-lg text-xs text-white"
              >
                Show All Categories
              </button>
            ) : (
              <button
                onClick={() => setShowSubmit(true)}
                className="submit-btn px-6 py-2.5 rounded-lg text-xs text-white"
              >
                Be the First to Launch
              </button>
            )}
          </div>
        )}

        {/* Email capture section */}
        <section className="mt-12">
          <div
            className="retro-card rounded-2xl p-6 sm:p-8 text-center"
            style={{
              borderColor: "rgba(255, 230, 0, 0.15)",
              background: "rgba(10, 10, 25, 0.9)",
            }}
          >
            {emailSubmitted ? (
              <div>
                <div className="text-3xl mb-3">🚀</div>
                <p
                  className="text-sm font-bold neon-glow-green-sm"
                  style={{ fontFamily: "var(--font-orbitron), 'Orbitron', sans-serif", color: "var(--neon-green)" }}
                >
                  You&apos;re on the launchpad!
                </p>
                <p className="text-xs text-white/40 mt-2">
                  We&apos;ll send you the daily winner every morning.
                </p>
              </div>
            ) : (
              <>
                <h3
                  className="text-lg sm:text-xl font-bold tracking-wider uppercase mb-2"
                  style={{ fontFamily: "var(--font-orbitron), 'Orbitron', sans-serif" }}
                >
                  Get the Daily Winner
                </h3>
                <p id="email-desc" className="text-xs text-white/40 mb-5 max-w-md mx-auto">
                  Every morning, one startup gets crowned. Get the AI verdict delivered to your inbox.
                </p>
                <form onSubmit={handleEmailSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                  <label htmlFor="email-subscribe" className="sr-only">
                    Email address
                  </label>
                  <input
                    id="email-subscribe"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@startup.com"
                    className="retro-input flex-1 px-4 py-2.5 rounded-lg text-sm"
                    required
                    aria-describedby="email-desc"
                  />
                  <button
                    type="submit"
                    className="submit-btn px-6 py-2.5 rounded-lg text-xs text-white whitespace-nowrap"
                  >
                    Subscribe
                  </button>
                </form>
              </>
            )}
          </div>
        </section>

        {/* How it works */}
        <section className="mt-16">
          <div className="retro-divider mb-8" />
          <h3
            className="text-center text-lg sm:text-xl uppercase tracking-[4px] mb-8 neon-glow-cyan-sm"
            style={{ fontFamily: "var(--font-orbitron), 'Orbitron', sans-serif", color: "var(--neon-cyan)" }}
          >
            How It Works
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              {
                step: "01",
                title: "Submit",
                desc: "Drop your startup link and tell us what you built. Anyone can submit.",
                icon: "🚀",
                color: "var(--neon-pink)",
                borderColor: "rgba(255, 45, 120, 0.25)",
                glowColor: "rgba(255, 45, 120, 0.12)",
              },
              {
                step: "02",
                title: "AI Judges",
                desc: "Our AI evaluates innovation, execution quality, market potential, and timing.",
                icon: "🤖",
                color: "var(--neon-cyan)",
                borderColor: "rgba(0, 240, 255, 0.25)",
                glowColor: "rgba(0, 240, 255, 0.12)",
              },
              {
                step: "03",
                title: "Get Ranked",
                desc: "Highest score wins Product of the Day. Weekly and monthly crowns stack up.",
                icon: "🏆",
                color: "var(--neon-yellow)",
                borderColor: "rgba(255, 230, 0, 0.25)",
                glowColor: "rgba(255, 230, 0, 0.12)",
              },
            ].map((item) => (
              <div key={item.step} className="retro-card rounded-xl p-6 text-center">
                {/* Icon with neon container */}
                <div
                  className="card-icon w-14 h-14 rounded-xl flex items-center justify-center text-2xl mx-auto mb-4"
                  style={{
                    border: `1px solid ${item.borderColor}`,
                    boxShadow: `0 0 12px ${item.glowColor}`,
                    background: `rgba(10, 10, 25, 0.8)`,
                  }}
                >
                  {item.icon}
                </div>
                <div
                  className="text-xs uppercase tracking-[3px] mb-2 font-bold"
                  style={{ fontFamily: "var(--font-orbitron), 'Orbitron', sans-serif", color: item.color }}
                >
                  Level {item.step}
                </div>
                <h4
                  className="text-base font-bold mb-2"
                  style={{ fontFamily: "var(--font-orbitron), 'Orbitron', sans-serif" }}
                >
                  {item.title}
                </h4>
                <p className="text-xs text-white/40 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Stats bar */}
        <section className="mt-12">
          <div
            className="retro-card rounded-xl p-6 grid grid-cols-2 sm:grid-cols-4 gap-4 text-center"
            style={{ borderColor: "rgba(0, 240, 255, 0.15)" }}
          >
            {[
              { value: String(products.length), label: "Launches Today", color: "var(--neon-cyan)", glow: "neon-glow-cyan-sm" },
              { value: String(products.length + pastWinners.length), label: "All-Time Launches", color: "var(--neon-pink)", glow: "neon-glow-pink-sm" },
              { value: String(highestScore), label: "Highest Score", color: "var(--neon-yellow)", glow: "neon-glow-yellow-sm" },
              { value: "1", label: "Days Running", color: "var(--neon-green)", glow: "neon-glow-green-sm" },
            ].map((stat) => (
              <div key={stat.label}>
                <div
                  className={`text-xl sm:text-2xl font-black ${stat.glow}`}
                  style={{ fontFamily: "var(--font-orbitron), 'Orbitron', sans-serif", color: stat.color }}
                >
                  {stat.value}
                </div>
                <div className="text-[10px] uppercase tracking-widest text-white/35 mt-1">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>

      <Footer />

      {/* Submit Modal — lazy-loaded, only fetched when opened */}
      {showSubmit && (
        <Suspense fallback={null}>
          <SubmitModal
            isOpen={showSubmit}
            onClose={() => setShowSubmit(false)}
            onSubmit={handleSubmit}
          />
        </Suspense>
      )}

      {/* Search Modal — lazy-loaded, only fetched when opened */}
      {showSearch && (
        <Suspense fallback={null}>
          <SearchModal
            isOpen={showSearch}
            onClose={() => setShowSearch(false)}
          />
        </Suspense>
      )}
    </div>
  );
}
