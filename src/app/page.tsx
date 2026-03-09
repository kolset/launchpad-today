"use client";

import { useState, useMemo } from "react";
import { StarsBackground } from "@/components/stars-background";
import { Header } from "@/components/header";
import { WinnerBanner } from "@/components/winner-banner";
import { WinnersStrip } from "@/components/winners-strip";
import { ProductCard } from "@/components/product-card";
import { SubmitModal } from "@/components/submit-modal";
import { TimeFilterBar } from "@/components/time-filter";
import { Countdown } from "@/components/countdown";
import { Footer } from "@/components/footer";
import { SmallRocket } from "@/components/rocket-icon";
import { MOCK_PRODUCTS, PAST_WINNERS } from "@/lib/mock-data";
import { TimeFilter, Category, Product } from "@/lib/types";

const EMOJIS = ["🚀", "💡", "⚡", "🔮", "🎯", "🧪", "🛸", "🌟", "🔥", "💎"];

export default function Home() {
  const [timeFilter, setTimeFilter] = useState<TimeFilter>("today");
  const [showSubmit, setShowSubmit] = useState(false);
  const [products, setProducts] = useState<Product[]>(MOCK_PRODUCTS);

  // Current day's winner (highest AI score)
  const dayWinner = useMemo(
    () => products.reduce((best, p) => (p.aiScore > best.aiScore ? p : best), products[0]),
    [products]
  );

  // Week and month winners from past data
  const weekWinner = PAST_WINNERS.find((p) => p.isWinner === "week") || dayWinner;
  const monthWinner = PAST_WINNERS.find((p) => p.isWinner === "month") || dayWinner;

  // Ranked list (excluding the winner who gets the banner)
  const rankedProducts = useMemo(
    () =>
      [...products]
        .sort((a, b) => b.aiScore - a.aiScore)
        .filter((p) => p.id !== dayWinner.id),
    [products, dayWinner]
  );

  const handleSubmit = (data: {
    name: string;
    tagline: string;
    description: string;
    url: string;
    category: Category;
    submittedBy: string;
  }) => {
    const newProduct: Product = {
      id: String(Date.now()),
      ...data,
      submittedAt: new Date().toISOString(),
      logoEmoji: EMOJIS[Math.floor(Math.random() * EMOJIS.length)],
      aiScore: Math.floor(Math.random() * 25) + 65,
      aiVerdict:
        "AI analysis pending. Full breakdown will be available shortly after our models complete their review.",
      aiBreakdown: {
        innovation: Math.floor(Math.random() * 20) + 70,
        execution: Math.floor(Math.random() * 20) + 70,
        potential: Math.floor(Math.random() * 20) + 70,
        timing: Math.floor(Math.random() * 20) + 70,
      },
    };
    setProducts((prev) => [...prev, newProduct]);
  };

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

      <Header onSubmitClick={() => setShowSubmit(true)} />

      {/* Winner Banner */}
      <WinnerBanner product={dayWinner} />

      {/* Winners Strip */}
      <div className="py-6">
        <WinnersStrip
          dayWinner={dayWinner}
          weekWinner={weekWinner}
          monthWinner={monthWinner}
        />
      </div>

      {/* Main content */}
      <main className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 pb-8">
        {/* Section header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <SmallRocket />
              <h2
                className="text-base sm:text-lg font-bold tracking-wider uppercase"
                style={{ fontFamily: "'Orbitron', sans-serif" }}
              >
                Launch Rankings
              </h2>
            </div>
            <p className="text-xs text-white/30">{todayFormatted}</p>
          </div>

          <div className="flex items-center gap-4">
            <Countdown />
          </div>
        </div>

        {/* Filter bar */}
        <div className="mb-6">
          <TimeFilterBar active={timeFilter} onChange={setTimeFilter} />
        </div>

        {/* Product list */}
        <div className="space-y-3">
          {rankedProducts.map((product, index) => (
            <ProductCard
              key={product.id}
              product={product}
              rank={index + 2}
            />
          ))}
        </div>

        {/* Empty state */}
        {rankedProducts.length === 0 && (
          <div className="text-center py-16">
            <p className="text-white/25 text-sm">No launches yet today.</p>
            <button
              onClick={() => setShowSubmit(true)}
              className="submit-btn px-6 py-2.5 rounded-lg text-xs text-white mt-4"
            >
              Be the first to launch
            </button>
          </div>
        )}

        {/* How it works */}
        <section className="mt-16">
          <div className="retro-divider mb-8" />
          <h3
            className="text-center text-sm uppercase tracking-[4px] mb-8"
            style={{ fontFamily: "'Orbitron', sans-serif", color: "var(--neon-cyan)" }}
          >
            How It Works
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              {
                step: "01",
                title: "Submit",
                desc: "Drop your startup link and tell us what you built.",
                icon: "🚀",
                color: "var(--neon-pink)",
              },
              {
                step: "02",
                title: "AI Judges",
                desc: "Our AI scores innovation, execution, potential, and timing.",
                icon: "🤖",
                color: "var(--neon-cyan)",
              },
              {
                step: "03",
                title: "Get Ranked",
                desc: "Top score wins Product of the Day. Weekly and monthly crowns too.",
                icon: "🏆",
                color: "var(--neon-yellow)",
              },
            ].map((item) => (
              <div key={item.step} className="retro-card rounded-xl p-5 text-center">
                <div className="text-3xl mb-3">{item.icon}</div>
                <div
                  className="text-[10px] uppercase tracking-[3px] mb-2"
                  style={{ fontFamily: "'Orbitron', sans-serif", color: item.color }}
                >
                  Step {item.step}
                </div>
                <h4
                  className="text-sm font-bold mb-2"
                  style={{ fontFamily: "'Orbitron', sans-serif" }}
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
            className="retro-card rounded-xl p-5 grid grid-cols-2 sm:grid-cols-4 gap-4 text-center"
            style={{ borderColor: "rgba(176, 38, 255, 0.15)" }}
          >
            {[
              { value: "247", label: "Launches Today", color: "var(--neon-cyan)" },
              { value: "12.4K", label: "All-Time Launches", color: "var(--neon-pink)" },
              { value: "94", label: "Highest Score", color: "var(--neon-yellow)" },
              { value: "365", label: "Days Running", color: "var(--neon-green)" },
            ].map((stat) => (
              <div key={stat.label}>
                <div
                  className="text-xl sm:text-2xl font-black"
                  style={{ fontFamily: "'Orbitron', sans-serif", color: stat.color }}
                >
                  {stat.value}
                </div>
                <div className="text-[10px] uppercase tracking-widest text-white/25 mt-1">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>

      <Footer />

      {/* Submit Modal */}
      <SubmitModal
        isOpen={showSubmit}
        onClose={() => setShowSubmit(false)}
        onSubmit={handleSubmit}
      />
    </div>
  );
}
